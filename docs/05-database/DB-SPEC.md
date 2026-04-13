# Danger Scanner — Спецификация базы данных (DB Spec)

**Дата:** 13 апреля 2026
**Стадия:** Database Design
**Основан на:** DATABASE-SCHEMA.md, FEATURES.md, MONETIZATION.md, PRODUCT-BRIEF.md

---

## 1. Storage Buckets (Supabase Storage)

| Bucket | Назначение | Доступ | Макс. размер файла | Формат | Retention |
|--------|-----------|--------|-------------------|--------|-----------|
| `avatars` | Аватары пользователей | Private (RLS: owner only) | 2 MB | jpg, png, webp | Бессрочно |
| `scans` | Фото сканирований | Private (RLS: owner only) | 10 MB | jpg, png, heic | Бессрочно (soft delete) |
| `shares` | Сгенерированные share-изображения | Public (read), Private (write) | 5 MB | jpg, png | 30 дней |

### Структура путей в Storage

```
avatars/
  └── {user_id}/
      └── avatar.jpg            — аватар пользователя (перезаписывается)

scans/
  └── {user_id}/
      └── {scan_id}.jpg         — оригинальное фото скана

shares/
  └── {scan_id}/
      └── share.jpg             — branded share image
      └── report.pdf            — PDF для врача (Premium)
```

### RLS для Storage

```sql
-- Bucket: avatars
-- SELECT: только владелец
CREATE POLICY "Users can view own avatar"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- INSERT/UPDATE: только владелец
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Bucket: scans
-- SELECT: только владелец
CREATE POLICY "Users can view own scan photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'scans' AND (storage.foldername(name))[1] = auth.uid()::text);

-- INSERT: только владелец
CREATE POLICY "Users can upload scan photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'scans' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Bucket: shares
-- SELECT: публичный (для шеринга)
CREATE POLICY "Anyone can view shared images"
ON storage.objects FOR SELECT
USING (bucket_id = 'shares');
```

---

## 2. Edge Functions (Supabase Edge Functions)

| Функция | Триггер | Назначение | Секреты |
|---------|---------|-----------|---------|
| `analyze-scan` | HTTP POST (от клиента) | Отправить фото на AI-анализ, записать результат в scan_results | `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` |
| `handle-adapty-webhook` | HTTP POST (webhook от Adapty) | Синхронизировать статус подписки с таблицей subscriptions | `ADAPTY_WEBHOOK_SECRET` |
| `check-scan-limit` | HTTP GET (от клиента) | Проверить лимит 3 скана/месяц для Free-пользователей | — |
| `generate-share-image` | HTTP POST (от клиента) | Сгенерировать branded share image для результата скана | — |
| `generate-pdf-report` | HTTP POST (от клиента) | Сгенерировать PDF для врача (Premium-only) | — |
| `send-push-notification` | Cron / HTTP POST | Отправить push-уведомление через Expo Push API | `EXPO_PUSH_TOKEN` |

### analyze-scan — детали

```
POST /functions/v1/analyze-scan
Authorization: Bearer {user_jwt}
Body: { scan_id: uuid }

Логика:
1. Проверить что scan принадлежит пользователю (auth.uid())
2. Проверить лимит сканов (Free: 3/мес)
3. Обновить scans.status = 'analyzing'
4. Получить фото из Storage
5. Отправить на AI (OpenAI Vision / Claude API)
6. Применить Conservative Bias Engine (F-004):
   - confidence < 85% → danger_level ≥ yellow
   - змея → НИКОГДА "неядовитая", ВСЕГДА "Call 911 if bitten"
   - плесень → НИКОГДА "нетоксичная"
7. Записать результат в scan_results
8. Обновить scans.status = 'completed', scans.category_id
9. Вернуть результат клиенту
```

### handle-adapty-webhook — детали

```
POST /functions/v1/handle-adapty-webhook
Headers: X-Adapty-Webhook-Secret: {secret}
Body: Adapty webhook payload

Логика:
1. Валидировать webhook secret
2. Извлечь adapty_profile_id, event_type, subscription_data
3. Найти пользователя по adapty_profile_id в subscriptions
4. Обновить subscription:
   - subscription_initial_purchase → status = 'active'
   - subscription_renewed → обновить period_end
   - trial_started → status = 'trial'
   - trial_converted → status = 'active'
   - subscription_cancelled → status = 'cancelled'
   - subscription_expired → status = 'expired'
   - billing_issue_detected → status = 'billing_issue'
5. Сохранить raw_data для отладки
```

---

## 3. Realtime Subscriptions

| Таблица | Realtime | Обоснование |
|---------|---------|-------------|
| profiles | Нет | Обновляется редко, нет необходимости в realtime |
| subscriptions | **Да** | Клиент должен мгновенно получить обновление при покупке/отмене подписки |
| user_settings | Нет | Обновляется только самим пользователем, нет realtime-сценария |
| scans | **Да** | Клиент подписывается на обновление status (pending → analyzing → completed) |
| scan_results | **Да** | Клиент ждёт появления результата AI-анализа |
| danger_categories | Нет | Статические данные, обновляются через миграции |
| push_tokens | Нет | Управляется клиентом, нет realtime-сценария |
| seasonal_alerts | Нет | Обновляются редко, загружаются при запуске приложения |
| scan_shares | Нет | Write-only аналитика, не читается в realtime |

### Конфигурация Realtime

```sql
-- Включить realtime для нужных таблиц
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scan_results;
```

### Клиентская подписка (пример)

```typescript
// Подписка на обновление скана
supabase
  .channel('scan-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'scans',
      filter: `id=eq.${scanId}`,
    },
    (payload) => {
      if (payload.new.status === 'completed') {
        // Загрузить scan_result
      }
    }
  )
  .subscribe();
```

---

## 4. Cron Jobs (Периодические задачи)

| Задача | Расписание | Описание |
|--------|-----------|----------|
| `expire-trials` | Каждый час (`0 * * * *`) | Обновить subscriptions.status = 'expired' для trial_end < now() |
| `send-seasonal-alerts` | Ежедневно 09:00 UTC (`0 9 * * *`) | Отправить push-уведомления о начале сезона опасностей по ZIP |
| `send-rescan-reminders` | Ежедневно 10:00 UTC (`0 10 * * *`) | Отправить напоминание о повторном скане (30 дней с последнего) |
| `cleanup-expired-shares` | Еженедельно (`0 3 * * 0`) | Удалить share images старше 30 дней из Storage bucket `shares` |
| `deactivate-expired-tokens` | Ежедневно 02:00 UTC (`0 2 * * *`) | Деактивировать push_tokens не использованные 90+ дней |
| `aggregate-scan-stats` | Ежедневно 01:00 UTC (`0 1 * * *`) | Агрегировать статистику сканов для dashboard (будущее) |

### Реализация

Cron jobs реализуются через **Supabase pg_cron** (встроенный) или **Supabase Edge Functions + Cron Trigger**.

```sql
-- Пример: expire-trials через pg_cron
SELECT cron.schedule(
  'expire-trials',
  '0 * * * *',
  $$
    UPDATE public.subscriptions
    SET status = 'expired', updated_at = now()
    WHERE status = 'trial'
    AND trial_end < now()
  $$
);

-- Пример: деактивировать старые push-токены
SELECT cron.schedule(
  'deactivate-expired-tokens',
  '0 2 * * *',
  $$
    UPDATE public.push_tokens
    SET is_active = false, updated_at = now()
    WHERE is_active = true
    AND (last_used_at IS NULL AND created_at < now() - INTERVAL '90 days')
    OR (last_used_at < now() - INTERVAL '90 days')
  $$
);
```

---

## 5. Estimated Scale (Year 1)

### Объём данных

| Таблица | Записей (Year 1) | Средний размер строки | Общий объём |
|---------|------------------|-----------------------|-------------|
| profiles | 500K | ~500 bytes | ~250 MB |
| subscriptions | 500K | ~400 bytes | ~200 MB |
| user_settings | 500K | ~200 bytes | ~100 MB |
| danger_categories | 8 | ~300 bytes | <1 KB |
| scans | 3M | ~400 bytes | ~1.2 GB |
| scan_results | 3M | ~2 KB (JSONB) | ~6 GB |
| push_tokens | 600K | ~300 bytes | ~180 MB |
| seasonal_alerts | 100 | ~500 bytes | <50 KB |
| scan_shares | 300K | ~200 bytes | ~60 MB |

**Итого БД:** ~8 GB (Year 1)

### Storage

| Bucket | Файлов (Year 1) | Средний размер | Общий объём |
|--------|-----------------|----------------|-------------|
| avatars | 200K | 200 KB | ~40 GB |
| scans | 3M | 1.5 MB | ~4.5 TB |
| shares | 300K | 500 KB | ~150 GB |

**Итого Storage:** ~4.7 TB (Year 1)

**Основной расход — фото сканирований.** Оптимизации:
- Сжатие фото на клиенте до отправки (max 1920px, quality 80%)
- WebP формат где поддерживается
- Thumbnail-ы для History (200x200) генерируются на клиенте
- Рассмотреть CDN для часто запрашиваемых фото

### Нагрузка

| Метрика | Оценка (Year 1) |
|---------|-----------------|
| Пиковый DAU | 50K |
| Сканов/день (пик) | 30K |
| Запросов к БД/сек (пик) | ~100 RPS |
| AI-запросов/день (пик) | 30K |
| Push-уведомлений/день | 10K |

**Supabase Pro** ($25/мес) покрывает Year 1. Переход на **Supabase Team** ($599/мес) ожидается при 1M+ MAU (Year 2).

---

## 6. Backup Strategy

### Point-in-Time Recovery (PITR)

| Параметр | Значение |
|----------|---------|
| **Метод** | Supabase PITR (WAL archiving) |
| **Retention** | 7 дней (Pro plan), 28 дней (Team plan) |
| **RPO** | < 1 минута (continuous WAL streaming) |
| **RTO** | < 30 минут |

### Дополнительные меры

| Мера | Частота | Описание |
|------|---------|----------|
| Логический бэкап (pg_dump) | Ежедневно 03:00 UTC | Полный dump БД в S3/GCS — на случай коррупции или ошибки миграции |
| Storage backup | Еженедельно | Synk Supabase Storage → отдельный S3 bucket (cross-region) |
| Тест восстановления | Ежемесячно | Восстановить бэкап в staging-окружение, проверить целостность |

### Storage — не бэкапится автоматически

Supabase Storage **не входит** в PITR. Для фото сканирований (критические данные):
- Настроить S3-compatible backup (Supabase Storage = S3-compatible)
- Или использовать Supabase Storage lifecycle policies

---

## 7. Безопасность

### Принципы

| Принцип | Реализация |
|---------|-----------|
| RLS на всех таблицах | Без исключений, проверено в миграции 006 |
| service_role только в Edge Functions | Клиент НИКОГДА не получает service_role ключ |
| SECURITY DEFINER для системных функций | handle_new_user, is_premium_user, webhook handlers |
| Валидация на Edge Function уровне | Проверка лимитов, прав, формата данных ДО записи в БД |
| Webhook verification | Adapty webhook secret проверяется в handle-adapty-webhook |
| Rate limiting | Supabase встроенный rate limiter + application-level для analyze-scan |

### Чувствительные данные

| Данные | Где хранятся | Защита |
|--------|-------------|--------|
| Email, пароль | auth.users (Supabase Auth) | Bcrypt hash, не в public schema |
| Push-токены | push_tokens | RLS: owner only |
| Фото | Supabase Storage | RLS: owner only, signed URLs |
| AI-ответы (raw) | scan_results.ai_raw_response | RLS: owner only |
| Adapty webhook data | subscriptions.raw_data | RLS: owner only read |
| ZIP-код | profiles.zip_code | RLS: owner only |

---

## 8. Решения и компромиссы

### Почему scan_results — отдельная таблица (а не часть scans)?

- Скан создаётся **до** получения результата (status: pending → analyzing)
- Результат может не появиться (status: failed)
- Разделение позволяет Realtime подписку на INSERT в scan_results
- JSONB-поля (action_card, ai_raw_response) утяжелют строку — не загружаются при листинге истории

### Почему contextual_answers в JSONB (а не отдельная таблица)?

- Схема вопросов разная для каждой категории (укус ≠ змея ≠ плесень)
- Вопросы не нужно запрашивать отдельно — всегда читаются вместе с результатом
- Нет потребности в SQL-фильтрации по отдельным ответам
- JSONB = минимум join-ов для чтения полного результата

### Почему лимит 3 скана/месяц проверяется в Edge Function (а не в RLS)?

- RLS FOR INSERT WITH CHECK не может выполнять COUNT-запросы надёжно
- Edge Function может вернуть информативную ошибку клиенту ("2 скана осталось")
- Централизованная логика лимитов — проще менять и тестировать
- Edge Function использует service_role для атомарной проверки + INSERT

### Почему scans.user_id — ON DELETE SET NULL (а не CASCADE)?

- При удалении аккаунта сканы обезличиваются, но сохраняются для аналитики
- Статистика (количество сканов, danger level распределение) не теряется
- Фото удаляются из Storage отдельно (через Edge Function при account deletion)
- GDPR: SET NULL = анонимизация без физического удаления (данные не привязаны к личности)

### Почему subscriptions хранит историю (а не только текущую)?

- История подписок нужна для:
  - Поддержки ("когда пользователь подписался впервые?")
  - Аналитики (churn, resubscription rates)
  - Billing disputes (доказательство периодов подписки)
- Partial unique index гарантирует одну активную подписку

---

## Источники

- DATABASE-SCHEMA.md — структура таблиц
- FEATURES.md — F-001–F-010, лимиты Free/Premium
- MONETIZATION.md — тиры подписки, Adapty интеграция
- USER-FLOWS.md — Flow 2 (scan pipeline), Flow 4 (upgrade)
- PRODUCT-BRIEF.md — масштаб, техническая архитектура

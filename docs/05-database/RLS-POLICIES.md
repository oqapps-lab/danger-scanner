# Danger Scanner — RLS-политики (Row Level Security)

**Дата:** 13 апреля 2026
**Стадия:** Database Design
**Основан на:** DATABASE-SCHEMA.md, FEATURES.md, MONETIZATION.md

---

## Принципы

1. **RLS включена на ВСЕХ таблицах без исключений**
2. Пользовательские данные: только владелец видит/изменяет свои записи
3. Справочные данные (категории, алерты): публичный SELECT
4. Premium-контент: проверка активной подписки через `subscriptions`
5. Сервисные операции (webhook, AI) — через `SECURITY DEFINER` функции, не через RLS bypass

---

## Вспомогательная функция: проверка Premium

```sql
-- Используется в RLS-политиках для проверки активной подписки
CREATE OR REPLACE FUNCTION public.is_premium_user(check_user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = check_user_id
    AND status IN ('trial', 'active')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;
```

---

## Таблица: profiles

### SELECT
Пользователь видит только свой профиль.

```sql
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);
```

### INSERT
Создание профиля — только через триггер `on_auth_user_created` (SECURITY DEFINER).
Дополнительно: пользователь может создать запись только для себя.

```sql
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

### UPDATE
Пользователь может обновить только свой профиль.

```sql
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

### DELETE
Запрещено через RLS. Удаление профиля — только каскадное при удалении auth.users.

*(Нет политики DELETE — по умолчанию запрещено)*

---

## Таблица: subscriptions

### SELECT
Пользователь видит только свои подписки.

```sql
CREATE POLICY "Users can view own subscriptions"
ON public.subscriptions FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT
Создание подписки — только через Edge Function (Adapty webhook), SECURITY DEFINER.
Пользователь не может создавать подписки напрямую.

*(Нет политики INSERT для пользователей)*

### UPDATE
Обновление — только через Edge Function (Adapty webhook), SECURITY DEFINER.

*(Нет политики UPDATE для пользователей)*

### DELETE
Запрещено.

*(Нет политики DELETE)*

**Примечание:** Все операции с подписками выполняются через Edge Function `handle-adapty-webhook`, которая использует `service_role` ключ Supabase для обхода RLS.

---

## Таблица: user_settings

### SELECT
Пользователь видит только свои настройки.

```sql
CREATE POLICY "Users can view own settings"
ON public.user_settings FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT
Пользователь создаёт настройки только для себя.

```sql
CREATE POLICY "Users can insert own settings"
ON public.user_settings FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE
Пользователь обновляет только свои настройки.

```sql
CREATE POLICY "Users can update own settings"
ON public.user_settings FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Запрещено.

*(Нет политики DELETE)*

---

## Таблица: danger_categories

### SELECT
Публичный доступ для всех авторизованных пользователей (включая anonymous).

```sql
CREATE POLICY "Anyone can read danger categories"
ON public.danger_categories FOR SELECT
USING (true);
```

### INSERT / UPDATE / DELETE
Запрещено через RLS. Управление — только через миграции или admin panel (service_role).

*(Нет политик INSERT/UPDATE/DELETE)*

---

## Таблица: scans

### SELECT
Пользователь видит только свои сканы (не удалённые).

```sql
CREATE POLICY "Users can view own scans"
ON public.scans FOR SELECT
USING (
  auth.uid() = user_id
  AND deleted_at IS NULL
);
```

### INSERT
Пользователь создаёт сканы только от своего имени. Для guest-сканов (`user_id IS NULL`) — через Edge Function.

```sql
CREATE POLICY "Users can create own scans"
ON public.scans FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE
Пользователь может обновить только свои сканы (мягкое удаление, привязка к аккаунту после guest-скана).

```sql
CREATE POLICY "Users can update own scans"
ON public.scans FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Запрещено (используется мягкое удаление через `deleted_at`).

*(Нет политики DELETE)*

**Лимит Free-тиера (3 скана/месяц):**
Проверка лимита выполняется на уровне приложения/Edge Function перед INSERT, а не через RLS.

---

## Таблица: scan_results

### SELECT
Пользователь видит результаты только своих сканов.

```sql
CREATE POLICY "Users can view own scan results"
ON public.scan_results FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.scans
    WHERE scans.id = scan_results.scan_id
    AND scans.user_id = auth.uid()
    AND scans.deleted_at IS NULL
  )
);
```

**Для Premium-контента (полные action cards):**
Базовый danger level виден всем. Полные action cards — только Premium.
Фильтрация выполняется на уровне приложения (RLS не ограничивает доступ к отдельным полям).

### INSERT
Создание результатов — только через Edge Function (AI-обработка), SECURITY DEFINER.

*(Нет политики INSERT для пользователей)*

### UPDATE
Запрещено для пользователей.

*(Нет политики UPDATE)*

### DELETE
Запрещено.

*(Нет политики DELETE)*

---

## Таблица: push_tokens

### SELECT
Пользователь видит только свои токены.

```sql
CREATE POLICY "Users can view own push tokens"
ON public.push_tokens FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT
Пользователь регистрирует токены только для себя.

```sql
CREATE POLICY "Users can register own push tokens"
ON public.push_tokens FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### UPDATE
Пользователь обновляет только свои токены.

```sql
CREATE POLICY "Users can update own push tokens"
ON public.push_tokens FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### DELETE
Пользователь может удалить свои токены (при logout).

```sql
CREATE POLICY "Users can delete own push tokens"
ON public.push_tokens FOR DELETE
USING (auth.uid() = user_id);
```

---

## Таблица: seasonal_alerts

### SELECT
Все авторизованные пользователи видят активные алерты. Premium-only алерты — только для подписчиков.

```sql
-- Бесплатные алерты — для всех
CREATE POLICY "Anyone can read free seasonal alerts"
ON public.seasonal_alerts FOR SELECT
USING (
  is_active = true
  AND is_premium_only = false
  AND CURRENT_DATE BETWEEN start_date AND end_date
);

-- Premium алерты — только для подписчиков
CREATE POLICY "Premium users can read premium alerts"
ON public.seasonal_alerts FOR SELECT
USING (
  is_active = true
  AND is_premium_only = true
  AND CURRENT_DATE BETWEEN start_date AND end_date
  AND public.is_premium_user(auth.uid())
);
```

### INSERT / UPDATE / DELETE
Запрещено через RLS. Управление — через admin panel (service_role).

*(Нет политик INSERT/UPDATE/DELETE)*

---

## Таблица: scan_shares

### SELECT
Пользователь видит только свои шеринги.

```sql
CREATE POLICY "Users can view own shares"
ON public.scan_shares FOR SELECT
USING (auth.uid() = user_id);
```

### INSERT
Пользователь создаёт записи шеринга только для своих сканов.

```sql
CREATE POLICY "Users can create shares for own scans"
ON public.scan_shares FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM public.scans
    WHERE scans.id = scan_shares.scan_id
    AND scans.user_id = auth.uid()
  )
);
```

### UPDATE / DELETE
Запрещено.

*(Нет политик UPDATE/DELETE)*

---

## Сводная матрица RLS

| Таблица | SELECT | INSERT | UPDATE | DELETE | Примечание |
|---------|--------|--------|--------|--------|------------|
| profiles | own | own | own | — | Cascade from auth.users |
| subscriptions | own | — | — | — | Только через webhook (service_role) |
| user_settings | own | own | own | — | — |
| danger_categories | public | — | — | — | Справочник |
| scans | own (not deleted) | own | own | — | Мягкое удаление |
| scan_results | own (via scan) | — | — | — | Только через AI Edge Function |
| push_tokens | own | own | own | own | Полный CRUD для своих |
| seasonal_alerts | public + premium | — | — | — | Фильтр по подписке |
| scan_shares | own | own (via scan) | — | — | — |

**Легенда:**
- `own` — только записи пользователя (`auth.uid() = user_id`)
- `public` — доступно всем авторизованным
- `premium` — доступно только с активной подпиской
- `—` — запрещено (нет RLS-политики)

---

## Источники

- DATABASE-SCHEMA.md — структура таблиц
- FEATURES.md — F-007 (Free/Premium лимиты), F-009 (push, premium-only)
- MONETIZATION.md — тиры подписки, ограничения Free

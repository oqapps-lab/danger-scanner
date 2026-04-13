# Danger Scanner — Схема базы данных (Database Schema)

**Дата:** 13 апреля 2026
**Стадия:** Database Design
**Основан на:** FEATURES.md (F-001–F-010), MONETIZATION.md, USER-FLOWS.md, SCREEN-MAP.md

---

## Обзор

Схема покрывает MVP (Must Have) фичи: сканирование опасностей, профили пользователей, историю сканов, подписки, push-уведомления. Все таблицы — в схеме `public`, RLS включена на всех таблицах.

**Общие принципы:**
- `id uuid PK` — генерируется через `gen_random_uuid()`
- `created_at timestamptz NOT NULL DEFAULT now()`
- `updated_at timestamptz NOT NULL DEFAULT now()`
- Мягкое удаление: `deleted_at timestamptz NULL` (где применимо)
- JSONB для гибких данных (AI-результаты, настройки, контекстные ответы)
- FK на `auth.users(id)` через `user_id`

---

## Таблица: profiles

**Назначение:** Расширение auth.users — персональные данные, настройки онбординга, персонализация.
**Связана с:** auth.users (1:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | — | PK, FK → auth.users(id) ON DELETE CASCADE |
| display_name | text | NULL | NULL | Имя пользователя |
| avatar_url | text | NULL | NULL | URL аватара в Supabase Storage |
| zip_code | text | NULL | NULL | ZIP-код для гео-таргетинга опасностей |
| has_children | boolean | NULL | NULL | Наличие детей (персонализация) |
| pet_type | text | NULL | NULL | Тип питомца: 'cat', 'dog', 'both', NULL |
| concern_categories | text[] | NULL | NULL | Выбранные категории из онбординга |
| onboarding_completed | boolean | NOT NULL | false | Прошёл ли пользователь онбординг |
| onboarding_step | smallint | NOT NULL | 0 | Текущий шаг онбординга (для resume) |
| auth_provider | text | NULL | NULL | 'email', 'apple', 'google', 'anonymous' |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `CHECK (pet_type IN ('cat', 'dog', 'both') OR pet_type IS NULL)`
- `CHECK (onboarding_step >= 0 AND onboarding_step <= 6)`

**Индексы:**
- PK on `id`
- `idx_profiles_zip_code ON (zip_code)` — для гео-запросов

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Таблица: subscriptions

**Назначение:** Состояние подписки пользователя, синхронизируется с Adapty через webhook.
**Связана с:** auth.users (N:1 — история подписок)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE |
| adapty_profile_id | text | NULL | NULL | ID профиля в Adapty |
| status | text | NOT NULL | 'free' | 'free', 'trial', 'active', 'expired', 'cancelled', 'billing_issue' |
| plan | text | NOT NULL | 'free' | 'free', 'premium_monthly', 'premium_annual', 'family_monthly', 'family_annual' |
| trial_start | timestamptz | NULL | NULL | Начало триала |
| trial_end | timestamptz | NULL | NULL | Конец триала |
| current_period_start | timestamptz | NULL | NULL | Начало текущего периода подписки |
| current_period_end | timestamptz | NULL | NULL | Конец текущего периода подписки |
| cancelled_at | timestamptz | NULL | NULL | Дата отмены |
| platform | text | NULL | NULL | 'ios', 'android' |
| raw_data | jsonb | NULL | NULL | Полные данные из Adapty webhook |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `CHECK (status IN ('free', 'trial', 'active', 'expired', 'cancelled', 'billing_issue'))`
- `CHECK (plan IN ('free', 'premium_monthly', 'premium_annual', 'family_monthly', 'family_annual'))`
- `CHECK (platform IN ('ios', 'android') OR platform IS NULL)`

**Индексы:**
- `idx_subscriptions_user_id ON (user_id)`
- `idx_subscriptions_status ON (status)` — для проверки активности
- `idx_subscriptions_adapty_profile_id ON (adapty_profile_id)` — для webhook lookup
- `UNIQUE (user_id) WHERE status IN ('trial', 'active')` — только одна активная подписка

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Таблица: user_settings

**Назначение:** Настройки приложения: уведомления, тема, язык.
**Связана с:** auth.users (1:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE, UNIQUE |
| notifications_enabled | boolean | NOT NULL | true | Глобальный переключатель уведомлений |
| seasonal_alerts_enabled | boolean | NOT NULL | true | Сезонные алерты (tick season и т.д.) |
| rescan_reminders_enabled | boolean | NOT NULL | true | Напоминания о повторном скане |
| theme | text | NOT NULL | 'system' | 'light', 'dark', 'system' |
| language | text | NOT NULL | 'en' | ISO 639-1 код языка |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `UNIQUE (user_id)`
- `CHECK (theme IN ('light', 'dark', 'system'))`

**Индексы:**
- `idx_user_settings_user_id ON (user_id)` (UNIQUE)

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Таблица: danger_categories

**Назначение:** Справочник категорий опасностей (пауки, змеи, клещи, укусы + будущие).
**Связана с:** scans (1:N)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| slug | text | NOT NULL | — | Уникальный идентификатор: 'spider', 'snake', 'tick', 'bite' |
| name | text | NOT NULL | — | Отображаемое название: 'Пауки', 'Змеи' |
| name_en | text | NOT NULL | — | Английское название: 'Spiders', 'Snakes' |
| description | text | NULL | NULL | Краткое описание категории |
| icon_name | text | NULL | NULL | Имя иконки в приложении |
| phase | smallint | NOT NULL | 1 | Фаза запуска: 1 = MVP, 2 = v1.1, 3 = v2.0 |
| is_active | boolean | NOT NULL | true | Доступна ли категория пользователям |
| sort_order | smallint | NOT NULL | 0 | Порядок отображения |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `UNIQUE (slug)`

**Индексы:**
- `idx_danger_categories_slug ON (slug)` (UNIQUE)
- `idx_danger_categories_active ON (is_active, phase)` — фильтр активных категорий

**RLS:** Включена. Публичный SELECT для всех.

---

## Таблица: scans

**Назначение:** Основная таблица сканирований. Каждая запись = одно фото + запрос на AI-анализ.
**Связана с:** auth.users (N:1), danger_categories (N:1), scan_results (1:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NULL | NULL | FK → auth.users(id) ON DELETE SET NULL. NULL = guest scan |
| category_id | uuid | NULL | NULL | FK → danger_categories(id). NULL до определения AI |
| status | text | NOT NULL | 'pending' | 'pending', 'analyzing', 'completed', 'failed' |
| photo_url | text | NOT NULL | — | URL фото в Supabase Storage |
| photo_storage_path | text | NOT NULL | — | Путь в Storage bucket: 'scans/{user_id}/{scan_id}.jpg' |
| source | text | NOT NULL | 'camera' | 'camera', 'gallery' — откуда фото |
| is_guest_scan | boolean | NOT NULL | false | Скан без регистрации |
| deleted_at | timestamptz | NULL | NULL | Мягкое удаление |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `CHECK (status IN ('pending', 'analyzing', 'completed', 'failed'))`
- `CHECK (source IN ('camera', 'gallery'))`

**Индексы:**
- `idx_scans_user_id ON (user_id)` — история пользователя
- `idx_scans_user_created ON (user_id, created_at DESC)` — сортировка истории
- `idx_scans_user_month ON (user_id, created_at) WHERE deleted_at IS NULL` — подсчёт сканов за месяц (лимит Free)
- `idx_scans_status ON (status) WHERE status IN ('pending', 'analyzing')` — очередь обработки
- `idx_scans_category_id ON (category_id)`

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Таблица: scan_results

**Назначение:** Результат AI-анализа скана: идентификация, уровень опасности, рекомендации.
**Связана с:** scans (1:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| scan_id | uuid | NOT NULL | — | FK → scans(id) ON DELETE CASCADE, UNIQUE |
| danger_level | text | NOT NULL | — | 'red', 'yellow', 'green' |
| identification | text | NOT NULL | — | "Похоже на: Brown Recluse" |
| confidence | numeric(5,2) | NOT NULL | — | 0.00–100.00 (процент уверенности AI) |
| conservative_bias_applied | boolean | NOT NULL | false | Был ли повышен danger level из-за низкого confidence |
| contextual_answers | jsonb | NULL | NULL | Ответы на контекстные вопросы: `[{"question": "...", "answer": "..."}]` |
| action_card | jsonb | NOT NULL | — | `{"immediate_actions": [...], "when_to_seek_help": "...", "what_not_to_do": [...]}` |
| first_aid | text | NULL | NULL | Текст первой помощи |
| seek_help_level | text | NULL | NULL | 'er_911', 'urgent_care', 'doctor', 'none' |
| disclaimer | text | NOT NULL | 'Educational and informational only. Not a substitute for professional medical advice.' | Текст disclaimer |
| ai_model | text | NULL | NULL | Модель AI: 'gpt-4o', 'claude-sonnet-4-5' |
| ai_raw_response | jsonb | NULL | NULL | Полный ответ AI (для отладки/улучшения) |
| processing_time_ms | integer | NULL | NULL | Время обработки AI в мс |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `UNIQUE (scan_id)`
- `CHECK (danger_level IN ('red', 'yellow', 'green'))`
- `CHECK (confidence >= 0 AND confidence <= 100)`
- `CHECK (seek_help_level IN ('er_911', 'urgent_care', 'doctor', 'none') OR seek_help_level IS NULL)`

**Индексы:**
- `idx_scan_results_scan_id ON (scan_id)` (UNIQUE)
- `idx_scan_results_danger_level ON (danger_level)` — статистика

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Таблица: push_tokens

**Назначение:** Хранение device push-токенов для отправки уведомлений.
**Связана с:** auth.users (N:1 — несколько устройств у одного пользователя)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE |
| token | text | NOT NULL | — | Push-токен устройства (Expo push token) |
| platform | text | NOT NULL | — | 'ios', 'android' |
| device_id | text | NULL | NULL | Уникальный ID устройства |
| is_active | boolean | NOT NULL | true | Активен ли токен |
| last_used_at | timestamptz | NULL | NULL | Последнее успешное использование |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `UNIQUE (token)`
- `CHECK (platform IN ('ios', 'android'))`

**Индексы:**
- `idx_push_tokens_user_id ON (user_id)`
- `idx_push_tokens_token ON (token)` (UNIQUE)
- `idx_push_tokens_active ON (user_id) WHERE is_active = true` — только активные токены

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Таблица: seasonal_alerts

**Назначение:** Сезонные алерты опасностей по регионам (tick season, snake season).
**Связана с:** danger_categories (N:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| category_id | uuid | NOT NULL | — | FK → danger_categories(id) |
| title | text | NOT NULL | — | "Сезон клещей начинается в вашем регионе" |
| body | text | NOT NULL | — | Подробное описание |
| zip_codes | text[] | NOT NULL | — | Массив ZIP-кодов, где актуален алерт |
| start_date | date | NOT NULL | — | Дата начала сезона |
| end_date | date | NOT NULL | — | Дата окончания сезона |
| severity | text | NOT NULL | 'info' | 'info', 'warning', 'critical' |
| is_active | boolean | NOT NULL | true | Активен ли алерт |
| is_premium_only | boolean | NOT NULL | true | Только для Premium (кроме одного бесплатного при регистрации) |
| created_at | timestamptz | NOT NULL | now() | Дата создания |
| updated_at | timestamptz | NOT NULL | now() | Дата обновления |

**Constraints:**
- `CHECK (severity IN ('info', 'warning', 'critical'))`
- `CHECK (end_date > start_date)`

**Индексы:**
- `idx_seasonal_alerts_active ON (is_active, start_date, end_date)` — активные алерты
- `idx_seasonal_alerts_zip ON USING GIN (zip_codes)` — поиск по ZIP
- `idx_seasonal_alerts_category ON (category_id)`

**RLS:** Включена. Публичный SELECT для активных алертов.

---

## Таблица: scan_shares

**Назначение:** Отслеживание шеринга результатов сканирования (вирусный рост, атрибуция).
**Связана с:** scans (N:1), auth.users (N:1)

| Колонка | Тип | Nullable | Default | Описание |
|---------|-----|----------|---------|----------|
| id | uuid | NOT NULL | gen_random_uuid() | PK |
| scan_id | uuid | NOT NULL | — | FK → scans(id) ON DELETE CASCADE |
| user_id | uuid | NOT NULL | — | FK → auth.users(id) ON DELETE CASCADE |
| share_type | text | NOT NULL | — | 'social', 'pdf_doctor', 'copy_text' |
| share_target | text | NULL | NULL | 'instagram', 'whatsapp', 'messages', 'email', 'airdrop', etc. |
| created_at | timestamptz | NOT NULL | now() | Дата создания |

**Constraints:**
- `CHECK (share_type IN ('social', 'pdf_doctor', 'copy_text'))`

**Индексы:**
- `idx_scan_shares_scan_id ON (scan_id)`
- `idx_scan_shares_user_id ON (user_id)`

**RLS:** Включена. Политики описаны в RLS-POLICIES.md.

---

## Сводная таблица

| # | Таблица | Назначение | Записей (Year 1) | Связь с auth.users |
|---|---------|-----------|-------------------|-------------------|
| 1 | profiles | Профили пользователей | ~500K | 1:1 |
| 2 | subscriptions | Состояние подписок | ~500K | N:1 |
| 3 | user_settings | Настройки приложения | ~500K | 1:1 |
| 4 | danger_categories | Справочник категорий | ~8 (фиксировано) | — |
| 5 | scans | Сканирования | ~2–5M | N:1 |
| 6 | scan_results | Результаты AI-анализа | ~2–5M | — (через scans) |
| 7 | push_tokens | Push-токены устройств | ~600K | N:1 |
| 8 | seasonal_alerts | Сезонные алерты | ~50–100 | — |
| 9 | scan_shares | Шеринг результатов | ~200K–500K | N:1 |

---

## Источники

- FEATURES.md — F-001–F-010 (MVP scope)
- MONETIZATION.md — тиры подписки, Free/Premium/Family
- USER-FLOWS.md — Flow 1–5 (данные для каждого экрана)
- SCREEN-MAP.md — состояния экранов, элементы интерфейса
- TARGET-AUDIENCE.md — персонализация (дети, питомцы, ZIP)

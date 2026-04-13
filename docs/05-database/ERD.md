# Danger Scanner — Entity-Relationship Diagram (ERD)

**Дата:** 13 апреля 2026
**Стадия:** Database Design
**Основан на:** DATABASE-SCHEMA.md

---

## Полная диаграмма связей

```
┌─────────────────────┐
│    auth.users        │
│    (Supabase Auth)   │
│─────────────────────│
│ id (uuid) PK        │
│ email               │
│ encrypted_password   │
│ ...                  │
└─────────┬───────────┘
          │
          │ ON DELETE CASCADE
          │
  ┌───────┼──────────────────────────────────┐
  │       │                                   │
  │  1:1  │  1:1                         1:1  │
  │       │                                   │
  ▼       ▼                                   ▼
┌──────────────┐  ┌───────────────┐  ┌──────────────┐
│   profiles   │  │ user_settings │  │subscriptions │
│──────────────│  │───────────────│  │──────────────│
│ id (PK=FK)   │  │ id (PK)       │  │ id (PK)      │
│ display_name │  │ user_id (FK)  │  │ user_id (FK) │
│ avatar_url   │  │ notifications │  │ status       │
│ zip_code     │  │ theme         │  │ plan         │
│ has_children │  │ language      │  │ trial_start  │
│ pet_type     │  │ ...           │  │ trial_end    │
│ concern_cats │  └───────────────┘  │ adapty_id    │
│ onboarding_  │                     │ platform     │
│  completed   │                     │ raw_data     │
└──────────────┘                     └──────────────┘

          │
          │ auth.users
          │
  ┌───────┼────────────────────┐
  │       │                     │
  │  1:N  │  1:N           1:N  │
  │       │                     │
  ▼       ▼                     ▼
┌──────────────┐          ┌──────────────┐
│    scans     │          │ push_tokens  │
│──────────────│          │──────────────│
│ id (PK)      │          │ id (PK)      │
│ user_id (FK) │          │ user_id (FK) │
│ category_id  │──┐       │ token        │
│ status       │  │       │ platform     │
│ photo_url    │  │       │ device_id    │
│ source       │  │       │ is_active    │
│ is_guest     │  │       └──────────────┘
│ deleted_at   │  │
└──────┬───────┘  │
       │          │
  1:1  │     N:1  │
       │          │
       ▼          ▼
┌──────────────┐  ┌──────────────────┐
│ scan_results │  │danger_categories │
│──────────────│  │──────────────────│
│ id (PK)      │  │ id (PK)          │
│ scan_id (FK) │  │ slug (UNIQUE)    │
│ danger_level │  │ name             │
│ identifica-  │  │ name_en          │
│   tion       │  │ phase            │
│ confidence   │  │ is_active        │
│ action_card  │  │ sort_order       │
│ first_aid    │  └────────┬─────────┘
│ ai_model     │           │
│ ai_raw_resp  │      1:N  │
└──────────────┘           │
                           ▼
       ┌──────────────┐  ┌──────────────────┐
       │ scan_shares  │  │ seasonal_alerts  │
       │──────────────│  │──────────────────│
       │ id (PK)      │  │ id (PK)          │
       │ scan_id (FK) │  │ category_id (FK) │
       │ user_id (FK) │  │ title            │
       │ share_type   │  │ body             │
       │ share_target │  │ zip_codes[]      │
       └──────────────┘  │ start_date       │
              ▲          │ end_date         │
              │          │ severity         │
         N:1  │          │ is_premium_only  │
              │          └──────────────────┘
              │
        scans.id
```

---

## Связи в табличном виде

| Связь | Тип | FK | Описание |
|-------|-----|----|----------|
| auth.users → profiles | 1:1 | profiles.id = auth.users.id | Каждый пользователь имеет один профиль (auto-create) |
| auth.users → user_settings | 1:1 | user_settings.user_id → auth.users.id | Каждый пользователь имеет одни настройки (auto-create) |
| auth.users → subscriptions | 1:1* | subscriptions.user_id → auth.users.id | Одна активная подписка на пользователя (partial unique index) |
| auth.users → scans | 1:N | scans.user_id → auth.users.id | Пользователь имеет множество сканов |
| auth.users → push_tokens | 1:N | push_tokens.user_id → auth.users.id | Несколько устройств у одного пользователя |
| auth.users → scan_shares | 1:N | scan_shares.user_id → auth.users.id | Пользователь может шерить множество результатов |
| scans → scan_results | 1:1 | scan_results.scan_id → scans.id | Каждый скан имеет один результат (или ни одного, если pending/failed) |
| scans → scan_shares | 1:N | scan_shares.scan_id → scans.id | Один скан может быть расшерен множество раз |
| danger_categories → scans | 1:N | scans.category_id → danger_categories.id | Категория назначается скану после AI-анализа |
| danger_categories → seasonal_alerts | 1:N | seasonal_alerts.category_id → danger_categories.id | Алерт привязан к категории опасности |

*\* Технически 1:N (хранится история подписок), но partial unique index гарантирует одну активную.*

---

## Каскадное удаление

```
auth.users (DELETE)
  ├── CASCADE → profiles (удалён)
  ├── CASCADE → user_settings (удалены)
  ├── CASCADE → subscriptions (удалены)
  ├── SET NULL → scans.user_id (сканы остаются, user_id = NULL)
  ├── CASCADE → push_tokens (удалены)
  └── CASCADE → scan_shares (удалены)

scans (DELETE)
  ├── CASCADE → scan_results (удалён)
  └── CASCADE → scan_shares (удалены)
```

**Примечание:** Для `scans` используется мягкое удаление (`deleted_at`), физическое удаление — только при удалении аккаунта (каскад от auth.users). При удалении пользователя `scans.user_id` устанавливается в NULL (данные скана сохраняются для аналитики).

---

## Источники

- DATABASE-SCHEMA.md — структура таблиц и связи

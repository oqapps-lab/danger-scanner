# Danger Scanner — SQL-миграции (Migrations)

**Дата:** 13 апреля 2026
**Стадия:** Database Design
**Основан на:** DATABASE-SCHEMA.md, RLS-POLICIES.md

---

## Порядок выполнения

| # | Миграция | Описание |
|---|---------|----------|
| 001 | Base tables | profiles, user_settings |
| 002 | Core feature tables | danger_categories, scans, scan_results |
| 003 | Subscriptions | subscriptions |
| 004 | Notifications & sharing | push_tokens, seasonal_alerts, scan_shares |
| 005 | Indexes & optimizations | Все индексы |
| 006 | RLS policies | Все политики Row Level Security |
| 007 | Seed data | Начальные данные (категории опасностей) |

---

## Миграция 001: Базовые таблицы

```sql
-- 001_create_base_tables.sql

-- ============================================================
-- Profiles — расширение auth.users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  zip_code text,
  has_children boolean,
  pet_type text CHECK (pet_type IN ('cat', 'dog', 'both') OR pet_type IS NULL),
  concern_categories text[],
  onboarding_completed boolean NOT NULL DEFAULT false,
  onboarding_step smallint NOT NULL DEFAULT 0 CHECK (onboarding_step >= 0 AND onboarding_step <= 6),
  auth_provider text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.profiles IS 'Расширение auth.users — профиль пользователя';
COMMENT ON COLUMN public.profiles.zip_code IS 'ZIP-код для гео-таргетинга сезонных опасностей';
COMMENT ON COLUMN public.profiles.concern_categories IS 'Категории из онбординга: spider, snake, tick, bite';

-- Триггер: auto-create profile при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- User Settings — настройки приложения
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  notifications_enabled boolean NOT NULL DEFAULT true,
  seasonal_alerts_enabled boolean NOT NULL DEFAULT true,
  rescan_reminders_enabled boolean NOT NULL DEFAULT true,
  theme text NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.user_settings IS 'Настройки приложения пользователя';

-- Триггер: auto-create settings при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user_settings()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_settings ON auth.users;
CREATE TRIGGER on_auth_user_created_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_settings();

-- ============================================================
-- Функция updated_at — автообновление timestamp
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

---

## Миграция 002: Основные таблицы приложения

```sql
-- 002_create_core_tables.sql

-- ============================================================
-- Danger Categories — справочник категорий опасностей
-- ============================================================
CREATE TABLE IF NOT EXISTS public.danger_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_en text NOT NULL,
  description text,
  icon_name text,
  phase smallint NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  sort_order smallint NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.danger_categories ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.danger_categories IS 'Справочник категорий опасностей (пауки, змеи, клещи, укусы)';

-- ============================================================
-- Scans — сканирования
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  category_id uuid REFERENCES public.danger_categories(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'completed', 'failed')),
  photo_url text NOT NULL,
  photo_storage_path text NOT NULL,
  source text NOT NULL DEFAULT 'camera' CHECK (source IN ('camera', 'gallery')),
  is_guest_scan boolean NOT NULL DEFAULT false,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.scans IS 'Основная таблица сканирований — одна запись = одно фото + AI-запрос';
COMMENT ON COLUMN public.scans.photo_storage_path IS 'Путь в Storage: scans/{user_id}/{scan_id}.jpg';
COMMENT ON COLUMN public.scans.deleted_at IS 'Мягкое удаление — NULL = не удалён';

-- ============================================================
-- Scan Results — результаты AI-анализа
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scan_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE UNIQUE,
  danger_level text NOT NULL CHECK (danger_level IN ('red', 'yellow', 'green')),
  identification text NOT NULL,
  confidence numeric(5,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  conservative_bias_applied boolean NOT NULL DEFAULT false,
  contextual_answers jsonb,
  action_card jsonb NOT NULL,
  first_aid text,
  seek_help_level text CHECK (seek_help_level IN ('er_911', 'urgent_care', 'doctor', 'none') OR seek_help_level IS NULL),
  disclaimer text NOT NULL DEFAULT 'Educational and informational only. Not a substitute for professional medical advice.',
  ai_model text,
  ai_raw_response jsonb,
  processing_time_ms integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scan_results ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.scan_results IS 'Результат AI-анализа скана: идентификация, danger level, action card';
COMMENT ON COLUMN public.scan_results.contextual_answers IS 'JSON: [{"question": "Где на теле?", "answer": "Рука"}]';
COMMENT ON COLUMN public.scan_results.action_card IS 'JSON: {"immediate_actions": [...], "when_to_seek_help": "...", "what_not_to_do": [...]}';

-- Триггеры updated_at
CREATE TRIGGER set_scans_updated_at
  BEFORE UPDATE ON public.scans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_scan_results_updated_at
  BEFORE UPDATE ON public.scan_results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_danger_categories_updated_at
  BEFORE UPDATE ON public.danger_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

---

## Миграция 003: Подписки

```sql
-- 003_create_subscriptions.sql

-- ============================================================
-- Subscriptions — состояние подписки (синхронизация с Adapty)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  adapty_profile_id text,
  status text NOT NULL DEFAULT 'free' CHECK (status IN ('free', 'trial', 'active', 'expired', 'cancelled', 'billing_issue')),
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium_monthly', 'premium_annual', 'family_monthly', 'family_annual')),
  trial_start timestamptz,
  trial_end timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  platform text CHECK (platform IN ('ios', 'android') OR platform IS NULL),
  raw_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.subscriptions IS 'Подписки пользователей, синхронизируются с Adapty через webhook';
COMMENT ON COLUMN public.subscriptions.raw_data IS 'Полные данные из Adapty webhook для отладки';

-- Partial unique index: только одна активная подписка на пользователя
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_unique_active
  ON public.subscriptions (user_id)
  WHERE status IN ('trial', 'active');

-- Вспомогательная функция: проверка Premium
CREATE OR REPLACE FUNCTION public.is_premium_user(check_user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = check_user_id
    AND status IN ('trial', 'active')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION public.is_premium_user IS 'Проверяет, есть ли у пользователя активная подписка (trial или active)';

-- Триггер: auto-create free subscription при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, status, plan)
  VALUES (NEW.id, 'free', 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_subscription ON auth.users;
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();

-- Триггер updated_at
CREATE TRIGGER set_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

---

## Миграция 004: Уведомления и шеринг

```sql
-- 004_create_notifications_and_sharing.sql

-- ============================================================
-- Push Tokens — токены устройств для push-уведомлений
-- ============================================================
CREATE TABLE IF NOT EXISTS public.push_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  platform text NOT NULL CHECK (platform IN ('ios', 'android')),
  device_id text,
  is_active boolean NOT NULL DEFAULT true,
  last_used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.push_tokens IS 'Expo push-токены устройств для отправки уведомлений';

-- ============================================================
-- Seasonal Alerts — сезонные алерты по регионам
-- ============================================================
CREATE TABLE IF NOT EXISTS public.seasonal_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.danger_categories(id),
  title text NOT NULL,
  body text NOT NULL,
  zip_codes text[] NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL CHECK (end_date > start_date),
  severity text NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  is_active boolean NOT NULL DEFAULT true,
  is_premium_only boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.seasonal_alerts ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.seasonal_alerts IS 'Гео-таргетированные сезонные алерты (tick season, snake season)';
COMMENT ON COLUMN public.seasonal_alerts.zip_codes IS 'Массив ZIP-кодов, где алерт актуален';

-- ============================================================
-- Scan Shares — отслеживание шеринга результатов
-- ============================================================
CREATE TABLE IF NOT EXISTS public.scan_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_type text NOT NULL CHECK (share_type IN ('social', 'pdf_doctor', 'copy_text')),
  share_target text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.scan_shares ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.scan_shares IS 'Отслеживание шеринга результатов — вирусный рост, атрибуция';

-- Триггеры updated_at
CREATE TRIGGER set_push_tokens_updated_at
  BEFORE UPDATE ON public.push_tokens
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_seasonal_alerts_updated_at
  BEFORE UPDATE ON public.seasonal_alerts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

---

## Миграция 005: Индексы и оптимизации

```sql
-- 005_create_indexes.sql

-- ============================================================
-- Profiles
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_zip_code
  ON public.profiles (zip_code)
  WHERE zip_code IS NOT NULL;

-- ============================================================
-- Subscriptions
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
  ON public.subscriptions (user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_status
  ON public.subscriptions (status);

CREATE INDEX IF NOT EXISTS idx_subscriptions_adapty_profile_id
  ON public.subscriptions (adapty_profile_id)
  WHERE adapty_profile_id IS NOT NULL;

-- ============================================================
-- User Settings (уже UNIQUE на user_id в DDL)
-- ============================================================

-- ============================================================
-- Danger Categories
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_danger_categories_active
  ON public.danger_categories (is_active, phase);

-- ============================================================
-- Scans
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_scans_user_id
  ON public.scans (user_id)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_scans_user_created
  ON public.scans (user_id, created_at DESC)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_scans_user_month
  ON public.scans (user_id, created_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_scans_status_pending
  ON public.scans (status)
  WHERE status IN ('pending', 'analyzing');

CREATE INDEX IF NOT EXISTS idx_scans_category_id
  ON public.scans (category_id)
  WHERE category_id IS NOT NULL;

-- ============================================================
-- Scan Results
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_scan_results_danger_level
  ON public.scan_results (danger_level);

-- ============================================================
-- Push Tokens
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_push_tokens_user_id
  ON public.push_tokens (user_id);

CREATE INDEX IF NOT EXISTS idx_push_tokens_active
  ON public.push_tokens (user_id)
  WHERE is_active = true;

-- ============================================================
-- Seasonal Alerts
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_seasonal_alerts_active
  ON public.seasonal_alerts (is_active, start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_seasonal_alerts_zip
  ON public.seasonal_alerts USING GIN (zip_codes);

CREATE INDEX IF NOT EXISTS idx_seasonal_alerts_category
  ON public.seasonal_alerts (category_id);

-- ============================================================
-- Scan Shares
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_scan_shares_scan_id
  ON public.scan_shares (scan_id);

CREATE INDEX IF NOT EXISTS idx_scan_shares_user_id
  ON public.scan_shares (user_id);
```

---

## Миграция 006: RLS-политики

```sql
-- 006_create_rls_policies.sql

-- ============================================================
-- Profiles
-- ============================================================
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- Subscriptions (read-only для пользователей)
-- ============================================================
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================
-- User Settings
-- ============================================================
CREATE POLICY "Users can view own settings"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON public.user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Danger Categories (публичный справочник)
-- ============================================================
CREATE POLICY "Anyone can read danger categories"
  ON public.danger_categories FOR SELECT
  USING (true);

-- ============================================================
-- Scans
-- ============================================================
CREATE POLICY "Users can view own scans"
  ON public.scans FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can create own scans"
  ON public.scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scans"
  ON public.scans FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Scan Results (read-only для пользователей)
-- ============================================================
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

-- ============================================================
-- Push Tokens
-- ============================================================
CREATE POLICY "Users can view own push tokens"
  ON public.push_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register own push tokens"
  ON public.push_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own push tokens"
  ON public.push_tokens FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own push tokens"
  ON public.push_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- Seasonal Alerts (публичные + premium)
-- ============================================================
CREATE POLICY "Anyone can read free seasonal alerts"
  ON public.seasonal_alerts FOR SELECT
  USING (
    is_active = true
    AND is_premium_only = false
    AND CURRENT_DATE BETWEEN start_date AND end_date
  );

CREATE POLICY "Premium users can read premium alerts"
  ON public.seasonal_alerts FOR SELECT
  USING (
    is_active = true
    AND is_premium_only = true
    AND CURRENT_DATE BETWEEN start_date AND end_date
    AND public.is_premium_user(auth.uid())
  );

-- ============================================================
-- Scan Shares
-- ============================================================
CREATE POLICY "Users can view own shares"
  ON public.scan_shares FOR SELECT
  USING (auth.uid() = user_id);

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

---

## Миграция 007: Начальные данные (Seed)

```sql
-- 007_seed_data.sql

-- ============================================================
-- Danger Categories — MVP Phase 1 (4 категории)
-- ============================================================
INSERT INTO public.danger_categories (slug, name, name_en, description, icon_name, phase, is_active, sort_order)
VALUES
  ('spider', 'Пауки', 'Spiders', 'Идентификация пауков: brown recluse, black widow, wolf spider и другие', 'spider', 1, true, 1),
  ('snake', 'Змеи', 'Snakes', 'Идентификация змей: copperhead, rattlesnake, coral snake и другие', 'snake', 1, true, 2),
  ('tick', 'Клещи', 'Ticks', 'Идентификация клещей: deer tick, dog tick, lone star tick. Оценка риска Лайма', 'tick', 1, true, 3),
  ('bite', 'Укусы', 'Bug Bites', 'Идентификация укусов насекомых: комары, блохи, клопы, пчёлы, осы', 'bite', 1, true, 4)
ON CONFLICT (slug) DO NOTHING;

-- Phase 2 категории (неактивные до v1.1)
INSERT INTO public.danger_categories (slug, name, name_en, description, icon_name, phase, is_active, sort_order)
VALUES
  ('mold', 'Плесень', 'Mold', 'Определение наличия плесени, оценка масштаба, рекомендации (EPA guidelines)', 'mold', 2, false, 5),
  ('plant', 'Растения', 'Plants', 'Токсичность растений для людей, детей, кошек, собак (ASPCA database)', 'plant', 2, false, 6)
ON CONFLICT (slug) DO NOTHING;

-- Phase 3 категории (неактивные до v2.0)
INSERT INTO public.danger_categories (slug, name, name_en, description, icon_name, phase, is_active, sort_order)
VALUES
  ('crack', 'Трещины', 'Wall Cracks', 'Структурная оценка трещин в стенах и фундаменте', 'crack', 3, false, 7),
  ('caterpillar', 'Гусеницы', 'Caterpillars', 'Идентификация жалящих гусениц: asp caterpillar, io moth и другие', 'caterpillar', 3, false, 8)
ON CONFLICT (slug) DO NOTHING;
```

---

## Источники

- DATABASE-SCHEMA.md — определения таблиц, типы, constraints
- RLS-POLICIES.md — все RLS-политики
- FEATURES.md — F-001–F-010, категории Phase 1/2/3

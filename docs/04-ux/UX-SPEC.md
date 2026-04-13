# Danger Scanner — UX Specification (Синтез)

**Дата:** 13 апреля 2026
**Стадия:** UX Design (Stage 4)
**Синтез:** USER-FLOWS.md, SCREEN-MAP.md, WIREFRAMES.md, FUNNEL.md

---

## 1. Общие принципы UX

### Принцип 1: Speed of Relief (Скорость облегчения)

Пользователь в панике. Каждая секунда фрикшна — потерянный пользователь. Путь от открытия приложения до результата скана: **≤15 секунд** (1 tap scan + 3–5 сек AI + 2–3 quick-tap questions).

**Применение:**
- Камера открывается за <1 сек
- Результат появляется за ≤5 сек
- Action card — конкретные действия, не "consult a professional"
- Minimal UI: никаких лишних экранов между проблемой и решением

### Принцип 2: Conservative Safety (Перестраховка)

Это safety-critical приложение. Лучше 100 ложных "caution", чем 1 ложный "safe". Каждый элемент UI усиливает ощущение безопасности и экспертности.

**Применение:**
- Confidence <85% → danger level ≥ YELLOW (никогда GREEN)
- Змеи: ВСЕГДА "Call 911 if bitten"
- Disclaimer на КАЖДОМ экране результата
- Язык: "Похоже на..." (resembles), никогда "Это..." (diagnosis)

### Принцип 3: Value Before Commitment (Ценность до обязательств)

Пользователь должен увидеть результат работы приложения до любого запроса: регистрации, подписки, permissions. Модель Duolingo: aha-moment → инвестиция → конверсия.

**Применение:**
- Первый скан БЕЗ регистрации (guest mode)
- Демо-скан в онбординге (Welcome Screen)
- Paywall ПОСЛЕ social proof и персонализации
- Camera permission — только перед первым реальным сканом
- Push permission — после первого успешного скана

### Принцип 4: One-Handed Panic Mode (Одна рука, паника)

Primary persona Sarah: одна рука держит ребёнка, вторая — телефон. Яркое солнце, грязные руки (Jamie на тропе). UI должен работать в экстремальных условиях.

**Применение:**
- Все CTA — крупные (≥48pt tap target)
- Важные действия — в нижней половине экрана (зона большого пальца)
- Danger levels — крупные цветовые блоки (видно на солнце)
- Quick-tap вопросы вместо текстового ввода
- Haptic feedback на все кнопки

### Принцип 5: Cumulative Value (Нарастающая ценность)

Каждый скан увеличивает ценность приложения. История = данные для врача. Профиль = гео-персонализация. Чем больше использует, тем сложнее уйти.

**Применение:**
- История сканов с экспортом для врача (PDF)
- Персонализация по региону и семье
- Сезонные алерты привязаны к ZIP
- Share branded image → вирусный потенциал

---

## 2. Навигация

### Тип: Bottom Tab Bar (4 таба)

```
┌───────┬───────┬───────┬───────┐
│  Home │ Scan  │History│Profile│
│  🏠   │  📷   │  🕐   │  👤   │
└───────┴───────┴───────┴───────┘
```

### Обоснование

| Фактор | Tab Bar | Drawer | Stack-only |
|--------|---------|--------|------------|
| Обнаружимость разделов | Все видны | Скрыты за гамбургером | Нет навигации |
| Использование одной рукой | Да (нижняя часть экрана) | Нет (свайп/тап вверху) | Зависит |
| Стандарт категории | 95%+ utility/health apps | Enterprise apps | Камера-only apps |
| Количество разделов | 4 = оптимально (3–5) | 6+ | N/A |

**Решение:** Tab Bar — стандарт для utility-приложений, работает одной рукой, все разделы видны. Scan tab = центральная, визуально увеличенная.

### Stack Navigation внутри табов

| Таб | Stack |
|-----|-------|
| Home | Home → Seasonal Alert / Scan Detail |
| Scan | Camera → Preview → Analyzing → Questions → Result |
| History | List → Scan Detail |
| Profile | Overview → Settings / Edit Profile / Subscription / Legal |

### Modal Navigation

| Тип | Presentation | Примеры |
|-----|-------------|---------|
| Full-screen modal | Slide up, covers tab bar | Paywall (все варианты), Onboarding |
| Bottom sheet | Partial cover, swipe-to-dismiss | Share Options, Permission prompts |
| Alert | Center, dimmed background | Error, Confirmation |
| Toast | Top/bottom overlay, auto-dismiss | "Скан сохранён", "Скопировано" |

---

## 3. Состояния экранов

### Матрица: Экран x Состояние

| # | Экран | Loading | Empty | Data | Error | Offline | Free | Premium |
|---|-------|---------|-------|------|-------|---------|------|---------|
| 2.1 | Home | Skeleton | Illustration + CTA | Alerts + Scans | Retry banner | Cached data + banner | Scan counter | No counter, badge |
| 2.2.1 | Camera | — | — | Viewfinder | Permission denied screen | "Need internet" toast | Check limit first | Direct to camera |
| 2.2.3 | Analyzing | Progress animation | — | — | Retry / Retake | Error: need internet | Same | Same |
| 2.2.4 | Questions | — | — | 2–3 questions | Skip all → Result | — | Same | Same |
| 2.2.5 | Result | — | — | Full result + action card | "Couldn't identify" + retake | — | Basic action card | Full action card |
| 2.3 | History | Skeleton | "No scans yet" + CTA | List (5 items Free) | Retry | Cached list | 5 visible, rest locked | All visible |
| 2.4.1 | Profile | Skeleton | Default values | User data + stats | Retry | Cached profile | "Upgrade" banner | "Premium" badge |

### Правила состояний

1. **Loading:** Skeleton screens (контуры элементов), не спиннеры. Исключение: Analyzing Screen (осмысленный прогресс-бар)
2. **Empty:** Всегда содержат иллюстрацию + объяснение + CTA к действию
3. **Error:** Всегда содержат объяснение + [Повторить]. Никогда технические детали (никаких "Error 500")
4. **Offline:** Показать кешированные данные + баннер "Офлайн". Скан недоступен
5. **Free vs Premium:** Различия видны, но не агрессивны. Locked контент = blur + lock icon, не "BUY NOW"

---

## 4. Микро-интеракции

### Haptic Feedback

| Действие | Тип Haptic | Обоснование |
|----------|-----------|-------------|
| Tap любой кнопки | `impactAsync(ImpactFeedbackStyle.Medium)` | Стандарт из CLAUDE.md |
| Кнопка "Сканировать" (primary CTA) | `impactAsync(ImpactFeedbackStyle.Heavy)` | Усиленный feedback для core action |
| Quick-tap ответ (Questions) | `impactAsync(ImpactFeedbackStyle.Light)` | Лёгкий, не отвлекающий |
| Danger Level RED | `notificationAsync(NotificationFeedbackType.Warning)` | Привлечь внимание к опасности |
| Danger Level GREEN | `notificationAsync(NotificationFeedbackType.Success)` | Облегчение |
| Scan saved | `notificationAsync(NotificationFeedbackType.Success)` | Подтверждение действия |
| Error | `notificationAsync(NotificationFeedbackType.Error)` | Ошибка |
| Paywall purchase | `impactAsync(ImpactFeedbackStyle.Heavy)` | Значимое действие |

### Анимации

| Элемент | Тип анимации | Длительность | Библиотека |
|---------|-------------|-------------|------------|
| Danger Level badge | Scale-in + color pulse | 600ms | React Native Animated |
| Analyzing progress | Scan-line sweep over photo | 2–5 sec (real time) | Lottie |
| Question transition | Slide left (300ms) | 300ms | React Navigation |
| Paywall entry | Slide up from bottom | 400ms | React Navigation modal |
| Result card sections | Stagger fade-in | 150ms x N sections | Animated |
| Share image generation | Brief shimmer | 500ms | Custom |
| Toast | Slide down + fade out | 300ms in, 2s hold, 300ms out | Custom |
| Tab bar press | Scale bounce (0.95→1.0) | 200ms | Animated |

### Transitions

| Переход | Тип | Gesture |
|---------|-----|---------|
| Tab → Tab | Instant (no animation) | Tap |
| Screen → Screen (stack) | Slide from right | Swipe back (iOS native) |
| Open modal | Slide from bottom | Swipe down to dismiss |
| Open sheet | Slide from bottom (partial) | Swipe down to dismiss |
| Onboarding steps | Slide left (card-like) | Swipe left to advance (optional) |

---

## 5. Accessibility

### Минимальные требования

| Требование | Стандарт | Реализация |
|-----------|----------|------------|
| **Цветовой контраст** | WCAG 2.1 AA (4.5:1 текст, 3:1 UI) | Danger levels не только цветом: RED + "ОПАСНО", YELLOW + "ОСТОРОЖНО", GREEN + "НИЗКИЙ РИСК" |
| **Размер шрифта** | Min 16pt body, 14pt secondary | Dynamic Type support (iOS), fontScale (Android) |
| **Tap targets** | Min 44x44pt (Apple HIG) / 48x48dp (Material) | Все кнопки ≥48pt, spacing ≥8pt between targets |
| **VoiceOver / TalkBack** | Все элементы доступны | accessibilityLabel на каждом интерактивном элементе |
| **Danger levels для дальтоников** | Не только цвет | Иконки + текст + паттерн (stripe/solid/dotted) |
| **Reduce Motion** | Respect OS setting | Fallback: opacity transitions вместо slide/scale |
| **Screen reader: Result** | Полное чтение action card | accessibilityRole="header" для секций, logical reading order |

### Accessibility-специфика для Danger Scanner

| Элемент | accessibilityLabel |
|---------|-------------------|
| Danger RED badge | "Уровень опасности: высокий. Опасно." |
| Danger YELLOW badge | "Уровень опасности: средний. Будьте осторожны." |
| Danger GREEN badge | "Уровень опасности: низкий. Низкий риск." |
| Scan button | "Сканировать опасность. Открывает камеру." |
| Locked history item | "Заблокировано. Доступно с Premium подпиской." |
| Camera shutter | "Сделать фото для анализа." |
| Result photo | "Фото объекта сканирования. [Описание из AI]." |
| Disclaimer | "Внимание: только для информационных целей. Не является медицинским советом." |

---

## 6. Список всех экранов (финальная таблица)

### Для передачи дизайнеру

| # | ID | Название | Тип | Состояния | Фича | Приоритет |
|---|-----|---------|-----|-----------|------|-----------|
| 1 | S-01 | Splash Screen | Screen | 1 | — | P0 |
| 2 | S-02 | Welcome (Onboarding) | Screen | 1 | F-008 | P1 |
| 3 | S-03 | Quiz Step 1 — Категории | Screen | 1 | F-008 | P1 |
| 4 | S-04 | Quiz Step 2 — О вас | Screen | 1 | F-005 | P1 |
| 5 | S-05 | Social Proof | Screen | 1 | F-008 | P1 |
| 6 | S-06 | Paywall (Primary) | Screen | 2 (default, expanded plans) | F-007 | P0 |
| 7 | S-07 | Home | Tab Screen | 4 (empty, data-free, data-premium, offline) | F-001, F-006, F-009 | P0 |
| 8 | S-08 | Camera Viewfinder | Screen | 2 (normal, flash on) | F-001 | P0 |
| 9 | S-09 | Photo Preview | Screen | 1 | F-001 | P0 |
| 10 | S-10 | Analyzing (Loading) | Screen | 2 (progress, timeout) | F-001 | P0 |
| 11 | S-11 | Post-Scan Questions | Screen | 4 (bug bite, spider, snake, tick) | F-002 | P0 |
| 12 | S-12 | Result — GREEN | Screen | 1 | F-003, F-010 | P0 |
| 13 | S-13 | Result — YELLOW | Screen | 1 | F-003, F-010 | P0 |
| 14 | S-14 | Result — RED | Screen | 2 (general, snake-specific) | F-003, F-004, F-010 | P0 |
| 15 | S-15 | History List | Tab Screen | 3 (empty, free, premium) | F-006 | P1 |
| 16 | S-16 | Scan Detail (из истории) | Screen | 1 | F-006 | P1 |
| 17 | S-17 | Profile Overview | Tab Screen | 2 (free, premium) | F-005 | P1 |
| 18 | S-18 | Edit Profile | Screen | 1 | F-005 | P1 |
| 19 | S-19 | Settings | Screen | 1 | F-005, F-009, F-010 | P1 |
| 20 | S-20 | Notification Settings | Screen | 2 (free, premium) | F-009 | P1 |
| 21 | S-21 | Subscription Management | Screen | 2 (free, premium) | F-007 | P1 |
| 22 | S-22 | Legal (ToS/Privacy/Disclaimer) | WebView | 3 pages | F-010 | P0 |
| 23 | S-23 | Registration | Screen | 1 | F-005 | P0 |
| 24 | S-24 | Login | Screen | 1 | F-005 | P0 |
| 25 | S-25 | Forgot Password | Screen | 2 (form, success) | F-005 | P1 |
| 26 | S-26 | Metered Paywall | Modal | 1 | F-007 | P0 |
| 27 | S-27 | Contextual Paywall | Modal | 3 (history, PDF, alerts) | F-007 | P1 |
| 28 | S-28 | Camera Permission Prompt | Modal | 2 (pre-permission, denied fallback) | F-001 | P0 |
| 29 | S-29 | Push Permission Prompt | Modal | 1 | F-009 | P1 |
| 30 | S-30 | Registration Prompt | Modal | 1 | F-005 | P1 |
| 31 | S-31 | Share Options | Sheet | 1 | F-003, F-006 | P1 |
| 32 | S-32 | Branded Share Image | Generated | 3 (RED, YELLOW, GREEN) | F-003 | P1 |
| 33 | S-33 | Subscription Success | Modal | 1 | F-007 | P0 |
| 34 | S-34 | Error Modal | Modal | 3 (network, AI fail, generic) | — | P0 |
| 35 | S-35 | Seasonal Alert | Screen | 1 (per category) | F-009 | P1 |
| 36 | S-36 | Re-Scan Reminder | Screen | 1 | F-009 | P1 |
| 37 | S-37 | No Internet | Screen | 1 | — | P0 |
| 38 | S-38 | Force Update | Screen | 1 | — | P1 |
| 39 | S-39 | Maintenance | Screen | 1 | — | P2 |

### Сводка

| Категория | Количество экранов | P0 | P1 | P2 |
|-----------|-------------------|----|----|-----|
| Onboarding | 6 (S-01–S-06) | 2 | 4 | 0 |
| Main Tabs | 11 (S-07–S-17) | 8 | 3 | 0 |
| Profile/Settings | 5 (S-18–S-22) | 1 | 4 | 0 |
| Auth | 3 (S-23–S-25) | 2 | 1 | 0 |
| Modals/Overlays | 9 (S-26–S-34) | 4 | 5 | 0 |
| Contextual | 2 (S-35–S-36) | 0 | 2 | 0 |
| System | 3 (S-37–S-39) | 1 | 1 | 1 |
| **Итого** | **39** | **18** | **20** | **1** |

### Уникальных вариантов (включая состояния): ~65

---

## 7. Design Handoff Notes

### Для дизайнера

1. **Цветовая система danger levels:**
   - RED: фон #FF3B30 / текст white — "ОПАСНО"
   - YELLOW: фон #FF9500 / текст black — "БУДЬТЕ ОСТОРОЖНЫ"
   - GREEN: фон #34C759 / текст white — "НИЗКИЙ РИСК"
   - Каждый level = цвет + иконка + текст (для accessibility)

2. **Иерархия кнопок:**
   - Primary: filled, brand color (Scan, Start Trial)
   - Secondary: outlined (Retake, Not Now)
   - Destructive: red outlined (Delete Account)
   - Text link: underlined (Skip, Restore Purchase, Продолжить бесплатно)

3. **Типография:**
   - Заголовки: SF Pro Display Bold (iOS) / Roboto Bold (Android)
   - Body: SF Pro Text Regular / Roboto Regular
   - Min 16pt body, 14pt caption
   - Dynamic Type support обязателен

4. **Spacing:**
   - 8pt grid system
   - Content padding: 16pt horizontal
   - Section spacing: 24pt
   - Card padding: 16pt internal

5. **Особые требования:**
   - Disclaimer: всегда видим, не скроллится за пределы экрана на Result
   - "Call 911" для змей: крупный, красный, выделенный блок
   - Paywall: анимированный (не статический), Lottie-ready
   - Camera: full-bleed (без рамок), кнопки поверх preview

---

## Карта документов Stage 4: UX Design

| Документ | Содержание | Статус |
|---------|-----------|--------|
| [USER-FLOWS.md](USER-FLOWS.md) | 5 user flows: First Launch, Core Scan, Return Visit, Upgrade, Share | Done |
| [SCREEN-MAP.md](SCREEN-MAP.md) | 36 экранов, навигационное дерево, детализация каждого | Done |
| [WIREFRAMES.md](WIREFRAMES.md) | 15 ASCII-wireframes ключевых экранов | Done |
| [FUNNEL.md](FUNNEL.md) | Воронка конверсии, retention loop, push-стратегия, KPI | Done |
| **UX-SPEC.md** (этот документ) | 5 UX-принципов, навигация, состояния, микро-интеракции, accessibility, финальный список экранов | Done |

---

## Источники

- USER-FLOWS.md, SCREEN-MAP.md, WIREFRAMES.md, FUNNEL.md — предыдущие UX-документы
- FEATURES.md — F-001–F-010 acceptance criteria
- TARGET-AUDIENCE.md — Sarah persona, контекст использования
- PRACTICES-BRIEF.md — рекомендации по экранам, KPI targets
- CLAUDE.md — технические правила (Haptics, useWindowDimensions, StyleSheet.create)
- Apple Human Interface Guidelines — tap targets, safe areas, Dynamic Type
- Material Design 3 — accessibility, motion, components

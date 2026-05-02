# Danger Scanner — Design Guide

**Версия:** 0.1 (черновик)
**Дата:** апрель 2026
**Источники:** Stitch visual reference (docs/06-design/stitch-raw/), UX-SPEC.md, SCREEN-MAP.md, USER-FLOWS.md, FEATURES.md, TARGET-AUDIENCE.md, PRACTICES-BRIEF.md

---

## 1. TL;DR

### Что берём из Stitch
- **Цветовую палитру** — тёмный navy-фон, mint-акцент, холодный текст. Палитра передаёт нужный тон: серьёзный инструмент, не игрушка.
- **Типографику** — Inter / Manrope. Геометрический гротеск, хорошо читается на тёмном фоне под стрессом.
- **Форму кнопок** — крупные pill-кнопки (border-radius 100). Легко нажимать одной рукой в панике.
- **Визуальный тон Analyzing Screen** — круговая рамка с tech-overlay, прогресс-чеклист. Передаёт ощущение «умного сканера», не просто лоадера.
- **Danger-бейджи с glow** — уровень опасности читается моментально, даже на ярком солнце.

### Что выбрасываем из Stitch
- **Структуру Tab Bar** — Stitch сгенерировал Home/History/Map/Settings и HOME/SCANNER/REPORTS. По UX-SPEC навигация: **Home / Scan / History / Profile**. Map — P2 фича, не MVP.
- **Отсутствие Disclaimer** — на Result RED в Stitch disclaimer не виден. По F-010 он обязателен на каждом экране результата и не должен уходить за скролл.

### Что апгрейдим относительно Stitch
- **Danger-бейджи** — добавляем текстовую метку и иконку к цвету (RED + «ОПАСНО» + иконка). Только цвет нарушает accessibility WCAG 2.1 AA.
- **Шрифт** — Inter как основной (доступен через `@expo-google-fonts/inter`). Manrope как опциональный H1.
- **Scan Tab** — в Tab Bar делаем центральную кнопку больше и ярче остальных. Это главный CTA всего приложения.

---

## 2. Цвета

Все цвета берутся из Stitch HTML-кода. Токены ниже — единственный источник истины для имплементации.

| Токен | HEX | Роль |
|---|---|---|
| `color.canvas` | `#071325` | Основной фон всех экранов |
| `color.surface` | `#1F2A3D` | Карточки, секции, модалы |
| `color.surfaceAlt` | `#2A3548` | Вторичные карточки, алерт-баннеры |
| `color.primary` | `#3ADFAB` | CTA-кнопки, активные табы, иконки, SAFE-бейдж |
| `color.primaryDim` | `#60FCC6` | Hover/pressed состояние primary |
| `color.text` | `#D7E3FC` | Весь основной текст |
| `color.textMuted` | `#8496B8` | Подписи, вторичный текст, даты |
| `color.warning` | `#FFB86B` | Danger YELLOW, иконки предупреждений |
| `color.danger` | `#930011` | Danger RED, аварийные блоки, деструктивные действия |
| `color.dangerSurface` | `#3F2300` | Фон карточек при RED danger |
| `color.border` | `#FFFFFF14` | Разделители, обводка карточек (8% white) |

### Danger Level System

| Level | Фон | Текст | Текстовая метка | Иконка |
|---|---|---|---|---|
| RED | `#930011` | `#FFFFFF` | ОПАСНО | ⛔ |
| YELLOW | `#FFB86B` | `#1A0F00` | ОСТОРОЖНО | ⚠ |
| GREEN | `#3ADFAB` | `#071325` | НИЗКИЙ РИСК | ✓ |

> Danger level всегда = цвет + текст + иконка. Только цвет — нарушение WCAG 2.1 AA.

---

## 3. Типографика

**Основной шрифт:** Inter (`@expo-google-fonts/inter`)
**Акцентный заголовок H1:** Manrope Bold (`@expo-google-fonts/manrope`) — опционально для крупных заголовков

| Стиль | Семейство | Размер | Weight | Использование |
|---|---|---|---|---|
| `text.display` | Manrope | 32sp | 800 | Главный заголовок Welcome, Paywall |
| `text.h1` | Inter | 28sp | 700 | «Good Evening», заголовки экранов |
| `text.h2` | Inter | 20sp | 600 | Заголовки секций («Recent Scans», «First Aid Protocols») |
| `text.h3` | Inter | 17sp | 600 | Заголовки карточек, danger badge label |
| `text.body` | Inter | 16sp | 400 | Основной текст, action card инструкции |
| `text.bodySmall` | Inter | 14sp | 400 | Вторичный текст, даты, подписи |
| `text.caption` | Inter | 12sp | 400 | Disclaimer, Restore Purchase, правовые ссылки |
| `text.badge` | Inter | 13sp | 700 | Бейджи, счётчики сканов, confidence % |

**Правила:**
- Минимум 16sp для body — обязателен для читаемости под стрессом (UX-SPEC: «One-Handed Panic Mode»)
- Dynamic Type на iOS обязателен (`allowFontScaling={true}` по умолчанию в Expo)
- Не использовать `fontFamily` без fallback. Всегда: `Inter, sans-serif`

---

## 4. Поверхности

### Фоны
```
canvas (#071325)          — весь экран, StatusBar backgroundColor
  └── surface (#1F2A3D)   — карточки, секции, Tab Bar
        └── surfaceAlt (#2A3548)  — вложенные карточки, input fields
```

### Карточки
- `borderRadius: 16` — стандартная карточка (ScanCard, AlertBanner, ActionCard)
- `borderRadius: 12` — мелкие карточки (QuizOption, PaywallPlanCard)
- `borderRadius: 100` — кнопки (CTA pill)
- Обводка: `border: 1px solid #FFFFFF14` — там, где нужно отделить от фона
- Без реальных теней на тёмном фоне — тени не дают эффекта. Разделение через цвет поверхности.

### Специальные поверхности
- **Danger RED surface** (`#3F2300`) — фон action card при RED результате
- **Danger YELLOW surface** (`#2C1700`) — фон action card при YELLOW результате
- **Camera Screen** — полноэкранный camera feed, все UI-элементы поверх через `position: absolute`
- **Paywall modal** — `position: absolute`, перекрывает весь экран включая Tab Bar

### Safe Areas
Использовать `useSafeAreaInsets()` для всех экранов. CTA-кнопки и Tab Bar — всегда выше home indicator.

---

## 5. Примитивы (UI Components)

Полный список компонентов, выведенный из SCREEN-MAP.md и USER-FLOWS.md. Каждый компонент — одна ответственность.

| # | Компонент | Роль | Используется на |
|---|---|---|---|
| 1 | `DangerBadge` | Цвет + текст + иконка уровня опасности. Пропы: `level: 'red' \| 'yellow' \| 'green'` | Result Screen, ScanCard, History |
| 2 | `ScanCard` | Thumbnail + DangerBadge + название вида + дата. Горизонтальный и вертикальный режим | Home (horizontal scroll), History (list) |
| 3 | `ActionCard` | Три секции: первая помощь / когда к врачу / что НЕ делать. Каждая секция — раскрываемая | Result Screen |
| 4 | `DisclaimerBlock` | «Educational and informational only. Not a substitute for professional medical advice.» Всегда видим, не скроллится за кнопки | Все Result экраны (F-010) |
| 5 | `CTAButton` | Pill-кнопка primary. `title`, `onPress`, `loading?`. Haptic Heavy при нажатии | Везде (Scan, Start Trial, Use Photo) |
| 6 | `SecondaryButton` | Outlined кнопка. `title`, `onPress`. Haptic Medium | Retake, Not Now, Skip |
| 7 | `AlertBanner` | Сезонный алерт: иконка + заголовок + текст + стрелка-тап. Фон `surfaceAlt` | Home Screen |
| 8 | `ProgressBar` | Тонкая полоса прогресса онбординга с процентом. Начинается с 15% | Все экраны онбординга (F-008) |
| 9 | `QuizOptionCard` | Карточка ответа quick-tap. Иконка + текст. Selected state = обводка primary. Haptic Light при выборе | Quiz Step 1/2, Post-Scan Questions |
| 10 | `ScanProgress` | Analyzing Screen: круговая рамка с фото + expanding rings + step-checklist + progress bar | Analyzing Screen (2.2.3) |
| 11 | `TabBar` | Bottom nav 4 табов: Home / Scan / History / Profile. Scan — центральная, увеличенная | Все Main Tab экраны |
| 12 | `EmptyState` | Иллюстрация + заголовок + подзаголовок + CTA кнопка | Home (empty), History (empty) |
| 13 | `PaywallPlanCard` | Карточка тарифа: цена + период + badge «Лучшее предложение» + скидка. Selected/default state | Paywall экраны (1.6, 4.1, 4.2) |
| 14 | `Toast` | Overlay-уведомление авто-dismiss 2с. `message`, `type: 'success' \| 'error'`. Slide-down анимация | Scan saved, Copy success, Errors |

---

## 6. Layout

### Grid
- **Base unit:** 8pt
- **Screen padding horizontal:** 16pt (2 units)
- **Section spacing:** 24pt (3 units)
- **Card internal padding:** 16pt
- **Gap между карточками в списке:** 12pt

### Ширина
- Весь контент — `flex: 1` или `width: 100%` с `paddingHorizontal: 16`
- Кнопки CTA — `width: '100%'` в пределах padding контейнера
- Горизонтальный scroll (ScanCards на Home) — `paddingHorizontal: 16`, карточки `width: 140`

### Tap Targets
- Минимум **48pt** для всех интерактивных элементов (Apple HIG / Material)
- QuizOptionCard — минимум `height: 56`
- Tab Bar иконки — `44x44pt` зона нажатия

### useWindowDimensions
Все адаптивные размеры — через `useWindowDimensions()`. Никаких захардкоженных `width: 375`.

```typescript
const { width, height } = useWindowDimensions();
const cardWidth = (width - 16 * 2 - 12) / 2; // 2 колонки с gap
```

---

## 7. Screen Recipes

Рецепты — структура из UX-SPEC/SCREEN-MAP, визуальный язык из Stitch.

---

### Recipe 1: Home Screen (2.1) — с данными

**Слои (3-layer system из CLAUDE.md):**
```
Layer 1 — Background: canvas (#071325), SafeAreaView
Layer 2 — Content (ScrollView):
  ├── Header: "Good Evening, Sarah" (text.h1) + scan counter badge
  ├── AlertBanner (если есть geo-alert для региона)
  ├── Section "Recent Scans" (text.h2) + "View All" link
  │   └── ScrollView horizontal → ScanCard × N
  └── Section "What to scan" (иконки 4 категорий, не кликабельны)
Layer 3 — Floating: CTAButton "NEW SCAN" pinned bottom над Tab Bar
```

**Состояния:** empty (EmptyState + CTA), with-data (описано выше), premium (без счётчика сканов, badge «Premium»)

---

### Recipe 2: Analyzing Screen (2.2.3)

**Слои:**
```
Layer 1 — Background: canvas (#071325)
Layer 2 — Content (centred, no scroll):
  ├── Back arrow (top left)
  ├── Title "Analyzing" (text.h2, center)
  ├── ScanProgress (circular frame + rings + photo thumb)
  ├── Step checklist:
  │   ├── ✓ Photo received
  │   ├── ✓ Category: spider
  │   └── ◎ Assessing threat level...
  ├── ProgressBar + label "66%"
  └── Social proof: "247,391 dangers identified worldwide" (text.caption, textMuted)
Layer 3 — нет
```

**Поведение:** экран не интерактивен. Auto-transition при готовности AI. Expanding rings — анимация Lottie или React Native Animated.

---

### Recipe 3: Result Screen RED (2.2.5)

**Слои:**
```
Layer 1 — Background: canvas (#071325)
Layer 2 — Content (ScrollView):
  ├── Back arrow (top left)
  ├── Scan photo thumbnail (aspectRatio: 4/3, borderRadius: 12)
  ├── DangerBadge level="red" (крупный, с glow)
  ├── "Похоже на: Eastern Copperhead" (text.h2)
  ├── "Confidence: 82%" (text.badge, textMuted)
  │
  ├── Emergency Block (ТОЛЬКО для змей, F-004):
  │   └── "IF BITTEN — CALL 911 IMMEDIATELY"
  │       фон: danger (#930011), текст белый, borderRadius: 12
  │
  ├── ActionCard:
  │   ├── Секция 1: Немедленные действия (green bullets)
  │   ├── Секция 2: Когда к врачу (amber bullets)
  │   └── Секция 3: Что НЕ делать (red X bullets)
  │
  └── DisclaimerBlock (ВСЕГДА виден, не уходит за кнопки)
Layer 3 — Floating:
  └── Row: CTAButton "Save" + SecondaryButton "Share" (над Tab Bar)
```

**Важно:** DisclaimerBlock — всегда в ScrollView ПЕРЕД floating кнопками, не поверх них.

---

### Recipe 4: Paywall Screen (1.6 / 4.1)

**Слои:**
```
Layer 1 — Background: canvas (#071325), modal presentation
Layer 2 — Content (ScrollView):
  ├── Close button × (top right)
  ├── ProgressBar 100% (только на онбординг paywall)
  ├── Title "Ваш персональный план готов" (text.display)
  ├── Social proof: "★4.7  247,391 сканов" (text.bodySmall)
  │
  ├── PaywallPlanCard — Годовой (selected by default):
  │   Badge "Лучшее предложение" + $29.99/год + = $2.50/мес
  │
  ├── "Все планы ▾" → раскрывает PaywallPlanCard месячный
  │
  ├── Free vs Premium таблица (4 строки)
  │
  ├── Trial timeline:
  │   Сегодня → День 5 (напоминание) → День 7 ($29.99)
  │
  └── CTAButton "Начать 7-дневный trial" (primary, анимированный)
       SecondaryButton "Продолжить бесплатно" (text link)
       "Restore Purchase" (text.caption, textMuted)
Layer 3 — нет
```

---

## 8. Motion & Haptics

### Анимации

| Элемент | Тип | Длительность |
|---|---|---|
| DangerBadge появление | Scale-in (0.8→1.0) + opacity + color pulse | 600ms |
| ScanProgress rings | Expand + fade-out, повторяются | loop, 1.5s per ring |
| Onboarding step transition | Slide left | 300ms |
| Paywall вход | Slide up from bottom | 400ms |
| ActionCard секции | Stagger fade-in (150ms × N) | — |
| Toast | Slide down → hold 2s → fade out | 300+2000+300ms |
| Tab bar press | Scale 1.0→0.95→1.0 | 200ms |

**Правило:** Уважать `useReducedMotion()`. Fallback — opacity transition вместо slide/scale.

### Haptics (Expo Haptics)

| Действие | Haptic |
|---|---|
| Любая кнопка | `impactAsync(Medium)` |
| CTAButton «Сканировать» | `impactAsync(Heavy)` |
| QuizOption выбор | `impactAsync(Light)` |
| Result RED | `notificationAsync(Warning)` |
| Result GREEN | `notificationAsync(Success)` |
| Scan saved | `notificationAsync(Success)` |
| Error | `notificationAsync(Error)` |
| Paywall purchase | `impactAsync(Heavy)` |

---

## 9. Антипаттерны

Чего делать нельзя — и почему.

1. **Inline styles вместо StyleSheet.create** — нарушает CLAUDE.md, роняет перформанс. Всегда `StyleSheet.create({})`.

2. **Захардкоженные размеры экрана** — `width: 375` или `height: 812` сломается на любом другом устройстве. Только `useWindowDimensions()`.

3. **Danger level только цветом** — RED-бейдж без текста «ОПАСНО» невидим для дальтоников. Нарушение WCAG 2.1 AA и F-010.

4. **Disclaimer скрыт за кнопками** — кнопки floating поверх disclaimer = F-010 violation. Disclaimer всегда в ScrollView, кнопки — отдельный layer.

5. **Запрос camera permission при старте** — камеру запрашивать только перед первым реальным сканом (PRACTICES-BRIEF: навязчивые permission requests = топ-фактор удаления).

6. **Map в Tab Bar MVP** — F-011 (Geo-Map) это P2 фича, v1.1. В MVP Tab Bar: только Home / Scan / History / Profile.

7. **Текст «Это [вид]» вместо «Похоже на [вид]»** — F-010 и F-004 запрещают диагностические формулировки. Только «resembles», «consistent with», «похоже на».

8. **Статичный Paywall** — анимированный paywall конвертирует в 2.9× лучше статичного (PRACTICES-BRIEF). Минимум: animated badge, Lottie-иллюстрация.

---

## 10. Pre-commit Checklist

Перед каждым PR с UI-изменениями проверить:

- [ ] **Цвета** — использованы только токены из секции 2. Нет захардкоженных HEX кроме токенов.
- [ ] **Шрифты** — только `text.*` стили из секции 3. Нет голых `fontSize` без соответствующего `fontFamily`.
- [ ] **Danger badges** — все три уровня содержат цвет + текст + иконку. Проверить на симуляторе в режиме «Differentiate Without Color» (iOS Accessibility).
- [ ] **Disclaimer** — присутствует на каждом Result экране (RED, YELLOW, GREEN). Не перекрывается floating кнопками.
- [ ] **Tap targets** — все интерактивные элементы ≥ 48pt. Проверить через Accessibility Inspector.
- [ ] **Safe Areas** — `useSafeAreaInsets()` применён. Кнопки и Tab Bar не уходят под home indicator.
- [ ] **Haptics** — каждая кнопка содержит правильный `impactAsync`. Проверить на реальном устройстве.
- [ ] **Анимации** — проверить `useReducedMotion()`. При `true` анимация заменяется на opacity.

---

## Источники

| Документ | Роль в гайде |
|---|---|
| `docs/06-design/stitch-raw/` | Цвета, типографика, визуальный тон |
| `docs/04-ux/SCREEN-MAP.md` | Структура всех 39 экранов |
| `docs/04-ux/USER-FLOWS.md` | Флоу и состояния экранов |
| `docs/04-ux/UX-SPEC.md` | Принципы UX, haptics, анимации, accessibility |
| `docs/04-ux/WIREFRAMES.md` | Детальная разбивка элементов экранов |
| `docs/02-product/FEATURES.md` | F-001–F-010: что обязательно |
| `docs/02-product/TARGET-AUDIENCE.md` | Контекст использования (паника, одна рука, солнце) |
| `docs/03-practices/PRACTICES-BRIEF.md` | Paywall, onboarding, retention паттерны |
| `CLAUDE.md` | Технические правила проекта |

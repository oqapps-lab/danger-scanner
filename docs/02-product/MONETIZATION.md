# Danger Scanner — Монетизация (Monetization)

**Дата:** 12 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Основан на:** PRODUCT-BRIEF.md, MARKET-RESEARCH.md, COMPETITORS.md, BUG-BITE-DEEP-DIVE.md (docs/01-research/)

---

## 1. Модель монетизации: Freemium + Subscription + Referral (Hybrid)

### Выбранная модель

**Hybrid: Freemium subscription + referral revenue + affiliate.**

### Обоснование выбора

| Модель | Почему ДА / почему НЕТ |
|--------|----------------------|
| **Freemium subscription** ✅ | PictureThis доказал на $100M+/год. «Identify from photo» = идеальный формат для subscription. Первый скан → aha-moment → paywall → конверсия. Recurring revenue = предсказуемый бизнес |
| **Referral fees** ✅ | Уникальная возможность: pest control leads = $50–$100, mold = $100–$300, foundation = $150–$500. НОЛЬ конкурентов в ID-категории монетизируют referrals. Revenue, пропорциональный ценности проблемы, не кошельку пользователя |
| **Affiliate** ✅ | Естественное дополнение: tick removal kits, mold test kits, calamine → Amazon Associates. Low effort, incremental revenue |
| Pure subscription (без free tier) ❌ | Safety-critical app должен дать первый результат бесплатно. Paywall до скана = 0 conversion в момент паники |
| Paid app (one-time) ❌ | $3–$5 one-time не окупает AI inference costs. Subscription = 10–20x lifetime value |
| Ad-supported only ❌ | CPM в Health-категории $5–$15. Нужно 100M+ показов для существенного revenue. Ads в moment of panic = плохой UX |
| IAP (per-scan) ❌ | Psychological friction: «pay $0.99 чтобы узнать, опасна ли эта змея?» → пользователь не купит, пойдёт в Google |

---

## 2. Тиры подписки

| Тир | Цена (месяц) | Цена (год) | Что включено | Ограничения бесплатного |
|-----|-------------|-----------|-------------|------------------------|
| **Free** | $0 | $0 | 3 скана/месяц; базовая ID + danger level; последние 5 сканов в истории; реклама | Max 3 скана/мес; нет action cards; нет push alerts; нет geo-map; нет tracking; реклама |
| **Premium** | **$4.99/мес** | **$29.99/год** (-50%) | Unlimited сканы; полные action cards; вся история; push alerts; geo-map; без рекламы | — |
| **Family** | **$7.99/мес** | **$49.99/год** (-48%) | Всё из Premium для 5 пользователей; общая история; pet profiles; emergency contacts; приоритетная поддержка | — |

### 7-дневный бесплатный trial

- Активируется после первого успешного скана (не при регистрации)
- Показывает полный результат + action card → доказывает ценность Premium
- При истечении: возврат к Free tier (не hard lock)
- Soft paywall: «Upgrade to see the full action plan» (базовый danger level виден бесплатно)

---

## 3. Ценообразование

### 3.1 Бенчмарки конкурентов

| Приложение | Категория | Цена (месяц) | Цена (год) | Выручка (оценка) |
|-----------|----------|-------------|-----------|-----------------|
| **PictureThis** | Plant ID | ~$3.33/мес (annual) | $29.99–$39.99 | **$60–100M+/год** |
| **Picture Insect** | Insect ID | ~$2.50/мес (annual) | $29.99 | $1.2–$3.6M/год |
| **SnakeSnap** | Snake ID | $7.99/неделю | $39.99 | Нишевое |
| **Spider Identifier** | Spider ID | $4.99/неделю | $29.99 | Малое |
| **Bug Identifier: AI Insect ID** | Insect ID | $7.99/неделю | $39.99, $199.99 lifetime | N/A |
| **SkinVision** | Skin cancer | Подписка | B2B | VC-funded |
| **Mold Finder AI** | Mold ID | Varies | — | Минимальное |

**Источник:** COMPETITORS.md, BUG-BITE-DEEP-DIVE.md

### 3.2 Индустриальные бенчмарки подписок (2025–2026)

**RevenueCat State of Subscription Apps 2026** (115,000+ apps, $16B revenue, 1B+ transactions):

| Метрика | Бенчмарк | Источник |
|---------|---------|---------|
| Медиана подписки H&F (месячная) | $9.99 | RevenueCat 2026 |
| Медиана подписки H&F (годовая) | $39.94 | RevenueCat 2026 |
| Медиана подписки глобальная (месячная) | $10.00 | RevenueCat 2026 |
| Медиана подписки глобальная (годовая) | $34.80 | RevenueCat 2026 |
| Download-to-paid (D35, медиана) | 2.0% | RevenueCat 2026 |
| Download-to-paid (D35, top 10%) | >9.1% | RevenueCat 2026 |
| Freemium conversion (D35) | 2.1% | RevenueCat 2026 |
| Hard paywall conversion (D35) | 10.7% | RevenueCat 2026 |
| Trial-to-paid (trial 17–32 дней) | 42.5% | RevenueCat 2026 |
| Trial-to-paid (trial ≤4 дней) | 25.5% | RevenueCat 2026 |
| H&F trial-to-paid (медиана) | 6.9% | RevenueCat 2026 |
| H&F trial-to-paid (top performers) | >23% | RevenueCat 2026 |
| Realized LTV per payer (Year 1, North America) | $32 | RevenueCat 2026 |
| Realized LTV per payer (Year 1, top 10%) | >$74 | RevenueCat 2026 |
| AI apps: revenue per payer vs market | +41% выше | RevenueCat 2026 |
| AI apps: churn vs market | +30% выше | RevenueCat 2026 |

**Adapty State of In-App Subscriptions 2026** (16,000+ apps, $3B revenue):

| Метрика | Бенчмарк | Источник |
|---------|---------|---------|
| Install-to-trial (North America) | 14.5% | Adapty 2026 |
| Trial-to-paid (H&F) | 35.0% | Adapty 2026 |
| Trial-to-paid (глобальная) | 25.6% | Adapty 2026 |
| H&F Install LTV | $1.21 | Adapty 2026 |
| H&F first-renewal retention | 30.3% (lowest category) | Adapty 2026 |
| Annual trial subscribers retention (D380) | 19.9% | Adapty 2026 |
| Monthly trial subscribers retention (D380) | 14.2% | Adapty 2026 |
| Trial subscribers retain vs direct buyers | 1.4–1.7x лучше | Adapty 2026 |
| Revenue concentration (top 10% apps) | 95% всей subscription revenue | Adapty 2026 |

**AppsFlyer CPI Benchmarks (Q3 2025, H&F, US):**

| Метрика | Бенчмарк | Источник |
|---------|---------|---------|
| CPI — iOS (small apps) | $5.97 | AppsFlyer Q3 2025 |
| CPI — iOS (medium apps) | $9.05 | AppsFlyer Q3 2025 |
| CPI — Android | $2.78 | AppsFlyer Q3 2025 |
| Facebook CPI (H&F) | $2.00–$5.50 | Airbridge 2025 |
| TikTok CPI (H&F) | $1.75–$4.00 | Airbridge 2025 |
| Day 1 retention (H&F, US) | 20.15% | AppsFlyer Q3 2025 |
| Day 7 retention (H&F, US) | 9.30% | AppsFlyer Q3 2025 |
| Day 30 retention (H&F, US) | 4.05% | AppsFlyer Q3 2025 |
| Share of paying users (H&F) | 5.2–6.0% | AppsFlyer Q3 2025 |

**Ключевые выводы из бенчмарков:**
- Наша цена $29.99/год — **ниже медианы** H&F ($39.94), что создаёт competitive advantage для safety-app
- Freemium conversion 2.1% (медиана) подтверждает наш консервативный Year 1 target 3%
- Trial значительно повышает conversion: trial subscribers retain 1.4–1.7x лучше → 7-дневный trial обязателен
- AI apps = +41% revenue per payer, но +30% churn → conservative bias + value delivery = ключ к retention
- H&F first-renewal retention (30.3%) — самая низкая из всех категорий → push alerts + geo-map = retention levers

### 3.3 Обоснование выбранной цены

**$4.99/мес ($29.99/год) для Premium:**

| Фактор | Обоснование |
|--------|-------------|
| **Ниже SnakeSnap ($7.99/неделю)** | Агрессивный pricing SnakeSnap = высокий churn. Наша цена = sustainable |
| **На уровне PictureThis ($29.99/год)** | Доказанный price point для «identify from photo» apps. Пользователи привыкли |
| **Выше caterpillar/mold apps (бесплатные)** | Наше приложение = 8 категорий + action layer + referral. Premium value |
| **Safety premium** | Готовность платить за safety > ready-to-pay за plant ID. Здоровье ребёнка > curious about a plant |
| **Психологический порог** | $4.99/мес = «одна чашка кофе». $29.99/год = «один визит к педиатру» |

**$7.99/мес ($49.99/год) для Family:**
- +60% к Premium за 5x пользователей — value for money
- Sarah (Primary Persona) готова платить за добавление мужа и бабушки
- Family Plan как primary upsell trigger

---

## 4. Unit Economics (целевые)

### 4.1 Базовые метрики

| Метрика | Year 1 | Year 2 | Year 3 | Источник/обоснование |
|---------|--------|--------|--------|---------------------|
| **Downloads** | 500K | 2.5M | 8M | Organic + viral (TikTok scan-reveal) + partnerships |
| **MAU** | 150K | 750K | 2.5M | 30% MAU/download ratio |
| **Free-to-paid conversion** | 3% | 5% | 7% | RevenueCat benchmark 3–7% для Health apps |
| **Paying subscribers** | 15K | 125K | 560K | Cumulative with churn |
| **ARPU (subscriber)** | $35/год | $40/год | $45/год | Mix Premium + Family + annual bias |
| **Subscription revenue** | $525K | $5.0M | $25.2M | Subscribers × ARPU |
| **Referral leads** | 5,000 | 40,000 | 150,000 | 3–6% of active users convert to referral |
| **Avg referral revenue/lead** | $75 | $100 | $120 | Mix of pest ($50) + mold ($150) + foundation ($300) |
| **Referral revenue** | $375K | $4.0M | $18.0M | Leads × avg revenue |
| **Affiliate + Ad** | $100K | $800K | $3.0M | Ad revenue (free tier) + Amazon Associates |
| **B2B** | $0 | $200K | $2.0M | Property management, inspectors (v2.0+) |
| **Total revenue** | **$1.0M** | **$10.0M** | **$48.2M** | All streams |

**Источник:** PRODUCT-BRIEF.md, Раздел 10

### 4.2 LTV & CAC

| Метрика | Значение | Обоснование |
|---------|---------|-------------|
| **Customer Acquisition Cost (CAC)** | $3.00–$5.00 | Year 1: organic-heavy ($1–2). Year 2–3: paid blend ($3–6). CPI: iOS $5.97 (small), Android $2.78 (AppsFlyer Q3 2025). TikTok $1.75–$4.00 (Airbridge) |
| **LTV (subscriber only)** | $55–$100 | Avg subscription lifetime 18–24 мес × $35–$45 ARPU/yr |
| **LTV (subscriber + referral)** | $75–$150 | Subscription LTV + avg 1.5 referrals/lifetime × $75–$120 |
| **LTV:CAC ratio** | **18–25x** (Year 1, organic) → **8–12x** (Year 3, blended) | Цель: >3x. Достигается даже при Year 3 с paid acquisition |
| **Payback period** | **<1 месяц** (Year 1) → **<3 месяца** (Year 3) | Цель: <6 месяцев. Значительно перевыполняется |
| **Monthly subscriber churn** | 8% (Y1) → 4% (Y3) | Industry avg 6–10%. Улучшается с ростом value (geo-map, referrals) |
| **Conversion rate** | 3% (Y1) → 7% (Y3) | Бенчмарк для Health: 3–7%. Рост через AB-testing paywall |
| **Gross margin** | 70% → 80% | AI inference $0.01–$0.05/scan. Infrastructure scales sublinearly |

### 4.3 Revenue Split по потокам (Year 3)

```
Subscriptions    ████████████████████████████  52% ($25.2M)
Referrals        ██████████████████████        37% ($18.0M)
Affiliate + Ads  ███                            6% ($3.0M)
B2B              ██                             4% ($2.0M)
─────────────────────────────────────────────────────────
Total                                         100% ($48.2M)
```

**Ключевой инсайт**: Подписки и рефералы — примерно равные revenue drivers. Danger Scanner — не просто subscription app. Это **lead generation platform для home services**, маскированная под consumer identification app.

---

## 5. Referral Revenue — детализация

### 5.1 Revenue per referral по категориям

| Категория | Referral Action | Revenue/Lead | Avg Job Value | Close Rate |
|-----------|----------------|-------------|---------------|------------|
| **Pest control** (bugs, spiders, ticks) | Connect to exterminator | $50–$100 | $300–$3,000 | 20–30% |
| **Mold remediation** | Connect to mold specialist | $100–$300 | $2,000–$50,000 | ~33% |
| **Foundation repair** | Connect to structural engineer | $150–$500 | $4,500–$12,000 | 15–25% |
| **Telemedicine** (bite consult) | Connect to telehealth | $20–$50 | $75–$200 | High |
| **Landscaping/removal** (plants) | Connect to landscaper | $15–$40 | $200–$1,000 | 20–30% |
| **Lyme testing** | Connect to lab | $10–$30 | $50–$200 | Moderate |

**Источник:** MARKET-RESEARCH.md, Раздел 5 (Referral Economics Deep Dive)

### 5.2 Стратегия построения referral network

| Фаза | Сроки | Подход |
|------|-------|--------|
| **Фаза 1** | Месяцы 1–6 | Aggregators: Angi, Thumbtack, HomeAdvisor. Без прямых partnerships. API-интеграция |
| **Фаза 2** | Месяцы 6–12 | Dedicated partnerships hire. Прямые договоры с региональными pest control (Orkin, Terminix, локальные). Первые 100 лидов бесплатно |
| **Фаза 3** | Месяцы 12+ | Premium provider network: vetted, с рейтингами от пользователей. Revenue share вместо flat CPL |

### 5.3 Почему referral лиды из Danger Scanner = premium quality

- **Сверхвысокий intent**: Пользователь ТОЛЬКО ЧТО сканировал проблему → знает, что проблема есть
- **Pre-qualified**: AI уже определил тип проблемы → специалист получает контекст
- **Urgent**: Момент паники = немедленное действие, не «позвоню через неделю»
- **Фото + данные**: Специалист получает фото + AI-оценку до визита → точнее оценка

---

## 6. Дополнительные потоки дохода

### 6.1 Affiliate Revenue

| Канал | Продукты | Revenue model | Потенциал (Year 3) |
|-------|----------|---------------|-------------------|
| **Amazon Associates** | Tick removal kits, mold test kits, calamine, antihistamines, crack monitoring tape | 3–8% commission | $500K–$1M |
| **Direct brand partnerships** | Sawyer tick repellent, Concrobium mold spray | Flat fee per referral | $200K–$500K |
| **Product recommendations** | В action cards: «Рекомендуемые товары» | Contextual, не intrusive | $300K–$500K |

### 6.2 B2B Revenue (v2.0+)

| Клиент | Use Case | Pricing |
|--------|----------|---------|
| **Property management** | Скан каждой единицы при turnover (mold, cracks) | $500–$2,000/год/компания |
| **Home inspectors** | Supplemental tool при инспекции | $99–$299/год/инспектор |
| **Pest control companies** | White-label lead gen tool | Revenue share |
| **Insurance companies** | Раннее обнаружение → снижение claims | Enterprise licensing |
| **Summer camps / outdoor programs** | Identify bites, ticks, snakes для персонала | $500–$1,000/год/организация |

### 6.3 Data Licensing (v2.0+)

Анонимизированные геоданные:
- Mold prevalence by ZIP code → insurance companies
- Tick hotspot maps → public health agencies
- Pest activity trends → pest control companies

Потенциал: $1M–$3M/год при 2.5M+ MAU.

---

## 7. Revenue Forecast Summary

| Метрика | Year 1 | Year 2 | Year 3 |
|---------|--------|--------|--------|
| **Total Revenue** | **$1.0M** | **$10.0M** | **$48.2M** |
| Subscriptions | $525K (52%) | $5.0M (50%) | $25.2M (52%) |
| Referrals | $375K (38%) | $4.0M (40%) | $18.0M (37%) |
| Affiliate + Ads | $100K (10%) | $800K (8%) | $3.0M (6%) |
| B2B | $0 (0%) | $200K (2%) | $2.0M (4%) |

**Источник:** PRODUCT-BRIEF.md, Раздел 10

---

## 8. Key Monetization Risks

| Риск | Митигация |
|------|-----------|
| **Conversion ниже 3%** | AB-test paywall timing, pricing, messaging. Fallback: снизить цену до $2.99/мес. Focus on referral revenue |
| **Referral network не взлетает** | Старт через aggregators (Angi, Thumbtack) — не нужны прямые partnerships. Если intent высокий, aggregators с радостью примут лиды |
| **Churn выше 10%/мес** | Push alerts для re-engagement. Seasonal campaigns. Geo-map = reason to return. Annual plan discount → lock-in |
| **AI inference costs растут** | On-device models для basic scan. Cloud — только для полной обработки. Batch processing. Cache common results |
| **Price sensitivity** | $29.99/год < одного визита к педиатру ($40 copay) < одного вызова pest control ($100+). Framing: «cheaper than the alternative» |

---

## Источники

- PRODUCT-BRIEF.md — monetization model, revenue forecast, unit economics
- MARKET-RESEARCH.md — referral economics, lead costs, market sizes
- COMPETITORS.md — competitor pricing benchmarks
- BUG-BITE-DEEP-DIVE.md — app revenue data, pricing analysis
- RESEARCH-BRIEF.md — referral economics insight
- RevenueCat State of Subscription Apps 2026 (115K+ apps, $16B revenue) — conversion, pricing, LTV benchmarks
- Adapty State of In-App Subscriptions 2026 (16K+ apps, $3B revenue) — trial, retention, pricing benchmarks
- AppsFlyer Benchmarks Q3 2025 — CPI, retention for Health & Fitness (US)
- Airbridge 2025 — Facebook/TikTok CPI for Health & Fitness
- Sensor Tower — app revenue estimates

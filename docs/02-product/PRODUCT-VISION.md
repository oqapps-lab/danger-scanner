# Danger Scanner — Product Vision

**Дата:** 12 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Синтез:** TARGET-AUDIENCE.md, PROBLEM-SOLUTION-FIT.md, FEATURES.md, MONETIZATION.md

---

## 1. Elevator Pitch

**Danger Scanner — первое в мире мульти-категорийное AI-приложение для мгновенной идентификации бытовых и природных опасностей.** Сфотографируй укус, паука, змею, плесень, трещину в стене, клеща, гусеницу или растение — получи мгновенную оценку опасности (red/yellow/green), конкретный план действий и связь со специалистом в одно касание.

**Рынок свободен (0 конкурентов в unified danger ID), проблема подтверждена (500K–1.5M+ поисков/месяц только по bug bites), монетизация доказана аналогами ($100M+/год PictureThis).** Мы создаём новую категорию, а не конкурируем в существующей.

---

## 2. Product Canvas

| Блок | Содержание |
|------|-----------|
| **Problem** | Люди не могут быстро определить, опасно ли то, с чем они столкнулись дома или на природе. Google = 30 мин, Reddit = часы, ER = $200–$500. Ноль инструментов отвечают на «это опасно?» + «что делать?» + «к кому обратиться?» одновременно |
| **Solution** | Фото → 3 секунды → danger level (red/yellow/green) + action card + one-tap referral to specialist. 8 категорий в одном приложении |
| **Key Metrics** | MAU, free-to-paid conversion, scan-to-referral rate, D30 retention, MRR, NPS |
| **UVP** | Единственное приложение, объединяющее 8 категорий опасностей + AI danger assessment + referral network + community geo-map. Ответ за 3 секунды вместо 30 минут Google |
| **Unfair Advantage** | 1) Мульти-категорийность = year-round engagement (конкуренты = 1 категория, сезонные). 2) Community geo-map = compounding data moat. 3) Referral network = business relationships, не код. 4) Репликация комбинации = 18–24 месяца |
| **Channels** | Organic: TikTok/Instagram (scan-reveal videos), SEO (500K+ «what bit me» searches), mom groups. Partnerships: pest control co-brand, home inspector reco. Paid: Meta (parents), Google (search intent), TikTok (video ads) |
| **Customer Segments** | **Primary**: Тревожные родители (35M+ в США). Secondary: Новые домовладельцы (8M/год). Tertiary: Outdoor-энтузиасты (50M hikers) |
| **Cost Structure** | AI inference ($0.01–$0.05/scan), infrastructure (Supabase, hosting), ML team, mobile dev, content+SEO, partnerships hire (month 6+), legal counsel, E&O insurance |
| **Revenue Streams** | Subscriptions (52%): $4.99/мес, $29.99/год. Referrals (37%): $50–$500/lead. Affiliate (6%): product recommendations. B2B (4%): property management, inspectors |

---

## 3. Success Metrics (KPI)

### 3.1 Core Metrics

| Метрика | 3 мес | 6 мес | 12 мес |
|---------|-------|-------|--------|
| **MAU** | 30K | 100K | 500K |
| **Downloads (cumulative)** | 80K | 250K | 1M |
| **Conversion to paid** | 2.5% | 3.5% | 5% |
| **Paying subscribers** | 2K | 8K | 50K |
| **D1 retention** | 35% | 40% | 45% |
| **D7 retention** | 18% | 22% | 25% |
| **D30 retention** | 8% | 10% | 14% |
| **MRR** | $8K | $35K | $200K |
| **ARR** | $96K | $420K | $2.4M |
| **App Store rating** | 4.2+ | 4.4+ | 4.5+ |

### 3.2 Scan & Engagement Metrics

| Метрика | 3 мес | 6 мес | 12 мес |
|---------|-------|-------|--------|
| **Scans/month** | 60K | 300K | 2M |
| **Avg scans/user/month** | 2.0 | 3.0 | 4.0 |
| **Scan-to-referral rate** | — | 3% | 5% |
| **Referral leads/month** | — | 300 | 3,000 |
| **Referral revenue/month** | — | $22K | $225K |
| **Action card completion rate** | 60% | 65% | 70% |

### 3.3 Quality Metrics

| Метрика | 3 мес | 6 мес | 12 мес |
|---------|-------|-------|--------|
| **AI accuracy (top-2 categories)** | 80% | 84% | 88% |
| **User-reported incorrect ID** | <10% | <7% | <5% |
| **False green rate (safety-critical)** | <1% | <0.5% | <0.3% |
| **Avg scan-to-result time** | <5s | <4s | <3s |
| **NPS** | 30+ | 40+ | 50+ |

---

## 4. Roadmap

### Phase 1: MVP Launch (Month 1–4)

**Фокус:** Core scan experience + валидация product-market fit

| Что делаем | Детали |
|-----------|--------|
| **Категории** | 4: Пауки, Змеи, Клещи, Укусы |
| **Core features** | Camera scan, contextual questions, result + action card, conservative bias engine |
| **Infrastructure** | Auth (Supabase), subscription (Adapty), ML pipeline (category router + classifiers + LLM) |
| **Monetization** | Paywall (3 free scans/month), Premium ($4.99/мес, $29.99/год) |
| **Launch** | TestFlight beta (month 3) → Soft launch US only (month 4) |
| **Team** | 1 ML engineer, 1 mobile dev, 1 content/SEO |
| **Success criteria** | 10K downloads, 300 paid subs, 4.0+ rating, 80%+ accuracy (top categories) |

### Phase 2: Growth + Expansion (Month 4–8)

**Фокус:** Добавление категорий + referral network + community features

| Что делаем | Детали |
|-----------|--------|
| **Категории** | +2: Плесень, Ядовитые растения (итого 6) |
| **Features** | Community danger geo-map, one-tap specialist referral (через Angi/Thumbtack), offline basic mode, family plan, photo quality assistant |
| **Referral network** | API-интеграция с aggregators (Angi, Thumbtack), первые прямые partnerships |
| **Push alerts** | Geo-targeted seasonal alerts (tick season, mold season) |
| **Marketing** | TikTok scan-reveal videos (2–3/week), SEO content, pest control co-brand partnerships |
| **Team** | +1 partnerships hire, +1 designer |
| **Success criteria** | 250K downloads, 8K paid subs, $35K MRR, 300 referral leads/мес, 4.4+ rating |

### Phase 3: Scale + B2B (Month 8–14)

**Фокус:** Полное покрытие 8 категорий + B2B + data monetization

| Что делаем | Детали |
|-----------|--------|
| **Категории** | +2: Wall Cracks, Caterpillars (итого 8) |
| **Features** | Mold/crack growth tracking, bite healing timeline, B2B property management portal |
| **Referral network** | Premium provider network с рейтингами, прямые partnerships (pest control, mold, foundation) |
| **B2B** | Property management companies, home inspectors, summer camps |
| **Data** | Anonymized geo-data licensing (insurance, public health) |
| **Marketing** | Paid acquisition (Meta, Google, TikTok), seasonal campaigns, home inspector partnerships |
| **Team** | +1 ML engineer, +1 backend dev, +1 sales (B2B) |
| **Success criteria** | 1M downloads, 50K paid subs, $200K MRR, 3K referral leads/мес, 4.5+ rating |

### Визуализация roadmap

```
Month  1   2   3   4   5   6   7   8   9  10  11  12  13  14
       ├───────────────┤
       Phase 1: MVP     ├──────────────────┤
       4 categories      Phase 2: Growth    ├──────────────────────┤
       Core scan          +2 categories      Phase 3: Scale
       Subscription       Geo-map            +2 categories
       Beta → Launch      Referral           B2B portal
                          Offline            Data licensing
                          Family Plan        Full 8 categories
```

---

## 5. Go-to-Market Strategy

### 5.1 Launch Strategy

| Фаза | Канал | Бюджет | Ожидаемый результат |
|------|-------|--------|-------------------|
| **Pre-launch** (месяц 3) | Smoke test landing page + waitlist | $500 ad spend | >500 email signups, validate messaging |
| **Soft launch** (месяц 4) | US only, organic + TestFlight beta | $0 | 5K downloads, early reviews, bug fixes |
| **Full launch** (месяц 5) | ASO + social + PR | $2K | 30K downloads first month |
| **Growth** (месяц 6+) | TikTok + partnerships + paid | $5–10K/мес | 50K+ downloads/month |

### 5.2 Viral Mechanics

- **Scan-reveal videos**: 15–30 sec TikTok/Reels — драматический reveal red/yellow/green. Контент создаёт себя сам
- **Share result**: CTA «Поделиться результатом» → branded image → organic reach
- **Mom group word-of-mouth**: Sarah рассказывает 10 мамам → каждая скачивает → каждая рассказывает 10
- **«What's in your yard?» challenge**: Viral TikTok challenge — сканируй опасности во дворе

### 5.3 SEO / ASO

| Keyword Cluster | Monthly Volume | Competition | Стратегия |
|----------------|---------------|-------------|-----------|
| «what bit me» / «bug bite identifier» | 500K–1.5M+ | Low–Moderate | Landing pages, blog, ASO |
| «is this snake venomous» | 50K–100K | Low | Regional guides |
| «is this mold dangerous» | 50K–150K | Moderate | Homeowner guides |
| «crack in wall serious» | 30K–80K | Very low | Educational content |
| «tick bite bullseye» | 80K–200K | Moderate | Seasonal landing pages |

---

## 6. Verdict

### **GO** — переход к UX-проектированию

### Обоснование

| Фактор | Оценка | Комментарий |
|--------|--------|-------------|
| **Рынок** | 9/10 | TAM $2.4–3.0B (подписки) + $40B+ (рефералы). Каждая категория — самостоятельный бизнес |
| **Конкуренция** | 9/10 | Unified danger ID = 0 конкурентов. Saturation score: 2/10. Репликация = 18–24 мес |
| **Проблема** | 9/10 | 500K–1.5M+ поисков/мес, ~1M ER visits/год, 70M домов с плесенью. Боль подтверждена данными |
| **Решение** | 8/10 | AI accuracy 84–86% (MVP-ready с conservative bias). Contextual questions +10–15%. Доказано аналогами |
| **Монетизация** | 9/10 | 3 потока: подписки + рефералы + B2B. PictureThis = $100M+/год. Unit economics: LTV:CAC > 10x |
| **Аудитория** | 9/10 | Primary persona (Sarah) = 35M+ parents, высокая готовность платить, вирусный потенциал |
| **Тайминг** | 9/10 | AI ready, конкуренты слабы, окно 6–12 мес. Рекорд tick bites 2025 = awareness |
| **Uniqueness** | 10/10 | Категория не существует. First-mover advantage реален |

**Средняя оценка: 9.0/10**

### Условия GO

1. **Phase 1 = 4 сильнейших категории** (Spiders, Snakes, Ticks, Bug Bites) — не все 8 сразу
2. **Conservative bias by default** — лучше 100 false «caution», чем 1 false «safe»
3. **Legal review до запуска** — educational positioning, disclaimers, ToS, E&O insurance
4. **Accuracy testing по skin tones** — launch только если accuracy ≥75% для всех Fitzpatrick types
5. **Первый скан БЕЗ регистрации и paywall** — доказать ценность до конверсии
6. **Referral через aggregators** (Angi, Thumbtack) — не ждать прямых partnerships

### Красные линии (что превратит GO в NO-GO)

- AI accuracy <70% для ВСЕХ категорий в blind test
- FDA классифицирует educational ID apps как SaMD
- PictureThis или Google запустит unified danger ID раньше нас
- Невозможность обеспечить diverse training data → unacceptable bias

### Следующий шаг

**Stage 3: UX Design** — информационная архитектура, wireframes, user flows, дизайн-система. На основе: Primary Persona (Sarah), MVP features (F-001 – F-010), aha-moment (первый скан → action card).

---

## Приложение: Карта документов Product Definition Stage

| Документ | Содержание | Статус |
|---------|-----------|--------|
| [TARGET-AUDIENCE.md](TARGET-AUDIENCE.md) | 3 расширенные персоны, JTBD, триггеры, Primary Persona | ✅ Полный |
| [PROBLEM-SOLUTION-FIT.md](PROBLEM-SOLUTION-FIT.md) | Проблема, решение, value proposition, validation checklist | ✅ Полный |
| [FEATURES.md](FEATURES.md) | MVP features (10), Should Have (6), Could Have (8), Won't Have | ✅ Полный |
| [MONETIZATION.md](MONETIZATION.md) | Freemium + subscription + referral, unit economics, pricing | ✅ Полный |
| **PRODUCT-VISION.md** (этот документ) | Elevator pitch, product canvas, KPIs, roadmap, verdict | ✅ Полный |

---

## Источники

- TARGET-AUDIENCE.md — персоны, демография, JTBD
- PROBLEM-SOLUTION-FIT.md — проблема, решение, validation
- FEATURES.md — MVP scope, feature list
- MONETIZATION.md — pricing, unit economics, revenue forecast
- RESEARCH-BRIEF.md (docs/01-research/) — scoring table, verdict, risks
- MARKET-RESEARCH.md (docs/01-research/) — TAM/SAM/SOM, search volume
- COMPETITORS.md (docs/01-research/) — gap analysis, positioning map
- PRODUCT-BRIEF.md (docs/01-research/) — product overview, technical feasibility

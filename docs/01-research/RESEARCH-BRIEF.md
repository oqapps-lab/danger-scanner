# Danger Scanner — Research Brief (Синтез исследования)

**Дата:** 12 апреля 2026
**Статус:** Research Stage 3 — Завершение
**Основан на:** MARKET-RESEARCH.md, COMPETITORS.md, USER-PERSONAS.md, DOMAIN-RESEARCH.md, PRODUCT-BRIEF.md, BUG-BITE-DEEP-DIVE.md

---

## 1. Elevator Pitch

**Danger Scanner — первое в мире мульти-категорийное приложение для идентификации бытовых и природных опасностей.** Пользователь фотографирует укус, паука, змею, плесень, трещину в стене, клеща, гусеницу или подозрительное растение → получает мгновенную оценку опасности (red/yellow/green) с конкретным планом действий и возможностью подключить специалиста в одно касание.

**Рынок свободен, проблема подтверждена данными, монетизация доказана аналогами.** Единственный вопрос — не «есть ли спрос?» (500K–1.5M+ поисков/месяц по bug bites; ноль качественных конкурентов в 6 из 8 категорий), а «достаточно ли точен AI?» — и ответ при текущем уровне технологии: да, достаточно для MVP.

---

## 2. Scoring Table

| # | Критерий | Оценка (1–10) | Обоснование |
|---|---------|:------------:|-------------|
| 1 | **Размер рынка** | **9** | TAM $2.4–3.0B (подписки) + $40B+ (реферальный рынок услуг). Каждая из 8 категорий — отдельный многомиллиардный рынок: pest control $28.5B, foundation repair $11.8B, mold remediation $1.3B. Источники: IBISWorld, FMI, Grand View Research |
| 2 | **Рост рынка** | **8** | Pest control CAGR 5.2%; foundation repair CAGR 5.4%; antivenom CAGR 6.5–8.8%; health/wellness apps CAGR 15%+. Tick bite ER visits рекорд 2025 (+42% за год). Все тренды растут. Источники: CDC, IBISWorld |
| 3 | **Конкуренция** (10 = мало) | **9** | Unified danger ID = 0 конкурентов. Wall cracks = полный white space. Mold apps = nascent (2024–2025). Spider ID = 2.6–3.1 stars. Saturation score: 2/10. Ближайший аналог Critterpedia — бета, Австралия, 2/8 категорий |
| 4 | **Ясность проблемы** | **9** | «Это опасно?» — универсальная боль. 500K–1.5M+ поисков/мес по bug bites. ~1M ER visits/год. Reddit полон вопросов «is this dangerous?». Эмоциональная ургентность (страх) = мощный conversion driver |
| 5 | **Монетизация** | **9** | 3 потока: подписки ($30–50/год), рефералы ($50–200/лид), B2B. PictureThis доказал $100M+/год для «identify from photo» subscription. Pest control leads $45–100, mold leads $100–300, foundation leads $150–500. Revenue model доказан аналогами |
| 6 | **Техническая сложность** (10 = просто) | **5** | 8 отдельных классификаторов. Bug bite accuracy: 84–86% (DeepBiteNet 2025). Snake: 85–95%. Mold: 70–80%. Wall cracks: 65–75% (наименее mature). Skin tone bias. Ограниченные датасеты для wall cracks. On-device + cloud architecture. Но: LLM + contextual questions значительно повышают accuracy |
| 7 | **Уникальность** | **10** | Первый в мире unified danger scanner. Категория не существует. Комбинация 8 категорий + danger assessment + referral network + community geo-map — не имеет аналогов. Ближайший концептуальный аналог (Critterpedia) = 2/8 категорий, 1 страна, бета |

### Итоговый балл: **8.4 / 10**

```
Размер рынка      ████████████████████████████████████░░░░░  9/10
Рост рынка        ████████████████████████████████░░░░░░░░░  8/10
Конкуренция       ████████████████████████████████████░░░░░  9/10
Ясность проблемы  ████████████████████████████████████░░░░░  9/10
Монетизация       ████████████████████████████████████░░░░░  9/10
Тех. сложность    ██████████████████████░░░░░░░░░░░░░░░░░░░  5/10
Уникальность      ████████████████████████████████████████░ 10/10
───────────────────────────────────────────────────────────
СРЕДНИЙ БАЛЛ:                                         8.4/10
```

---

## 3. Top-5 Insights

### Insight 1: Создание новой категории, а не конкуренция в существующей

Danger Scanner не «ещё одно bug ID приложение» и не «мold scanner». Это **новая категория** — unified danger identification platform. Ни один конкурент не покрывает более 2 категорий (Critterpedia: пауки + змеи). Мульти-категорийность — это не feature, это **моат**:
- 8 категорий = year-round engagement (см. MARKET-RESEARCH.md, Раздел 7)
- Cross-sell: пользователь, сканирующий паука в июне, сканирует плесень в ноябре
- Один app вместо 4–5 = lower CAC per use case

**Источник**: COMPETITORS.md — Gap Analysis, Saturation Score 2/10

### Insight 2: Wall Cracks = самый недооценённый рынок

Фундаментный ремонт — **$11.8B рынок** с **НУЛЁМ consumer apps**. Homeowners тратят $4,500–$12,000 на ремонт, платят $300–$800 за осмотр инженера, и **не знают, нужен ли он вообще**. Приложение, которое за 3 секунды отличает hairline settling crack от structural stair-step crack, не имеет аналогов в мире.

Cost per lead для foundation repair: $150–$500. Это **самый дорогой реферал** в портфеле Danger Scanner.

**Источник**: MARKET-RESEARCH.md, Раздел 1.5; PRODUCT-BRIEF.md, Раздел 2

### Insight 3: Реферальная экономика > подписки

PictureThis-модель ($30/год подписка) работает, но **реферальная модель** может генерировать больше revenue per user:
- Pest control lead: $50–100
- Mold remediation lead: $100–300
- Foundation repair lead: $150–500
- Один «напуганный домовладелец» (персона Marcus) может генерировать $200–500 в referral revenue = 5–15 лет подписки

Подписка обеспечивает baseline revenue; рефералы обеспечивают upside. При Year 3 прогнозе: подписки $25M + рефералы $18M = $43M+ total (PRODUCT-BRIEF.md, Раздел 10).

**Источник**: MARKET-RESEARCH.md, Раздел 5; PRODUCT-BRIEF.md, Раздел 6

### Insight 4: Conservative bias = юридическая защита + лучший UX

Из DOMAIN-RESEARCH.md: ключевой урок OECD (грибные приложения) — **false negative опаснее false positive**. Приложение, которое говорит «безопасно» и ошибается = иск/PR-катастрофа. Приложение, которое говорит «возможно опасно, рекомендуем консультацию» и ошибается = пользователь немного перестраховался.

**Практическая реализация**:
- При confidence <85% → жёлтый (caution), НИКОГДА зелёный
- Для змей: НИКОГДА не говорить «неядовитая» определённо
- Для плесени: НИКОГДА не говорить «нетоксичная» (невозможно определить по фото)
- Позиционирование: «educational/informational», не «diagnostic»

Это не просто юридическая необходимость — это **лучший UX**. Пользователи предпочитают перестраховку (исследования: 85%+ хотят «better safe than sorry»).

**Источник**: DOMAIN-RESEARCH.md, Разделы 3–4

### Insight 5: Тайминг — окно 6–12 месяцев

Рынок начинает оживать:
- Mold AI apps появились в 2024–2025 (пока низкого качества)
- AI-возможности растут экспоненциально (GPT-4V, Claude Vision)
- Tick bite ER visits рекорд 2025 = тема в новостях = awareness
- PictureThis доказал модель на $100M+ = больше стартапов будут копировать

Через 12–18 месяцев рынок может стать значительно более competitive. **Сейчас = оптимальный момент для first-mover**.

**Источник**: MARKET-RESEARCH.md, Раздел 13 (Temporal Window)

---

## 4. Key Risks

### Risk 1: AI Accuracy недостаточна при запуске

| | |
|---|---|
| **Вероятность** | Средняя (40%) |
| **Импакт** | Высокий — негативные отзывы, потеря доверия, потенциальные lawsuits |
| **Текущие бенчмарки** | Bug bites: 84–86%. Spiders: 80–85%. Snakes: 85–90%. Mold: 70–80%. Wall cracks: 65–75% |
| **Митигация** | 1) Стартовать с 2–4 сильнейших категорий (spiders, snakes, ticks, plants). 2) Conservative bias — при сомнениях = жёлтый. 3) Contextual questions повышают accuracy на 10–15%. 4) Прозрачность: показывать confidence %. 5) Rapid model improvement через user-contributed data |

### Risk 2: Юридическая ответственность (liability)

| | |
|---|---|
| **Вероятность** | Средняя (30%) |
| **Импакт** | Очень высокий — lawsuit за medical harm + PR-катастрофа |
| **Сценарий** | Пользователь получает «green» для укуса коричневого отшельника → не идёт к врачу → некроз тканей → иск |
| **Митигация** | 1) Позиционирование «educational, not diagnostic». 2) Disclaimer на КАЖДОМ результате. 3) Conservative bias — НИКОГДА green при confidence <85%. 4) ToS с arbitration clause. 5) E&O insurance. 6) Legal review языка до запуска. 7) Для змей: ВСЕГДА рекомендовать 911 при укусе, независимо от ID |

### Risk 3: Skin Tone Bias

| | |
|---|---|
| **Вероятность** | Высокая (60%) |
| **Импакт** | Средний–высокий — equity concerns, negative press, reduced accuracy для части аудитории |
| **Проблема** | Медицинские датасеты преимущественно Fitzpatrick I–III. Укусы/rashes выглядят иначе на тёмной коже (потемнение vs покраснение). Erythema migrans менее заметна |
| **Митигация** | 1) Diverse training data минимум 15–20% каждого Fitzpatrick type. 2) Тестирование accuracy по типам кожи до запуска. 3) Contextual questions снижают зависимость от визуала. 4) Партнёрство с VisualDx (skin of color module). 5) Прозрачность: публиковать accuracy metrics по skin tones |

### Risk 4: ChatGPT / Google Lens commoditization

| | |
|---|---|
| **Вероятность** | Средняя (35%) |
| **Импакт** | Средний — снижает perceived value of identification (но не action layer) |
| **Митигация** | 1) Строить моаты, которые LLM не реплицируют: geo-map (community data), referral network (business relationships), push alerts, scan history. 2) Если ChatGPT commoditizes identification → pivot к action layer: «ChatGPT сказал brown recluse. Нажмите сюда, чтобы связаться с pest control». 3) Move fast: community data = compounding advantage |

### Risk 5: Referral network сложно построить

| | |
|---|---|
| **Вероятность** | Средняя (40%) |
| **Импакт** | Средний — лишает ~40% потенциального revenue |
| **Митигация** | 1) Старт через marketplace aggregators (Angi, Thumbtack, HomeAdvisor) — не нужны прямые partnerships. 2) Первые 100 лидов бесплатно для proof of quality. 3) Лиды сверхвысокого intent (пользователь только что сканировал проблему) = premium quality. 4) Dedicated partnerships hire к месяцу 6 |

---

## 5. Hypotheses to Test (до начала разработки)

### Hypothesis 1: Пользователи доверяют AI для danger assessment

| | |
|---|---|
| **Тест** | Smoke test: Landing page «Scan any danger → instant result». Измерить email signups / waitlist |
| **Метрика успеха** | >3% signup rate; >500 signups за 2 недели при бюджете $500 на рекламу |
| **Альтернатива при провале** | Позиционировать как «AI-assisted, expert-verified» (slower, but trusted) |

### Hypothesis 2: Один app для 8 категорий > 8 отдельных apps

| | |
|---|---|
| **Тест** | A/B тест landing page: «Danger Scanner — scan anything» vs «Spider Scanner — identify spiders» |
| **Метрика успеха** | Multi-category версия = выше signup rate ИЛИ сопоставимый signup + выше retention intent |
| **Альтернатива при провале** | Launch single-category MVP (spiders), расширять постепенно |

### Hypothesis 3: Пользователи готовы платить $4.99/мес за danger ID

| | |
|---|---|
| **Тест** | Fake door test в MVP: показать Premium features за paywall, измерить tap rate |
| **Метрика успеха** | >5% tap on «Upgrade to Premium»; >2% actual conversion |
| **Альтернатива при провале** | Снизить цену ($2.99/мес), увеличить free tier, focus on referral revenue |

### Hypothesis 4: Referral to specialists — ценная функция

| | |
|---|---|
| **Тест** | Survey / in-app prompt после первого scan: «Would you like to be connected to a [pest control / structural engineer]?» |
| **Метрика успеха** | >15% tap rate на referral CTA; >3% complete the referral |
| **Альтернатива при провале** | Deprioritize referral network; focus on subscription + content |

### Hypothesis 5: AI accuracy достаточна для MVP

| | |
|---|---|
| **Тест** | Blind test: 100 фото каждой категории (разные conditions, skin tones) → AI vs expert panel |
| **Метрика успеха** | >80% accuracy для spiders/snakes/ticks; >75% для bug bites/mold; >70% для wall cracks |
| **Альтернатива при провале** | Narrow launch to 2–3 highest-accuracy categories; hybrid model (AI + human expert backup) |

---

## 6. Recommendations для Product Stage

### 6.1 Launch Strategy

| Фаза | Сроки | Категории | Цель |
|------|-------|----------|------|
| **Phase 1 (MVP)** | Месяцы 1–6 | Spiders + Snakes + Ticks + Bug Bites | Валидация core experience, accuracy, conversion |
| **Phase 2** | Месяцы 6–12 | + Mold + Poisonous Plants | Добавление year-round категорий, pet owner market |
| **Phase 3** | Месяцы 12–18 | + Wall Cracks + Caterpillars | Самый дорогой referral (foundation) + полное покрытие |

**Обоснование порядка**:
- Phase 1: Лучшие датасеты (iNaturalist), пиковый летний спрос, чёткая визуальная идентификация
- Phase 2: Год-round engagement (мold зимой), расширение аудитории (pet owners)
- Phase 3: Wall cracks — наименее mature AI, но самый дорогой referral; caterpillars — seasonal niche

### 6.2 Технические приоритеты

1. **Multi-modal pipeline**: Category router (on-device) → Category-specific classifier (cloud) → LLM action cards
2. **Contextual questions**: 2–3 quick-tap вопроса после каждого скана (повышают accuracy на 10–15%)
3. **Conservative bias engine**: Confidence threshold система → жёлтый при <85%, красный при dangerous species
4. **Offline basic mode**: On-device модели для top-50 species per category
5. **Photo quality assistant**: UI-подсказки при фотографировании

### 6.3 Юридические приоритеты (до запуска)

1. Legal review всего user-facing языка (educational, not diagnostic)
2. ToS с arbitration clause и limitation of liability
3. Privacy policy (GDPR/CCPA compliant, COPPA если <13)
4. E&O insurance
5. Регулярный FDA monitoring

### 6.4 Бизнес-приоритеты

1. **Month 1–3**: Core app development (2–4 категории)
2. **Month 3–6**: Beta launch, accuracy testing, user feedback
3. **Month 4–6**: Begin referral partnerships (start with aggregators: Angi, Thumbtack)
4. **Month 6**: Public launch (App Store + Google Play)
5. **Month 6–9**: Scale to 6 категорий; dedicated partnerships hire
6. **Month 9–12**: Full 8 categories; B2B outreach (property management, inspectors)

### 6.5 Команда (минимальный состав)

| Роль | Когда | Зачем |
|------|-------|-------|
| ML Engineer | Day 1 | Visual classifiers, model training, accuracy improvement |
| Mobile Developer | Day 1 | React Native / Expo app |
| Content + SEO | Month 1 | Landing pages, ASO, organic acquisition |
| Partnerships | Month 6 | Referral network (pest control, mold remediation, foundation repair) |
| Domain Expert (advisory) | Month 1 | Entomologist or herpetologist for content QA |
| Legal counsel (external) | Month 3 | ToS, disclaimers, FDA monitoring |

---

## 7. Verdict

### **GO** ✅

### Условия GO:

1. **Стартовать с 2–4 сильнейших категорий** (Spiders, Snakes, Ticks, Bug Bites) — не все 8 сразу
2. **Conservative bias by default** — лучше 100 false «caution», чем 1 false «safe»
3. **Legal review до запуска** — educational positioning, disclaimers, ToS
4. **Accuracy testing по skin tones** — launch только если accuracy ≥75% для всех Fitzpatrick types
5. **Referral через aggregators** на старте (Angi, Thumbtack) — не ждать прямых partnerships

### Обоснование GO:

| Фактор | Почему GO |
|--------|---------|
| **Рынок** | TAM $2.4–3.0B подписки + $40B+ рефералы. Каждая категория — самостоятельный бизнес |
| **Конкуренция** | Ноль unified danger apps. Отдельные категории: spider ID = 2.6 stars, mold = nascent, wall cracks = white space |
| **Тайминг** | AI достаточно точен. Рынок начинает оживать. Окно 6–12 месяцев |
| **Модель** | PictureThis ($100M+/год) доказал «identify from photo» subscription. Referral economics доказаны (pest control $45–100/lead) |
| **Уникальность** | 10/10. Категория не существует. First-mover advantage реален |

### Почему не CAUTIOUS GO:

**CAUTIOUS GO** подразумевал бы серьёзные сомнения. У Danger Scanner их нет:
- Спрос **доказан** (500K+ поисков/мес, Reddit полон вопросов, 1M ER visits/год)
- Монетизация **доказана аналогами** (PictureThis, Picture Insect)
- Конкуренция **отсутствует** в unified positioning
- Технология **достаточно mature** для MVP (84–86% accuracy с conservative bias)

Единственные реальные риски (accuracy, liability, skin tone bias) — все **mitigation-capable**. Ни один не является show-stopper.

### Красные линии (что превратит GO в NO-GO):

- Accuracy в blind test <70% для ВСЕХ категорий → недостаточно для safety-critical app
- FDA изменит политику и классифицирует educational ID apps как SaMD → 2–5 лет на clearance
- PictureThis или Google запустит unified danger ID раньше → потеря first-mover advantage
- Невозможность обеспечить diverse training data → unacceptable bias → PR/legal risk

---

## Приложение: Карта документов Research Stage

| Документ | Содержание | Статус |
|---------|-----------|--------|
| [MARKET-RESEARCH.md](MARKET-RESEARCH.md) | Market size, Google Trends, TAM/SAM/SOM, monetization, referral economics | ✅ Полный (+ Conclusions добавлены) |
| [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) | Product overview, features, monetization model, technical feasibility, revenue forecast | ✅ Полный |
| [COMPETITORS.md](COMPETITORS.md) | 10+ конкурентов, positioning map, gap analysis, saturation score | ✅ Полный |
| [USER-PERSONAS.md](USER-PERSONAS.md) | 3 персоны с цитатами из Reddit, common patterns, demographic coverage | ✅ Полный |
| [DOMAIN-RESEARCH.md](DOMAIN-RESEARCH.md) | Domain knowledge по 8 категориям, expert sources, regulatory, content strategy, limitations | ✅ Полный |
| [BUG-BITE-DEEP-DIVE.md](BUG-BITE-DEEP-DIVE.md) | Глубокое исследование bug bite ID market (search volume, competition, tech feasibility) | ✅ Полный |
| **RESEARCH-BRIEF.md** (этот документ) | Синтез: elevator pitch, scoring, insights, risks, hypotheses, recommendations, verdict | ✅ Полный |

---

## Источники

Полные списки источников — в каждом отдельном документе. Ключевые:

- CDC (Tick Bites, Lyme, Snakebites): cdc.gov
- EPA (Mold Guide): epa.gov/mold
- WHO (Snakebite Envenoming): who.int
- ASPCA (Plant Toxicity): aspca.org
- IBISWorld (Pest Control Market $28.5B): ibisworld.com
- Future Market Insights (Foundation Repair $11.8B): futuremarketinsights.com
- Grand View Research (Mold Remediation): grandviewresearch.com
- DeepBiteNet (Bug Bite AI Accuracy 84.6%): PMC 2025
- OECD (AI Mushroom App Risk): oecd.ai
- FDA (AI-Enabled Medical Devices): fda.gov
- SimilarWeb, Sensor Tower, AppstoreSpy: app market data
- Reddit: r/whatsthisbug, r/homeimprovement, r/snakes, r/Lyme, r/Parenting, r/pestcontrol

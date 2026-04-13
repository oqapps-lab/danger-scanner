# Danger Scanner — Problem-Solution Fit

**Дата:** 12 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Основан на:** RESEARCH-BRIEF.md, MARKET-RESEARCH.md, COMPETITORS.md, DOMAIN-RESEARCH.md (docs/01-research/)

---

## 1. Проблема

### 1.1 Какая боль?

**Люди не могут быстро определить, опасно ли то, с чем они столкнулись дома или на природе.**

Конкретные сценарии:

| Сценарий | Боль | Цена бездействия |
|----------|------|------------------|
| Укус на руке ребёнка, 11 PM | Не знает: комар, паук или клещ? ER за $200 или подождать? | Пропущенный brown recluse = некроз тканей |
| Трещина в фундаменте | Усадка на $50 или проблема на $15,000? | Прогрессирование = обрушение / потеря стоимости дома |
| Тёмные пятна на стене | Безвредная влага или токсичная плесень? | 4.6 млн случаев астмы/год от плесени (NIOSH) |
| Змея на тропе в 3 метрах от детей | Copperhead или rat snake? Бежать или обходить? | 7,000–8,000 ядовитых укусов/год в США |
| Клещ на шее дочери | Deer tick (Лайм) или dog tick (безопасен)? | 72-часовое окно для доксициклина |
| Собака грызёт растение | Ядовито для животных? | Lilies смертельны для кошек, sago palm — для собак |

### 1.2 Насколько боль острая?

**Frequency × Severity = очень высокая.**

| Метрика | Данные | Источник |
|---------|--------|---------|
| ER-визиты из-за укусов/ужалений | ~1 млн/год (США) | CDC NEISS-AIP |
| Поиски «what bit me» | 500K–1.5M+/месяц | Google Trends, Orkin traffic |
| Укусы клещей | ~31 млн/год (США) | CDC |
| Случаи болезни Лайма | ~628 тыс./год | CDC 2024 оценка |
| Дома с плесенью | ~70 млн (50% жилого фонда) | EPA |
| Рынок ремонта фундаментов | $11.8 млрд (2025) | FMI |
| Звонки в ASPCA Poison Control | 451,000+/год | ASPCA 2024 |

**Эмоциональная интенсивность**: Это не «curious to know» — это «my child might be in danger». Страх/паника — мощнейший conversion driver. Ценовая чувствительность падает в момент тревоги.

### 1.3 Как люди решают проблему сейчас?

| Текущее решение | Время до ответа | Качество ответа | Стоимость |
|----------------|-----------------|-----------------|-----------|
| **Google** | 30–60 мин чтения | Противоречивая информация, усиливает тревогу | $0 |
| **Reddit** (r/whatsthisbug, r/homeimprovement) | 2–24 часа | Зависит от сообщества, часто «hard to tell from photo» | $0 |
| **iNaturalist** | Часы–дни (community verification) | Хорошая ID видов, но нет danger assessment | $0 |
| **Google Lens** | Мгновенно | ~50% точность для насекомых, нет danger rating | $0 |
| **ChatGPT с фото** | 10–30 сек | Стена текста, нет structured output, нет geo-intelligence | $0–$20/мес |
| **Телефон педиатру/врачу** | 24 часа (рабочие дни) | Высокое, но недоступно ночью/в выходные | $0–$40 copay |
| **ER** | 3+ часа ожидания | Высокое | $200–$500 |
| **Pest control (cold call)** | Следующий бизнес-день | Заинтересованы в завышении масштаба работ | $100–$300 за осмотр |
| **Structural engineer** | 1–2 недели | Высокое | $300–$800 за инспекцию |
| **TickCheck (экспертная оценка)** | 2–5 бизнес-дней | Высокое | $50–$200 |

### 1.4 Почему текущие решения не работают?

| Проблема | Описание |
|----------|----------|
| **Скорость** | Паника требует ответа за секунды, не часы/дни. Google = 30+ мин. Reddit = часы. Врач = до завтра. ER = часы |
| **Фрагментация** | 3 проблемы дома = 3 отдельных исследования, 3 разных приложения. Нет единого инструмента |
| **Отсутствие danger assessment** | Все инструменты отвечают «что это?», но НИ ОДИН не отвечает «насколько это опасно?» и «что делать?» |
| **Нет action layer** | Определил brown recluse — и что дальше? Никто не связывает с pest control в одно касание |
| **Нерелевантность** | Google не знает твой регион, возраст ребёнка, время с момента укуса. Информация generic |
| **Усиление тревоги** | WebMD превращает каждый укус в рак. Mom groups алармистские. Reddit — «better safe than sorry» → ER за $500 из-за комара |
| **Asymmetric information** | Подрядчики заинтересованы в завышении проблемы. Нет нейтрального советника |
| **Прокрастинация** | Неизвестность → тревога → откладывание → проблема усугубляется |

---

## 2. Наше решение

### 2.1 Ключевое обещание

**Сфотографируй опасность → получи мгновенную оценку (red/yellow/green) с конкретным планом действий и связью со специалистом в одно касание.**

### 2.2 Value Proposition

> **Для** родителей, домовладельцев и любителей активного отдыха, **у которых** нет возможности быстро определить, опасен ли укус, паук, змея, плесень, трещина в стене, клещ, гусеница или растение, **наш** Danger Scanner **позволяет** за 3 секунды получить оценку опасности с конкретным планом действий и связаться со специалистом в одно касание, **в отличие от** Google (30 мин чтения, нет ответа), Reddit (часы ожидания), и одно-категорийных приложений (только ID, без danger assessment), **потому что** мы объединяем 8 категорий опасностей + AI danger assessment + referral network + community geo-map в одном приложении.

### 2.3 Три главных дифференциатора vs конкуренты

| # | Дифференциатор | Мы | Конкуренты | Источник |
|---|---------------|----|-----------|---------| 
| 1 | **Multi-category danger assessment** | 8 категорий + red/yellow/green + action card | Каждый конкурент = 1 категория, только ID без danger rating. Spider ID = 2.6–3.1 stars. Mold apps = nascent. Wall cracks = НОЛЬ apps | COMPETITORS.md — Gap Analysis |
| 2 | **One-tap specialist referral** | Pest control, mold remediation, structural engineer, telemedicine — в одно касание | НОЛЬ конкурентов связывают пользователя со специалистом. Picture Insect — только ID. SnakeSnap — только ID | COMPETITORS.md — Сводная таблица |
| 3 | **Community danger geo-map** | «47 brown recluse отчётов в вашем ZIP за месяц». Compounding data moat | iNaturalist = biodiversity (не danger). TickTracker = только клещи. Остальные = нет geo-data вообще | COMPETITORS.md — Gap Analysis |

### 2.4 "Aha-moment"

**Момент, когда пользователь понимает ценность:**

Первый скан, который:
1. Правильно идентифицирует объект (пользователь подтверждает: «да, похоже»)
2. Даёт конкретный danger level (red/yellow/green), а не стену текста
3. Объясняет, что делать прямо сейчас (action card)
4. Предлагает связаться со специалистом в одно касание

**Конкретный сценарий**: Sarah фотографирует красное пятно на руке сына в 10:30 PM. Через 3 секунды: «🟢 Похоже на комариный укус. Приложите лёд, примените Benadryl если зуд. Следите 24 часа. Если появится кольцевое покраснение или отёк увеличится — обратитесь к врачу.»

Sarah выдыхает. Она получила то, ради чего обычно тратила 45 минут гугления или $40 copay педиатра. **Это aha-moment.**

**Путь к aha-moment:** Max 2 тапа: Open app → Tap scan → Result. Нет регистрации, нет онбординга, нет paywall до первого скана.

---

## 3. Validation Checklist

### Проблема подтверждена данными

- [x] 500K–1.5M+ поисков/месяц только по «what bit me» (BUG-BITE-DEEP-DIVE.md)
- [x] ~1 млн ER-визитов/год из-за укусов (CDC NEISS-AIP)
- [x] ~31 млн укусов клещей/год в США (CDC)
- [x] ~70 млн домов с плесенью (50% жилого фонда) (EPA)
- [x] Reddit полон вопросов «is this dangerous?» с ожиданием часами (USER-PERSONAS.md)
- [x] Рекорд ER-визитов по клещам в 2025 (+42% за год) (CDC)
- [x] $7.5 млрд ежегодных медицинских расходов на укусы (CDC)

### Аудитория достаточно большая

- [x] TAM $2.4–3.0B (подписки на ID-приложения) (MARKET-RESEARCH.md, Раздел 8)
- [x] TAM referral: $40B+ (pest control $28.5B + foundation $11.8B + mold $1.3B) (MARKET-RESEARCH.md)
- [x] SAM: 4–6 млн потенциальных пользователей (PRODUCT-BRIEF.md, Раздел 2)
- [x] SOM Year 3: $15–25M ARR (PRODUCT-BRIEF.md, Раздел 10)
- [x] PictureThis доказал: $100M+/год на «identify from photo» subscription (COMPETITORS.md)
- [x] 3 персоны покрывают ~93M+ потенциальных пользователей (35M parents + 8M homebuyers + 50M hikers)

### Конкурентов можно обойти

- [x] Unified danger ID = 0 конкурентов. Категория не существует (COMPETITORS.md — Saturation Score 2/10)
- [x] Spider ID apps = 2.6–3.1 stars (COMPETITORS.md, Раздел 1.4)
- [x] Mold apps = nascent, 2024–2025, минимальный трекшн (COMPETITORS.md, Раздел 1.3)
- [x] Wall crack assessment = НОЛЬ consumer apps (COMPETITORS.md, Раздел 5)
- [x] Critterpedia (ближайший аналог) = 2/8 категорий, бета 6+ лет, только Австралия (COMPETITORS.md, Раздел 1.5)
- [x] Репликация комбинации (8 категорий + referral + geo-map) = 18–24 месяца (COMPETITORS.md, Раздел 5.2)

### Техническая реализация возможна

- [x] Bug bite accuracy: 84–86% (DeepBiteNet 2025) — достаточно для MVP с conservative bias (DOMAIN-RESEARCH.md)
- [x] Snake identification: 85–95% при хорошем фото (DOMAIN-RESEARCH.md)
- [x] Contextual questions повышают accuracy на 10–15% (RESEARCH-BRIEF.md)
- [x] On-device ML (Core ML, TF Lite) позволяет offline basic mode (PRODUCT-BRIEF.md, Раздел 9)
- [x] Мультимодальные LLM (GPT-4V, Claude Vision) — ready для action card generation (MARKET-RESEARCH.md, Раздел 13)
- [x] Conservative bias engine при confidence <85% → yellow (RESEARCH-BRIEF.md, Insight 4)
- [x] Wall cracks — наименее mature (65–75%), но контекстные вопросы компенсируют (DOMAIN-RESEARCH.md)

---

## 4. Risks & Mitigations (сводка)

| Риск | Вероятность | Импакт | Митигация |
|------|------------|--------|-----------|
| AI accuracy недостаточна | 40% | Высокий | Старт с 2–4 сильнейших категорий; conservative bias; contextual questions (+10–15%) |
| Юридическая ответственность | 30% | Очень высокий | «Educational, not diagnostic»; disclaimer на каждом результате; E&O insurance; ToS с arbitration |
| Skin tone bias | 60% | Средний–высокий | Diverse training data (≥15% каждого Fitzpatrick type); тестирование по типам кожи до запуска |
| ChatGPT commoditization | 35% | Средний | Моаты: geo-map, referral network, push alerts, scan history — нереплицируемы LLM |
| Referral network сложно построить | 40% | Средний | Старт через aggregators (Angi, Thumbtack); dedicated partnerships к месяцу 6 |

Полная карта рисков: RESEARCH-BRIEF.md, Раздел 4.

---

## Источники

- RESEARCH-BRIEF.md — scoring table, insights, risks, verdict
- MARKET-RESEARCH.md — market size, TAM/SAM/SOM, referral economics
- COMPETITORS.md — gap analysis, saturation score, positioning map
- DOMAIN-RESEARCH.md — AI accuracy benchmarks, expert standards
- PRODUCT-BRIEF.md — product overview, features, monetization
- BUG-BITE-DEEP-DIVE.md — search volume, competitive landscape
- USER-PERSONAS.md — персоны, цитаты из Reddit

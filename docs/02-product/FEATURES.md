# Danger Scanner — Функциональность (Features)

**Дата:** 12 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Основан на:** PRODUCT-BRIEF.md, RESEARCH-BRIEF.md, TARGET-AUDIENCE.md, PROBLEM-SOLUTION-FIT.md

---

## MVP (Must Have) — Запуск

### F-001: Камера-скан с мгновенной оценкой опасности

| Поле | Описание |
|------|----------|
| **Название** | Danger Scan |
| **User Story** | Как родитель, я хочу сфотографировать укус / паука / змею / плесень / трещину / клеща / гусеницу / растение и получить мгновенный результат, чтобы понять, опасно ли это и что делать |
| **Acceptance Criteria** | ☐ Камера открывается за <1 сек после тапа по кнопке Scan ☐ Поддержка фото из камеры и из Camera Roll ☐ Результат отображается за ≤5 секунд (с интернетом) ☐ Результат содержит: идентификация + danger level (red/yellow/green) + краткое описание ☐ При confidence <85% — danger level не ниже yellow ☐ Disclaimer виден на каждом экране результата ☐ Работает для категорий Phase 1: пауки, змеи, клещи, укусы |
| **Экран** | Camera → Result Screen |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | XL |

### F-002: Контекстные вопросы после скана

| Поле | Описание |
|------|----------|
| **Название** | Contextual Questions |
| **User Story** | Как пользователь, я хочу ответить на 2–3 быстрых вопроса после скана, чтобы получить более точную оценку опасности |
| **Acceptance Criteria** | ☐ 2–3 вопроса в формате quick-tap (не текстовый ввод) ☐ Вопросы адаптируются к категории: укусы (локализация, время, симптомы), мold (комната, протечка, площадь), трещины (этаж, динамика, ширина), змеи (регион, среда, размер) ☐ Каждый вопрос = 1 тап (варианты ответа) ☐ Результат уточняется после ответов ☐ Вопросы необязательны (можно пропустить) |
| **Экран** | Post-Scan Questions → Updated Result |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | L |

### F-003: Экран результата с Action Card

| Поле | Описание |
|------|----------|
| **Название** | Result + Action Card |
| **User Story** | Как родитель в панике, я хочу получить конкретный план действий (что делать прямо сейчас, когда к врачу), чтобы не тратить время на Google |
| **Acceptance Criteria** | ☐ Danger level: визуально чёткий red / yellow / green ☐ Идентификация: «Похоже на [название]» с confidence % ☐ Action Card: 1) Немедленные действия (first aid) 2) Когда обращаться за помощью (ER / urgent care / врач / не нужно) 3) Что НЕ делать ☐ Disclaimer: «Informational only, not medical advice» ☐ CTA: «Связаться со специалистом» (referral) ☐ CTA: «Сохранить результат» |
| **Экран** | Result Screen |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | L |

### F-004: Conservative Bias Engine

| Поле | Описание |
|------|----------|
| **Название** | Conservative Bias |
| **User Story** | Как пользователь safety-critical приложения, я хочу, чтобы приложение перестраховывалось, а не недооценивало опасность, чтобы я не пропустил реальную угрозу |
| **Acceptance Criteria** | ☐ При confidence <85% → danger level ≥ yellow (НИКОГДА green) ☐ Для змей: НИКОГДА не говорить «неядовитая» определённо ☐ Для плесени: НИКОГДА не говорить «нетоксичная» ☐ Для любого укуса змеи: ВСЕГДА рекомендовать 911 ☐ При системных симптомах (отёк лица, затруднённое дыхание): ВСЕГДА red + «Вызовите 911» ☐ Логика conservative bias покрыта unit-тестами |
| **Экран** | Backend (влияет на все Result Screens) |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | M |

### F-005: Регистрация и профиль пользователя

| Поле | Описание |
|------|----------|
| **Название** | Auth + Profile |
| **User Story** | Как пользователь, я хочу создать аккаунт, чтобы сохранять историю сканов и синхронизировать между устройствами |
| **Acceptance Criteria** | ☐ Sign up: Email + password, Apple Sign-In, Google Sign-In ☐ Первый скан доступен БЕЗ регистрации (guest mode) ☐ Профиль: имя, регион (ZIP code), наличие детей (да/нет), наличие питомцев (тип) ☐ Регион используется для geo-intelligence (региональные виды) ☐ Данные хранятся в Supabase |
| **Экран** | Onboarding → Profile |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | M |

### F-006: История сканирований

| Поле | Описание |
|------|----------|
| **Название** | Scan History |
| **User Story** | Как родитель, я хочу видеть все мои прошлые сканы с фото, результатами и датами, чтобы показать врачу или отслеживать динамику |
| **Acceptance Criteria** | ☐ Список всех сканов (фото thumbnail + danger level + дата) ☐ Tap → полный результат (как при первом скане) ☐ Фильтр по категории (укусы, пауки, плесень и т.д.) ☐ Сортировка по дате ☐ Экспорт результата (share image / PDF) ☐ Бесплатные пользователи: последние 5 сканов. Premium: unlimited |
| **Экран** | History Tab |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | M |

### F-007: Paywall и подписка

| Поле | Описание |
|------|----------|
| **Название** | Subscription Paywall |
| **User Story** | Как пользователь, я хочу попробовать приложение бесплатно и подписаться, если оно мне полезно, чтобы получить unlimited доступ |
| **Acceptance Criteria** | ☐ Free tier: 3 скана/месяц, базовый результат, последние 5 в истории ☐ Premium: unlimited скан, полные action cards, вся история, без рекламы ☐ Цены: $4.99/мес или $29.99/год (через Adapty) ☐ 7-дневный бесплатный trial для Premium ☐ Paywall показывается ПОСЛЕ первого успешного скана (не до) ☐ Интеграция с Adapty для управления подписками ☐ Restore purchase работает |
| **Экран** | Paywall Screen (модальный) |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | L |

### F-008: Onboarding

| Поле | Описание |
|------|----------|
| **Название** | Onboarding Flow |
| **User Story** | Как новый пользователь, я хочу за 30 секунд понять, что делает приложение и сделать первый скан, чтобы увидеть ценность до paywall |
| **Acceptance Criteria** | ☐ 3 экрана: 1) «Сфотографируй опасность» 2) «Получи мгновенную оценку» 3) «Узнай, что делать» ☐ Skip доступен на каждом экране ☐ Запрос разрешения камеры — на экране 1 ☐ Запрос push notifications — после первого скана ☐ Demo scan: пример результата (укус комара → green) ☐ Время полного прохождения: <30 секунд |
| **Экран** | Onboarding (3 screens) |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | S |

### F-009: Push Notifications (базовые)

| Поле | Описание |
|------|----------|
| **Название** | Push Alerts |
| **User Story** | Как родитель, я хочу получать предупреждения о начале сезона клещей в моём регионе, чтобы быть готовой к опасностям |
| **Acceptance Criteria** | ☐ Geo-targeted сезонные алерты (tick season, snake season) ☐ Напоминание о re-scan (для плесени/трещин: «30 дней с последнего скана — время проверить») ☐ Не более 2 пушей/неделю (анти-спам) ☐ Управление уведомлениями в настройках ☐ Premium-only (кроме одного бесплатного alert при регистрации) |
| **Экран** | Settings → Notifications |
| **Приоритет** | P1 (нужно к запуску) |
| **Сложность** | M |

### F-010: Disclaimer и legal compliance

| Поле | Описание |
|------|----------|
| **Название** | Legal Layer |
| **User Story** | Как владелец продукта, я хочу, чтобы все экраны содержали правильные disclaimers, чтобы минимизировать юридическую ответственность |
| **Acceptance Criteria** | ☐ Disclaimer на КАЖДОМ экране результата: «Educational and informational only. Not a substitute for professional medical advice» ☐ ToS с arbitration clause (экран при регистрации) ☐ Privacy Policy (GDPR/CCPA compliant) ☐ Позиционирование: «resembles», «consistent with», «consider consulting» — НИКОГДА «this is», «you have», «diagnosis» ☐ Для змей: ВСЕГДА «Call 911 if bitten» независимо от ID |
| **Экран** | Все экраны результатов + Settings |
| **Приоритет** | P0 (блокер запуска) |
| **Сложность** | S |

---

## Should Have — v1.1

### F-011: Community Danger Geo-Map

| Поле | Описание |
|------|----------|
| **Название** | Danger Map |
| **User Story** | Как хайкер, я хочу видеть, какие опасности обнаружены в моём районе, чтобы знать, на что обращать внимание |
| **Acceptance Criteria** | ☐ Карта с heat-map по категориям ☐ Фильтр по типу опасности ☐ Анонимизированные данные (нет точных адресов) ☐ «47 brown recluse отчётов в вашем ZIP за месяц» |
| **Экран** | Map Tab |
| **Приоритет** | P2 |
| **Сложность** | XL |

### F-012: One-Tap Specialist Referral

| Поле | Описание |
|------|----------|
| **Название** | Specialist Referral |
| **User Story** | Как домовладелец, я хочу связаться с проверенным pest control / mold remediation / structural engineer в одно касание, чтобы не обзванивать подрядчиков наугад |
| **Acceptance Criteria** | ☐ CTA «Связаться со специалистом» на экране результата ☐ Категории: pest control, mold remediation, structural engineer, telemedicine ☐ Интеграция через aggregators (Angi, Thumbtack) на старте ☐ Tracking: referral отправлен → завершён |
| **Экран** | Result Screen → Referral Flow |
| **Приоритет** | P2 |
| **Сложность** | L |

### F-013: Offline Basic Mode

| Поле | Описание |
|------|----------|
| **Название** | Offline Scan |
| **User Story** | Как хайкер на тропе без интернета, я хочу получить базовую оценку опасности, чтобы принять решение прямо сейчас |
| **Acceptance Criteria** | ☐ On-device модели для top-50 видов per category ☐ Red/yellow/green результат без облачной обработки ☐ Полные данные подгружаются при появлении связи ☐ Индикатор «Offline mode — базовая оценка» |
| **Экран** | Result Screen (offline variant) |
| **Приоритет** | P2 |
| **Сложность** | XL |

### F-014: Family Plan

| Поле | Описание |
|------|----------|
| **Название** | Family Sharing |
| **User Story** | Как мама, я хочу добавить мужа и бабушку к подписке, чтобы вся семья могла сканировать |
| **Acceptance Criteria** | ☐ До 5 пользователей на одну подписку ☐ Общая история сканирований (по желанию) ☐ $7.99/мес или $49.99/год |
| **Экран** | Settings → Family |
| **Приоритет** | P2 |
| **Сложность** | L |

### F-015: Photo Quality Assistant

| Поле | Описание |
|------|----------|
| **Название** | Photo Guide |
| **User Story** | Как пользователь, я хочу получить подсказки при фотографировании (ближе, свет, фокус), чтобы AI дал более точный результат |
| **Acceptance Criteria** | ☐ Real-time подсказки на camera overlay: «Move closer», «Better lighting needed», «Hold steady» ☐ Оценка качества фото до отправки ☐ Возможность переснять |
| **Экран** | Camera Screen overlay |
| **Приоритет** | P2 |
| **Сложность** | M |

### F-016: Расширение категорий (Phase 2)

| Поле | Описание |
|------|----------|
| **Название** | Mold + Plants Categories |
| **User Story** | Как домовладелец, я хочу сканировать плесень и подозрительные растения, чтобы защитить семью и питомцев |
| **Acceptance Criteria** | ☐ Плесень: идентификация наличия, оценка масштаба, рекомендации (EPA guidelines) ☐ Растения: токсичность для людей, детей, кошек, собак (ASPCA database) ☐ Специфические contextual questions для каждой категории ☐ Conservative bias: НИКОГДА «нетоксичная плесень» и «безопасное растение» определённо |
| **Экран** | Camera → Result (новые категории) |
| **Приоритет** | P2 |
| **Сложность** | XL |

---

## Could Have — v2.0

### F-017: Mold/Crack Growth Tracking
Серия фото одного и того же места → отслеживание изменений: «Плесень выросла на 30% за месяц». Временная шкала для трещин. Алерт при значительных изменениях.

### F-018: Bite Healing Timeline
Отслеживание заживления укуса: фото каждый день → «укус уменьшается» или «обратитесь к врачу — возможна инфекция».

### F-019: B2B Property Management Portal
Web-dashboard для property managers: сканирование каждой единицы при turnover, документирование, reporting.

### F-020: Insurance Integration
Партнёрство с homeowner insurance: раннее обнаружение плесени/трещин → снижение claims → скидка на страховку.

### F-021: Расширение категорий (Phase 3)
Wall Cracks + Caterpillars: структурная оценка трещин + идентификация жалящих гусениц. Самый дорогой referral (foundation repair $150–$500/лид).

### F-022: Multi-language Support
Испанский (42M+ Spanish speakers в США), позже — расширение на другие языки и регионы.

### F-023: Pet-Specific Mode
Режим для питомцев: «Мой кот контактировал с этим растением — опасно ли?» Интеграция с ASPCA базой данных.

### F-024: AR Danger Overlay
Augmented Reality overlay при наведении камеры: подсветка потенциально опасных объектов в реальном времени.

---

## Won't Have (сейчас)

| Фича | Почему НЕ делаем |
|------|-----------------|
| **Медицинская диагностика** | FDA SaMD classification = 2–5 лет на clearance. Позиционируемся как educational |
| **AI-чат для медицинских вопросов** | Liability risk. Не конкурируем с telehealth |
| **Определение вида плесени** | Невозможно по фото (CDC/EPA подтверждают). Только наличие + масштаб |
| **Тестирование клеща на Borrelia** | Требует лабораторного анализа. CDC НЕ рекомендует тестирование клещей |
| **Social features / форум** | Reddit уже решает эту задачу. Не наш core value |
| **Wearable интеграция** | Apple Watch / Fitbit не дают нужных данных. Преждевременно |
| **Gamification** | Safety-critical app ≠ gamification. Неуместно |
| **Видео-скан** | Фото достаточно для MVP. Видео = complexity без существенного gain |
| **Desktop / web version** | Mobile-first (камера). Web — для B2B portal позже |
| **White-label для pest control** | Отвлекает от core product. Рассмотреть в v2.0+ |

---

## MVP Scope Summary

### Must Have (P0 + P1) — Запуск

| # | Фича | Экраны | Сложность | Приоритет |
|---|------|--------|-----------|-----------|
| F-001 | Danger Scan (камера) | Camera, Result | XL | P0 |
| F-002 | Contextual Questions | Post-Scan | L | P0 |
| F-003 | Result + Action Card | Result Screen | L | P0 |
| F-004 | Conservative Bias Engine | Backend | M | P0 |
| F-005 | Auth + Profile | Onboarding, Profile | M | P0 |
| F-006 | Scan History | History Tab | M | P1 |
| F-007 | Subscription Paywall | Paywall Modal | L | P0 |
| F-008 | Onboarding | 3 screens | S | P1 |
| F-009 | Push Alerts (базовые) | Settings | M | P1 |
| F-010 | Legal Layer | All Result Screens | S | P0 |

### Итого MVP

| Метрика | Значение |
|---------|---------|
| **Фичей P0** | 6 |
| **Фичей P1** | 4 |
| **Всего фичей MVP** | 10 |
| **Уникальных экранов** | ~12–15 (Onboarding x3, Camera, Post-Scan Questions, Result, History, Profile, Settings, Paywall, Home/Dashboard) |
| **Категории на запуск (Phase 1)** | 4: Пауки, Змеи, Клещи, Укусы |
| **Оценка объёма** | XL (3 фронтенд-модуля + ML pipeline + Supabase backend + Adapty интеграция) |

### Фазы расширения

| Фаза | Сроки | Что добавляем |
|------|-------|--------------|
| **MVP** | Месяцы 1–4 | 4 категории + core scan + paywall + history |
| **v1.1** | Месяцы 4–8 | Geo-map + referral + offline + family plan + mold + plants |
| **v2.0** | Месяцы 8–14 | Wall cracks + caterpillars + tracking + B2B + AR |

---

## Источники

- PRODUCT-BRIEF.md — features list, technical architecture, monetization tiers
- RESEARCH-BRIEF.md — launch strategy, technical priorities
- TARGET-AUDIENCE.md — primary persona (Sarah), jobs-to-be-done
- PROBLEM-SOLUTION-FIT.md — aha-moment, value proposition
- DOMAIN-RESEARCH.md — conservative bias rules, accuracy limitations

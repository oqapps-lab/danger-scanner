# Синтез исследований: Best Practices для Danger Scanner

**Дата:** 13 апреля 2026
**Источники:** ONBOARDING-RESEARCH.md, PAYWALL-RESEARCH.md, RETENTION-RESEARCH.md, ASO-RESEARCH.md
**Контекст:** AI-идентификация опасностей, 8 категорий, $4.99/мес, $29.99/год, 3 бесплатных скана/мес

---

## MUST-DO чеклист (что ОБЯЗАТЕЛЬНО внедрить)

### Онбординг

- [ ] **Первый скан БЕЗ регистрации** — Duolingo: отложенная регистрация дала +20% DAU. 60–80% пользователей уходят без aha-момента ([Taplytics](https://taplytics.com/blog/duolingo-ab-test-onboarding/), [Digia](https://www.digia.tech/post/mobile-app-onboarding-activation-retention))
- [ ] **Aha-moment ДО paywall** — 80% триалов начинаются в Day 0, 55% отмен — тоже в Day 0. Ценность должна быть мгновенной ([RevenueCat 2024](https://www.revenuecat.com/state-of-subscription-apps-2024/))
- [ ] **3–5 шагов онбординга + мини-квиз** — всё свыше 5 шагов ведёт к резкому drop-off. Квиз = персонализация + инвестиция ([Adapty](https://adapty.io/blog/mobile-app-onboarding/))
- [ ] **Прогресс-бар, начатый с 15%** — Endowed Progress Effect + эффект Зейгарник мотивируют завершить процесс ([Userpilot](https://userpilot.com/blog/progress-bar-psychology/))
- [ ] **Social proof с точными цифрами** — "247,391 опасностей идентифицировано" конвертит лучше, чем "тысячи". Рейтинг 4.2–4.5 лучше 5.0 ([Glance](https://thisisglance.com/learning-centre/when-should-apps-use-social-proof-in-onboarding))

### Paywall

- [ ] **Metered paywall (3 скана/мес) + soft paywall на premium** — metered конвертирует 5–10% вовлечённых пользователей, индустриальная норма = 5 бесплатных единиц ([Admiral](https://blog.getadmiral.com/freemium-vs.-metered-paywalls-pros-cons-and-best-practices))
- [ ] **7-дневный opt-out trial** — opt-out: 48.8% конверсии vs 18.2% opt-in. 5–9 дней = медиана 45% ([Business of Apps](https://www.businessofapps.com/data/app-subscription-trial-benchmarks/), [RevenueCat](https://www.revenuecat.com/blog/growth/7-day-trial-subscription-app/))
- [ ] **Годовой план первый с badge "Лучшее предложение"** — 59% выбирают годовой при скидке 30–40%, годовые подписчики 2.4x прибыльнее ([Subscription Index](https://www.subscriptionindex.com/guides/annual-vs-monthly-pricing))
- [ ] **Анимированный paywall** — 2.9x конверсия vs статический дизайн ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/))
- [ ] **Реальные отзывы из App Store вверху paywall** — замена длинного paywall на короткий с отзывами дала +72% конверсии install-to-trial ([Stormy AI](https://stormy.ai/blog/10-mobile-app-paywall-design-principles))
- [ ] **A/B тестирование paywall с Day 1 через Adapty** — приложения с 50+ экспериментами зарабатывают 18.7x больше ([Adapty 2026](https://adapty.io/state-of-in-app-subscriptions/))

### Retention

- [ ] **Таргетированные push (не broadcast)** — таргетированные: 39% retention vs 21% broadcast. 1 push в 90 дней = 3x retention ([Mobiloud](https://www.mobiloud.com/blog/push-notification-statistics))
- [ ] **1–2 push в неделю максимум** — 6+/неделю: 32% удаляют приложение ([Business of Apps](https://www.businessofapps.com/marketplace/push-notifications/research/push-notifications-statistics/))
- [ ] **Гео-карта сообщества как ядро retention** — Strava: 35+ взаимодействий/мес vs <15 у конкурентов. Сетевой эффект = sticky product ([Trophy](https://trophy.so/blog/strava-gamification-case-study))
- [ ] **Сезонные geo-alerts** — 8 категорий = круглогодичная релевантность. "Сезон клещей в вашем регионе" — контекстный push
- [ ] **Streaks "серия безопасности"** — Duolingo: пользователи с 7+ дней серии в 3.6x вероятнее остаются. Streak Freeze снижает churn на 21% ([Lenny's Newsletter](https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth))
- [ ] **Значки коллекционера по 8 категориям** — значки Duolingo дали скачок рефералов на 116% ([StriveCloud](https://www.strivecloud.io/blog/habit-formation-user-retention))

### ASO

- [ ] **Ключевые слова в title и subtitle** — title = самый весомый фактор ранжирования. Рекомендация: `Danger Scanner: AI Safety ID` / `Bug Bite, Snake & Mold Scan` ([Appfigures](https://appfigures.com/resources/guides/app-name-optimization))
- [ ] **Первые 3 скриншота = основной конверсионный элемент** — 90% не листают дальше. Скриншот 1: камера сканирует укус ([ASOMobile](https://asomobile.net/en/blog/screenshots-for-app-store-and-google-play-in-2025-a-complete-guide/))
- [ ] **Текст на скриншотах с ключевыми словами** — Apple индексирует текст скриншотов с июня 2025 ([Appfigures](https://appfigures.com/resources/guides/app-store-algorithm-update-2025))
- [ ] **Видео-превью 15–30 сек, портрет** — +20–30% конверсии, портрет +5% vs landscape ([SplitMetrics](https://splitmetrics.com/blog/create-app-preview-video-app-store-ios/), [Phiture](https://phiture.com/blog/aso-trends-in-2026/))
- [ ] **Custom Product Pages под каждую категорию опасности** — CPP в органике с июля 2025, +5.9% CVR в среднем ([Phiture](https://phiture.com/asostack/keyword-based-custom-product-pages-cpps-arrive-in-app-store-connect/))

---

## AVOID чеклист (чего ИЗБЕГАТЬ)

- [ ] **Регистрация до ценности** — каждый 4-й пользователь открывает приложение ровно 1 раз. Требовать аккаунт до первого скана = потеря пользователей ([Reteno](https://reteno.com/blog/won-in-60-seconds-how-top-apps-nail-onboarding-to-drive-subscriptions))
- [ ] **Онбординг > 5 шагов без квиза** — длинные потоки без ощущения инвестиции = смертный приговор. Исключение: квизы типа Noom ([Usetiful](https://blog.usetiful.com/2025/08/how-to-fix-mobile-onboarding-mistakes.html))
- [ ] **Статический paywall** — анимированные конвертят в 2.9x лучше. Статика = потерянные деньги ([Adapty 2026](https://adapty.io/blog/high-performing-paywall-2026/))
- [ ] **Broadcast push без сегментации** — потеря >50% аудитории после 3 сессий. Таргетированные = 2x retention ([Mobiloud](https://www.mobiloud.com/blog/push-notification-statistics))
- [ ] **6+ push в неделю** — 46% отключат уведомления, 32% удалят приложение ([Business of Apps](https://www.businessofapps.com/marketplace/push-notifications/research/push-notifications-statistics/))
- [ ] **Over-gamification** — если всё ощущается как игра, награды теряют ценность. Геймификация должна усиливать core value, а не заменять его ([Nudge](https://nudgenow.com/blogs/push-notifications-as-a-commodity-the-need-for-gamification-in-user-engagement))
- [ ] **Навязчивые permission requests при старте** — топ-фактор ранней деинсталляции. Камеру запрашивать только перед первым сканом ([CleverTap](https://clevertap.com/blog/uninstall-apps/))
- [ ] **Округлённые цифры social proof** — "тысячи пользователей" конвертит хуже, чем "47,392 пользователя". Точность = доверие ([Glance](https://thisisglance.com/learning-centre/when-should-apps-use-social-proof-in-onboarding))
- [ ] **Первый скриншот с брендингом** — должен показывать ключевое действие (сканирование), а не логотип ([MobileAction](https://www.mobileaction.co/guide/app-screenshot-sizes-and-guidelines-for-the-app-store/))
- [ ] **Игнорирование "парадокса успеха"** — в health/utility приложениях решённая проблема = уход пользователя. Нужны превентивные сканы, Safety Score, образовательный контент ([Adjust](https://www.adjust.com/blog/health-tracker-installs-and-retention-data/))

---

## Рекомендации по экранам

| Экран | Что должно быть | Источник/обоснование |
|-------|----------------|---------------------|
| **Onboarding Step 1: Welcome** | Заголовок "Определи опасность за 3 секунды" + демо-скан (тестовое фото). Без регистрации. Прогресс-бар 15% | Duolingo +20% DAU от delayed registration; Headspace — ценность за 30 сек |
| **Onboarding Step 2: Квиз Q1** | "Что вас беспокоит?" — мультивыбор 8 категорий. Прогресс-бар 35% | Noom: квиз как инвестиция повышает конверсию paywall |
| **Onboarding Step 3: Квиз Q2–Q3** | "Где вы живёте?" (для гео-опасностей) + "Есть ли дети?" (режим безопасности детей). Прогресс-бар 55% | Персонализация paywall = +17% конверсии |
| **Onboarding Step 4: Social Proof** | Рейтинг 4.7/5, точное кол-во сканирований, 1–2 реальных отзыва. Прогресс-бар 75% | Social proof: отзывы на paywall = +72% конверсии |
| **Onboarding Step 5: Paywall** | Анимированный. "Ваш персональный план безопасности готов". Годовой план первый с "Лучшее предложение". 7-дневный trial. Таймлайн (как Headspace). Free vs Premium таблица. Прогресс-бар 100% | Анимация 2.9x; Opt-out 48.8%; 82% триалов Day 0 |
| **Home Screen** | Кнопка "Сканировать" в центре. Счётчик оставшихся бесплатных сканов. Карта опасностей поблизости (preview). Серия безопасности (streak) | Strava: 35+ взаимодействий/мес от карты. Streaks: 3.6x retention |
| **Scan Result** | Danger level (red/yellow/green). Action card. Кнопка "Связаться со специалистом". "Поделиться результатом". Коллекционный значок (если новая категория) | Core value момент. Шаринг = виральность |
| **Community Map** | Тепловая карта опасностей в районе. Alerts от соседей. Фильтры по категории. Рейтинг районов | Strava Segments модель. Сетевой эффект как retention moat |
| **Profile** | Safety Score дома. Серия дней. Коллекция значков (8 категорий). История сканов | Gamification +22% retention. Badges +116% рефералов |
| **Metered Paywall** | При исчерпании 3 сканов: "Разблокируйте неограниченные сканы". Альтернативный оффер для неконвертированных (+240% retry конверсии) | Повторный таргетинг: +240% стартов trial, +97% revenue/user |

---

## KPI targets (из бенчмарков)

### Воронка онбординга

| Метрика | Median | Top 25% | Наша цель (6 мес) | Источник |
|---------|--------|---------|-------------------|----------|
| Onboarding completion | 25% | 50%+ | 40% | [Business of Apps](https://www.businessofapps.com/data/app-onboarding-rates/) |
| Trial start rate (Day 0) | 4.8% (общий) | 12% (upfront) | 10% | [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) |
| Trial to paid | 37.3% | 45%+ | 40% | [Business of Apps](https://www.businessofapps.com/data/app-subscription-trial-benchmarks/) |
| Install to paid (итого) | 2.1% | 5%+ | 3.5% | [RevenueCat 2026](https://www.revenuecat.com/blog/growth/hard-paywall-vs-soft-paywall/) |

### Retention

| Метрика | Median (Health) | Top 25% | Наша цель (6 мес) | Источник |
|---------|----------------|---------|-------------------|----------|
| D1 retention | 20–27% | 40%+ | 35% | [Plotline](https://www.plotline.so/blog/retention-rates-mobile-apps-by-industry/) |
| D7 retention | ~7% (Health) | 15%+ | 15% | [Plotline](https://www.plotline.so/blog/retention-rates-mobile-apps-by-industry/) |
| D30 retention | ~3% (Health) | 8%+ | 8% | [Plotline](https://www.plotline.so/blog/retention-rates-mobile-apps-by-industry/) |
| D90 retention | — | — | 4% | Расчёт от D30 |

### Монетизация

| Метрика | Median | Top 25% | Наша цель (6 мес) | Источник |
|---------|--------|---------|-------------------|----------|
| Payer LTV (12 мес) | $16.44 (H&F) | $31.12 | $25 | [Adapty H&F](https://adapty.io/blog/health-fitness-app-subscription-benchmarks/) |
| Annual plan share | 50% | 60%+ | 60% | [RevenueCat 2025](https://www.revenuecat.com/state-of-subscription-apps-2025/) |
| Paywall impression-to-trial | 8–12% | 15%+ | 12% | [Stormy AI](https://stormy.ai/blog/app-paywall-onboarding-optimization-guide) |

### ASO

| Метрика | Median | Top 25% | Наша цель (6 мес) | Источник |
|---------|--------|---------|-------------------|----------|
| App Store page CVR | 25% (US avg) | 35%+ | 30% | [AppTweak](https://www.apptweak.com/en/aso-blog/average-app-conversion-rate-per-category) |
| App Store rating | 4.0 | 4.5+ | 4.4+ | [AppTweak](https://www.apptweak.com/en/aso-blog/aso-app-store-trends-benchmarks-report) |
| Push opt-in rate | 60% | 72% (Finance) | 65% | [Airship](https://www.airship.com/resources/benchmark-report/mobile-app-push-notification-benchmarks-for-2025/) |

---

## Ключевые инсайты по категории Danger Scanner

### 1. PictureThis = наш ближайший аналог
Модель "фото → AI-идентификация → подписка" доказана. PictureThis: $100M+/год, 1M+ идентификаций в день, 7-дневный trial, $29.99/год. Всё, что работает для PictureThis, с высокой вероятностью сработает для нас ([ScreensDesign](https://screensdesign.com/showcase/picturethis-plant-identifier)).

### 2. Health & Fitness = самая прибыльная категория для подписок
Самый высокий payer LTV (медиана $16.44, верхний квартиль $31.12). Единственная категория, где годовые планы наращивают долю (60.6% выручки). Trial-подписчики удерживаются в 1.4–1.7x лучше прямых покупателей ([Adapty H&F 2026](https://adapty.io/blog/health-fitness-app-subscription-benchmarks/)).

### 3. "Парадокс успеха" = главный вызов retention
В health/utility приложениях решённая проблема ведёт к уходу. Решение: гео-карта сообщества (постоянная ценность), превентивные сканы ("еженедельная проверка дома"), сезонные alerts (8 категорий = круглый год), Safety Score (кумулятивный прогресс) ([Adjust](https://www.adjust.com/blog/health-tracker-installs-and-retention-data/)).

### 4. Мульти-категорийность = конкурентное преимущество в ASO
Конкуренты таргетируют 1 категорию. Мы можем занять длиннохвостые запросы по всем 8 категориям + создать CPP под каждую. Особенно слабая конкуренция: mold identifier, wall crack, caterpillar poisonous ([Apple App Store](https://apps.apple.com/us/app/mold-identifier-ai-scanner/id6743941888)).

### 5. Apple индексирует текст скриншотов (с июня 2025)
Новый канал ключевых слов. Каждый скриншот должен содержать стратегические ключевые слова в подписях. Это касается только Apple — для Google Play не подтверждено ([Appfigures](https://appfigures.com/resources/guides/app-store-algorithm-update-2025)).

---

## Приоритизация внедрения

### MVP (Stage 6)
1. Онбординг: скан до регистрации → квиз → social proof → анимированный paywall
2. Metered paywall: 3 скана/мес, 7-дневный opt-out trial, годовой план первый
3. Гео-карта сообщества (ядро retention)
4. Базовые push: сезонные + community alerts
5. ASO: title, subtitle, keywords, 6 скриншотов с текстом, видео-превью

### V1.1
6. A/B тестирование paywall через Adapty (минимум 5 экспериментов)
7. Streaks + Streak Freeze
8. Значки коллекционера (8 категорий)
9. Custom Product Pages под каждую категорию
10. Re-engagement email серия

### V1.2
11. Лидерборды района
12. Community challenges
13. Safety Score дома
14. AI-персонализация рекомендаций
15. Behavior-based push уведомления

---

## Карта документов Stage 3: Practices

| Документ | Содержание | Источников |
|---------|-----------|------------|
| [ONBOARDING-RESEARCH.md](ONBOARDING-RESEARCH.md) | Бенчмарки онбординга, конверсия, примеры, рекомендации | 25 |
| [PAYWALL-RESEARCH.md](PAYWALL-RESEARCH.md) | Типы paywall, trial стратегия, примеры, A/B тесты | 30 |
| [RETENTION-RESEARCH.md](RETENTION-RESEARCH.md) | D1/D7/D30 бенчмарки, push, streaks, gamification, social | 19 |
| [ASO-RESEARCH.md](ASO-RESEARCH.md) | Keywords, скриншоты, видео, CPP, тренды 2025–2026 | 35 |
| **PRACTICES-BRIEF.md** (этот документ) | Синтез, чеклисты, KPI, рекомендации по экранам | Все |

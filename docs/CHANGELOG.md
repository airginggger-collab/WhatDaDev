# Changelog

Все значимые изменения спеки проекта. Формат: семантические версии.

## [v0.45] — 2026-06-22 — Feature bento: три карточки с CSS-анимированными процессами
### Added
- `src/pages/index.astro`: новая секция «Автоматизация» после hero — bento-grid из 3 карточек:
  1. **Согласование договора** (wide) — анимированная цепочка согласования: 4 шага (Инициатор→Юрист→ФД→Подписан), точка-индикатор проходит по линии, каждый шаг последовательно «загорается» зелёным, 7s loop.
  2. **Корреспонденция** (tall) — inbox-список документов, статусные бейджи с CSS-анимацией, счётчик «0 потерянных писем».
  3. **Аналитика** (wide) — три KPI-тайла + анимированный bar chart (bars растут из нуля при загрузке).
- `src/styles/global.css`: компонент `.video-card` был добавлен ранее (v0.43).
- CSS `<style>` блок в `index.astro` содержит все keyframes (nodeActivate, checkPop, fillLine, barGrow, slideIn, badgePulse). `prefers-reduced-motion` отключает все анимации.
- Bento-сетка: `grid-template-columns: 1.55fr 1fr`, Card 2 (tall) занимает `grid-row: 1/3`. Mobile: single column.

## [v0.44] — 2026-06-22 — Обновление списка требований от заказчика
### Changed
- `docs/00b-discovery.md` v0.4: добавлены пункты по демо-видео (плейсхолдер hero), реальной цене Экспресс-внедрения, узким модулям. Структура разбита на отдельные блоки с горизонтальными разделителями для читаемости. Обновлён раздел «Уже зафиксировано» (Cloudflare, ADR-0011).

## [v0.43] — 2026-06-22 — Hero video card: looping demo в split-layout
### Changed
- `src/pages/index.astro`: hero перестроен в `hero-split` — текст слева, video-карточка справа.
- Video-карточка: `<video autoplay muted loop playsinline>`, browser-chrome mockup сверху, кнопка пауза/воспроизведение снизу. Плейсхолдер отображается пока нет файла `/public/video/demo.mp4`.
### Added
- `src/styles/global.css`: компонент `.video-card` — тёмный фон, структурная сетка 32×32px (accent-tinted), accent-glow бордер, `.video-card-chrome`, `.video-play-btn`, `.video-placeholder`.
### Notes
- Для добавления реального демо: положить экранную запись в `/public/video/demo.mp4` (рекомендуется: H.264, ≤8 MB, 16:10, без звука). Плейсхолдер скроется автоматически при загрузке видео.

## [v0.42] — 2026-06-22 — UI-тренды 2026: fluid type, structural grid, purposeful motion
### Changed
- `src/styles/global.css`: h3 и .lead переведены на `clamp()` (fluid typography тренд 5). h3: `clamp(18px,1.8vw,22px)`, .lead: `clamp(16px,1.5vw,19px)`.
- `src/styles/global.css`: `.btn` — purposeful micro-interaction (тренд 2): плавный lift `translateY(-2px)` + тень `rgba(79,70,229,.32)` при hover, нейтрализуется через `prefers-reduced-motion`.
- `src/styles/global.css`: `.hero::before` — тонкая структурная сетка 64×64px (тренд 3: raw/schematic aesthetic). Только hero-секции.
- `src/styles/global.css`: `.proof` — переработан в горизонтальный бар с разделителями (структурный стиль вместо loose flex).
- `src/pages/index.astro`: добавлены классы `.reveal` на заголовки и карточки всех секций — scroll-in анимация.
### Notes
- Тренд 1 (AI copilot) — не применим (нет AI-фич)
- Тренд 6 (handcrafted authorship) — релевантен при добавлении About/команда страницы
- Тренд 7 (function-first) — уже реализован: glassmorphism удалён ранее при де-glass редизайне

## [v0.41] — 2026-06-20 — UX-паттерны: навигация 5 пунктов, hero два страха, trust-форма
### Changed
- `src/layouts/Base.astro`: ELMA365 убрана из главного меню (остаётся в футере и на `/elma365/`). Теперь 5 пунктов + CTA — соответствует правилу «не больше 5».
- `src/pages/index.astro`: hero усилен — добавлен eyebrow «Внедрение ELMA365 · РФ и КЗ», lead-текст закрывает два B2B-страха (что это + dogfooding = почему доверять), добавлен proof-пункт «dogfooding — сами на ELMA365».
- `src/pages/contacts.astro`: под кнопкой формы добавлена trust-строка «Ответим в течение рабочего дня. Без спама».
### Added
- `docs/08-decisions/0012-ux-patterns.md` — ADR-0012: UX-паттерны адаптированы для B2B-сайта (навигация, hero, формы, глубина до действия).

## [v0.40] — 2026-06-20 — composite typography токены для Figma Text Styles
### Added
- `tokens/typography.json` — 9 composite typography токенов (display, h1–h4, body, bodyMedium, small, caption, label). Ссылаются на `global` через `{typography.*}`. Синхронизируются в Figma как Text Styles через Tokens Studio.
- `tokens/$metadata.json` обновлён: порядок `["global", "typography"]`.

## [v0.39] — 2026-06-20 — Tokens Studio DTCG-формат
### Added
- `tokens/global.json` — все токены в DTCG-формате (color, typography, borderRadius, spacing, boxShadow, motion). Совместимо с Tokens Studio GitHub sync.
- `tokens/$metadata.json` — порядок наборов токенов.
- `tokens/$themes.json` — пустой файл тем (готов к расширению).
- Источник правды остаётся в `docs/04-design/tokens.json`; `tokens/` — это Figma-зеркало.

## [v0.38] — 2026-06-20 — JSON-LD схемы + pricing-страница (33 стр.)
### Added
- `src/pages/products/express/pricing.astro` — страница стоимости: FAQPage + Offer JSON-LD, CTA «Получить расчёт», заглушки цены/сроков для Фазы 0. Коммерческий фактор Яндекса.
### Changed
- JSON-LD `Article` на обе статьи пресс-центра (`elma365-vs-bitrix24`, `korobochnyy-edo-vs-oblachnyy`).
- JSON-LD `AboutPage` на `/company/about/`.
- JSON-LD `CollectionPage` на `/press/`.
- JSON-LD `ItemList` на `/products/modules/`.
- Итого страниц: **33** (было 32).

## [v0.37] — 2026-06-20 — P2 доки: ARCHITECTURE, 20-domain-binding
### Added
- `docs/ARCHITECTURE.md` — единая архитектурная карта: структура `src/`, таблица всех 32 URL, CSS-токены, конфиги (`astro.config.mjs`, `wrangler.jsonc`), поток данных.
- `docs/20-domain-binding.md` — план привязки домена `whatdadev.ru`: шаги (Cloudflare custom domain, NS, 301-редиректы, Вебмастер), блокеры, SEO-риски.
- `docs/HANDOFF.md` и `docs/README.md`: версия обновлена до v0.37.

## [v0.36] — 2026-06-20 — P1 доки: dev-guide, seo/IMPLEMENTATION, 19-cms-migration
### Added
- `docs/dev-guide.md` — гайд разработчика: структура `src/`, команды, динамические роуты, CSS/git-конвенции. Факты из реального кода.
- `docs/05-seo/IMPLEMENTATION.md` — SEO чеклист: что уже live (canonical, OG, JSON-LD по страницам, BreadcrumbList), что в бэклоге (hreflang, 301-карта, Article-схемы, Phase-0 страницы).
- `docs/19-cms-migration.md` — план миграции на CMS: кандидаты (Keystatic/Directus/Payload), таблица коллекций, шаги, блокеры Фазы 0.
- `docs/HANDOFF.md`: версия обновлена до v0.36.

## [v0.35] — 2026-06-20 — правила агента + бэклог доков в CLAUDE.md
### Changed
- `CLAUDE.md`: добавлена шапка «Правила для агента» (русский язык, факты из кода, не коммитить без команды, синхронное обновление доков).
- `CLAUDE.md`: добавлен раздел «Бэклог доков» — план файлов P1 (dev-guide, seo/IMPLEMENTATION, 19-cms-migration) и P2 (ARCHITECTURE, 20-domain-binding).
- `docs/HANDOFF.md`: версия обновлена до v0.35.

## [v0.34] — 2026-06-20 — исправление устаревших слагов /coordo в доках
### Fixed
- `docs/03-content-model.md`: коллекция `coordo_modules` → `express_modules`, ссылка `/coordo/*` → `/products/express/*`.
- `docs/05-seo/README.md`: все вхождения `/coordo` и `/coordo/*` → `/products/express`, `/products/express/vs-razrabotka`, `/products/express/pricing`, `/products/express/*`.
- `docs/08-decisions/0001-two-funnels-5050.md`: pillar-URL `/coordo` → `/products/express`, добавлена заметка об изменении при ADR-0007.
- `docs/HANDOFF.md`: добавлено правило «каждое изменение обновлять в CHANGELOG + HANDOFF», список Phase-0 страниц вынесен явно.

## [v0.33] — 2026-06-20 — чистка репо + ревизия документации
### Changed
- Из git-трекинга убраны ~24MB случайных бинарников в корне репо (`git rm --cached`), перенесены на диск в gitignored-папку `_local-assets/`. `.gitignore` теперь блокирует бинарники в корне (`/*.png /*.jpg /*.jpeg /*.pdf /*.mov /*.svg`) и `_local-assets/`.
- `README.md` (корень) и `CLAUDE.md` переписаны под текущую реальность: точные версии из `package.json`, команды, деплой Cloudflare Workers Static Assets, правило «без бинарников в корне».
- `07-infra.md` приведён к факту: стек = Astro 5 + ванильный CSS (Tailwind НЕ используется), хостинг = Cloudflare Workers Static Assets (не «Cloudflare Pages»), статус 🟢.
- `10-budget.md`: строка хостинга уточнена (Workers Static Assets free tier).
- `HANDOFF.md` обновлён до 2026-06-20 (v0.33): чистка бинарников, бэклог по git-истории, корректный счёт страниц (32 вкл. 404).
### Backlog
- 🟡 ~24MB старых бинарников остаются в git-ИСТОРИИ; полная очистка `.git` — `git filter-repo` + force-push (отдельная задача).

## [v0.32] — 2026-06-19 — инструкция по правке + HANDOFF
### Added
- `editing-guide.md` — пошаговая инструкция для новичка: как править сайт руками (через GitHub-сайт или локально), карта файлов, частые задачи, откат, что нельзя трогать.
- `HANDOFF.md` — снимок состояния проекта (где живёт, что готово/live, что осталось — Фаза 0, как продолжить).

## [v0.31] — 2026-06-19 — реальные фото команды
### Added
- Фото 4 участников (Иванников, Королева, Санников, Слобожанин) извлечены из PDF-слайдов, обрезаны в круг (public/team/*.jpg). Перушев — initials (фото-файла нет, только в скриншоте).

## [v0.30] — 2026-06-19 — реальная команда
### Added
- Секция «Команда» на /company/about: 5 реальных участников (Перушев, Иванников, Королева, Санников, Слобожанин) из слайдов заказчика. Данные — src/data/team.js, аватары — initials (реальные фото — позже).

## [v0.29] — 2026-06-19 — фавикон, OG, 404, мета
### Added
- favicon.svg (WD-марка indigo), og.png (1200×630, растр для соцсетей/Telegram).
- OG/Twitter-мета, canonical, theme-color во всех страницах (Base).
- Страница 404 (брендированная) + not_found_handling в wrangler.jsonc.

## [v0.28] — 2026-06-19 — финал токенов + форма + пресс-хаб
### Added
- Визуальная форма заявки на /contacts/ (демо-режим, отправка в ELMA — по Фазе 0).
- Хаб /press/ (список статей: 2 живые + анонсы) + пункт «Пресс-центр» в меню.
### Decided
- ADR-0011: финал токенов — светлый премиум, accent indigo, шрифт Inter. tokens.json → finalized v1.
### Changed
- Премиум-полировка: мягкий hover карточек (reduced-motion safe).

## [v0.27] — 2026-06-19 — хлебные крошки + BreadcrumbList
### Added
- Компонент Breadcrumbs (визуальные крошки + JSON-LD BreadcrumbList).
- Крошки на вложенных страницах: 8 направлений, 5 отраслей, 3 контура, замещения, vs-разработка, 2 сравнения.

## [v0.26] — 2026-06-19 — единый степпер на услугах
### Changed
- /services/vnedrenie: «Как мы работаем» переведён на тот же степпер (.steps/.step) с reveal-анимацией, что на продукте.

## [v0.25] — 2026-06-19 — продукт-герой с дашбордом
### Changed
- /products/express: дашборд перенесён в hero (2 колонки: текст + светлая панель на тёмном фоне) — «продукт-герой», как в референсах. Дублирующая секция убрана.
- Добавлен `.hero-split` (адаптивный).

## [v0.24] — 2026-06-19 — анимированный мини-дашборд продукта
### Added
- /products/express: секция «Панель согласований» — KPI-плитки + анимированный бар-чарт (срок согласования падает), reveal-on-scroll. В духе CAST AI/searchable.
- Стили .dash/.kpi/.bars в global.css (reduced-motion safe). Поправлено чередование фонов секций.

## [v0.23] — 2026-06-19 — референсы заказчика + анимации
### Added
- Референсы (CAST AI, searchable, AgentQL) в 04-design + сигнал «светлый премиум с анимацией».
- Прототип: степпер «Как запускаем» (/products/express), анимированное кольцо-метрика (главная), reveal-on-scroll (reduced-motion safe).

## [v0.22] — 2026-06-19 — навигация и мобильное меню
### Added
- Бургер-меню для мобильных (toggle-скрипт в Base, стили в global.css).
- Расширенное меню: Продукты, Услуги, Отрасли, ELMA365, Контакты.
- Блок «Отрасли» на главной (ссылки на 5 отраслей + все).
- Футер: ссылки на внедрение, отрасли, ELMA365.

## [v0.21] — 2026-06-19 — полное наполнение прототипа (30 страниц)
### Added
- Направления внедрения: /services/vnedrenie/ + 8 (crm, edo, service-desk, zakupki, marketing, proekty, kedo, prochee) — на данных (`src/data/directions.js`).
- Отрасли: /industries/ + 5 (производство, ритейл, девелопмент, логистика, финансы) — на данных (`src/data/industries.js`).
- Продукты: /products/modules/ + /zameshcheniya; /products/express/vs-razrabotka.
- Сравнения: /press/articles/{elma365-vs-bitrix24,korobochnyy-edo-vs-oblachnyy}.
- /elma365, /company/about, /services/razrabotka. Связаны хаб услуг и навигация.
- JSON-LD Service/FAQPage на новых страницах; sitemap = 30 URL.

## [v0.20] — 2026-06-19 — наполнение прототипа + SEO-обвязка
### Added
- Страницы контуров: /products/express/{dogovory,ord,korrespondenciya} (тексты + FAQ).
- JSON-LD: Organization+WebSite на всех страницах (Base), SoftwareApplication+Offer+FAQPage на /products/express, FAQPage на контурах.
- @astrojs/sitemap (sitemap-index.xml) + robots.txt.
- Карточки контуров на /products/express кликабельны.

## [v0.19] — 2026-06-19 — фикс деплоя Cloudflare
### Fixed
- Деплой падал: CF-проект — Worker (`npx wrangler deploy`), авто-настройка `astro add cloudflare` ломалась на `public/.assetsignore`.
- Добавлен `wrangler.jsonc` — деплой `dist` как статических ассетов (без SSR/адаптера). Добавлен пустой `public/.assetsignore`.

## [v0.18] — 2026-06-18 — самостоятельный проект
### Added
- `CLAUDE.md` в корне — гайд для AI-агентов: проект самодостаточен, не связан с medlog (стек, структура, конвенции, git/деплой, Фаза 0).

## [v0.16] — 2026-06-18 — черновые дизайн-токены
### Added
- `04-design/tokens.json` — токены: палитра light/dark (под тёмный hero → светлый контент), акцент-кандидаты indigo/teal (не красный), типошкала desktop/mobile, радиусы, spacing, тени, motion. Готовы к маппингу в Tailwind/CSS-переменные.
### Note
- accent и fontFamily — предварительные; финал после Apple-референсов (Фаза 0).

## [v0.15] — 2026-06-18 — хабы + первые статьи
### Added
- `12-copy/hubs.md` — тексты хабов /products/modules и /services.
- `17-articles/` — 2 готовые статьи-образца: «Что такое ELMA365», «Как ускорить согласование договоров» (H1, польза, FAQ, перелинковка, CTA).
### Status
- Контент, доступный без заказчика, доведён до разумного предела. Дальше — Фаза 0 (референсы, цифры кейсов, доступы) + регулярные статьи по плану.

## [v0.14] — 2026-06-18 — редакционный план блога
### Added
- `16-blog-plan` — план статей (2 волны, ~18 тем под инфо-кластеры) + затравка глоссария + SEO-правила для статей. Движок топикального авторитета.

## [v0.13] — 2026-06-18 — отраслевые лендинги
### Added
- `15-industries/` — шаблон + спеки/тексты 5 отраслевых лендингов: производство, ритейл, девелопмент, логистика, финансы (H1, запросы, мета, боли, что автоматизируем, FAQ).

## [v0.12] — 2026-06-18 — тексты: замещения + направления внедрения
### Added
- `12-copy/products-modules-zameshcheniya.md` — полный текст модуля замещений (+ FAQ).
- `12-copy/services-directions.md` — шаблон + тексты 8 направлений внедрения (CRM, ЭДО, ServiceDesk, закупки, маркетинг, проекты, КЭДО, прочее) с H1/мета/ценностью.
### Note
- Узкие модули (Аудит СМК, Экспорт объектной модели, Связанные процессы) отложены до Фазы 0 (нужны реальные описания).

## [v0.11] — 2026-06-18 — сравнительные страницы
### Added
- `14-comparisons/`: vs-razrabotka (коробка/разработка), elma365-vs-bitrix24, korobka-vs-oblako — спеки + черновые тексты + FAQ. Незанятая ниша конкурентов.
### Note
- Факты о конкурентах помечены `{{verify}}` — сверить перед публикацией; тон корректный, без очернения.

## [v0.10] — 2026-06-18 — JSON-LD schema.org
### Added
- `13-schema/` — готовые к вставке JSON-LD блоки: Organization, WebSite, SoftwareApplication+Offer, FAQPage, Service, BreadcrumbList, ContactPage. С реальными данными WhatDaDev и картой «какой блок на какую страницу».

## [v0.9] — 2026-06-18 — тексты Волны 1 + product-in-motion
### Added
- `12-copy/`: home, products-express-ord, products-express-korrespondenciya, services-vnedrenie (черновой копирайт + FAQ под schema).
- `04-design` — паттерн «product-in-motion» (зацикленные клипы интерфейса, референс cursor.com) + требования к перфу/доступности.

## [v0.8] — 2026-06-18 — черновые тексты продуктовых страниц
### Added
- `12-copy/products-express.md` — копирайт продуктового pillar (hero, проблема, контуры, ядро без кода, цена, безопасность, FAQ, CTA).
- `12-copy/products-express-dogovory.md` — копирайт контура договоров (+ FAQ под schema).
- `12-copy/README.md` — индекс черновых текстов.

## [v0.7] — 2026-06-18 — нейминг продукта + фирстиль
### Decided (Фаза 0, блок 1)
- Нейминг: «Экспресс внедрение (Coordo)» — гибрид (ADR-0010).
- Фирстиль-гайд: отсутствует — создаём с нуля (04-design).
### Changed
- `00b-discovery` — два пункта блока 1 закрыты.
- `04-design` — раздел «Фирстиль и нейминг»; `11-page-specs` — бренд Coordo в продуктовом pillar.

## [v0.6] — 2026-06-18 — спеки страниц Волны 1
### Added
- `11-page-specs` — по-страничные брифы Волны 1 (H1, целевые запросы, Title/Description, schema.org, блоки, перелинковка, CTA).
### Done (закрыты TODO из v0.2)
- Целевые страницы ремапнуты на утверждённые URL.
- Разведён интент «услуга ЭДО» vs «продукт Экспресс внедрение» (таблица в 11).

## [v0.5] — 2026-06-18 — бюджет + scope без e-commerce
### Added
- `10-budget` — смета: free-старт (~0₽), что подключаем платно по триггеру.
- ADR-0008 (без e-commerce), ADR-0009 (free-first, разработка своими силами).
### Removed (scope)
- Продажа через сайт, корзина, оформление заказов, онлайн-оплата, Kaspi/эквайринг.

## [v0.4] — 2026-06-18 — единая структура папки + контент-план
### Changed
- Реорганизация в единый дом проекта: `docs/` (канон) + `deliverables/` (экспорты .docx/.xlsx) + `references/` (визуальный контекст). Экспорты убраны с Рабочего стола.
- `05-seo` — ссылка на ядро ведёт в `deliverables/`; дубликат xlsx в docs удалён.
### Added
- `09-content-plan` — черновой контент-план (3 волны наполнения под кластеры).
- README для `deliverables/` и `references/`; обновлён корневой README (карта папки).
- `references/behance-redesign-concept/` — 11 экранов разобранного концепта.

## [v0.3] — 2026-06-18 — опросник Фазы 0
### Added
- `00b-discovery` — опросник/трекер Фазы 0 (Discovery): 6 блоков вопросов заказчику + что уже зафиксировано, со статусами получено/ждём и приоритетами.
- Клиентский экспорт: `WhatDaDev_Опросник_Фаза0.docx` (заполняемые таблицы).

## [v0.2] — 2026-06-18 — утверждённая структура
### Changed
- `02-sitemap-ia` — заменён на УТВЕРЖДЁННУЮ структуру заказчика (6 разделов; две воронки Услуги/Продукты; Coordo → «Экспресс внедрение» + «Модули и решения»).
### Added
- ADR-0007 — утверждённая IA.
### TODO
- Ремап целевых страниц в semantic-core.xlsx на новые URL.
- Развести интент «услуга ЭДО» vs «продукт Экспресс внедрение».
- Уточнить использование бренда «Coordo».

## [v0.1] — 2026-06-18 — черновик на согласование
### Added
- Базовая структура базы знаний (`/docs`).
- `00-overview` — профиль компании, продукт Coordo, цели, аудитория.
- `01-brief` — стратегия (приоритет 50/50, без дедлайна, без стоп-сегментов, SEO-first), визуальное направление (гибрид: тёмный hero → светлый контент, без красного).
- `02-sitemap-ia` — карта сайта: хаб + две воронки + общее + SEO-движок.
- `03-content-model` — модель контента для CMS (коллекции, поля, роли). Продукт CMS — открытый вопрос.
- `04-design` — визуальный вектор, референсы (Behance-концепт разобран, Apple — ожидается).
- `05-seo` — стратегия обгона конкурентов, семантическое ядро (135 запросов, 15 кластеров), разбор конкурентов, пробелы рынка.
- `08-decisions` — ADR 0001–0006.

### Open (🔴 требует решения заказчика)
- Акцентный цвет и шрифт (после Apple-референсов).
- Английская версия: обе воронки или только Coordo.
- Доступ к Я.Метрике / Я.Вебмастеру / Wordstat → реальные частотности и карта 301.
- Выбор продукта CMS (self-hosted Directus/Payload — кандидаты).
- Кейсы: какие 3 главных клиента и что показывать публично (имена/NDA).

# WhatDaDev

Редизайн сайта **WhatDaDev 2.0** — B2B-лидген для компании, которая внедряет **ELMA365** и развивает собственный продукт «Экспресс внедрение (Coordo)». Рынки РФ и КЗ. Две равные воронки (Услуги / Продукты, 50/50), приоритет — **SEO лучше конкурентов**. Без e-commerce: заявка/демо → ELMA CRM → счёт офлайн.

Репозиторий — это одновременно **сайт** (`src/`) и **единый источник правды по проекту** (база знаний `docs/`, экспорты `deliverables/`, референсы `references/`).

- **Живой сайт:** https://whatdadev.airg-inggger.workers.dev/ (Cloudflare, автодеплой при пуше в `main`)
- **Целевой домен:** https://whatdadev.ru
- **Старый сайт:** https://whatdadev.ru (WordPress, заменяется этим проектом)

## Стек

Версии — из `package.json` (не выдумывать, сверять с файлом).

- **Astro** `^5` — статический генератор (SSG), отдаёт готовый HTML.
- **@astrojs/sitemap** `^3.7.3` — генерация `sitemap.xml`.
- **Стили** — обычный CSS с CSS-переменными в `src/styles/global.css` (токены — из `docs/04-design/tokens.json`). **Tailwind не используется.**
- **CMS** — Sveltia на `/admin/` (ADR-0015): контент в `src/data/*.json` и markdown-коллекциях `src/content/{articles,glossary}`; страничная разметка — в `.astro`.
- **Хостинг** — Cloudflare Workers Static Assets (`wrangler.jsonc`, `assets.directory = ./dist`). Без SSR-воркера и без Astro-адаптера Cloudflare.

Требуется Node.js 20+ (на сборке Cloudflare — `NODE_VERSION = 20`).

## Установка

```bash
npm install
```

## Команды (точно из package.json)

```bash
npm run dev        # локальная разработка → http://localhost:4321
npm run build      # сборка статики → dist/
npm run preview    # предпросмотр собранного dist/ (astro preview)
```

Отдельной команды деплоя нет — публикация идёт через `git push` в `main`.

## Деплой (Cloudflare)

Деплой — **Cloudflare Workers Static Assets**, авто при пуше в `main`.

- Конфиг — `wrangler.jsonc`: `assets.directory = "./dist"`, `not_found_handling = "404-page"`.
- Build command в Cloudflare: `npm run build`, output directory: `dist`, `NODE_VERSION = 20`.
- ⚠️ **Не подключать** Astro-адаптер Cloudflare (`astro add cloudflare`) — сайт статический, адаптер ломает деплой (ошибка `public/.assetsignore`). Конфиг деплоя — только `wrangler.jsonc`.

## Структура проекта

```
WhatDaDev/
├─ src/                 # сайт (Astro)
│  ├─ pages/            # маршруты (.astro), вкл. динамические [slug].astro
│  ├─ layouts/          # Base.astro — общий каркас (head, шапка, подвал, меню)
│  ├─ components/       # Breadcrumbs.astro и др.
│  ├─ data/             # контент-данные: directions.json, industries.json, team.json
│  └─ styles/           # global.css (CSS-переменные/токены)
├─ public/              # статика (favicon, og.png, фото команды public/team/)
├─ docs/                # БАЗА ЗНАНИЙ — единый источник правды (Markdown, канон)
├─ deliverables/        # экспорты для заказчика (.docx/.xlsx) — генерятся из docs/
├─ references/          # референсы и визуальный контекст (изображения)
├─ _local-assets/       # локальный мусор/черновики (gitignored, не коммитим)
├─ wrangler.jsonc       # конфиг деплоя Cloudflare
├─ astro.config.mjs     # конфиг Astro (site + sitemap)
└─ CLAUDE.md            # правила для AI-агентов
```

Сейчас сайт собирается в **32 страницы** (включая 404).

## Документация

Вся стратегия, структура, тексты и SEO — в `docs/` (версионируется, см. `docs/CHANGELOG.md`).

- **С чего начать:** [`docs/README.md`](docs/README.md) — порядок чтения 00 → 17.
- **Снимок состояния:** [`docs/HANDOFF.md`](docs/HANDOFF.md) — где мы, что live, что дальше.
- **Править сайт руками без ИИ:** [`docs/editing-guide.md`](docs/editing-guide.md).
- **«Почему так решили»:** [`docs/08-decisions/`](docs/08-decisions/) — ADR-решения.
- **Что спросить у заказчика (Фаза 0):** [`docs/00b-discovery.md`](docs/00b-discovery.md).
- **Экспорты для заказчика:** [`deliverables/`](deliverables/) (.docx/.xlsx, в т.ч. семантическое ядро).
- **Референсы:** [`references/`](references/).

## Правило против путаницы

**1 файл = 1 место.** Markdown-канон — только в `docs/`. Экспорты (.docx/.xlsx) — только в `deliverables/` (их **пере-генерируем** из `docs/`, не правим вручную). Картинки-референсы — только в `references/`. Никаких бинарников в корне репозитория: локальный мусор/черновики кладём в `_local-assets/` (gitignored).

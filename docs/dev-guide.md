# Гайд разработчика

Статус: ✅ актуально · версия v0.1 · 2026-06-20

> Факты взяты из реального кода. Слаги — `/products/express/*`, не `/coordo/*`.

## Быстрый старт

```bash
git clone git@github.com:airginggger-colggger/WhatDaDev.git
cd WhatDaDev
npm install
npm run dev      # → http://localhost:4321
```

Сборка и предпросмотр:

```bash
npm run build    # → dist/
npm run preview  # предпросмотр dist/
```

Деплой — только через `git push origin main` (Cloudflare Workers Static Assets соберёт сам).

## Стек

| Инструмент | Версия | Роль |
|---|---|---|
| Astro | `^5.0.0` | SSG-фреймворк, страницы `.astro` |
| @astrojs/sitemap | `^3.7.3` | автогенерация `sitemap-index.xml` |
| CSS (ванильный) | — | стили через CSS-переменные, Tailwind **не используется** |

## Структура `src/`

```
src/
├── layouts/
│   └── Base.astro          # общий каркас: <head>, nav, footer, JSON-LD Organization
├── components/
│   └── Breadcrumbs.astro   # хлебные крошки + JSON-LD BreadcrumbList
├── data/
│   ├── directions.js       # 8 направлений внедрения (/services/vnedrenie/[slug])
│   ├── industries.js       # 5 отраслей (/industries/[slug])
│   └── team.js             # команда (/company/about)
├── styles/
│   └── global.css          # CSS-переменные (токены), все стили сайта
└── pages/
    ├── index.astro
    ├── contacts.astro
    ├── elma365.astro
    ├── 404.astro
    ├── company/about.astro
    ├── industries/
    │   ├── index.astro
    │   └── [slug].astro    # рендерит 5 отраслей из data/industries.js
    ├── press/
    │   ├── index.astro
    │   └── articles/
    │       ├── elma365-vs-bitrix24.astro
    │       └── korobochnyy-edo-vs-oblachnyy.astro
    ├── products/
    │   ├── express.astro               # /products/express
    │   ├── express/
    │   │   ├── dogovory.astro
    │   │   ├── ord.astro
    │   │   ├── korrespondenciya.astro
    │   │   └── vs-razrabotka.astro
    │   └── modules/
    │       ├── index.astro
    │       └── zameshcheniya.astro
    └── services/
        ├── index.astro
        ├── razrabotka.astro
        └── vnedrenie/
            ├── index.astro
            └── [slug].astro            # рендерит 8 направлений из data/directions.js
```

## Как добавить страницу

1. Создать `.astro` файл в `src/pages/` по нужному пути.
2. Обернуть в `<Base>` из `src/layouts/Base.astro`, передать `title`, `description`, `canonical`.
3. Добавить JSON-LD нужного типа (Service / FAQPage / Article) — см. `docs/13-schema/`.
4. Добавить URL в `astro.config.mjs` → `sitemap` не нужно, `@astrojs/sitemap` подхватит автоматически.
5. Добавить хлебные крошки `<Breadcrumbs>` если страница вложенная.
6. Обновить `docs/HANDOFF.md` и `docs/CHANGELOG.md`.

## Динамические роуты

| Файл | Данные | URL-ы |
|---|---|---|
| `services/vnedrenie/[slug].astro` | `src/data/directions.js` | `/services/vnedrenie/crm`, `/edo`, `/service-desk`, `/zakupki`, `/marketing`, `/proekty`, `/kedo`, `/prochee` |
| `industries/[slug].astro` | `src/data/industries.js` | `/industries/proizvodstvo`, `/ritejl`, `/development`, `/logistika`, `/finansy` |

## CSS-конвенции

- Все цвета и отступы — через CSS-переменные в `src/styles/global.css`.
- Источник токенов — `docs/04-design/tokens.json`. При изменении дизайна править там, затем переносить в `global.css`.
- Хардкод цвета вне переменных не вводить.
- Анимации оборачивать в `@media (prefers-reduced-motion: no-preference)`.

## Git-конвенции

Коммит-автор — **обязательно**:
```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab commit -m "тип(scope): описание"
```

Типы: `feat`, `fix`, `docs`, `chore`, `refactor`.

Никаких бинарников в корне — только в `references/`, `deliverables/` или `_local-assets/` (gitignored).

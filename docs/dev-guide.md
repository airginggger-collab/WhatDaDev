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

## Проверка после деплоя

Хостинг — **Cloudflare Workers Static Assets** (НЕ Pages; конфиг — `wrangler.jsonc`, `assets.directory = ./dist`). Авто-деплой при пуше в `main`. Боевой URL — `https://whatdadev.airg-inggger.workers.dev/` (домен `whatdadev.ru` ещё не привязан — см. `docs/20-domain-binding.md`).

После пуша в `main` убедись, что прод действительно отдаёт текущую сборку:

1. **Локальный HEAD = `origin/main`.** Нет рассинхрона с пушем:
   ```bash
   git fetch origin
   git rev-parse HEAD            # должно совпасть с
   git rev-parse origin/main
   ```
2. **Прод отдаёт текущую сборку.** Сравни хэши ассетов на проде с локальным `dist/index.html` (имена `/_astro/*.css|js` меняются при каждой пересборке — расхождение значит, что прод ещё старый / деплой не доехал):
   ```bash
   # хэши ассетов на проде
   curl -s https://whatdadev.airg-inggger.workers.dev/ | grep -oE '/_astro/[^"]+\.(css|js)'
   # хэши ассетов в локальной сборке (после npm run build)
   grep -oE '/_astro/[^"]+\.(css|js)' dist/index.html
   ```
   Совпадают → прод = HEAD. Расходятся → подожди завершения деплоя Cloudflare и повтори.
3. **Проверяй боевой `*.workers.dev`**, а НЕ `whatdadev.ru` — последний пока указывает на старый WordPress и не привязан к Workers.

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
│   ├── Breadcrumbs.astro   # хлебные крошки + JSON-LD BreadcrumbList
│   ├── CtaHero.astro       # тёмный CTA-блок (пропсы title/lead/button/wide)
│   ├── Faq.astro           # FAQ на нативных <details> (faq: [q,a][])
│   └── PressEntry.astro    # общий шаблон статьи/термина глоссария
├── lib/                    # TS-хелперы: jsonld.ts (безопасная сериализация JSON-LD), schema.ts (faqLd/articleLd)
├── data/
│   ├── directions.json       # 8 направлений внедрения (/services/vnedrenie/[slug])
│   ├── industries.json       # 5 отраслей (/industries/[slug])
│   └── team.json             # команда (/company/about)
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
    │   └── [slug].astro    # рендерит 5 отраслей из data/industries.json
    ├── press/
    │   ├── index.astro                  # листит content/articles через getCollection
    │   ├── articles/[slug].astro        # рендерит content/articles/*.md (20 статей)
    │   └── glossary/
    │       ├── index.astro              # листит content/glossary
    │       └── [slug].astro             # рендерит content/glossary/*.md (15 терминов)
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
            └── [slug].astro            # рендерит 8 направлений из data/directions.json
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
| `services/vnedrenie/[slug].astro` | `src/data/directions.json` | `/services/vnedrenie/crm`, `/edo`, `/service-desk`, `/zakupki`, `/marketing`, `/proekty`, `/kedo`, `/prochee` |
| `industries/[slug].astro` | `src/data/industries.json` | `/industries/proizvodstvo`, `/ritejl`, `/development`, `/logistika`, `/finansy` |

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

# Архитектура проекта

Статус: ✅ актуально · версия v0.1 · 2026-06-20

> Факты из реального кода. Слаги — `/products/express/*`, не `/coordo/*`.

## Обзор

```
WhatDaDev/
├── src/                  # сайт (Astro)
├── docs/                 # база знаний (Markdown, канон)
├── deliverables/         # экспорты для заказчика (.docx/.xlsx)
├── references/           # визуальные референсы (картинки)
├── public/               # статика (favicon, og.png, robots.txt, шрифты)
├── _local-assets/        # gitignored — черновики, скриншоты, мусор
├── astro.config.mjs      # конфиг Astro (site, integrations)
├── wrangler.jsonc        # конфиг Cloudflare (assets.directory = ./dist)
└── package.json          # npm-только, Astro 5 + @astrojs/sitemap
```

**Правило 1 файл = 1 место:** Markdown → `docs/`, экспорты → `deliverables/`, картинки-референсы → `references/`, бинарный мусор → `_local-assets/`. Никаких бинарников в корне репо.

---

## `src/` — детально

```
src/
├── layouts/
│   └── Base.astro              # единый каркас всех страниц
├── components/
│   └── Breadcrumbs.astro       # хлебные крошки + JSON-LD BreadcrumbList
├── data/
│   ├── directions.js           # 8 направлений → /services/vnedrenie/[slug]
│   ├── industries.js           # 5 отраслей → /industries/[slug]
│   └── team.js                 # команда → /company/about
├── styles/
│   └── global.css              # CSS-переменные (токены) + все стили
└── pages/                      # 21 .astro-файл → 32 URL
```

---

## `src/layouts/Base.astro`

Единый `<head>` для всех страниц. Принимает пропсы:

| Проп | Тип | По умолчанию |
|---|---|---|
| `title` | string | «WhatDaDev — внедрение ELMA365…» |
| `description` | string | краткое описание компании |
| `jsonld` | array | `[]` — дополнительные JSON-LD блоки |

**Что генерирует автоматически:**
- `<link rel="canonical">` из `Astro.site + pathname`
- `<meta og:*>` и Twitter Card
- JSON-LD **Organization** + **WebSite** на каждой странице
- Переданные `jsonld[]` блоки (Service, FAQPage, SoftwareApplication и т.д.)
- `<link>` на Inter из Google Fonts (cyrillic)
- `theme-color: #0B1220`

**Навигация (хардкод в Base):**
```
/products/express/ · /services/ · /industries/ · /elma365/ · /press/ · /contacts/
```

---

## CSS-токены (`src/styles/global.css`)

| Переменная | Значение | Назначение |
|---|---|---|
| `--accent` | `#4F46E5` | indigo, основной акцент (ADR-0011) |
| `--accent-600` | `#4338CA` | hover-состояние кнопок |
| `--bg` | `#F8FAFC` | фон светлых секций |
| `--surface` | `#FFFFFF` | карточки |
| `--text` | `#0F172A` | основной текст |
| `--muted` | `#475569` | второстепенный текст |
| `--dark-bg` | `#0B1220` | тёмный hero |
| `--dark-surface` | `#111827` | тёмные карточки |
| `--radius` | `16px` | скругления блоков |
| `--container` | `1140px` | max-width контейнера |
| `--font` | `"Inter", system-ui` | шрифт |

Источник токенов — `docs/04-design/tokens.json`. При изменении дизайна — сначала там, потом переносить в `global.css`. **Tailwind не используется.**

---

## Страницы и роутинг

| URL | Файл | Данные |
|---|---|---|
| `/` | `pages/index.astro` | хардкод |
| `/contacts/` | `pages/contacts.astro` | хардкод |
| `/elma365/` | `pages/elma365.astro` | хардкод |
| `/404` | `pages/404.astro` | хардкод |
| `/company/about/` | `pages/company/about.astro` | `data/team.js` |
| `/products/express/` | `pages/products/express.astro` | хардкод |
| `/products/express/dogovory/` | `pages/products/express/dogovory.astro` | хардкод |
| `/products/express/ord/` | `pages/products/express/ord.astro` | хардкод |
| `/products/express/korrespondenciya/` | `pages/products/express/korrespondenciya.astro` | хардкод |
| `/products/express/vs-razrabotka/` | `pages/products/express/vs-razrabotka.astro` | хардкод |
| `/products/modules/` | `pages/products/modules/index.astro` | хардкод |
| `/products/modules/zameshcheniya/` | `pages/products/modules/zameshcheniya.astro` | хардкод |
| `/services/` | `pages/services/index.astro` | хардкод |
| `/services/razrabotka/` | `pages/services/razrabotka.astro` | хардкод |
| `/services/vnedrenie/` | `pages/services/vnedrenie/index.astro` | хардкод |
| `/services/vnedrenie/[slug]/` ×8 | `pages/services/vnedrenie/[slug].astro` | `data/directions.js` |
| `/industries/` | `pages/industries/index.astro` | хардкод |
| `/industries/[slug]/` ×5 | `pages/industries/[slug].astro` | `data/industries.js` |
| `/press/` | `pages/press/index.astro` | хардкод |
| `/press/articles/elma365-vs-bitrix24/` | `pages/press/articles/elma365-vs-bitrix24.astro` | хардкод |
| `/press/articles/korobochnyy-edo-vs-oblachnyy/` | `pages/press/articles/korobochnyy-edo-vs-oblachnyy.astro` | хардкод |

**Итого:** 21 файл → 32 URL (динамические `[slug]` рендерят несколько страниц из одного файла).

---

## Конфиги

### `astro.config.mjs`
```js
site: 'https://whatdadev.ru'   // canonical base (целевой домен, не Workers-URL)
integrations: [sitemap()]       // автогенерация sitemap-index.xml
```

### `wrangler.jsonc`
```json
assets.directory: "./dist"           // Cloudflare читает dist/ после npm run build
not_found_handling: "404-page"       // /404.astro обрабатывает 404
```
Деплой — **Cloudflare Workers Static Assets** (не Pages, не SSR-воркер). Авто при пуше в `main`.

---

## Поток данных

```
docs/04-design/tokens.json
        ↓ (вручную переносим)
src/styles/global.css          ← все компоненты используют CSS-переменные

src/data/*.js                  ← динамические [slug].astro читают через getStaticPaths()
src/layouts/Base.astro         ← все страницы оборачиваются в Base
src/components/Breadcrumbs.astro ← подключается на вложенных страницах

npm run build → dist/          ← git push → Cloudflare → live
```

---

## Связанные документы

- `docs/dev-guide.md` — как запустить, git-конвенции
- `docs/07-infra.md` — инфраструктура (Cloudflare, домен)
- `docs/04-design/README.md` — дизайн-токены, референсы
- `docs/08-decisions/` — ADR (почему так, а не иначе)
- `docs/20-domain-binding.md` — план привязки домена whatdadev.ru

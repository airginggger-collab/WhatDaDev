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
│   ├── Breadcrumbs.astro       # хлебные крошки + JSON-LD BreadcrumbList
│   ├── CtaHero.astro           # финальный тёмный CTA-блок (title/lead/button, wide?)
│   ├── Faq.astro               # FAQ на нативных <details> (faq: [q,a][])
│   ├── PressEntry.astro        # шаблон записи пресс-центра (статья/глоссарий)
│   └── ContourPage.astro       # шаблон контурной страницы (slug → src/data/contours.json)
├── lib/                        # общие TS-хелперы (не рендерят разметку)
│   ├── jsonld.ts               # jsonLd() — безопасная сериализация JSON-LD (экранирует </>/&, защита от XSS)
│   └── schema.ts               # faqLd()/articleLd() — объекты schema.org FAQPage/Article
├── data/
│   ├── directions.json           # 8 направлений → /services/vnedrenie/[slug]
│   ├── industries.json           # 5 отраслей (+color/cover) → /industries/[slug]
│   ├── services.json             # услуги (name/color/desc/href/cover) → /services
│   ├── press-tags.json           # карта тег → {color, cover} для /press
│   ├── modules.json              # модули → /products/modules
│   ├── vnedrenie-steps.json      # этапы внедрения → /services/vnedrenie
│   ├── contours.json             # 4 контурные страницы → ContourPage.astro
│   └── team.json                 # команда → /company/about
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
- Шрифты self-hosted через Fontsource (Golos Text Variable + Piazzolla Variable + IBM Plex Mono) — импорт в `Base.astro`, без Google Fonts
- `theme-color: #10151A`

**Навигация (хардкод в Base):**
```
/products/express/ · /services/ · /industries/ · /elma365/ · /press/ · /contacts/
```

---

## CSS-токены (`src/styles/global.css`)

| Переменная | Значение | Назначение |
|---|---|---|
| `--accent` | `#1F5B99` | корпоративный синий, акцент (ADR-0014) |
| `--accent-600` | `#174873` | hover-состояние кнопок |
| `--accent-50` | `#E7EEF6` | светлая подложка тегов |
| `--bg` | `#FAF8F2` | тёплая бумага, фон светлых секций |
| `--surface` | `#FFFFFF` | карточки |
| `--surface-alt` | `#DFE0DA` | нейтральные alt-секции |
| `--text` | `#191D1B` | основной текст (чернила) |
| `--muted` | `#5A625D` | второстепенный текст |
| `--border` | `#C4C5BB` | границы |
| `--dark-bg` | `#10151A` | тёмный hero |
| `--dark-surface` | `#171E26` | тёмные карточки |
| `--radius` / `--radius-sm` | `6px` / `4px` | скругления (ADR-0013, без pill) |
| `--container` | `1140px` | max-width контейнера |
| `--font` | `"Golos Text Variable"` | основной шрифт |
| `--font-display` | `"Piazzolla Variable"` | заголовки H1/H2 |
| `--font-mono` | `"IBM Plex Mono"` | цифры, подписи |

Источник токенов — `docs/04-design/tokens.json`. При изменении дизайна — сначала там, потом переносить в `global.css`. **Tailwind не используется.**

---

## Страницы и роутинг

| URL | Файл | Данные |
|---|---|---|
| `/` | `pages/index.astro` | хардкод |
| `/contacts/` | `pages/contacts.astro` | хардкод |
| `/elma365/` | `pages/elma365.astro` | хардкод |
| `/404` | `pages/404.astro` | хардкод |
| `/company/about/` | `pages/company/about.astro` | `data/team.json` |
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
| `/services/vnedrenie/[slug]/` ×8 | `pages/services/vnedrenie/[slug].astro` | `data/directions.json` |
| `/industries/` | `pages/industries/index.astro` | хардкод |
| `/industries/[slug]/` ×5 | `pages/industries/[slug].astro` | `data/industries.json` |
| `/press/` | `pages/press/index.astro` | `content/articles/*.md` (getCollection) |
| `/press/articles/[slug]/` ×20 | `pages/press/articles/[slug].astro` | `content/articles/*.md` (getCollection, фильтр !draft) |
| `/press/glossary/` | `pages/press/glossary/index.astro` | `content/glossary/*.md` (getCollection) |
| `/press/glossary/[slug]/` ×15 | `pages/press/glossary/[slug].astro` | `content/glossary/*.md` (getCollection, фильтр !draft) |

**Итого:** статьи и глоссарий — markdown-коллекции `src/content/`, рендерятся динамическими `[slug].astro`; всего сайт — 68 страниц (см. `sitemap-0.xml`).

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

src/data/*.json                  ← динамические [slug].astro читают через getStaticPaths()
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

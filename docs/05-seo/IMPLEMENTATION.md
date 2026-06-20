# SEO — статус реализации

Статус: 🟡 в работе · версия v0.1 · 2026-06-20

> Факты взяты из реального кода `src/`. Слаги — `/products/express/*`, не `/coordo/*`.

## Что уже сделано (live)

### Технический фундамент
- ✅ `sitemap-index.xml` — `@astrojs/sitemap` автоматически (все 32 URL)
- ✅ `public/robots.txt` — разрешает индексацию
- ✅ `public/favicon.svg` — SVG-фавикон
- ✅ `public/og.png` — OG-изображение 1200×630 для соцсетей

### На каждой странице (через `src/layouts/Base.astro`)
- ✅ `<title>` + `<meta name="description">`
- ✅ `<link rel="canonical">` — динамически из `Astro.site + pathname`
- ✅ OG-мета: `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:type`
- ✅ Twitter Card: `summary_large_image`
- ✅ JSON-LD **Organization** — везде через Base
- ✅ JSON-LD **WebSite** — везде через Base

### JSON-LD по страницам
| Страница | Схемы |
|---|---|
| `/products/express` | SoftwareApplication + Offer + FAQPage |
| `/products/express/dogovory` | Service + FAQPage |
| `/products/express/ord` | Service + FAQPage |
| `/products/express/korrespondenciya` | Service + FAQPage |
| `/products/express/vs-razrabotka` | FAQPage |
| `/products/modules/zameshcheniya` | Service + FAQPage |
| `/services/index` | Service (хаб) |
| `/services/vnedrenie/index` | Service + FAQPage |
| `/services/vnedrenie/[slug]` | Service + FAQPage (8 направлений) |
| `/services/razrabotka` | Service + FAQPage |
| `/industries/[slug]` | Service + FAQPage (5 отраслей) |
| `/elma365` | FAQPage |
| Все вложенные | BreadcrumbList (через `src/components/Breadcrumbs.astro`) |

### Хлебные крошки
- ✅ Визуальный компонент `<Breadcrumbs>` + JSON-LD BreadcrumbList
- ✅ Подключены на: 8 направлений, 5 отраслей, 3 контура, замещения, vs-разработка, 2 сравнения

---

## Что не сделано (бэклог)

### Ждёт данных заказчика (Фаза 0)
- 🔴 JSON-LD **Review / AggregateRating** — нужны реальные отзывы + согласия
- 🔴 JSON-LD **Article** на статьях пресс-центра — нужен автор, дата публикации
- 🔴 Реальные метрики кейсов в контенте (сейчас `{{...}}`)
- 🔴 `/products/express/pricing` — страница с ценой (коммерческий фактор Яндекса)

### Технический долг
- 🟡 `hreflang ru↔en` — не реализован (KZ-локаль запланирована, EN-версии нет)
- 🟡 Карта 301 (старый whatdadev.ru → новый) — нужен доступ к Я.Вебмастеру и текущим URL-ам
- 🟡 JSON-LD **Article** на `/press/articles/elma365-vs-bitrix24` и `/korobochnyy-edo-vs-oblachnyy`
- 🟡 JSON-LD на `/company/about`, `/press/index`, `/products/modules/index` — пока только Organization+WebSite из Base
- 🟡 `theme-color` мета-тег — нет в Base (нужен для мобильного браузера)

### Phase 0 страницы (SEO-потенциал не реализован)
Страницы из sitemap не построены → нет трафика по этим кластерам:
- `/products/modules/audit-smk`, `/export-model`, `/linked-processes`, `/file-management`
- `/services/autstaffing`, `/audit`, `/consulting`, `/obuchenie`, `/litsenzii`
- `/company/success-stories` — сильный коммерческий фактор
- `/press/knowledge-base`, `/glossary` — долгохвостый трафик

---

## Чеклист для новой страницы

- [ ] H1 содержит целевой запрос (длинный хвост, не ВЧ-голова)
- [ ] `<title>` ≤ 60 символов, `<meta description>` 120–160 символов
- [ ] `<link rel="canonical">` — передаётся через Base автоматически
- [ ] JSON-LD нужного типа (Service / FAQPage / Article / SoftwareApplication)
- [ ] Хлебные крошки `<Breadcrumbs>` если страница вложенная
- [ ] Внутренние ссылки: минимум 2–3 перелинковки на связанные страницы
- [ ] FAQ-блок (минимум 3 вопроса) под FAQPage-схему
- [ ] URL добавлен в `docs/HANDOFF.md` в таблицу страниц

---

## Инструменты мониторинга (ждут подключения)
- 🔴 Яндекс.Вебмастер — нужен доступ заказчика
- 🔴 Google Search Console — нужен доступ заказчика
- 🔴 Яндекс.Метрика — нужен доступ заказчика

# 19 — План миграции на CMS

Статус: 🔴 отложено (ADR-0006) · версия v0.1 · 2026-06-20

> Слаги актуальны: `/products/express/*`, не `/coordo/*`. Факты из `src/data/*.js` и `src/pages/`.

## Контекст

Сейчас контент живёт прямо в `.astro`-файлах и `src/data/*.js`. CMS нужна когда менеджер будет обновлять контент без правки кода. Выбор продукта CMS отложен до завершения Фазы 0 (ADR-0006).

## Кандидаты

| CMS | Плюсы | Минусы |
|---|---|---|
| **Directus** | дружелюбная админка, ревизии, self-hosted, REST+GraphQL | требует Node + PostgreSQL-сервера |
| **PayloadCMS** | тесная интеграция с кодом, TypeScript-first | сложнее для менеджера, нужен Next.js или Node |
| **Keystatic** | работает с Astro, хранит в Git (без БД) | контент в репо, нет «настоящей» админки |

Рекомендация: **Keystatic** как промежуточный шаг (без сервера, данные в Git), потом Directus при росте команды.

## Что нужно перенести в CMS

Данные сейчас в `src/data/`:

| Файл | Тип контента | URL-ы |
|---|---|---|
| `directions.js` | 8 направлений внедрения | `/services/vnedrenie/[slug]` |
| `industries.js` | 5 отраслей | `/industries/[slug]` |
| `team.js` | команда | `/company/about` |

Статичные страницы с текстом в `.astro` (без данных):
- `/products/express` и контуры (`dogovory`, `ord`, `korrespondenciya`, `vs-razrabotka`)
- `/products/modules/zameshcheniya`
- `/services/index`, `/razrabotka`, `/vnedrenie/index`
- `/elma365`, `/contacts`, `/company/about`
- `/press/articles/*`

## Коллекции CMS (по `docs/03-content-model.md`)

| Коллекция | Источник сейчас | Приоритет |
|---|---|---|
| `pages` (slug, блоки, seo_meta) | `.astro`-файлы | P2 |
| `express_modules` (контуры Coordo) | `products/express/*.astro` | P2 |
| `services` | `data/directions.js` + `.astro` | P1 |
| `industries` | `data/industries.js` | P1 |
| `team` | `data/team.js` | P1 |
| `cases` | нет (Фаза 0) | P0 — ждёт заказчика |
| `testimonials` | нет (Фаза 0) | P0 — ждёт заказчика |
| `blog_posts` | статичные `.astro` | P3 |
| `settings` | хардкод в Base.astro | P1 |

## Шаги миграции (план)

1. **Выбрать CMS** — после Фазы 0 (данные заказчика, объём контент-обновлений)
2. **Перенести `src/data/*.js`** → CMS-коллекции (`services`, `industries`, `team`) — P1
3. **Перенести `settings`** (контакты, соцсети) из `Base.astro` → CMS singleton — P1
4. **Перенести тексты страниц** из `.astro` → CMS `pages`-коллекция — P2
5. **Настроить preview** черновиков до публикации
6. **Настроить роли:** `admin` (разработчик) / `editor` (менеджер — только контент)
7. **Обновить деплой:** при CMS-изменении → rebuild Cloudflare (webhook)

## Блокеры (Фаза 0)

- 🔴 Коллекции `cases` и `testimonials` — нет данных, нет смысла настраивать
- 🔴 Интеграция формы с ELMA365 — отдельно от CMS, параллельный трек
- 🔴 Выбор продукта CMS — на усмотрение заказчика после знакомства с кандидатами

## Связанные документы

- `docs/03-content-model.md` — полная схема коллекций
- `docs/08-decisions/0006-cms-deferred.md` — ADR об откладывании
- `docs/07-infra.md` — текущая инфра (Cloudflare Workers Static Assets)

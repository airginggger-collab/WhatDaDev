# 20 — Привязка домена

Статус: 🟢 основной домен выбран · версия v0.3 · 2026-09-17

> **Сайт live на `https://what-da-dev.ru/` (сообщил владелец 2026-08-28).** Домен с дефисами взят потому, что `whatdadev.ru` продолжает отдавать старый сайт заказчика на WordPress 7.1. Проверено curl: what-da-dev.ru → наш Astro-сайт (title «WhatDaDev: внедрение ELMA365 и готовый ЭДО из коробки»), whatdadev.ru → WordPress (title «Внедрение ELMA365 - WhatDaDev»), оба отвечают 200.

## ✅ Закрыто 2026-09-17: canonical ведёт на what-da-dev.ru

Владелец выбрал основной домен **`https://what-da-dev.ru`** (v0.99.8). Раньше `astro.config.mjs → site` стоял на `https://whatdadev.ru`, и живой сайт отдавал canonical, `og:url`, sitemap, robots, JSON-LD и `llms.txt` на старый домен, где `/kz/` и другие новые адреса отвечают 404.

Что поменяно на `https://what-da-dev.ru`: `astro.config.mjs` (`site`), `public/robots.txt` (строка `Sitemap`), `src/layouts/Base.astro` (JSON-LD Organization и WebSite), `src/components/Breadcrumbs.astro`, `src/lib/schema.ts` (`SITE`), `src/pages/press/articles/[slug].astro`, `src/pages/press/glossary/[slug].astro`, `src/pages/services/vnedrenie/index.astro`, `src/pages/services/vnedrenie/[slug].astro`, `src/pages/services/razrabotka.astro`, `src/pages/products/modules/index.astro`, `src/pages/llms.txt.ts`.

**Не менялось:** почта `sales@`, `support@`, `iperushev@whatdadev.ru` (ящики живут на старом домене и работают), адрес кабинета в `public/admin/config.yml` (workers.dev). В `src/pages/admin-guide.astro` осталась фраза «после привязки домена адрес станет whatdadev.ru/admin/»: работает ли вход в кабинет с `what-da-dev.ru/admin/`, не проверялось (OAuth-воркер может не принимать новый origin), поэтому текст не трогали.

**Что дальше:** Google Search Console и Яндекс.Вебмастер на `what-da-dev.ru`, отправить `https://what-da-dev.ru/sitemap-index.xml`. Если когда-нибудь `whatdadev.ru` переедет на новый сайт, поставить 301 со старого домена на `what-da-dev.ru` (или наоборот сменить `site`, но это снова правка всех файлов выше).

## Прежний план (привязка whatdadev.ru)

> Факты из `astro.config.mjs` и `wrangler.jsonc`. Текущий live-URL — Workers-поддомен, не продакшн-домен.

## Текущее состояние

| | |
|---|---|
| **Живой сайт** | https://what-da-dev.ru/ (плюс технический https://whatdadev.airg-inggger.workers.dev/) |
| **Домен заказчика** | https://whatdadev.ru — по-прежнему старый WordPress 7.1 |
| **`astro.config.mjs → site`** | `'https://whatdadev.ru'` — расходится с реальным доменом, см. дефект выше |
| **Хостинг** | Cloudflare Workers Static Assets (`wrangler.jsonc`) |
| **Авто-деплой** | git push → main → Cloudflare собирает `npm run build` → `dist/` |

## Что нужно сделать

### 1. Добавить домен в Cloudflare Workers

1. Зайти в [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → `whatdadev`.
2. Вкладка **Settings → Domains & Routes → Add** → Custom domain → `whatdadev.ru`.
3. Cloudflare автоматически добавит DNS-запись (CNAME/AAAA) и выпустит SSL.

> ⚠️ Для этого домен `whatdadev.ru` должен быть делегирован на Cloudflare NS (или хотя бы с проксированием через Cloudflare DNS).

### 2. Делегировать домен на Cloudflare (если ещё не)

У регистратора домена (проверить у заказчика — кто держит whatdadev.ru):

1. Сменить NS на:
   ```
   XX.ns.cloudflare.com
   YY.ns.cloudflare.com
   ```
   (точные NS — в дашборде Cloudflare после добавления зоны)
2. Или добавить CNAME-запись вручную если NS менять нельзя:
   ```
   CNAME  whatdadev.ru  →  whatdadev.airg-inggger.workers.dev
   ```

### 3. Настроить редиректы

После переезда — настроить 301-редиректы со старых URL WordPress → новые URL:

| Старый URL (WordPress) | Новый URL | Приоритет |
|---|---|---|
| Карта — **нужен доступ к Я.Вебмастеру** для текущих позиций | | |

Карта 301 фиксируется в `docs/05-seo/redirects.md` (файл создать после получения данных).

Редиректы реализуются через `_redirects` файл в `public/`:
```
/старый-путь  /новый-путь  301
```

### 4. Перенести подтверждение в Вебмастерах

- **Яндекс.Вебмастер** — переподтвердить сайт на новом домене (HTML-файл или DNS TXT).
- **Google Search Console** — добавить новый домен, перенести права собственности.
- Сообщить о смене адреса в GSC (инструмент «Смена адреса»).

### 5. Проверить canonical после переезда

В `astro.config.mjs` уже стоит `site: 'https://whatdadev.ru'` — canonical-ссылки сгенерируются правильно после привязки домена. Дополнительных правок в коде не нужно.

---

## Блокеры

🔴 Доступ к домену `whatdadev.ru` у заказчика — кто регистратор, NS
🔴 Доступ к Cloudflare Workers dashboard
🔴 Доступ к Я.Вебмастер + Google Search Console (для переноса прав и 301-карты)
🔴 Список текущих URL на старом сайте (для 301-карты)

---

## SEO-риски при переезде

- Потеря позиций если 301 не настроены или настроены с ошибками
- Временный «дроп» трафика на 2–4 недели — норма при смене домена/движка
- Crawl budget: новый сайт быстрее проиндексируется если прислать sitemap в Вебмастер сразу после переезда

---

## Связанные документы

- `docs/07-infra.md` — текущая инфра, Cloudflare Workers
- `docs/05-seo/IMPLEMENTATION.md` — SEO чеклист (карта 301 — отдельный пункт)
- `docs/ARCHITECTURE.md` — astro.config.mjs, wrangler.jsonc

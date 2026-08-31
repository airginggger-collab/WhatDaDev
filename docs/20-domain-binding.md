# 20 — Привязка домена

Статус: 🟡 частично · версия v0.2 · 2026-08-28

> **Сайт live на `https://what-da-dev.ru/` (сообщил владелец 2026-08-28).** Домен с дефисами взят потому, что `whatdadev.ru` продолжает отдавать старый сайт заказчика на WordPress 7.1. Проверено curl: what-da-dev.ru → наш Astro-сайт (title «WhatDaDev: внедрение ELMA365 и готовый ЭДО из коробки»), whatdadev.ru → WordPress (title «Внедрение ELMA365 - WhatDaDev»), оба отвечают 200.

## 🔴 Открытый дефект: canonical уводит на чужой сайт

`astro.config.mjs → site` остался `https://whatdadev.ru`, поэтому на живом `what-da-dev.ru` каждая страница отдаёт:

- `<link rel="canonical" href="https://whatdadev.ru/...">` и `og:url` туда же;
- 68 адресов в `sitemap-0.xml` на домене `whatdadev.ru`;
- JSON-LD `@id` организации и сайта, `BreadcrumbList`, `llms.txt` — тоже на `whatdadev.ru`.

Пока `whatdadev.ru` держит WordPress, это указание поисковику индексировать старый сайт вместо нового. SEO — ведущее требование проекта, поэтому вопрос закрывать до индексации.

**Решение владельца требуется:** менять `site` на `https://what-da-dev.ru` (и хардкоды в `src/layouts/Base.astro`, `src/components/Breadcrumbs.astro`, `src/lib/schema.ts`, `src/pages/press/articles/[slug].astro`, `src/pages/services/*`) или ждать переезда `whatdadev.ru` на новый сайт. Почта на домене (`sales@whatdadev.ru` и др. в `contacts.json`) от выбора не зависит, её не трогать.

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

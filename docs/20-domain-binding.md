# 20 — Привязка домена whatdadev.ru

Статус: 🔴 не сделано · версия v0.1 · 2026-06-20

> Факты из `astro.config.mjs` и `wrangler.jsonc`. Текущий live-URL — Workers-поддомен, не продакшн-домен.

## Текущее состояние

| | |
|---|---|
| **Живой сайт** | https://whatdadev.airg-inggger.workers.dev/ |
| **Целевой домен** | https://whatdadev.ru (сейчас — старый WordPress) |
| **`astro.config.mjs → site`** | `'https://whatdadev.ru'` (canonical уже указывает на прод) |
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

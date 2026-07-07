# ADR-0016 — Вход в кабинет «в один клик» через GitHub (OAuth-прокси)

Статус: ✅ Accepted · 2026-07-07 · Дополняет ADR-0015 (кабинет Sveltia)

## Контекст
ADR-0015 запустил кабинет Sveltia с входом по personal access token — рабочий, но с разовым техническим шагом (создать fine-grained PAT). Пользователь запросил вход «в один клик через GitHub» (кнопка «Sign In with GitHub»), чтобы редактирование было полностью через кнопки, без ручных токенов.

## Решение
- Кнопка **«Sign In with GitHub»** включается через **OAuth-прокси** — отдельный Cloudflare Worker `whatdadev-cms-auth` (код — официальный `sveltia/sveltia-cms-auth`, MIT, завендорен в `cms-auth/index.js` с шапкой-провенансом).
- Воркер **отдельный** от сайта: свой `cms-auth/wrangler.toml`, деплой вручную (`npx wrangler deploy`). Авто-деплой при пуше в `main` (корневой `wrangler.jsonc`, `./dist`) его не касается — важно, т.к. смешивать Worker-скрипт с основным static-assets деплоем нельзя (ср. запрет Cloudflare-адаптера).
- URL воркера предсказуем по subdomain аккаунта: `https://whatdadev-cms-auth.airg-inggger.workers.dev`. В `public/admin/config.yml` прописан `backend.base_url` на этот адрес.
- Секреты (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`) — только в воркере (через `wrangler secret put`), в браузер/репозиторий не попадают. `ALLOWED_DOMAINS` (публичный) — в `[vars]`: `whatdadev.airg-inggger.workers.dev,whatdadev.ru`.
- **Вход по токену остаётся** запасным путём (работает всегда, даже если воркер недоступен).

## Требует разового действия владельца (не автоматизируется агентом)
Деплой воркера требует ключей Cloudflare, создание OAuth App — GitHub-аккаунта владельца. Инструкция — `cms-auth/README.md`: (1) создать GitHub OAuth App (callback `…/callback`), (2) `wrangler login` + два `wrangler secret put` + `wrangler deploy`. До активации `base_url` указывает на неразвёрнутый воркер — кнопка GitHub не сработает, но токен-вход работает; поэтому это не ломает текущий кабинет.

## Почему
Git-based OAuth требует серверной части (client secret нельзя держать в браузере). Официальный воркер Sveltia — минимальный, проверенный, на том же Cloudflare, что и сайт. Вендоринг с провенанс-шапкой даёт воспроизводимость без зависимости от чужого деплой-аккаунта.

## Последствия
- `/admin-guide/` и `docs/editing-cabinet.md`: основной способ входа — «в один клик», токен — запасной.
- Обновление воркера — заменить тело `cms-auth/index.js` из апстрима + redeploy.

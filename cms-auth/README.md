# Вход в кабинет через GitHub (OAuth) — настройка

Этот Worker включает кнопку **«Sign In with GitHub»** в кабинете `/admin/` — вход в один клик, без ручного создания токена.

Настраивается **один раз** владельцем репозитория (нужны GitHub и Cloudflare). После этого редактор просто нажимает «Sign In with GitHub» и разрешает доступ — больше ничего.

Итоговый адрес воркера: **https://whatdadev-cms-auth.airg-inggger.workers.dev**
(имя `whatdadev-cms-auth` + ваш subdomain `airg-inggger`, как у основного сайта).

---

## Шаг 1. Создать GitHub OAuth App

1. Откройте https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**.
2. Заполните:
   - **Application name**: `WhatDaDev CMS`
   - **Homepage URL**: `https://whatdadev.airg-inggger.workers.dev`
   - **Authorization callback URL**: `https://whatdadev-cms-auth.airg-inggger.workers.dev/callback`
3. **Register application**.
4. Скопируйте **Client ID**. Нажмите **Generate a new client secret** и скопируйте **Client Secret** (показывается один раз).

> Это классический OAuth App (не fine-grained token). Секрет хранится только в воркере, в браузер не попадает.

## Шаг 2. Развернуть воркер

Из папки `cms-auth/` (нужен Node.js; вход в Cloudflare — тот же аккаунт, что у сайта):

```bash
cd cms-auth
npx wrangler login                       # разовый вход в Cloudflare (откроется браузер)
npx wrangler secret put GITHUB_CLIENT_ID       # вставьте Client ID
npx wrangler secret put GITHUB_CLIENT_SECRET   # вставьте Client Secret
npx wrangler deploy
```

`wrangler deploy` выведет URL воркера — он должен совпасть с `https://whatdadev-cms-auth.airg-inggger.workers.dev`. Если subdomain другой — поправьте `base_url` в `public/admin/config.yml` и **Authorization callback URL** в OAuth App на фактический адрес.

## Шаг 3. Проверить

Откройте `/admin/` → **Sign In with GitHub** → GitHub попросит разрешение → после «Authorize» вы в кабинете. Готово.

---

## Как это связано с сайтом

- `public/admin/config.yml` содержит `backend.base_url = https://whatdadev-cms-auth.airg-inggger.workers.dev` — кабинет знает, куда идти за OAuth.
- Вход по токену («Sign In Using Access Token») остаётся как запасной путь и работает всегда, даже если воркер недоступен.
- Этот воркер деплоится **отдельно** и вручную; авто-деплой при пуше в `main` касается только сайта (корневой `wrangler.jsonc`, `./dist`) и его не трогает.

## Обновление кода воркера

`index.js` — копия официального [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) (MIT) с шапкой-комментарием. Чтобы обновить — заменить тело файла новой версией из апстрима и `npx wrangler deploy`.

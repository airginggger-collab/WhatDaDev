# 07 — Инфраструктура и стек

Статус: 🟢 актуально (прототип live) · версия v0.2

## Стек (зафиксировано, ADR-0004)
- **Фронт/рендер:** **Astro 5** (SSG) — отдаём готовый HTML, лучший SEO/перф. Выбран из кандидатов Astro / Next.js; интерактив (анимации, форма-демо) делается на лёгком клиентском JS без фреймворка.
- **Sitemap:** `@astrojs/sitemap` (генерирует `sitemap.xml`).
- **CMS:** 🔴 отложено (Directus / PayloadCMS self-hosted — кандидаты, ADR-0006). Пока контент в `.astro`-страницах и `src/data/*.js`.
- **Стили:** обычный CSS с CSS-переменными в `src/styles/global.css`. Источник токенов — `04-design/tokens.json`. **Tailwind НЕ используется** (отказались в пользу лёгкого ванильного CSS).
- **Анимации:** отложенная загрузка / reveal-on-scroll, reduced-motion-safe, не ломать Core Web Vitals.

## Домены и локали
- `whatdadev.ru` — RU, основной (РФ).
- KZ — решить: поддомен / отдельная локаль для Казахстана.
- `/en/` — английское зеркало (объём 🔴).
- hreflang между локалями.

## Хостинг
- **Текущий (прототип):** Cloudflare Workers Static Assets (`wrangler.jsonc`, `assets.directory = ./dist`, `not_found_handling = 404-page`). Авто-деплой при пуше в `main`. Живой сайт: https://whatdadev.airg-inggger.workers.dev/
- 🔴 Открытый вопрос для прода: требование резидентности данных/CMS РФ/КЗ (ФЗ-152) и скорость из РФ/под Яндекс — возможно, понадобится РФ-хостинг/CDN или гибрид. Cloudflare-вариант — это прототип/витрина, не финальное решение по резидентности.

## CI/CD
- Git → автодеплой (превью на PR, прод на main).
- Сборка статики + ребилд при публикации контента в CMS (вебхук).

## Перф-бюджет
- Core Web Vitals «зелёные» на мобайле. H1/текст hero — SSR. Тяжёлый фон/анимации — отложенно, без CLS.
- Оптимизация изображений (webp/avif, lazy), приоритет LCP.

## Переезд (SEO-критично)
- Карта 301 старый→новый URL (`05-seo`), не терять текущие позиции.
- Сохранить/перенести robots, sitemap, подтверждение в Я.Вебмастер/GSC.

## Безопасность/право
- Согласие на обработку ПД (ФЗ-152 РФ), политика конфиденциальности, cookie-уведомление.

## Прототип → текущий сайт
- Стек: **Astro 5** (SSG), без CMS (контент в `.astro` и `src/data/*.js`). Стили — CSS-переменные из `tokens.json` в `src/styles/global.css`.
- Сейчас собирается **32 страницы** (вкл. 404) — полная карта в `02-sitemap-ia.md`. Сборка: `npm run build` → `dist/` (статика).
- **Деплой — Cloudflare Workers Static Assets** через `wrangler.jsonc` (`assets.directory = ./dist`, `not_found_handling = 404-page`). Авто-деплой при пуше в `main`.
  - Repository: `airginggger-collab/WhatDaDev`
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Env: `NODE_VERSION = 20`
- ⚠️ Важно: НЕ добавлять cloudflare-адаптер Astro (`astro add cloudflare`) — сайт статический, адаптер ломает деплой (ошибка `public/.assetsignore`). Конфиг деплоя — наш `wrangler.jsonc`. (Раньше в плане фигурировал «Cloudflare Pages» — по факту используется Workers Static Assets.)

## Гигиена репозитория (2026-06-20)
- В корне репо НЕ держим бинарники. `.gitignore` блокирует `/*.png /*.jpg /*.jpeg /*.pdf /*.mov /*.svg` и папку `_local-assets/`.
- Курируемые ассеты → `references/` или `deliverables/`. Локальный мусор/черновики/скриншоты → `_local-assets/` (на диске, не в git).
- 🟡 Бэклог: ~24MB старых бинарников остаются в git-ИСТОРИИ. Полная очистка `.git` — `git filter-repo` + force-push (отдельная задача).

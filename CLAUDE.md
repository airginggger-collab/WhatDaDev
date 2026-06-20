# CLAUDE.md — гайд для AI-агентов в проекте WhatDaDev

> Это самостоятельный проект (НЕ связан с medlog). Перед работой прочитай этот файл целиком, затем `docs/README.md` и `docs/HANDOFF.md`.

## Правила для агента (обязательно)

1. **Язык:** всегда отвечай и пиши доки на **русском**.
2. **Факты из кода:** URL, имена файлов, команды — только из реального кода в `src/`. Не выдумывай.
3. **Не коммитить без команды:** изменения готовишь, коммит делаешь только когда пользователь явно скажет.
4. **Доки обновлять синхронно:** каждое изменение → запись в `docs/CHANGELOG.md` + обновить версию в `docs/HANDOFF.md`. Без этого задача не завершена.

## Бэклог доков (план создать)

**P1 — исправить слаги `/coordo/*` → `/products/express` при создании:**
- `docs/dev-guide.md` — гайд разработчика (как запустить, структура src/, conventions)
- `docs/05-seo/IMPLEMENTATION.md` — SEO чеклист реализации (что уже сделано, что нет)
- `docs/19-cms-migration.md` — план миграции на CMS (бэклог, ADR-0006)

**P2:**
- `docs/ARCHITECTURE.md` — единая архитектурная карта проекта (src/, data/, layouts, компоненты)
- `docs/20-domain-binding.md` — план привязки домена whatdadev.ru → Cloudflare

## TL;DR

Редизайн сайта **WhatDaDev** — компания по внедрению **ELMA365** + собственные продукты («Экспресс внедрение (Coordo)» + модули). Рынки РФ и КЗ. Сайт — **B2B-лидген** (заявка/демо → ELMA CRM → счёт офлайн), **без e-commerce** (ADR-0008).

- **Цель:** две равные воронки (Услуги / Продукты, 50/50) + **SEO лучше конкурентов** (ведущее требование).
- **Стек:** Astro 5 (SSG) + `@astrojs/sitemap`. Стили — обычный CSS с CSS-переменными в `src/styles/global.css` (токены из `docs/04-design/tokens.json`). **Tailwind не используется.** CMS отложена (ADR-0006) — контент в `.astro` и `src/data/*.js`.
- **Визуал:** тёмный hero → светлый контент (ADR-0002), акцент НЕ красный — финал indigo `#4F46E5` + шрифт Inter (ADR-0011). Паттерн product-in-motion (как cursor.com / CAST AI).
- **Хостинг:** Cloudflare **Workers Static Assets** через `wrangler.jsonc` (`assets.directory = ./dist`). Сборка `npm run build` → `dist`. Авто-деплой при пуше в `main`. **Не Pages, не SSR-воркер.**

## Источник правды — `docs/`

Вся стратегия, структура, тексты и SEO — в `docs/` (версионируется, см. `docs/CHANGELOG.md`). Ключевое:
- `docs/HANDOFF.md` — снимок состояния (что live, что осталось). Читать первым.
- `docs/02-sitemap-ia.md` — утверждённая структура (6 разделов).
- `docs/11-page-specs.md` — спеки страниц (H1, мета, schema).
- `docs/12-copy/`, `docs/14-comparisons/`, `docs/15-industries/`, `docs/17-articles/` — готовые тексты.
- `docs/13-schema/` — JSON-LD заготовки.
- `docs/08-decisions/` — ADR (почему так). Не противоречить им без нового ADR.
- `docs/00b-discovery.md` — что ещё ждём от заказчика (Фаза 0).

## Архитектура

- `docs/` — база знаний (Markdown, канон). `deliverables/` — экспорты для заказчика (.docx/.xlsx, генерятся из docs). `references/` — визуальный контекст. `src/` — сайт (Astro).
- **Правило против путаницы (1 файл = 1 место):**
  - Markdown-канон → только `docs/`.
  - Экспорты (.docx/.xlsx) → только `deliverables/` (пере-генерируем из docs, руками не правим).
  - Картинки-референсы → только `references/`.
  - **Никаких бинарников в корне репозитория.** Курируемые ассеты идут в `references/` или `deliverables/`; локальный мусор/черновики/скриншоты — в `_local-assets/` (gitignored). `.gitignore` блокирует `/*.png /*.jpg /*.jpeg /*.pdf /*.mov /*.svg` в корне.
- Сайт: страницы `src/pages/` (вкл. динамические `[slug].astro`), общий каркас `src/layouts/Base.astro`, компоненты `src/components/`, контент-данные `src/data/*.js`, стили `src/styles/global.css`.

## Конвенции

- Тексты берём из `docs/12-copy` и др. — не выдумываем заново. Факты-заглушки помечены `{{...}}` (цена, метрики кейсов, скриншоты) — уточняются в Фазе 0.
- Нейминг продукта: **«Экспресс внедрение (Coordo)»** (ADR-0010) — описание ведёт, «Coordo» рядом.
- SEO: на каждую страницу — H1 под запрос, мета, JSON-LD, перелинковка; FAQ под FAQPage. Не воевать за ВЧ-«голову» — длинный хвост + сравнения + отрасли + КЗ (ADR-0004).
- Перф: SSG, текст hero — в HTML; тяжёлое (видео/анимации) — отложенно, не ломать Core Web Vitals. Уважать `prefers-reduced-motion`.
- Цвета/шрифты — через CSS-переменные из `global.css` (источник — `docs/04-design/tokens.json`). Хардкод цвета вне токенов не вводим.

## Команды (точно из package.json)

```bash
npm install
npm run dev      # локальная разработка → http://localhost:4321
npm run build    # сборка → dist/
npm run preview  # предпросмотр собранного dist/
```

Отдельной команды деплоя нет — публикация через `git push` в `main`.

## Git и деплой

- **Repo:** `git@github.com:airginggger-collab/WhatDaDev.git` (SSH), ветка `main`, **приватный**.
- **Commit author ОБЯЗАТЕЛЕН:** `airg.inggger@gmail.com` / `airginggger-collab`:
  ```bash
  git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab commit -m "..."
  ```
- Версии спеки — git-теги `v0.x` (см. CHANGELOG). Значимое изменение → запись в `docs/CHANGELOG.md`.
- Деплой — Cloudflare Workers Static Assets, авто при пуше в `main`.
- ⚠️ **Не** добавлять Astro-адаптер Cloudflare (`astro add cloudflare`) — сайт статический, адаптер ломает деплой (ошибка `public/.assetsignore`).
- 📌 Бэклог инфры: в git-ИСТОРИИ остаются ~24MB старых бинарников, удалённых из трекинга 2026-06-20. Полное уменьшение `.git` потребует переписывания истории (`git filter-repo` + force-push) — отдельная задача, делать осознанно.

## Что ещё ждём от заказчика (Фаза 0)

🔴 Реальные цифры кейсов (сейчас демо-данные в дашборде/кольце) · интеграция формы с ELMA365 (как лиды попадают в CRM) · описания узких модулей (Аудит СМК, Экспорт объектной модели, Связанные процессы) · фото Перушева (пока инициалы) · логотип в векторе · согласия клиентов на логотипы/отзывы. Полный трекер — `docs/00b-discovery.md`.

## Ссылки
- Repo: https://github.com/airginggger-collab/WhatDaDev
- Живой сайт: https://whatdadev.airg-inggger.workers.dev/
- Целевой домен / старый сайт: https://whatdadev.ru

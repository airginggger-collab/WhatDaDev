# CLAUDE.md — гайд для AI-агентов в проекте WhatDaDev

> Это самостоятельный проект (НЕ связан с medlog). Перед работой прочитай этот файл целиком, затем `docs/README.md`.

## TL;DR

Редизайн сайта **WhatDaDev** — компания по внедрению **ELMA365** + собственные продукты («Экспресс внедрение (Coordo)» + модули). Рынки РФ и КЗ. Сайт — **B2B-лидген** (заявка/демо → ELMA CRM → счёт офлайн), **без e-commerce** (ADR-0008).

- **Цель:** две равные воронки (Услуги / Продукты, 50/50) + **SEO лучше конкурентов** (ведущее требование).
- **Стек:** Astro 5 (SSG), CSS-переменные из `docs/04-design/tokens.json`. CMS отложена (ADR-0006) — пока контент в `.astro`.
- **Визуал:** тёмный hero → светлый контент (ADR-0002), акцент НЕ красный (indigo/teal, ADR-0003). Паттерн product-in-motion (как cursor.com).
- **Хостинг:** Cloudflare Pages (build `npm run build` → `dist`).

## Источник правды — `docs/`

Вся стратегия, структура, тексты и SEO — в `docs/` (версионируется, см. `docs/CHANGELOG.md`). Ключевое:
- `docs/02-sitemap-ia.md` — утверждённая структура (6 разделов).
- `docs/11-page-specs.md` — спеки страниц (H1, мета, schema).
- `docs/12-copy/`, `docs/14-comparisons/`, `docs/15-industries/`, `docs/17-articles/` — готовые тексты.
- `docs/13-schema/` — JSON-LD заготовки.
- `docs/08-decisions/` — ADR (почему так). Не противоречить им без нового ADR.
- `docs/00b-discovery.md` — что ещё ждём от заказчика (Фаза 0).

## Архитектура

- `docs/` — база знаний (Markdown, канон). `deliverables/` — экспорты для заказчика (.docx/.xlsx, генерятся из docs). `references/` — визуальный контекст. `src/` — сайт (Astro).
- Правило против путаницы: 1 файл = 1 место. Md → только docs/. Экспорты → только deliverables/. Картинки → только references/.
- Страницы Astro: `src/pages/`, общий каркас `src/layouts/Base.astro`, стили `src/styles/global.css`.

## Конвенции

- Тексты берём из `docs/12-copy` и др. — не выдумываем заново. Факты-заглушки помечены `{{...}}` (цена, метрики кейсов, скриншоты) — уточняются в Фазе 0.
- Нейминг продукта: **«Экспресс внедрение (Coordo)»** (ADR-0010) — описание ведёт, «Coordo» рядом.
- SEO: на каждую страницу — H1 под запрос, мета, JSON-LD, перелинковка; FAQ под FAQPage. Не воевать за ВЧ-«голову» — длинный хвост + сравнения + отрасли + КЗ (ADR-0004).
- Перф: SSR/SSG, текст hero в HTML, тяжёлое (видео/анимации) — отложенно, не ломать Core Web Vitals. Уважать prefers-reduced-motion.

## Команды

```bash
npm install
npm run dev      # локальная разработка
npm run build    # сборка → dist/
npm run preview  # предпросмотр сборки
```

## Git и деплой

- **Repo:** `git@github.com:airginggger-collab/WhatDaDev.git` (SSH), ветка `main`, **приватный**.
- **Commit author:** `airg.inggger@gmail.com` / `airginggger-collab`:
  ```bash
  git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab commit -m "..."
  ```
- Версии спеки — git-теги `v0.x` (см. CHANGELOG). Значимое изменение → запись в `docs/CHANGELOG.md`.
- Деплой — Cloudflare Pages, авто при пуше в `main` (после подключения репо в дашборде CF).

## Что ещё ждём от заказчика (Фаза 0)

🔴 Apple-референсы (→ финал токенов: цвет/шрифт) · доступы Wordstat/Вебмастер (→ частоты + карта 301) · реальные цифры кейсов · описания узких модулей (Аудит СМК, Экспорт объектной модели, Связанные процессы). Полный трекер — `docs/00b-discovery.md`.

## Ссылки
- Repo: https://github.com/airginggger-collab/WhatDaDev
- Текущий сайт (старый): https://whatdadev.ru

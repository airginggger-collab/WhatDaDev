# HANDOFF — снимок состояния проекта

Обновлено: 2026-06-25 · версия **v0.62**
Цель файла: чтобы новая сессия (Claude или человек) за минуту поняла, где мы.

> **Правило:** каждое изменение кода/контента → обновить `docs/CHANGELOG.md` и этот файл. Без обновления доков изменение не считается завершённым.

## Что это
Редизайн сайта **WhatDaDev** — внедрение ELMA365 + продукт «Экспресс внедрение (Coordo)». B2B-лидген, без e-commerce. Две воронки (Услуги / Продукты, 50/50), SEO-first.

## Где живёт
- Репозиторий: `git@github.com:airginggger-collab/WhatDaDev.git` (приватный, ветка `main`).
- Локально: `~/Desktop/WhatDaDev`.
- **Живой сайт:** https://whatdadev.airg-inggger.workers.dev/ (Cloudflare Workers Static Assets, автодеплой при пуше в `main`).
- Целевой домен: https://whatdadev.ru (пока старый WordPress).

## Стек
Astro 5 (статика, SSG) + `@astrojs/sitemap`. Стили — обычный CSS с CSS-переменными в `src/styles/global.css` (токены из `docs/04-design/tokens.json`); **Tailwind не используется**. CMS пока нет (контент в `.astro` и `src/data/*.js`). Деплой — Cloudflare static assets (`wrangler.jsonc`, без SSR-воркера/адаптера).

## Что готово (live)
- **68 страниц (вкл. 404):** главная · `/coordo/` (лендинг с видео) · продукт + 3 контура + vs-разработка + pricing · модули + замещения · услуги + 8 направлений + разработка · 5 отраслей · 2 сравнения · пресс-центр + **20 статей** (волны 3.1+3.2) · **глоссарий /press/glossary/** (15 терминов + index) · ELMA365 · о компании · контакты · 404.
- **Визуал:** тёмный hero → светлый контент; hero split-layout с реальным видео `coordo-demo.mp4`; feature bento; структурная сетка; кольцо-метрика; степперы; reveal-анимации; hover-карточки; бургер-меню; хлебные крошки; motion tokens; back-to-top; trust-чипы; 4-колонный футер; FAQ-аккордеоны; active nav. Светлый премиум, акцент indigo `#4F46E5`, шрифт Inter.
- **Последние улучшения (v0.62):** Дизайн-аудит по чек-листу основ — `.hero h1` без чистого `#fff` (→ `--dark-text`), бургер `.nav-toggle` тач-зона 44×44, `.price` отступ 10→8px, форма `/contacts/` с маркерами обязательных полей (`*` + подсказка).
- **Устаревшее (v0.61):** QA-аудит `/products/express/` — фикс контраста hero-дашборда (`.dash{color:var(--text)}`: заголовок и KPI «2 дня/14/0» были near-white на белом → теперь читаются; глобально для всех `.dash`), JSON-LD `url`/`offers.url` приведены к виду со слэшем.
- **Устаревшее (v0.60):** Оптимизация скорости — обложки −77% (848→194KB, WebP 800px), `_headers` Cloudflare кэш (images 1 нед, `/_astro/*` 1 год), `preload="none"` на видео (−7.4MB при загрузке главной/coordo).
- **Устаревшее (v0.59):** `/press/`, `/services/`, `/industries/` — обложки карточек: чистые скрины ELMA365 без цветного оверлея + тёмный градиент снизу. Соцкарточки `/press/`: убраны цветные border-top, правильные brand-иконки (Telegram/Instagram/YouTube/TikTok/VK) с круглым фоном.
- **Устаревшее (v0.58):** `/services/` и `/industries/` — редизайн в стиле `/press/`: featured-карточка + цветные обложки + grid. `/press/` — блок соцсетей (5 платформ). `/coordo/` — voice-card, валюты, ядро. `/services/vnedrenie/` — timeline 6 шагов.
- **Устаревшее (v0.57):** `/press/` — featured-карточка + цветные обложки по тегу + фильтры + блок соцсетей (5 платформ). `/coordo/` — voice-card с контрастом, исправлен переключатель валют, выровнено ядро. `/services/vnedrenie/` — timeline 6 шагов с описаниями.
- **SEO:** sitemap, robots, JSON-LD (Organization, WebSite, SoftwareApplication+Offer, Service, FAQPage, BreadcrumbList), canonical, OG/Twitter, favicon.

## Решения — см. `docs/08-decisions/` (ADR 0001–0011)
50/50 две воронки · тёмный hero → светлый · без красного · SEO-first · база знаний в Git · CMS отложена · утв. структура · без e-commerce · free-first своими силами · нейминг «Экспресс внедрение (Coordo)» · финал токенов (indigo + Inter).

## Сделано 2026-06-20 — чистка репозитория
- Из git-трекинга убраны ~24MB случайно закоммиченных бинарников в **корне** репо (Frame 16.png, Frame 659.jpg, screencapture-cursor-*.png, «👨🏼_💻 Team - 3/4» jpg/pdf, 6762bb55…take.jpeg): `git rm --cached`, физически перенесены в новую gitignored-папку `_local-assets/` (остаются на диске).
- `.gitignore` обновлён: блокирует бинарники в корне (`/*.png /*.jpg /*.jpeg /*.pdf /*.mov /*.svg`) и папку `_local-assets/`.
- Правило закреплено в README и CLAUDE.md: никаких бинарников в корне — курируемые ассеты в `references/`/`deliverables/`, мусор/черновики в `_local-assets/`.

## Бэклог инфры (известно, не срочно)
- 🟡 Эти ~24MB всё ещё лежат в **старой git-ИСТОРИИ** — `git rm --cached` уменьшил рабочее дерево, но не `.git`. Чтобы реально ужать репозиторий, нужно переписать историю (`git filter-repo` + force-push в `main`). Делать осознанно (приватный репо, один автор) — отдельная задача.

## QA-бэклог (найдено в аудите v0.61, не блокеры)
- 🟡 **Форма `/contacts/` в демо-режиме** (`preventDefault`) — лиды никуда не уходят. Пересекается с Фазой 0 (интеграция ELMA365). Главная конверсия пока неактивна.
- 🟢 **Иерархия заголовков** на `/products/express/`: H1 → H3 (заголовок hero-дашборда) до первого H2 — мелкий a11y/SEO-нюанс.
- 🟢 **FAQ-аккордеон** (`Base.astro`): кнопки имеют `aria-expanded`, но панели без `id`/`aria-controls`/`role` — связка для screen-reader неполная.
- 🟢 **Валидация полей формы:** `tel` принимает любой ввод, у `message` нет `maxlength` — безопасно сейчас, но нужна серверная валидация/санитайз при подключении CRM.
- ⚪ **Back-to-top** — проверить вручную на живом сайте (логика по коду верна; превью-сэндбокс не двигает viewport).

## Что осталось — Фаза 0 (нужен заказчик)

### Данные
🔴 Реальные **цифры кейсов** (сейчас в дашборде/кольце демо-данные)
🔴 **Интеграция формы с ELMA365** (как лиды попадают в CRM, кто настроит)
🔴 Описания **узких модулей** (Аудит СМК, Экспорт объектной модели, Связанные процессы, Визуализация файлов)
🔴 Фото Перушева (пока инициалы), логотип в векторе, согласия клиентов на логотипы/отзывы

### Страницы Phase 0 (не построены — ждут контента)
- **Услуги:** `/services/autstaffing`, `/audit`, `/consulting`, `/obuchenie`, `/litsenzii`
- **Модули:** `/products/modules/audit-smk`, `/export-model`, `/linked-processes`, `/file-management`
- **Компания:** `/company/success-stories`, `/clients`, `/partners`, `/reviews`, `/brand`, `/requisites`
- **Пресс:** `/press/knowledge-base`, `/reviews`, `/social`, `/glossary`

Трекер и опросник: `docs/00b-discovery.md`, `deliverables/WhatDaDev_Опросник_Фаза0.docx`.

## Как продолжить
- Полный контекст: `docs/README.md` (порядок чтения 00→17) + `docs/CHANGELOG.md`.
- Править сайт руками без ИИ: `docs/editing-guide.md`.
- Тексты страниц: `docs/12-copy/`, данные: `src/data/*.js`.
- Коммит-автор обязателен: `airg.inggger@gmail.com` / `airginggger-collab`.

## Команды
```
npm install        # один раз
npm run dev        # локальный предпросмотр → http://localhost:4321
npm run build      # сборка → dist/
npm run preview    # предпросмотр собранного dist/
git push           # публикация (Cloudflare соберёт сам)
```

# ADR-0015 — Личный кабинет редактирования: Sveltia CMS (git-based), вход по токену

Статус: ✅ Accepted · 2026-07-05 · Снимает ADR-0006 (CMS отложена)

## Контекст
Пользователь запросил личный кабинет, чтобы самостоятельно редактировать контент. Сайт статический (Astro SSG + Cloudflare Workers Static Assets), контент в git. План и варианты — `docs/19-cms-migration.md`; вариант «Sveltia + GitHub» утверждён пользователем.

## Решение
- **Sveltia CMS** на `/admin/` (`public/admin/index.html` + `config.yml`, скрипт с unpkg). Git-based: правка = коммит в `main` → автодеплой Cloudflare (~1–2 мин).
- **Вход — по Personal Access Token GitHub** («Sign In Using Access Token», токен fine-grained, права Contents read/write только на репозиторий WhatDaDev). OAuth-приложение и прокси-worker НЕ требуются; можно добавить позже для входа «в один клик».
- **Контент вынесен в редактируемые JSON** (`src/data/`): `home.json` (тексты главной), `pricing.json` (цены/акция Coordo — были захардкожены в 3 местах), `contacts.json` (контакты/реквизиты/соцсети — были в 4 местах), `team.json`, `directions.json`, `industries.json` (бывшие `.js`, JSON-корни — объекты для совместимости с CMS).
- `/admin/` закрыт от индексации (robots.txt + meta noindex). Медиа кабинета — `public/uploads/`, фото команды — `public/team/`, скриншоты — `public/covers/`.
- Инструкция для пользователя: `docs/editing-cabinet.md`.

## Почему
Git-based CMS — единственный вариант без сервера/БД/платежей на нашем стеке, с полной историей правок. Sveltia выбрана за вход по токену без OAuth-инфраструктуры, современный UI и совместимость с Decap-конфигом. Токен хранится в localStorage браузера пользователя — репозиторий остаётся приватным.

## Последствия
- Этап 2 (статьи/глоссарий → markdown-коллекции + черновики) и Этап 3 (остальные страницы) — по плану `docs/19-cms-migration.md`.
- Правки из кабинета коммитятся в `main` с префиксом `content(cabinet):` — история отделима от кода.
- Публикация без превью (сразу на прод) — принято для Этапа 1.

# UI/UX Full Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Полный UI/UX апгрейд WhatDaDev — motion tokens, hover-состояния, hero, навигация, футер, pricing, FAQ, 404 и 22 nano/xs улучшения.

**Architecture:** Все стили — в `src/styles/global.css` через CSS-переменные. Скрипты — инлайн в `src/layouts/Base.astro`. Страничная разметка — в соответствующих `.astro` файлах. Reveal/IO уже реализованы (класс `.in`), расширяем существующую систему.

**Tech Stack:** Astro 5 SSG, обычный CSS с CSS-переменными, нет Tailwind, нет тест-фреймворка — верификация визуальная через `npm run dev`.

**Pre-check (выполнить один раз):**
```bash
cd ~/Desktop/WhatDaDev && npm run dev
# Открыть http://localhost:4321 — убедиться что сайт работает
```

---

## Задача 1: Motion tokens + глобальный CSS-апгрейд

**Файлы:**
- Modify: `src/styles/global.css`

**Что добавляем:**
- `--transition-*` переменные
- Hover для `.card` через токены
- `::selection` indigo
- `cursor: pointer` на `.card[href]`, кликабельных карточках
- `:focus-visible` единый стиль
- Стиль ссылок в тексте (`.prose a`)
- `@media print`

- [ ] **Шаг 1.1: Добавить motion tokens в `:root`**

В `src/styles/global.css` найти блок `:root {` и добавить после последней переменной:

```css
  --transition-fast: 150ms ease;
  --transition-base: 280ms ease;
  --transition-slow: 500ms ease;
  --transition-hover: transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
```

- [ ] **Шаг 1.2: Обновить hover для `.card`**

Найти в `global.css`:
```css
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:26px;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
```
Заменить на:
```css
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:26px;transition:var(--transition-hover)}
.card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.08);border-color:rgba(79,70,229,.3)}
```

- [ ] **Шаг 1.3: Обновить `.btn` transition на токены**

Найти:
```css
.btn{display:inline-block;background:var(--accent);color:#fff;padding:13px 24px;border-radius:9999px;font-weight:500;transition:background .18s,transform .14s,box-shadow .18s;will-change:transform}
```
Заменить `transition:background .18s,transform .14s,box-shadow .18s` на `transition:var(--transition-hover),background var(--transition-fast)` и добавить после `.btn`:
```css
.btn:active{transform:scale(.97)}
```

- [ ] **Шаг 1.4: Типографика — lead-параграф и section-gap**

Найти в `global.css` стили `.lead` и добавить/обновить:
```css
.lead{font-size:clamp(1.05rem,2vw,1.2rem);line-height:1.7}
.section{padding:80px 0}
@media(max-width:840px){.section{padding:60px 0}}
```

Найти `h2` и добавить section-заголовки с отступом:
```css
.section h2:first-child,.section .eyebrow+h2{margin-top:0}
.section>*+h2{margin-top:0}
```

- [ ] **Шаг 1.5: Section divider между dark-hero и light-контентом**

```css
.section-divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:0}
```

Добавить `<div class="section-divider"></div>` между hero-секцией и первой светлой секцией в `index.astro`.

- [ ] **Шаг 1.6: Добавить `::selection`, `focus-visible`, ссылки, print**

Добавить в конец `global.css` перед последним `@media`:
```css
/* selection */
::selection{background:rgba(79,70,229,.15);color:#4F46E5}

/* focus */
:focus-visible{outline:2px solid #4F46E5;outline-offset:3px;border-radius:2px}

/* inline links */
.prose a{color:#4F46E5;text-decoration:underline;text-underline-offset:3px;transition:opacity var(--transition-fast)}
.prose a:hover{opacity:.75;text-decoration:none}

/* print */
@media print{.site-header,.site-footer,.btn-row{display:none!important}}
```

- [ ] **Шаг 1.7: Проверить**

```bash
npm run dev
```
- Выделить текст на странице → фиолетовый highlight
- Tab по странице → синяя обводка на кнопках
- Навести на карточку → плавный подъём 2px

- [ ] **Шаг 1.8: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(ui): motion tokens, card hover upgrade, selection, focus-visible, print styles"
git push origin main
```

---

## Задача 2: Hero — CTA-иерархия + trust-чипы + video glow

**Файлы:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

- [ ] **Шаг 2.1: Добавить стиль ghost-кнопки для тёмного фона и trust-чипов**

В `global.css` найти `.btn-ghost:hover` и добавить после него:
```css
.btn-secondary{background:transparent;border:1.5px solid rgba(255,255,255,.22);color:rgba(255,255,255,.7);padding:13px 24px;border-radius:9999px;font-weight:500;font-size:inherit;display:inline-block;transition:var(--transition-hover),background var(--transition-fast)}
.btn-secondary:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.4);color:#fff}

.trust-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.trust-chip{font-size:12px;color:rgba(255,255,255,.55);background:rgba(255,255,255,.07);padding:4px 12px;border-radius:99px;border:0.5px solid rgba(255,255,255,.12)}
```

- [ ] **Шаг 2.2: Добавить video-card ambient glow в CSS**

В `global.css` найти `.video-play-btn` и добавить перед ним:
```css
.video-card{border-radius:16px;overflow:hidden;position:relative;box-shadow:0 0 48px rgba(79,70,229,.22),0 0 0 1px rgba(79,70,229,.18)}
```

- [ ] **Шаг 2.3: Обновить hero в `index.astro`**

В `src/pages/index.astro` найти блок с кнопками hero (строки ~13-15):
```html
<div class="btn-row">
  <a class="btn" href="/contacts/">Записаться на демо</a>
  <a class="btn btn-ghost" href="/services/">Обсудить внедрение</a>
</div>
```
Заменить на:
```html
<div class="btn-row">
  <a class="btn" href="/contacts/">Записаться на демо</a>
  <a class="btn-secondary" href="/services/">Обсудить внедрение</a>
</div>
<div class="trust-chips">
  <span class="trust-chip">без предоплаты</span>
  <span class="trust-chip">ответ за 2 часа</span>
  <span class="trust-chip">NDA по запросу</span>
</div>
```

- [ ] **Шаг 2.4: Добавить класс `video-card` на видео-блок hero**

В `index.astro` найти контейнер видео-карточки (правая колонка hero-split, где `<video>`) и добавить класс `video-card`:
```html
<div class="video-card">
  <!-- существующий видео-код -->
</div>
```

- [ ] **Шаг 2.5: Добавить reveal + stagger на hero-элементы**

В `index.astro` в левой колонке `.hero-split` добавить классы и задержки:
```html
<div class="eyebrow reveal">...</div>
<h1 class="reveal" style="transition-delay:60ms">...</h1>
<p class="lead reveal" style="transition-delay:120ms">...</p>
<div class="btn-row reveal" style="transition-delay:180ms">...</div>
<div class="trust-chips reveal" style="transition-delay:240ms">...</div>
```

- [ ] **Шаг 2.6: Проверить**

```bash
npm run dev
# Открыть http://localhost:4321
```
- Hero: главная кнопка яркая, вторая — полупрозрачная
- Под кнопками — три чипа: «без предоплаты · ответ за 2 часа · NDA по запросу»
- Видео-карточка с фиолетовым свечением
- Элементы hero появляются с небольшим stagger при загрузке

- [ ] **Шаг 2.7: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(hero): CTA hierarchy, trust-chips, video ambient glow, reveal stagger"
git push origin main
```

---

## Задача 3: Навигация — active state + hover + кнопка «Наверх»

**Файлы:**
- Modify: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`

- [ ] **Шаг 3.1: Добавить стили активного пункта и hover в `global.css`**

Найти `.nav a:hover{color:#fff}` и заменить на:
```css
.nav a:hover{color:#fff}
.nav a[aria-current="page"]{color:#fff;font-weight:500;position:relative}
.nav a[aria-current="page"]::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:#4F46E5;border-radius:2px}
```

- [ ] **Шаг 3.2: Добавить aria-current через Astro**

В `Base.astro` в nav-секции обновить ссылки, добавив динамический aria-current. В начале файла (frontmatter) добавить:
```js
const currentPath = Astro.url.pathname;
```

Для каждой nav-ссылки добавить атрибут:
```html
<a href="/products/express/" aria-current={currentPath.startsWith('/products/') ? 'page' : undefined}>Продукты</a>
<a href="/services/" aria-current={currentPath.startsWith('/services/') ? 'page' : undefined}>Услуги</a>
<a href="/industries/" aria-current={currentPath.startsWith('/industries/') ? 'page' : undefined}>Отрасли</a>
<a href="/press/" aria-current={currentPath.startsWith('/press/') ? 'page' : undefined}>Пресс-центр</a>
<a href="/contacts/" aria-current={currentPath === '/contacts/' ? 'page' : undefined}>Контакты</a>
```

- [ ] **Шаг 3.3: Добавить кнопку «Наверх» в `Base.astro`**

Перед закрывающим `</body>` добавить:
```html
<button id="backToTop" aria-label="Наверх" style="position:fixed;bottom:24px;right:24px;z-index:50;width:40px;height:40px;border-radius:50%;background:#4F46E5;color:#fff;border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity var(--transition-base);pointer-events:none">↑</button>
```

В `<script>` в `Base.astro` добавить (после существующего IO-кода):
```js
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btt.style.opacity = show ? '1' : '0';
    btt.style.pointerEvents = show ? 'auto' : 'none';
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
```

- [ ] **Шаг 3.4: Добавить transition на мобильное меню**

В `global.css` найти `.nav.open{display:flex}` и обновить мобильные стили:
```css
@media(max-width:840px){
  .nav-toggle{display:block}
  .nav{display:none;position:absolute;top:64px;left:0;right:0;background:var(--dark-bg);flex-direction:column;align-items:flex-start;gap:16px;padding:18px 24px;border-top:1px solid var(--dark-border);opacity:0;transition:opacity var(--transition-base)}
  .nav.open{display:flex;opacity:1}
  .section{padding:60px 0}
}
```

- [ ] **Шаг 3.5: Проверить**

```bash
npm run dev
```
- Перейти на `/services/` → «Услуги» в меню подсвечена с indigo-линией снизу
- Проскроллить вниз 500px → кнопка «↑» появляется справа-снизу
- Нажать кнопку → плавный скролл наверх
- На мобиле (< 840px) меню открывается с плавным fade-in

- [ ] **Шаг 3.6: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(nav): active state, back-to-top button, mobile menu fade"
git push origin main
```

---

## Задача 4: Футер — расширение до 4 колонок

**Файлы:**
- Modify: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`

- [ ] **Шаг 4.1: Обновить футер в `Base.astro`**

Найти `<footer class="site-footer">` и заменить всё содержимое footer:
```html
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="logo" style="color:#fff;margin-bottom:10px">What<b>Da</b>Dev</div>
      <p style="max-width:220px">Внедрение ELMA365 и готовые продукты для документооборота. РФ и СНГ.</p>
      <div class="footer-contacts" style="margin-top:16px;font-size:13px">
        <p>Telegram: @WhatDaDev</p>
        <p>WhatsApp: +7 980 471-57-72</p>
        <p><a href="mailto:sales@whatdadev.ru">sales@whatdadev.ru</a></p>
      </div>
    </div>
    <div>
      <p class="footer-heading">Продукты</p>
      <nav aria-label="Продукты">
        <a href="/products/express/">Экспресс внедрение</a>
        <a href="/products/express/pricing/">Цены</a>
        <a href="/products/modules/">Модули</a>
        <a href="/products/express/vs-razrabotka/">Vs разработка</a>
      </nav>
    </div>
    <div>
      <p class="footer-heading">Услуги</p>
      <nav aria-label="Услуги">
        <a href="/services/">Все услуги</a>
        <a href="/services/vnedrenie/">Внедрение ELMA365</a>
        <a href="/services/razrabotka/">Разработка</a>
        <a href="/industries/">Отрасли</a>
      </nav>
    </div>
    <div>
      <p class="footer-heading">Компания</p>
      <nav aria-label="Компания">
        <a href="/company/about/">О компании</a>
        <a href="/elma365/">ELMA365</a>
        <a href="/press/">Пресс-центр</a>
        <a href="/contacts/">Контакты</a>
      </nav>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© 2026 WhatDaDev</span>
    <span>Внедрение ELMA365 в России и СНГ</span>
  </div>
</footer>
```

- [ ] **Шаг 4.2: Добавить стили футера в `global.css`**

Найти `.footer-grid{...}` и заменить на:
```css
.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:32px}
.footer-heading{color:#fff;font-weight:500;font-size:13px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.06em}
.site-footer nav{display:flex;flex-direction:column;gap:8px}
.site-footer nav a{font-size:14px;color:var(--dark-muted);transition:color var(--transition-fast)}
.site-footer nav a:hover{color:#fff}
.footer-bottom{margin-top:32px;padding-top:20px;border-top:1px solid var(--dark-border);display:flex;justify-content:space-between;font-size:13px;opacity:.5}
@media(max-width:840px){.footer-grid{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.footer-grid{grid-template-columns:1fr}}
```

- [ ] **Шаг 4.3: Проверить**

```bash
npm run dev
```
- Футер: 4 колонки на десктопе, 2 на планшете, 1 на мобиле
- Ссылки светлеют при hover
- Нет «прототип» в копирайте

- [ ] **Шаг 4.4: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(footer): 4-column layout with products/services/company sections"
git push origin main
```

---

## Задача 5: Pricing — выделение рекомендуемого тарифа

**Файлы:**
- Modify: `src/pages/products/express/pricing.astro`
- Modify: `src/styles/global.css`

- [ ] **Шаг 5.1: Добавить стиль featured-карточки**

В `global.css` после `.card:hover{...}` добавить:
```css
.card-featured{border:2px solid #4F46E5;box-shadow:0 4px 24px rgba(79,70,229,.18);position:relative}
.card-featured-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:#4F46E5;color:#fff;font-size:11px;font-weight:500;padding:3px 14px;border-radius:99px;white-space:nowrap}
```

- [ ] **Шаг 5.2: Найти средний тариф в `pricing.astro` и выделить**

В `src/pages/products/express/pricing.astro` найти второй блок `<div class="card">` (тариф «Базовый» или средний по списку) и изменить:
```html
<div class="card card-featured" style="position:relative">
  <div class="card-featured-badge">Рекомендуем</div>
  <!-- остальное содержимое карточки без изменений -->
</div>
```

- [ ] **Шаг 5.3: Проверить**

```bash
npm run dev
# Открыть http://localhost:4321/products/express/pricing/
```
- Средняя карточка: indigo рамка, тень, бейдж «Рекомендуем» сверху по центру
- Другие карточки без изменений

- [ ] **Шаг 5.4: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(pricing): highlight featured card with badge and indigo border"
git push origin main
```

---

## Задача 6: 404 — полезная страница

**Файлы:**
- Modify: `src/pages/404.astro`

- [ ] **Шаг 6.1: Обновить страницу 404**

Заменить содержимое `<section>` в `404.astro`:
```html
<section class="hero">
  <div class="container center" style="padding-top:100px;padding-bottom:80px">
    <div style="font-size:80px;font-weight:700;color:var(--accent);line-height:1">404</div>
    <h1 style="margin:16px 0 8px">Страница не найдена</h1>
    <p class="lead" style="margin:0 auto 32px;max-width:480px">Возможно, ссылка устарела или адрес изменился. Попробуй один из разделов ниже.</p>
    <div class="btn-row" style="justify-content:center;margin-bottom:48px">
      <a class="btn" href="/">На главную</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;max-width:800px;margin:0 auto">
      <a class="card" href="/products/express/" style="text-decoration:none">
        <div style="font-size:24px;margin-bottom:8px">📦</div>
        <h3 style="margin:0 0 6px">Экспресс внедрение</h3>
        <p style="margin:0;font-size:14px;color:var(--muted)">Готовый продукт для быстрого старта</p>
      </a>
      <a class="card" href="/services/" style="text-decoration:none">
        <div style="font-size:24px;margin-bottom:8px">⚙️</div>
        <h3 style="margin:0 0 6px">Услуги</h3>
        <p style="margin:0;font-size:14px;color:var(--muted)">Внедрение, разработка, обучение</p>
      </a>
      <a class="card" href="/contacts/" style="text-decoration:none">
        <div style="font-size:24px;margin-bottom:8px">💬</div>
        <h3 style="margin:0 0 6px">Связаться</h3>
        <p style="margin:0;font-size:14px;color:var(--muted)">Ответим за 2 часа</p>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Шаг 6.2: Проверить**

```bash
npm run dev
# Открыть http://localhost:4321/несуществующая-страница/
```
- Большой «404», заголовок, 3 карточки с быстрыми ссылками

- [ ] **Шаг 6.3: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(404): helpful page with quick navigation cards"
git push origin main
```

---

## Задача 7: FAQ-секции на /products/express/ и /services/

**Файлы:**
- Modify: `src/pages/products/express.astro`
- Modify: `src/pages/services/index.astro`
- Modify: `src/styles/global.css`

- [ ] **Шаг 7.1: Добавить стиль аккордеона в `global.css`**

Добавить в конец `global.css`:
```css
.faq{display:flex;flex-direction:column;gap:0;border:0.5px solid var(--border);border-radius:var(--radius);overflow:hidden}
.faq-item{border-bottom:0.5px solid var(--border)}
.faq-item:last-child{border-bottom:none}
.faq-q{width:100%;background:none;border:none;text-align:left;padding:18px 20px;font-size:16px;font-weight:500;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:var(--text);transition:background var(--transition-fast)}
.faq-q:hover{background:var(--surface)}
.faq-q::after{content:'+';font-size:20px;color:var(--accent);transition:transform var(--transition-base);flex-shrink:0}
.faq-q[aria-expanded="true"]::after{transform:rotate(45deg)}
.faq-a{display:none;padding:0 20px 18px;color:var(--muted);line-height:1.7;font-size:15px}
.faq-a.open{display:block}
```

- [ ] **Шаг 7.2: Добавить FAQ в `express.astro`**

Перед закрывающим `</Layout>` (или перед последней CTA-секцией) добавить:
```html
<section class="section">
  <div class="container" style="max-width:760px">
    <div class="eyebrow reveal">FAQ</div>
    <h2 class="reveal">Частые вопросы</h2>
    <div class="faq reveal" style="margin-top:32px">
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Сколько времени занимает внедрение?</button>
        <div class="faq-a">Экспресс внедрение рассчитано на 4–8 недель. Первые пользователи начинают работать уже через 2–3 недели — поэтапно, без простоя.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Нужна ли лицензия ELMA365?</button>
        <div class="faq-a">Да, ELMA365 — отдельный продукт. Мы помогаем подобрать нужный тариф и можем оформить лицензию. Стоимость лицензий не входит в цену Экспресс внедрения.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Что если нам нужны нестандартные доработки?</button>
        <div class="faq-a">Экспресс внедрение покрывает типовые сценарии. Для уникальных процессов мы предлагаем услугу разработки под заказ — обсудим на демо.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Есть ли поддержка после запуска?</button>
        <div class="faq-a">Да, в пакет входит сопровождение на Н недель. После этого доступна техподдержка по отдельному договору.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Работаете ли вы с компаниями из Казахстана?</button>
        <div class="faq-a">Да, мы работаем по всей России и СНГ, включая Казахстан. Все документы оформляем дистанционно.</div>
      </div>
    </div>
  </div>
</section>
```

Добавить JSON-LD FAQ в `<head>` страницы (если есть слот для head, иначе добавить через Base.astro prop):
```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Сколько времени занимает внедрение?","acceptedAnswer":{"@type":"Answer","text":"4–8 недель, первые пользователи через 2–3 недели."}},
    {"@type":"Question","name":"Нужна ли лицензия ELMA365?","acceptedAnswer":{"@type":"Answer","text":"Да, лицензии приобретаются отдельно, помогаем с подбором."}},
    {"@type":"Question","name":"Есть ли поддержка после запуска?","acceptedAnswer":{"@type":"Answer","text":"Да, Н недель сопровождения включено в пакет."}}
  ]
}</script>
```

- [ ] **Шаг 7.3: Добавить FAQ в `services/index.astro`** (аналогично, с вопросами про услуги)

```html
<section class="section">
  <div class="container" style="max-width:760px">
    <div class="eyebrow reveal">FAQ</div>
    <h2 class="reveal">Частые вопросы об услугах</h2>
    <div class="faq reveal" style="margin-top:32px">
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">С чего начать внедрение ELMA365?</button>
        <div class="faq-a">Начинаем с бесплатного демо — разбираем ваши процессы, показываем что можно автоматизировать. Занимает 30–45 минут онлайн.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Вы работаете с малым бизнесом?</button>
        <div class="faq-a">Да. Экспресс внедрение специально создано для компаний от 10 сотрудников. Для крупных проектов — полное внедрение под ключ.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Что входит в услугу разработки?</button>
        <div class="faq-a">Проектирование бизнес-процессов, разработка модулей ELMA365, интеграции с 1С/CRM/ERP, тестирование и обучение пользователей.</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">Можно ли мигрировать с другой системы?</button>
        <div class="faq-a">Да, помогаем с миграцией с Битрикс24, 1С:Документооборот и других систем. Разрабатываем план без потери данных.</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Шаг 7.4: Добавить JS для аккордеона в `Base.astro`**

В `<script>` в `Base.astro` добавить:
```js
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.nextElementSibling.classList.toggle('open', !expanded);
  });
});
```

- [ ] **Шаг 7.5: Проверить**

```bash
npm run dev
# /products/express/ и /services/ — FAQ-аккордеон внизу страницы
```
- Клик на вопрос → плавно разворачивается ответ, '+' поворачивается в '×'
- JSON-LD виден в source страницы

- [ ] **Шаг 7.6: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(faq): accordion sections on /products/express/ and /services/ with JSON-LD"
git push origin main
```

---

## Задача 8: Унификация иконок + reveal stagger на карточках

**Файлы:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

- [ ] **Шаг 8.1: Добавить stagger на карточки главной**

В `index.astro` найти секцию с карточками (`.card.reveal`) и добавить `transition-delay`:
```html
<a class="card reveal" href="/products/express/" style="transition-delay:0ms">...</a>
<a class="card reveal" href="/services/" style="transition-delay:80ms">...</a>
```

Аналогично для feature bento-карточек (`.fb-card`):
```html
<div class="fb-card fb-wide reveal" style="transition-delay:0ms">...</div>
<!-- следующая -->
<div class="fb-card reveal" style="transition-delay:80ms">...</div>
<!-- следующая -->
<div class="fb-card fb-tall reveal" style="transition-delay:160ms">...</div>
```

- [ ] **Шаг 8.2: Добавить `cursor:pointer` на `.card` с `href`**

В `global.css` добавить:
```css
a.card{cursor:pointer;text-decoration:none;color:inherit;display:block}
```

- [ ] **Шаг 8.3: Проверить**

```bash
npm run dev
```
- Карточки появляются с небольшим stagger при скролле до них
- Курсор — pointer на карточках-ссылках

- [ ] **Шаг 8.4: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(cards): reveal stagger, cursor:pointer on link-cards"
git push origin main
```

---

## Задача 9: Nano + XS — все мелкие улучшения

**Файлы:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Base.astro`
- Modify: все `.astro` страницы (alt-тексты, title-формат)

- [ ] **Шаг 9.1: `::selection` + `cursor:pointer` + print уже сделаны в задаче 1** — пропустить

- [ ] **Шаг 9.2: Аудит alt-текстов**

```bash
grep -rn '<img' ~/Desktop/WhatDaDev/src/ | grep -v 'alt="[^"]'
```

Для каждого найденного `<img>` без alt или с пустым alt — добавить описательный текст. Пример:
```html
<!-- было -->
<img src="/images/team.jpg" alt="">
<!-- стало -->
<img src="/images/team.jpg" alt="Команда WhatDaDev — специалисты по ELMA365">
```

- [ ] **Шаг 9.3: Проверить Title-формат**

```bash
grep -rn '<title>' ~/Desktop/WhatDaDev/src/ | head -20
```

Для страниц где title не содержит «| WhatDaDev» — добавить. Пример в `Base.astro`:
```html
<title>{title} | WhatDaDev</title>
```
Убедиться что переменная `title` передаётся во все страницы.

- [ ] **Шаг 9.4: Добавить `transition-delay` на `<h2>` разделов**

В `global.css` добавить:
```css
h2.reveal{transition-delay:0ms}
```
(уже работает через `.reveal` — проверить что все section-заголовки имеют класс `.reveal`)

- [ ] **Шаг 9.5: Проверить финальную сборку**

```bash
npm run build && npm run preview
```
- Открыть http://localhost:4321
- Проверить: все анимации работают, футер корректный, FAQ открывается, pricing-карточка выделена, nav-active работает

- [ ] **Шаг 9.6: Финальный коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "feat(ui): alt-texts audit, title pipe-format, section h2 reveal"
git push origin main
```

---

## Задача 10: Обновить docs

**Файлы:**
- Modify: `docs/CHANGELOG.md`
- Modify: `docs/HANDOFF.md`

- [ ] **Шаг 10.1: Добавить запись в CHANGELOG**

```markdown
## v0.48 — 2026-06-23

### UI/UX Full Upgrade
- Motion tokens (`--transition-fast/base/slow/hover`) в global.css
- Hover карточек: translateY(−2px) + indigo border + тень
- Hero: CTA-иерархия (primary/ghost), trust-чипы, video ambient glow, reveal stagger
- Навигация: active state (aria-current + indigo underline), кнопка «Наверх»
- Футер: 4 колонки (Продукты / Услуги / Компания / Контакты)
- Pricing: выделение рекомендуемого тарифа (badge + indigo border)
- 404: полезные карточки-ссылки вместо заглушки
- FAQ-аккордеоны на /products/express/ и /services/ с FAQPage JSON-LD
- Карточки: reveal stagger, cursor:pointer на a.card
- Nano: ::selection indigo, focus-visible, @media print, alt-тексты
```

- [ ] **Шаг 10.2: Обновить HANDOFF.md**

Изменить версию на `v0.48`, обновить дату и дополнить раздел «Что готово» новыми пунктами.

- [ ] **Шаг 10.3: Коммит**

```bash
git -c user.email=airg.inggger@gmail.com -c user.name=airginggger-collab \
  commit -am "docs: CHANGELOG v0.48, HANDOFF update"
git push origin main
```

---

## Что уже сделано (не реализовывать)

- `scroll-behavior: smooth` — уже в `global.css:9`
- `.reveal` + IntersectionObserver — уже работают (класс `.in`)
- `.btn` и `.btn-ghost` — уже существуют, в задаче 1 только улучшаем

## Что осталось за рамками (Phase 0 — нужен заказчик)

- Социальные доказательства (логотипы клиентов, реальные цифры) — ждём Фазу 0
- OG-изображения для статей — после получения брендбука
- Team hover с LinkedIn — после получения фото и ссылок
- Форма inline-валидация — после интеграции с ELMA365
- Сравнительная таблица sticky — отдельная задача, не quick-win
- Внутренняя перелинковка — после наполнения всех страниц

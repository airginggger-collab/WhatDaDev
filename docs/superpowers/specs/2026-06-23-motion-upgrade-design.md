# UI/UX Full Upgrade — Subtle Motion + Полный аудит сайта

Date: 2026-06-23
Version: v3.0
Status: approved

## Context

WhatDaDev v0.47, Astro 5 SSG, CSS variables, Cloudflare Workers Static Assets.
Goal: полный UI/UX upgrade — 7 зон motion/визуала + 22 дополнительных улучшения от M до nano.
Стиль motion: Subtle (Linear/Vercel/Notion). Приоритет: quick-wins.

## Motion style

**Subtle** — плавный, профессиональный, без пружин.
Референсы: Linear, Vercel, Notion.
Hover: translateY(−2px) + мягкая тень. Reveal: opacity + translateY(16px) за 500ms ease.

## Approach: CSS tokens + Intersection Observer

Один IO-скрипт в `Base.astro` + motion-токены в `global.css`. SSG-дружелюбно, не ломает Core Web Vitals.

---

## 1. Motion tokens — `src/styles/global.css`

Добавить в `:root`:

```css
--transition-fast:  150ms ease;
--transition-base:  280ms ease;
--transition-slow:  500ms ease;
--transition-hover: transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
--reveal-y:         16px;
```

Глобальные классы reveal:

```css
.reveal {
  opacity: 0;
  transform: translateY(var(--reveal-y));
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

## 2. Intersection Observer — `src/layouts/Base.astro`

Перед `</body>`:

```html
<script>
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
```

## 3. Hero (`src/pages/index.astro`)

- H1, подзаголовок, CTA-блок — класс `.reveal` + stagger 0ms / 80ms / 160ms
- Главная CTA-кнопка — `btn-primary` (заметный indigo, полный вес)
- Вторая кнопка — ghost-стиль (opacity 60%, `btn-ghost`)
- Видео-карточка справа — ambient indigo-свечение через `box-shadow: 0 0 32px rgba(79,70,229,0.15)`

## 4. Навигация (`src/components/Header.astro` или аналог)

- Активный раздел — indigo-точка/underline
- Hover пункт меню — subtle indigo-fill фон + левая полоска 3px
- Дропдаун — появление через `opacity` + `transform: translateY(4px→0)` за `var(--transition-base)`
- Мобильное меню — overlay через `opacity` + `pointer-events`, не `display:none/block`
- Бургер-иконка: `transition: transform var(--transition-base)` при открытии

```css
.nav-link::after {
  transition: width var(--transition-base);
}
.nav-dropdown {
  transition: opacity var(--transition-base), transform var(--transition-base);
}
```

## 5. Cards / bento

- Иконки карточек — indigo-tint фон (`background: rgba(79,70,229,0.08)`, `border: 0.5px solid rgba(79,70,229,0.25)`)
- Hover upgrade для всех типов карточек:

```css
.feature-card,
.module-card,
.pricing-card {
  transition: var(--transition-hover);
}
.feature-card:hover,
.module-card:hover,
.pricing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

- Класс `.reveal` + stagger на каждую карточку (0 / 80 / 160ms)

## 6. CTA-секции

- Под кнопкой заявки — три trust-чипа: «без предоплаты · ответ за 2ч · NDA по запросу»
- Стиль чипов: `background: var(--color-background-secondary)`, `border-radius: 99px`, `font-size: 12px`
- CTA-блок целиком — класс `.reveal`

```css
.btn-primary {
  transition: var(--transition-hover), transform var(--transition-fast);
}
.btn-primary:active {
  transform: scale(0.97);
}
```

## 7. Типографика

- `<h2>` разделов — indigo-акцент (цвет `var(--color-accent)` = `#4F46E5`)
- Увеличить `section-gap` между секциями (текущий → +20–24px)
- Lead-параграф под H1/H2 — `font-size: clamp(1.05rem, 2vw, 1.2rem)`, чуть крупнее body
- Заголовки разделов — класс `.reveal`

## 8. Мобильная версия

- CTA-кнопка на мобиле — полная ширина (`width: 100%`), sticky снизу на ключевых страницах
- Карточки модулей/услуг — compact-layout: иконка слева + текст справа (вместо стека)
- Проверить breakpoint `< 480px` — padding и font-size не сжаты

## 9. Pricing (`src/pages/products/express/pricing.astro` или аналог)

- Средний тариф — `border: 2px solid #4F46E5` + `box-shadow: 0 2px 12px rgba(79,70,229,0.15)` + бейдж «Рекомендуем»
- Бейдж: `background: rgba(79,70,229,0.1); color: #4F46E5; font-size: 11px; padding: 3px 10px; border-radius: 99px`
- Все pricing-карточки — класс `.reveal` + stagger 0 / 100 / 200ms

---

## Reveal stagger — сводная таблица

| Зона | Элементы | Stagger |
|---|---|---|
| Hero | H1 / подзаголовок / CTA | 0 / 80 / 160ms |
| Feature bento | каждый `.feature-card` | 0 / 80 / 160ms |
| Модули | каждый `.module-card` | 0 / 80 / 160ms |
| CTA-секции | весь `.cta-section` | 0ms |
| Pricing | каждая `.pricing-card` | 0 / 100 / 200ms |
| `<h2>` разделов | все страницы | 0ms |

---

## Out of scope

- Cursor-following / parallax (стиль C, не выбран)
- Смена цветовой схемы / токенов
- Новые страницы
- Редизайн hero-видео (уже есть looping video)

---

## Files to change

1. `src/styles/global.css` — motion tokens + reveal + hover + typography + trust-chips + focus + links + selection + print
2. `src/layouts/Base.astro` — IO script + back-to-top + smooth-scroll + scroll-progress
3. `src/pages/index.astro` — hero reveal + stagger + CTA hierarchy + trust-chips + social proof
4. `src/components/Header.astro` (или аналог) — nav hover + active state + dropdown transition + mobile overlay
5. `src/components/Footer.astro` — многоколоночный футер
6. `src/components/FeatureCard.astro` (или аналог) — reveal + stagger + icon indigo-tint + cursor:pointer
7. `src/pages/products/express/pricing.astro` — featured card + badge
8. `src/pages/404.astro` — полезные ссылки + поисковая подсказка
9. Сравнительные страницы — sticky-заголовок таблицы + highlight колонки
10. Статьи и страницы услуг — блок «Смотри также» + FAQ-секции
11. Все страницы с `.module-card`, `.cta-section`, `<h2>` — reveal классы
12. Все `<img>` — аудит alt-текстов

---

## Полный бэклог улучшений

### M — средние (полдня каждое)

| # | Что | Детали |
|---|---|---|
| M1 | Футер — структура | Колонки: Услуги / Продукты / Компания / Контакты |
| M2 | 404 — полезная страница | Быстрые ссылки + поисковая подсказка |
| M3 | Социальные доказательства на главной | Логотипы клиентов / цитата / счётчики под hero |
| M4 | FAQ-секции на продуктовых страницах | Аккордеон 4–6 вопросов + FAQPage JSON-LD на /products/express и /services |
| M5 | Таблица сравнения — апгрейд | Sticky-заголовок, highlight «наш» столбец, иконки Tabler |

### S — малые (1–3 часа)

| # | Что | Детали |
|---|---|---|
| S1 | Унификация кнопок | Три варианта: primary / ghost / text-link, убрать ad-hoc стили |
| S2 | Иконки — единый стиль | Везде Tabler outline 20px, убрать разнобой SVG |
| S3 | Команда — hover на аватарах | Должность + LinkedIn при hover |
| S4 | Форма — inline валидация | Подсветка ошибки, зелёный чекмарк, без перезагрузки |
| S5 | Разделители секций | Subtle волна/косая линия между dark-hero и light-контентом |
| S6 | Внутренняя перелинковка | Блок «Смотри также» внизу статей и страниц услуг |
| S7 | OG-изображения для статей | Уникальные og:image с заголовком + логотипом |

### XS — мелкие (30–60 мин)

| # | Что | Детали |
|---|---|---|
| XS1 | Focus-состояния | `:focus-visible` indigo outline 2px на всех интерактивных элементах |
| XS2 | Ссылки в тексте | indigo underline offset 3px + hover без underline |
| XS3 | Кнопка «Наверх» | Появляется после 400px скролла, фиксированная снизу-справа |
| XS4 | Активный пункт меню | Текущая страница → indigo цвет в навигации |
| XS5 | Аудит отступов | Убрать хардкод px → шкала rem: 0.5/1/1.5/2/3/4 |

### Nano — минуты

| # | Что | Детали |
|---|---|---|
| N1 | `scroll-behavior: smooth` | Одна строка в `html {}` |
| N2 | `cursor: pointer` на карточках | Кликабельные карточки без `<a>` |
| N3 | `::selection` — indigo | `background: #4F46E520; color: #4F46E5` |
| N4 | Title тег — pipe-формат | «Страница \| WhatDaDev» единообразно |
| N5 | Alt-тексты изображений | Проверить все `<img>`, заполнить пустые |
| N6 | `@media print` | Скрыть nav/footer при печати |

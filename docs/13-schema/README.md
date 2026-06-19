# 13 — Schema.org (JSON-LD) — готовые блоки

Статус: 🟡 черновик · версия v0.10
Готовые к вставке блоки разметки. Вставляются в `<head>` (или конец `<body>`) соответствующей страницы внутри `<script type="application/ld+json">…</script>`.
`{{...}}` — заменить реальными данными. Зачем: расширенные сниппеты в Яндекс/Google → выше CTR (наше SEO-преимущество, ADR-0004).

Какой блок на какую страницу:
| Страница | Блоки |
|---|---|
| Все страницы | Organization (в общий layout) + BreadcrumbList |
| / (главная) | Organization, WebSite |
| /products/express (+ контуры) | SoftwareApplication + Offer, FAQPage |
| /services/* | Service, FAQPage |
| /company/about | Organization (расширенный) |
| /contacts | Organization + ContactPoint |

> Проверять после вставки: Яндекс.Вебмастер → «Проверка структурированных данных» и Google Rich Results Test.

---

## Organization (общий layout, все страницы)
Замените: `{{LOGO_URL}}`.
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WhatDaDev",
  "url": "https://whatdadev.ru",
  "logo": "{{LOGO_URL}}",
  "description": "Внедрение ELMA365 под ключ и готовые продукты для документооборота. РФ и КЗ.",
  "email": "sales@whatdadev.ru",
  "telephone": "+7-980-471-57-72",
  "areaServed": ["RU", "KZ"],
  "sameAs": [
    "https://t.me/WhatDaDev"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-980-471-57-72",
    "email": "sales@whatdadev.ru",
    "contactType": "sales",
    "availableLanguage": ["ru", "en"]
  }
}
```

## WebSite (главная)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WhatDaDev",
  "url": "https://whatdadev.ru",
  "inLanguage": ["ru", "en"]
}
```

## SoftwareApplication + Offer (/products/express и контуры)
Замените: `{{PRICE}}` (например 990000), `{{IMAGE_URL}}`. На страницах контуров поменяйте name/description.
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Экспресс внедрение (Coordo)",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Электронный документооборот (ЭДО)",
  "operatingSystem": "ELMA365",
  "url": "https://whatdadev.ru/products/express",
  "image": "{{IMAGE_URL}}",
  "description": "Готовый ЭДО на ELMA365: согласование договоров, ОРД и корреспонденции. Маршруты без кода. Разово, без подписки.",
  "offers": {
    "@type": "Offer",
    "price": "{{PRICE}}",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock",
    "url": "https://whatdadev.ru/products/express",
    "priceValidUntil": "{{2026-07-31}}"
  },
  "provider": {
    "@type": "Organization",
    "name": "WhatDaDev",
    "url": "https://whatdadev.ru"
  }
}
```

## FAQPage (продуктовые и сервисные страницы)
Пример с реальными вопросами /products/express — заменяйте под страницу.
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Чем это отличается от разработки с нуля?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Вы получаете готовые, отлаженные контуры сразу, а не проект на месяцы. Настройка маршрутов — без кода."
      }
    },
    {
      "@type": "Question",
      "name": "Нужно платить за каждого пользователя?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Нет. Стоимость разовая, без подписки и без доплат за число пользователей."
      }
    },
    {
      "@type": "Question",
      "name": "На чём работает продукт?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "На платформе ELMA365. Документооборот добавляется поверх вашей ELMA365."
      }
    }
  ]
}
```

## Service (/services/* )
Пример для /services/vnedrenie — меняйте name/serviceType под направление.
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Внедрение ELMA365 под ключ",
  "serviceType": "Внедрение ELMA365",
  "url": "https://whatdadev.ru/services/vnedrenie",
  "description": "Внедрение ELMA365 под ваши процессы: CRM, ЭДО, ServiceDesk, закупки, проекты, КЭДО. Аналитика, настройка, поддержка.",
  "areaServed": ["RU", "KZ"],
  "availableLanguage": ["ru", "en"],
  "provider": {
    "@type": "Organization",
    "name": "WhatDaDev",
    "url": "https://whatdadev.ru"
  }
}
```

## BreadcrumbList (вложенные страницы)
Пример для /products/express/dogovory.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://whatdadev.ru" },
    { "@type": "ListItem", "position": 2, "name": "Продукты", "item": "https://whatdadev.ru/products" },
    { "@type": "ListItem", "position": 3, "name": "Экспресс внедрение", "item": "https://whatdadev.ru/products/express" },
    { "@type": "ListItem", "position": 4, "name": "Согласование договоров", "item": "https://whatdadev.ru/products/express/dogovory" }
  ]
}
```

## ContactPage (/contacts)
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://whatdadev.ru/contacts",
  "mainEntity": {
    "@type": "Organization",
    "name": "WhatDaDev",
    "email": "sales@whatdadev.ru",
    "telephone": "+7-980-471-57-72",
    "areaServed": ["RU", "KZ"]
  }
}
```

---

## TODO (после Фазы 0)
- `{{LOGO_URL}}`, `{{IMAGE_URL}}` — реальные ссылки.
- `{{PRICE}}`, `priceValidUntil` — подтвердить цену/дату акции.
- Добавить `AggregateRating` / `Review` — когда будут отзывы с согласием.
- Уточнить второй мессенджер/соцсети в `sameAs`.

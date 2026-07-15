# JSON-LD аудит: остаточный бэклог (2026-07-16)

> Источник: exhaustive-аудит workflow'ом (4 измерения × адверсариальная верификация, 9 агентов). P0 не найдено. Внедрённое — в CHANGELOG v0.94. Здесь только открытое: низкоценно (entity-граф без rich-результата) либо заблокировано данными от заказчика.

## Внедрено (не повторять)

- Organization обогащён (@id #org, logo, contactPoint, полный sameAs), WebSite (@id #website, publisher @id, inLanguage: ru).
- @id-граф: articleLd author/publisher, Offer.provider (express/coordo) → {@id #org}.
- Policy: /kz FAQPage больше не сериализует {{...}}-заглушки.
- Correctness: ItemList модулей наполнен, пустой Offer на /pricing убран, priceValidUntil в express/coordo Offer.

## Открыто

### Заблокировано данными заказчика (Фаза 0)

| Что | Где | Разблокирует |
|---|---|---|
| Article без datePublished/dateModified/image | `content.config.ts` (нет полей даты) + 20 статей + `articleLd` | Реальные даты (можно бэкфилл из git-истории) + изображения статей. Без дат Article rich result недостижим |
| Видимые {{...}}-заглушки на /kz | `src/pages/kz/index.astro` (визуальный рендер faqKz и блока t/d) | Подтверждённый контент Фазы 0 (референсы РК, право упоминания Air Astana/Bereke, интеграции ЭЦП/eGov). Сейчас пользователь видит литеральные {{...}} |

### Инфраструктурный риск (кодом не чинится)

- Все `url`/`@id`/canonical/og захардкожены на `https://whatdadev.ru`. Если домен не привязан к новому сайту (живой прод на `*.workers.dev`), разметка ссылается на старый сайт. НЕ править `site` (аналог долга привязки домена). Занести в deploy-чеклист, после cutover прогнать Google Rich Results Test.

### Низкоценно (entity-граф, без rich-результата) — по желанию

- `Service` на `/kz` (areaServed: KZ, provider @id) и обогащение тонкого `Service` на `/industries/[slug]` (description из `x.desc`, serviceType, provider @id).
- `ItemList`/`CollectionPage` на листингах: `/industries/` (5 отраслей), `/services/` (6 услуг, url только для vnedrenie/razrabotka), `/press/` (перечень статей).
- `DefinedTerm` + `DefinedTermSet` для глоссария (15 терминов сейчас размечены как Article) — ветвление в `PressEntry.astro` + `definedTermLd()` в schema.ts.
- `Service` на контурных страницах Express (`ContourPage.astro`: dogovory/ord/korrespondenciya) и `SoftwareApplication` на модуле zameshcheniya.
- `ContactPage` + `contactPoint` на `/contacts`, `Person`/founder на `/company/about` (E-E-A-T, team.json).
- Свести express/coordo к одному `@id`-продукту (сейчас два SoftwareApplication под близкими именами).

### P3 correctness (мелочи)

- `og:type` жёстко `website` на статьях (нужен проп `ogType: article` из PressEntry) — влияет на соц-превью, не на search.
- Breadcrumbs: правило вывода `item` в JSON-LD чуть отличается от видимого (latent, выровнять `it.href && i < items.length-1`).
- `/coordo`: видимый FAQ (7 Q&A) без FAQPage (рассинхрон с сиблингами) — вынести Q&A в массив, добавить faqLd.

## Честная рамка (из аудита)

Почти вся эта разметка (Organization, Service, ItemList, DefinedTerm, FAQPage) даёт сигнал entity-графа и Knowledge Panel, НЕ rich-сниппет в выдаче. FAQPage rich Google урезал с 2023 для коммерции. Реальный rich-потенциал есть только у SoftwareApplication+Offer (и то при aggregateRating, которого нет и который выдумывать нельзя). Не расширять разметку ради сниппетов, которых не будет.

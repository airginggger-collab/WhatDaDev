# JSON-LD аудит: остаточный бэклог (обновлено 2026-07-17)

> Источник: exhaustive-аудит workflow'ом (4 измерения × адверсариальная верификация, 9 агентов). P0 не найдено. Внедрённое — в CHANGELOG v0.94 и v0.96. Здесь только открытое.

## Внедрено (не повторять)

**v0.94.** Organization обогащён (@id #org, logo, contactPoint, полный sameAs), WebSite (@id #website, publisher @id, inLanguage: ru). @id-граф: articleLd author/publisher, Offer.provider → {@id #org}. /kz FAQPage больше не сериализует {{...}}-заглушки. ItemList модулей наполнен, пустой Offer на /pricing убран, priceValidUntil в Offer.

**v0.96.** `date_published`/`date_modified` в `content.config.ts` + бэкфилл из git в 35 файлов + поля в кабинете; `Article` отдаёт даты. Глоссарий: `DefinedTerm` + `DefinedTermSet` вместо `Article` (`PressEntry` получил проп `kind`). `collectionPageLd()` на `/press/`, `/services/`, `/industries/`. `serviceLd()` на `/kz/` и `/industries/[slug]`. `ContactPage` + contactPoint на `/contacts/`, `Person` на `/company/about/`. Express и Coordo сведены к одному `@id: #coordo` (`coordoProductLd()`). `og:type=article` (проп `ogType`). Правило `item` в BreadcrumbList выровнено с видимой разметкой. `faqLd` на `/coordo/` (7 вопросов, раньше разметки не было).

## Открыто

### Требует данных заказчика

| Что | Где | Разблокирует |
|---|---|---|
| `image` у Article | 20 статей | Изображения статей. Даты уже есть, но **Article rich result не соберётся без картинки** — это единственное, что осталось для полного узла |
| Видимый контент `/kz/` | `src/pages/kz/index.astro` | Ответы Фазы 0 (партнёрство в РК, ЭЦП/eGov, тенге/1С, референсы). С v0.95 заглушки **скрыты**, вместе с ними скрыты карточка «Локальный партнёр», секция «Локализация РК» и 2 из 4 вопросов FAQ. Вернуть после ответов |
| Логотип в векторе | `Organization.logo` | Сейчас временно `og.png` |

### Новое (найдено 2026-07-17)

- 🔴 **12 статей старого сайта не мигрированы.** На `whatdadev.ru/articles/` живут 12 текстов апреля–августа 2025 («Синдром Excel в автоматизации», «Ошибки внедрения ELMA365» и др.). В новом репозитории **ни одного из них нет**: 20 новых статей это другие тексты, написанные под редизайн. После привязки домена их URL отдадут 404, а накопленный трафик и позиции пропадут. Решить с заказчиком: переносим тексты, ставим 301 на близкие по теме новые статьи или осознанно отпускаем. Связано с задачей «карта 301-редиректов» в `00b-discovery.md` (блок 3).

### Инфраструктурный риск (кодом не чинится)

- Все `url`/`@id`/canonical/og захардкожены на `https://whatdadev.ru`. Пока домен не привязан (живой прод на `*.workers.dev`), разметка ссылается на старый сайт. НЕ править `site`. Занести в deploy-чеклист, после cutover прогнать Google Rich Results Test.

### Низкоценно — по желанию

- `Service` на контурных страницах Express (`ContourPage.astro`: dogovory/ord/korrespondenciya) и `SoftwareApplication` на модуле zameshcheniya.

## Честная рамка (из аудита)

Почти вся эта разметка (Organization, Service, ItemList, DefinedTerm, FAQPage) даёт сигнал entity-графа и Knowledge Panel, **НЕ rich-сниппет** в выдаче. FAQPage rich Google урезал с 2023 для коммерции. Реальный rich-потенциал есть только у SoftwareApplication+Offer (и то при aggregateRating, которого нет и который выдумывать нельзя) и у Article при наличии картинок. Не расширять разметку ради сниппетов, которых не будет.

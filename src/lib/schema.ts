// Хелперы для генерации JSON-LD schema.org. Возвращают ОБЪЕКТЫ (не строки):
// сериализацию и экранирование берёт на себя jsonLd() в Base.astro (см. src/lib/jsonld.ts).
// Не сериализовать здесь вручную: иначе двойная сериализация или непройденное экранирование.

type FaqTuple = [string, string];
type FaqObject = { q: string; a: string };
export type FaqItem = FaqTuple | FaqObject;

function toTuple(item: FaqItem): FaqTuple {
  return Array.isArray(item) ? item : [item.q, item.a];
}

// FAQPage: mainEntity из массива [q, a] или { q, a }.
export function faqLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => {
      const [q, a] = toTuple(item);
      return { "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } };
    }),
  };
}

export const SITE = "https://whatdadev.ru";
export const ORG_REF = { "@id": `${SITE}/#org` };
export const TERMSET_ID = `${SITE}/press/glossary/#termset`;
export const COORDO_ID = `${SITE}/#coordo`;

// Один продукт, две страницы (/products/express/ и /coordo/). Раньше каждая
// объявляла свой SoftwareApplication под близким именем, и в графе это читалось
// как два разных продукта. Теперь обе отдают один @id, канонический url ведёт
// на /products/express/. Имя по ADR-0010: описание ведёт, «Coordo» рядом.
export function coordoProductLd(opts: { price: string; priceValidUntil: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": COORDO_ID,
    name: "Экспресс внедрение (Coordo)",
    applicationCategory: "BusinessApplication",
    operatingSystem: "ELMA365",
    url: `${SITE}/products/express/`,
    description:
      "Готовый ЭДО на ELMA365: согласование договоров, ОРД и корреспонденции плюс модуль замещений. Маршруты без кода. Разово, без подписки.",
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      priceValidUntil: opts.priceValidUntil,
      url: `${SITE}/products/express/`,
    },
    provider: ORG_REF,
  };
}

type ArticleData = {
  headline: string;
  description: string;
  faq?: FaqItem[];
  date_published?: string;
  date_modified?: string;
};

// Даты приходят строкой ГГГГ-ММ-ДД (см. content.config.ts). Если даты нет,
// поле не выводим: пустая или выдуманная дата хуже отсутствующей.
function dates(d: ArticleData) {
  const modified = d.date_modified ?? d.date_published;
  return {
    ...(d.date_published ? { datePublished: d.date_published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };
}

// Article (+ FAQPage, если есть faq). Возвращает массив блоков для jsonld-пропа Base.
export function articleLd(d: ArticleData, url: string) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: d.headline,
    description: d.description,
    author: ORG_REF,
    publisher: ORG_REF,
    ...dates(d),
    url,
    inLanguage: "ru",
  };
  return d.faq && d.faq.length ? [article, faqLd(d.faq)] : [article];
}

// Глоссарий это термины, а не статьи: DefinedTerm внутри общего DefinedTermSet.
// Article здесь семантически неверен (было до v0.96).
export function definedTermLd(d: ArticleData & { name?: string }, url: string) {
  const term = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: d.name ?? d.headline,
    description: d.description,
    url,
    inLanguage: "ru",
    ...dates(d),
    inDefinedTermSet: { "@id": TERMSET_ID },
  };
  return d.faq && d.faq.length ? [term, faqLd(d.faq)] : [term];
}

// Набор терминов. Живёт на /press/glossary/, термины ссылаются на него по @id.
export function definedTermSetLd(terms: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": TERMSET_ID,
    name: "Глоссарий ЭДО и автоматизации",
    description: "Термины электронного документооборота, BPM-систем и автоматизации процессов.",
    url: `${SITE}/press/glossary/`,
    inLanguage: "ru",
    publisher: ORG_REF,
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.name, url: t.url })),
  };
}

// Услуга. provider всегда ссылкой на #org, чтобы не плодить дубли Organization.
export function serviceLd(s: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: s.url,
    ...(s.serviceType ? { serviceType: s.serviceType } : {}),
    areaServed: s.areaServed ?? ["RU", "KZ"],
    provider: ORG_REF,
    inLanguage: "ru",
  };
}

// Листинг: CollectionPage + вложенный ItemList. url у пункта опционален:
// на /services/ часть направлений пока без своих страниц.
export function collectionPageLd(c: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: c.url,
    inLanguage: "ru",
    isPartOf: { "@id": `${SITE}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: c.items.length,
      itemListElement: c.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        ...(it.url ? { url: it.url } : {}),
      })),
    },
  };
}

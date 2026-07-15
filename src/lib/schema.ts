// Хелперы для генерации JSON-LD schema.org. Возвращают ОБЪЕКТЫ (не строки):
// сериализацию и экранирование берёт на себя jsonLd() в Base.astro (см. src/lib/jsonld.ts).
// Не сериализовать здесь вручную — иначе двойная сериализация/непройденное экранирование.

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

type ArticleData = {
  headline: string;
  description: string;
  faq?: FaqItem[];
};

// Article (+ FAQPage, если есть faq). Возвращает массив блоков для jsonld-пропа Base.
export function articleLd(d: ArticleData, url: string) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: d.headline,
    description: d.description,
    author: { "@id": "https://whatdadev.ru/#org" },
    publisher: { "@id": "https://whatdadev.ru/#org" },
    url,
    inLanguage: "ru",
  };
  return d.faq && d.faq.length ? [article, faqLd(d.faq)] : [article];
}

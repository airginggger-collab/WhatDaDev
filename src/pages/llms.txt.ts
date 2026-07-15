import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import servicesData from "../data/services.json";
import modulesData from "../data/modules.json";
import industriesData from "../data/industries.json";
import contacts from "../data/contacts.json";

// Генерирует /llms.txt на билде (Astro static endpoint) из src/data + коллекций.
// Формат llms.txt: заголовок, аннотация, разделы со ссылками и описаниями, чтобы
// внешние AI-агенты (ChatGPT, Perplexity) точно понимали услуги, продукты и контент.
// Абсолютные URL строятся от Astro.site (whatdadev.ru), как canonical/og.

type Item = { name?: string; h1?: string; title?: string; desc?: string; lead?: string; href?: string; slug?: string };

const services = (servicesData as { items: Item[] }).items;
const modules = (modulesData as { items: Item[] }).items;
const industries = (industriesData as { items: Item[] }).items;

const clean = (s: string) => (s || "").replace(/\s+/g, " ").trim();

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href || "https://whatdadev.ru/").replace(/\/$/, "");
  const abs = (p: string) => `${base}${p.startsWith("/") ? p : `/${p}`}`;

  const articles = (await getCollection("articles"))
    .filter((a) => !a.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
  const glossary = (await getCollection("glossary"))
    .filter((g) => !g.data.draft)
    .sort((a, b) => a.data.order - b.data.order);

  const lines: string[] = [];
  lines.push("# WhatDaDev", "");
  lines.push(
    "> Внедрение ELMA365 и собственные продукты для автоматизации документооборота и бизнес-процессов: Экспресс внедрение (Coordo), готовые модули, разработка. Рынки Россия и Казахстан.",
    "",
  );
  lines.push(`Контакты: телефон ${contacts.phone}, email ${contacts.email}, Telegram ${contacts.telegram}.`, "");

  lines.push("## Услуги", "");
  for (const s of services) {
    if (!s.href) continue;
    lines.push(`- [${clean(s.name || "")}](${abs(s.href)})${s.desc ? `: ${clean(s.desc)}` : ""}`);
  }
  lines.push("");

  lines.push("## Продукты", "");
  lines.push(`- [Экспресс внедрение (Coordo)](${abs("/products/express")}): быстрый запуск ELMA365 на готовых контурах документооборота`);
  lines.push(`- [Тарифы Экспресс внедрения](${abs("/products/express/pricing")}): стоимость и состав пакета`);
  lines.push(`- [Coordo](${abs("/coordo")}): продуктовая линейка готовых контуров`);
  for (const m of modules) {
    if (!m.href) continue;
    lines.push(`- [${clean(m.name || "")}](${abs(m.href)})${m.desc ? `: ${clean(m.desc)}` : ""}`);
  }
  lines.push("");

  lines.push("## Отрасли", "");
  for (const ind of industries) {
    if (!ind.slug) continue;
    const label = clean(ind.h1 || ind.name || ind.slug);
    const desc = clean(ind.desc || ind.lead || "");
    lines.push(`- [${label}](${abs(`/industries/${ind.slug}/`)})${desc ? `: ${desc}` : ""}`);
  }
  lines.push("");

  lines.push("## Ключевые страницы", "");
  const pages: [string, string, string][] = [
    ["Платформа ELMA365", "/elma365", "возможности low-code платформы ELMA365"],
    ["Услуги", "/services/", "внедрение, разработка, сопровождение"],
    ["О компании", "/company/about", "команда, подход, опыт внедрений"],
    ["Контакты", "/contacts", "телефон, email, Telegram, реквизиты"],
    ["Казахстан", "/kz/", "внедрение ELMA365 в Казахстане"],
    ["Статьи и глоссарий", "/press/", "материалы о документообороте и автоматизации"],
  ];
  for (const [label, path, desc] of pages) {
    lines.push(`- [${label}](${abs(path)}): ${desc}`);
  }
  lines.push("");

  lines.push("## Статьи", "");
  for (const a of articles) {
    lines.push(`- [${clean(a.data.name || a.data.h1)}](${abs(`/press/articles/${a.id}/`)})${a.data.description ? `: ${clean(a.data.description)}` : ""}`);
  }
  lines.push("");

  lines.push("## Глоссарий", "");
  for (const g of glossary) {
    lines.push(`- [${clean(g.data.name || g.data.h1)}](${abs(`/press/glossary/${g.id}/`)})${g.data.description ? `: ${clean(g.data.description)}` : ""}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

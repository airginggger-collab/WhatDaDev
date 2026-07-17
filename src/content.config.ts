import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pressSchema = z.object({
  name: z.string(),
  slug_input: z.string().optional(),
  tag: z.string().optional(),
  order: z.number().default(999),
  // Даты в ISO (YYYY-MM-DD), строкой: YAML иначе отдаёт Date в UTC и дата может
  // «уехать» на сутки. Бэкфилл сделан из git-истории (v0.96): date_published это
  // первый коммит файла, date_modified последний. Уходят в Article/DefinedTerm.
  date_published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Дата в формате ГГГГ-ММ-ДД").optional(),
  date_modified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Дата в формате ГГГГ-ММ-ДД").optional(),
  title: z.string(),
  description: z.string(),
  headline: z.string(),
  h1: z.string(),
  lead: z.string().default(""),
  eyebrow: z.string().default(""),
  crumbs: z.array(z.object({ name: z.string(), href: z.string().optional() })),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: pressSchema,
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/glossary" }),
  schema: pressSchema,
});

export const collections = { articles, glossary };

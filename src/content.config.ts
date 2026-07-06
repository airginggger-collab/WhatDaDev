import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pressSchema = z.object({
  name: z.string(),
  slug_input: z.string().optional(),
  tag: z.string().optional(),
  order: z.number().default(999),
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

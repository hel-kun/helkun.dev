import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}'}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    heroImage: z.string(),
		published: z.boolean(),
    updated: z.date().optional(),
  }),
});

const links = defineCollection({
  loader: glob({base: './src/content/links', pattern: '**/*.json'}),
  schema: z.any(),
});

const works = defineCollection({
  loader: glob({base: './src/content/works', pattern: '**/*.json'}),
  schema: z.array(
    z.object({
      title: z.string().min(1),
      image: z.url(),
      date: z.string().regex(/^\d{4}-\d{2}$/, 'Must be formatted as YYYY-MM'),
      endDate: z.union([z.string().regex(/^\d{4}-\d{2}$/, 'Must be formatted as YYYY-MM'), z.literal('now')]).optional(),
      description: z.string().min(1),
      github: z.url().optional(),
      siteUrl: z.url().optional(),
    }),
  ),
});

export const collections = { blog, links, works };

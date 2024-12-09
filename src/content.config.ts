import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({base: './src/content/blog', pattern: '**/[^_]*.{md,mdx}'}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    heroImage: z.string(),
		published: z.boolean(),
  }),
});

const links = defineCollection({
  loader: glob({base: './src/content/links', pattern: '**/*.{json}'}),
  schema: z.any(),
});

const works = defineCollection({
  loader: glob({base: './src/content/works', pattern: '**/*.{json}'}),
  schema: z.any(),
});

export const collections = { blog };
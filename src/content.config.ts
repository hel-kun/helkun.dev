import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: '@/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		date: z.date(),
		heroImage: z.string(),
		published: z.boolean(),
	}),
});

export const collections = { blog };
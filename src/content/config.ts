import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
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
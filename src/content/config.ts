import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(['products', 'research', 'sustainability', 'deep-dive', 'investment']),
    author: z.string(),
    publishedAt: z.date(),
    featuredImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isPaid: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
};
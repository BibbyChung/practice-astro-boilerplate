import { defineCollection, z } from 'astro:content'

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
  }),
})

export const collections = {
  news: newsCollection,
}

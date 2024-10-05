import { z } from 'zod'

export const WithIconsSchema = z.strictObject({
  icon: z.any(),
  link: z.string(),
  name: z.string(),
})

export const WithImagesSchema = z.strictObject({
  name: z.string(),
  src: z.string(),
})

export const WithLinksSchema = z.strictObject({
  href: z.string(),
  name: z.string(),
})

export const siteConfig = z.strictObject({
  about: z.string(),
  apiURL: z.string(),
  booksIems: z.array(WithImagesSchema),
  desc: z.string(),
  footerItems: z.array(WithLinksSchema),
  name: z.string(),
  navItems: z.array(WithLinksSchema),
  siteURL: z.string(),
  socialMedia: z.array(WithIconsSchema),
  techStack: z.array(WithIconsSchema),
})

export const ArticleSchema = z.strictObject({
  createdAt: z.string(),
  description: z.string(),
  editedAt: z.string(),
  id: z.string(),
  isPublished: z.boolean(),
  slug: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
})

export const BooksSchema = z.strictObject({
  author: z.array(z.string()),
  createdAt: z.string(),
  description: z.string(),
  icon: z.string(),
  id: z.string(),
  slug: z.string(),
  status: z.any(),
  title: z.string(),
})

export type siteMetadata = z.infer<typeof siteConfig>
export type NotionArticle = z.infer<typeof ArticleSchema>
export type NotionBooks = z.infer<typeof BooksSchema>

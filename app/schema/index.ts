import { z } from 'zod'

export const WithIconsSchema = z.strictObject({
  icon: z.any(),
  link: z.string(),
  name: z.string(),
})

export const WithImagesSchema = z.strictObject({
  src: z.string(),
  name: z.string(),
})

export const WithLinksSchema = z.strictObject({
  href: z.string(),
  name: z.string(),
})

export const TemplateSchema = z.strictObject({
  title: z.string(),
  type: z.string(),
  description: z.string(),
  logo: z.string(),
  link: WithLinksSchema,
})

export const siteConfig = z.strictObject({
  about: z.string(),
  booksIems: z.array(WithImagesSchema),
  name: z.string(),
  desc: z.string(),
  siteURL: z.string(),
  socialMedia: z.array(WithIconsSchema),
  navItems: z.array(WithLinksSchema),
  techStack: z.array(WithIconsSchema),
  template: z.array(TemplateSchema),
  footerItems: z.array(WithLinksSchema),
})

export const ArticleSchema = z.strictObject({
  createdAt: z.string(),
  editedAt: z.string(),
  id: z.string(),
  isPublished: z.boolean(),
  slug: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  description: z.string(),
})

export const BooksSchema = z.strictObject({
  createdAt: z.string(),
  id: z.string(),
  slug: z.string(),
  status: z.any(),
  title: z.string(),
  description: z.string(),
})

export const NoteSchema = z.strictObject({
  createdAt: z.string(),
  editedAt: z.string(),
  id: z.string(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  slug: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  description: z.string(),
})

export type siteMetadata = z.infer<typeof siteConfig>
export type NotionArticle = z.infer<typeof ArticleSchema>
export type NotionBooks = z.infer<typeof BooksSchema>
export type NotionNote = z.infer<typeof NoteSchema>

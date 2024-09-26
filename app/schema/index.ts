import { z } from 'zod'

const SocialMediaSchema = z.strictObject({
  icon: z.any(),
  link: z.string(),
  name: z.string(),
})

export const NavItemSchema = z.strictObject({
  href: z.string(),
  name: z.string(),
})

export const siteConfig = z.strictObject({
  about: z.any(),
  name: z.string(),
  desc: z.string(),
  siteURL: z.string(),
  socialMedia: z.array(SocialMediaSchema),
  navItems: z.array(NavItemSchema),
})

export const ArticleSchema = z.strictObject({
  createdAt: z.string(),
  editedAt: z.string(),
  id: z.string(),
  isPublished: z.boolean(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
})

export const BooksSchema = z.strictObject({
  createdAt: z.string(),
  id: z.string(),
  public_url: z.string(),
  title: z.string(),
})

export const NoteSchema = z.strictObject({
  createdAt: z.string(),
  editedAt: z.string(),
  id: z.string(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  slug: z.string(),
  title: z.string(),
})

export type siteMetadata = z.infer<typeof siteConfig>
export type NotionArticle = z.infer<typeof ArticleSchema>
export type NotionBooks = z.infer<typeof BooksSchema>
export type NotionNote = z.infer<typeof NoteSchema>

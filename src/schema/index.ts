import { z } from 'zod'

const SocialMediaSchema = z.strictObject({
  icon: z.any(),
  link: z.string().startsWith('https://').optional(),
  name: z.string(),
})

export const siteConfig = z.strictObject({
  about: z.string(),
  name: z.string(),
  desc: z.string(),
  siteURL: z.string().startsWith('https://').optional(),
  socialMedia: z.array(SocialMediaSchema),
  subName: z.string(),
  totalPosts: z.number().min(5).int(),
})

export const ArticleSchema = z.strictObject({
  createdAt: z.string(),
  editedAt: z.string(),
  id: z.string(),
  isPublished: z.boolean(),
  slug: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
})

export const BooksSchema = z.strictObject({
  createdAt: z.string(),
  id: z.string(),
  public_url: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
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
})

export const ViewingSchema = z.strictObject({
  createdAt: z.string(),
  id: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  url: z.string(),
})

export type siteMetadata = z.infer<typeof siteConfig>
export type NotionArticle = z.infer<typeof ArticleSchema>
export type NotionBooks = z.infer<typeof BooksSchema>
export type NotionNote = z.infer<typeof NoteSchema>
export type NotionViewing = z.infer<typeof ViewingSchema>

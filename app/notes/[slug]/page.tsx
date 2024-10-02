import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { PrismHightler } from '@components/PrismHightler'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import { NotesLayout } from '@layout/NotesLayout'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const notes = await notesApi.getNotes()
  const post = notes.find(p => p.slug === params.slug)
  if (!post) {
    return
  }

  const {
    createdAt,
    editedAt,
    slug,
    title,
  } = post

  const canonicalUrl = `${siteConfig.siteURL}/notes/${slug}`
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${title}`

  return {
    title,
    description: title,
    openGraph: {
      title,
      description: title,
      type: 'article',
      publishedTime: createdAt,
      modifiedTime: editedAt,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: title,
      images: [ogImageUrl],
    },
  }
}

export default async function Note({ params }) {
  const notes = await notesApi.getNotes()
  const note = notes.find(note => note.slug === params.slug)

  if (!note) {
    notFound()
  }

  const noteContent = await notesApi.getNote(note.id)

  const canonicalUrl = `${siteConfig.siteURL}/notes/${note.slug}`
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${note.title}`

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': note.title,
            'datePublished': note.createdAt,
            'dateModified': note.editedAt,
            'description': note.title,
            'image': ogImageUrl,
            'url': canonicalUrl,
            'author': {
              '@type': 'Person',
              'name': siteConfig.name,
            },
          }),
        }}
      />
      <NotesLayout note={note}>
        {noteContent.map((block: BlockObjectResponse) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </NotesLayout>
      <Suspense>
        <PrismHightler />
      </Suspense>
    </>
  )
}

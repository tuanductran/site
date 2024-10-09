import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { PrismHightler } from '@components/PrismHightler'
import { siteConfig } from '@data'
import { getNote, getNotes } from '@db'
import { NotesLayout } from '@layout/NotesLayout'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const notes = await getNotes()
  const post = notes.find(p => p.slug === params.slug)
  if (!post) {
    return
  }

  const {
    createdAt,
    description,
    editedAt,
    slug,
    title,
  } = post

  const canonicalUrl = `${siteConfig.siteURL}/notes/${slug}`
  const ogImageUrl = `${siteConfig.apiURL}/og?title=${encodeURIComponent(title)}`

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: createdAt,
      modifiedTime: editedAt,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    title,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      site: '@tuanducdesigner',
      creator: '@tuanducdesigner',
    },
  }
}

export default async function Article({ params }) {
  const notes = await getNotes()
  const note = notes.find(note => note.slug === params.slug)

  if (!note) {
    notFound()
  }

  const noteContent = await getNote(note.id)

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
            'description': note.description,
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

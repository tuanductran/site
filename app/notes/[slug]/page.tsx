import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { Prose } from '@components/Prose'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import { formatDate } from '@lib/date'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
  const ogImageUrl = `${siteConfig.siteURL}/og?title=${title}`

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
  const ogImageUrl = `${siteConfig.siteURL}/og?title=${note.title}`

  return (
    <section>
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
      <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">
        {note.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8">
        <p className="text-sm text-slate-700 dark:text-slate-400">
          {formatDate(note.createdAt)}
        </p>
      </div>
      <Prose>
        {noteContent.map((block: BlockObjectResponse) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </Prose>
    </section>
  )
}

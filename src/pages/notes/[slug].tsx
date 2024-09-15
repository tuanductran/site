import { NoteLayout } from '@components/layout'
import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import type { NotionNote } from '@schema'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'

interface NoteProps {
  note: NotionNote
  noteContent: any[]
}

function NotePage({
  note,
  noteContent,
}: NoteProps) {
  const { createdAt, editedAt, slug, title } = note
  const canonicalUrl = `${siteConfig.siteURL}/notes/${slug}`
  const ogImageUrl = `${siteConfig.siteURL}/api/og?title=${title}`

  return (
    <>
      <NextSeo
        title={title}
        description={title}
        canonical={canonicalUrl}
        openGraph={{
          images: [{ url: ogImageUrl }],
        }}
      />
      <ArticleJsonLd
        url={canonicalUrl}
        images={[ogImageUrl]}
        title={title}
        datePublished={createdAt}
        dateModified={editedAt}
        authorName={siteConfig.name}
        description={title}
      />
      <NoteLayout note={note}>
        {noteContent.map(block => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </NoteLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  NoteProps,
  { slug: string }
> = async (context) => {
  const slug = context.params?.slug
  const notes = await notesApi.getNotes()
  const note = notes.find(note => note.slug === slug)

  if (!note) {
    return {
      notFound: true,
    }
  }

  const noteContent = await notesApi.getNote(note.id)

  return {
    props: {
      note,
      noteContent,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await notesApi.getNotes()

  return {
    paths: notes.map(note => ({ params: { slug: note.slug } })),
    fallback: 'blocking',
  }
}

export default NotePage

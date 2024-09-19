import Link from '@components/Link'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import type { NotionNote } from '@schema'
import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

const seoTitle = 'Notes Collection'
const seoDescription = 'Explore all your notes in one place'

interface NotesProps {
  notes: NotionNote[]
}

function NotesPage({ notes }: NotesProps) {
  const isEmpty = notes.length === 0
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/notes`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${encodeURIComponent(seoTitle)}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
        {isEmpty && <p className="prose prose-slate dark:prose-dark">Yay, no notes found.</p>}
        {notes.map((notes) => {
          return (
            <Link
              key={notes.id}
              href={notes.public_url}
              className="flex flex-col space-y-1 mb-4"
              title={notes.title}
            >
              <div className="w-full flex flex-col">
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 line-clamp-1">
                  {notes.title}
                </h3>
                <p className="text-sm leading-6 dark:text-slate-400">
                  {notes.createdAt}
                </p>
              </div>
            </Link>
          )
        })}
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<NotesProps> = async () => {
  const notes = await notesApi.getNotes()

  return {
    props: {
      notes,
    },
    revalidate: 10,
  }
}

export default NotesPage

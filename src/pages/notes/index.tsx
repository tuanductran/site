import Link from '@components/Link'
import { NotionTags } from '@components/Tags'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import { filterTags } from '@lib/filterTags'
import type { NotionNote } from '@schema'
import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

const seoTitle = 'Notes Collection'
const seoDescription = 'Explore all your notes in one place'

interface NotesProps {
  notes: NotionNote[]
  tags: string[]
}

const NotesPage: React.FC<NotesProps> = ({ notes, tags }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const filteredNotes = filterTags(notes, selectedTag)

  return (
    <>
      <NextSeo
        title={`${seoTitle} - ${siteConfig.name}`}
        description={seoDescription}
        canonical={`${siteConfig.siteURL}/notes`}
        openGraph={{
          images: [{ url: `${siteConfig.siteURL}/api/og?title=${`${seoTitle} - ${siteConfig.name}`}` }],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{seoTitle}</h1>
        <NotionTags
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        {filteredNotes.map((notes: NotionNote) => {
          return (
            <Link
              key={notes.id}
              href={`/notes/${notes.slug}`}
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
  const tags = Array.from(new Set(notes.flatMap(notes => notes.tags)))

  return {
    props: {
      notes,
      tags,
    },
    revalidate: 10,
  }
}

export default NotesPage

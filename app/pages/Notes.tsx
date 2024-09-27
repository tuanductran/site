'use client'

import { Container } from '@components/Container'
import { NoteWithImage } from '@components/Note'
import { NotionTags } from '@components/Tags'
import { filterTags } from '@lib/filter'
import Pagination from '@notes/Pagination'
import type { NotionNote } from '@schema'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'

interface Props {
  title: string
  notes: NotionNote[]
  tags: string[]
}

export function Notes({ title, notes, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const page = useMemo(() => Number.parseInt(searchParams.get('page') as string) || 1, [searchParams])

  const filteredNotes = useMemo(() => filterTags(notes, selectedTag), [notes, selectedTag])
  const totalNotes = filteredNotes.length
  const notesPerPage = 5
  const totalPages = Math.ceil(totalNotes / notesPerPage)
  const currentPage = Math.min(totalPages, Math.max(1, page))

  const startIndex = (currentPage - 1) * notesPerPage
  const endIndex = Math.min(startIndex + notesPerPage, totalNotes)
  const currentNotes = filteredNotes.slice(startIndex, endIndex)

  return (
    <div className="mx-auto">
      <Container className="mt-12 sm:mt-24">
        <header>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{title}</h1>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <NotionTags
            tags={tags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
          <div className="mt-8 sm:mt-10">
            <div className="my-16 space-y-20 lg:space-y-20">
              {currentNotes.map((note: NotionNote) => (
                <NoteWithImage key={note.slug} note={note} />
              ))}
            </div>
            <Pagination total={totalNotes} />
          </div>
        </Suspense>
      </Container>
    </div>
  )
}

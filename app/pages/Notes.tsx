'use client'

import { Container } from '@components/Container'
import { Note } from '@components/Note'
import { NotionTags } from '@components/Tags'
import { filterArticles } from '@lib/filter'
import type { NotionNote } from '@schema'
import { useState } from 'react'

interface Props {
  notes: NotionNote[]
  tags: Array<string>
  title: string
}

export function Notes({ notes, tags, title }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const sortNotes = filterArticles(notes, selectedTag)

  return (
    <div className="mx-auto">
      <Container className="mt-12 sm:mt-24">
        <header>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{title}</h1>
        </header>
        <NotionTags
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        <div className="mt-8 sm:mt-10">
          <div className="mt-16 space-y-20 lg:space-y-20">
            {sortNotes.map((note: NotionNote) => (
              <Note key={note.slug} note={note} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

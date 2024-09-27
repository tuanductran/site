'use client'

import { Container } from '@components/Container'
import { NoteWithImage } from '@components/Note'
import { NotionTags } from '@components/Tags'
import { filterArticles } from '@lib/filter'
import type { NotionNote } from '@schema'
import { useState } from 'react'

interface Props {
  title: string
  notes: NotionNote[]
  tags: Array<string>
}

export function Notes({ title, notes, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredNotes = filterArticles(notes, selectedTag)

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
            {filteredNotes.map((note: NotionNote) => (
              <NoteWithImage key={note.id} note={note} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

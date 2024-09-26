'use client'

import { Note } from '@components/Note'
import { PageContainer } from '@components/PageContainer'
import { NotionTags } from '@components/Tags'
import { filterTags } from '@lib/filter'
import type { NotionNote } from '@schema'
import { useState } from 'react'

interface Props {
  title: string
  description: string
  notes: NotionNote[]
  tags: string[]
}

export function Notes({ title, description, notes, tags }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const filteredNotes = filterTags(notes, selectedTag)

  return (
    <PageContainer title={title} intro={description}>
      <div className="relative max-w-3xl mb-12 sm:mb-16">
        <NotionTags
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredNotes.map((note: NotionNote) => (
            <Note key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

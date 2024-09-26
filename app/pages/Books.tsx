'use client'

import { Book } from '@components/Book'
import { PageContainer } from '@components/PageContainer'
import { NotionTags } from '@components/Tags'
import { filterStatus } from '@lib/filter'
import type { NotionBooks } from '@schema'
import { useState } from 'react'

interface Props {
  title: string
  description: string
  books: NotionBooks[]
  status: string[]
}

export function Books({ title, description, books, status }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const filteredBooks = filterStatus(books, selectedStatus)

  return (
    <PageContainer title={title} intro={description}>
      <div className="relative max-w-3xl mb-12 sm:mb-16">
        <NotionTags
          tags={status}
          selectedTag={selectedStatus}
          setSelectedTag={setSelectedStatus}
        />
      </div>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredBooks.map((book: NotionBooks) => (
            <Book key={book.slug} book={book} />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

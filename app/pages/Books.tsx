'use client'

import { BookWithImage } from '@components/Book'
import { Container } from '@components/Container'
import { NotionTags } from '@components/Tags'
import { filterStatus } from '@lib/filter'
import type { NotionBooks } from '@schema'
import { useState } from 'react'

interface Props {
  title: string
  books: NotionBooks[]
  status: string[]
}

export function Books({ title, books, status }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const filteredBooks = filterStatus(books, selectedStatus)

  return (
    <div className="mx-auto">
      <Container className="mt-12 sm:mt-24">
        <header>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">{title}</h1>
        </header>
        <NotionTags
          tags={status}
          selectedTag={selectedStatus}
          setSelectedTag={setSelectedStatus}
        />
        <div className="mt-8 sm:mt-10">
          <div className="mt-16 space-y-20 lg:space-y-20">
            {filteredBooks.map((book: NotionBooks) => (
              <BookWithImage key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

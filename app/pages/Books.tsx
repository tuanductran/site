'use client'

import { ChevronRightIcon } from '@components/icons'
import Link from '@components/Link'
import { PageContainer } from '@components/PageContainer'
import { filterStatus } from '@lib/filter'
import type { NotionBooks } from '@schema'
import clsx from 'clsx'
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
      <ul className="hide-scrollbar mb-6 pb-[1px] flex-none min-w-full overflow-y-auto space-x-6 flex border-b dark:border-zinc-800/50">
        {status.map(status => (
          <li className="cursor-pointer" key={status} onClick={() => setSelectedStatus(status)}>
            <h2 className={clsx(
              'flex text-sm leading-6 font-medium whitespace-nowrap py-3 -mb-px max-w-max',
              selectedStatus === status ? 'border-b text-primary dark:text-light border-current' : 'text-zinc-900 border-transparent hover:border-b hover:border-zinc-300 dark:text-zinc-200 dark:hover:border-zinc-700',
            )}
            >
              {status}
            </h2>
          </li>
        ))}
      </ul>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book: NotionBooks) => (
          <Link href={book.slug} key={book.id} className="group relative flex flex-col rounded-xl border border-zinc-200/50 bg-white p-6 shadow-xl shadow-zinc-300/10 dark:shadow-none dark:border-zinc-800/80 dark:bg-gradient-to-bl dark:bg-zinc-900 dark:from-zinc-950/5 dark:to-zinc-950/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50" title={book.title}>
            <div className="flex items-center">
              <h2 className="text-base text-zinc-800 dark:text-zinc-100">
                {book.title}
              </h2>
            </div>
            <p className="flex-1 mt-4 mb-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{book.description}</p>
            <span className="flex items-center space-x-1 mt-4 rounded-full dark:hover:bg-transparent text-zinc-800 dark:text-white group-hover:text-primary dark:group-hover:text-light font-medium w-fit py-1 text-sm">
              View book
              {' '}
              <ChevronRightIcon className="ml-1 h-auto w-4 stroke-current" />
            </span>
          </Link>
        ))}
      </ul>
    </PageContainer>
  )
}

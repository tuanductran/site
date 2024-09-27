import type { NotionBooks } from '@schema'
import { clsx } from 'clsx'

import { Author } from './Author'
import { Card } from './Card'
import Image from './Image'
import Link from './Link'

interface Props {
  book: NotionBooks
  dense?: boolean
}

export function Book({ book, dense }: Props) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={book.slug}>{book.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={book.createdAt}
          className={clsx(!dense && 'md:hidden')}
          decorate
        >
          {book.createdAt}
        </Card.Eyebrow>
        <Card.Description>{book.description}</Card.Description>
        <Card.Cta>Read book</Card.Cta>
      </Card>
      {!dense && (
        <Card.Eyebrow as="time" dateTime={book.createdAt} className="mt-1 hidden md:block">
          {book.createdAt}
        </Card.Eyebrow>
      )}
    </article>
  )
}

export function BookWithImage({ book }: Props) {
  const authorName = book.author[0]
  return (
    <article className="group">
      <Link
        href={book.slug}
        title={book.title}
        className="relative flex cursor-pointer flex-col gap-10 lg:flex-row"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-900/10 dark:ring-white/10 sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
          <Image
            src="/default-thumbnail.jpg"
            alt={book.title}
            className="absolute inset-0 size-full object-cover transition duration-150 group-hover:scale-105"
            width={1200}
            height={600}
            priority
          />
        </div>
        <div>
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={book.createdAt} className="text-zinc-500">
              {book.createdAt}
            </time>
          </div>
          <div className="relative max-w-xl">
            <h3 className="mt-4 text-lg font-semibold leading-6 text-zinc-900 dark:text-zinc-200">
              {book.title}
            </h3>
            <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {book.description}
            </p>
          </div>
          <div className="mt-6 flex border-t border-zinc-900/5 pt-6 dark:border-white/5">
            <Author name={authorName} />
          </div>
        </div>
      </Link>
    </article>
  )
}

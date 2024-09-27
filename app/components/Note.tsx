import type { NotionNote } from '@schema'
import { clsx } from 'clsx'

import { Author } from './Author'
import { Card } from './Card'
import Image from './Image'
import Link from './Link'

interface Props {
  note: NotionNote
  dense?: boolean
}

export function Note({ note, dense }: Props) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/notes/${note.slug}`}>{note.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={note.createdAt}
          className={clsx(!dense && 'md:hidden')}
          decorate
        >
          {note.createdAt}
        </Card.Eyebrow>
        <Card.Description>{note.description}</Card.Description>
        <Card.Cta>Read note</Card.Cta>
      </Card>
      {!dense && (
        <Card.Eyebrow as="time" dateTime={note.createdAt} className="mt-1 hidden md:block">
          {note.createdAt}
        </Card.Eyebrow>
      )}
    </article>
  )
}

export function NoteWithImage({ note }: Props) {
  return (
    <article className="group">
      <Link
        href={`/notes/${note.slug}`}
        title={note.title}
        className="relative flex cursor-pointer flex-col gap-10 lg:flex-row"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-900/10 dark:ring-white/10 sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
          <Image
            src="/default-thumbnail.jpg"
            alt={note.title}
            className="absolute inset-0 size-full object-cover transition duration-150 group-hover:scale-105"
            width={1200}
            height={600}
            priority
          />
        </div>
        <div>
          <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={note.createdAt} className="text-zinc-500">
              {note.createdAt}
            </time>
          </div>
          <div className="relative max-w-xl">
            <h3 className="mt-4 text-lg font-semibold leading-6 text-zinc-900 dark:text-zinc-200">
              {note.title}
            </h3>
            <p className="mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {note.description}
            </p>
          </div>
          <div className="mt-6 flex border-t border-zinc-900/5 pt-6 dark:border-white/5">
            <Author name="Tuấn Đức Trần" />
          </div>
        </div>
      </Link>
    </article>
  )
}

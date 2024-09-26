import type { NotionNote } from '@schema'
import { clsx } from 'clsx'

import { Card } from './Card'

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

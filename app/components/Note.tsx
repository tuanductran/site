'use client'

import { ANIMATION_FINAL, ANIMATION_INITIAL } from '@lib/animation'
import type { NotionNote } from '@schema'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

import { Card } from './Card'

interface Props {
  note: NotionNote
  dense?: boolean
}

export function Note({ note, dense }: Props) {
  return (
    <motion.div
      initial={ANIMATION_INITIAL}
      whileInView={ANIMATION_FINAL}
      viewport={{ once: true }}
    >
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
    </motion.div>
  )
}

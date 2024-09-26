import { ANIMATION_FINAL, ANIMATION_INITIAL } from '@lib/animation'
import type { NotionBooks } from '@schema'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

import { Card } from './Card'

interface Props {
  book: NotionBooks
  dense?: boolean
}

export function Book({ book, dense }: Props) {
  return (
    <motion.div
      initial={ANIMATION_INITIAL}
      whileInView={ANIMATION_FINAL}
      viewport={{ once: true }}
    >
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
    </motion.div>
  )
}

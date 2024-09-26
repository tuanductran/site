import { ANIMATION_FINAL, ANIMATION_INITIAL } from '@lib/animation'
import type { NotionArticle } from '@schema'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

import { Card } from './Card'

interface Props {
  article: NotionArticle
  dense?: boolean
}

export function Article({ article, dense }: Props) {
  return (
    <motion.div
      initial={ANIMATION_INITIAL}
      whileInView={ANIMATION_FINAL}
      viewport={{ once: true }}
    >
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <Card className="md:col-span-3">
          <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
          <Card.Eyebrow
            as="time"
            dateTime={article.createdAt}
            className={clsx(!dense && 'md:hidden')}
            decorate
          >
            {article.createdAt}
          </Card.Eyebrow>
          <Card.Description>{article.description}</Card.Description>
          <Card.Cta>Read article</Card.Cta>
        </Card>
        {!dense && (
          <Card.Eyebrow as="time" dateTime={article.createdAt} className="mt-1 hidden md:block">
            {article.createdAt}
          </Card.Eyebrow>
        )}
      </article>
    </motion.div>
  )
}

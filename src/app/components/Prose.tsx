import { cn } from '@lib/cn'
import type { HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export function Prose({ children, className }: Props) {
  return (
    <article className={cn(className, 'prose prose-slate dark:prose-dark')}>
      {children}
    </article>
  )
}

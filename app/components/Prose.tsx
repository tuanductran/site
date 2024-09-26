import clsx from 'clsx'
import type { HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export function Prose({ children, className }: Props) {
  return (
    <article className={clsx(className, 'md:prose-md xl:prose-lg prose prose-zinc w-full dark:prose-dark')}>
      {children}
    </article>
  )
}

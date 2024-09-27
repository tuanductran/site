import clsx from 'clsx'
import type { HTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export function Prose({ children, className }: Props) {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>
      {children}
    </div>
  )
}

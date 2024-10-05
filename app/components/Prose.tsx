import clsx from 'clsx'
import type { HTMLAttributes, PropsWithChildren } from 'react'

export function Prose({ children, className }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>
      {children}
    </div>
  )
}

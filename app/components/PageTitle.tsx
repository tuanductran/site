import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

export function PageTitle({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <h1
      className={clsx(
        className,
        'text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 text-balance',
      )}
    >
      {children}
    </h1>
  )
}

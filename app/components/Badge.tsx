import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

import Link from './Link'

type Props = (
  | {
    onClick?: () => void
  }
  | {
    href: string
  }
) & { className?: string }

export function Badge({ className, children, ...otherProps }: PropsWithChildren<Props>) {
  if ('href' in otherProps) {
    return (
      <Link className={clsx('inline-flex items-center rounded-full hover:text-primary bg-zinc-100 px-2.5 py-0.5 text-xs leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:text-primary', className)} {...otherProps}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={clsx('inline-flex items-center rounded-full hover:text-primary bg-zinc-100 px-2.5 py-0.5 text-xs leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:text-primary', className)} {...otherProps}>
      {children}
    </button>
  )
}

import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type Props = {
  className?: string
} & HTMLAttributes<HTMLDivElement>

export function AvatarContainer({ className, ...props }: Props) {
  return (
    <div
      className={clsx(
        className,
        'size-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  )
}

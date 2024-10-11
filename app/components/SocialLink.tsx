import clsx from 'clsx'
import type { ElementType } from 'react'

import Link from './Link'

interface Props {
  className?: string
  href: string
  title: string
  showTitle?: boolean
  icon: ElementType
  [key: string]: any
}

export function SocialLink({ className, href, title, showTitle = false, icon: Icon }: Props) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-primary dark:text-zinc-200"
        title={title}
      >
        <Icon className="size-6 flex-none fill-zinc-500 transition group-hover:fill-primary" />
        <span className={clsx(
          showTitle ? 'ml-4' : 'sr-only',
        )}
        >
          {title}
        </span>
      </Link>
    </li>
  )
}

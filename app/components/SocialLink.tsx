import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'

import Link from './Link'

interface Props {
  children?: ReactNode
  className?: string
  href: string
  icon: ElementType
}

export function SocialLink({ children, className, href, icon: Icon }: Props) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-primary dark:text-zinc-200"
      >
        <Icon className="size-6 flex-none fill-zinc-500 transition group-hover:fill-primary" />
        {children && <span className="ml-4">{children}</span>}
      </Link>
    </li>
  )
}

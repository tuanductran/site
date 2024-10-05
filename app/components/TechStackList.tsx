import type { ElementType } from 'react'

import { ArrowIcon } from './icons'
import Link from './Link'

interface Props {
  href: string
  icon: ElementType
  name: string
}
export function TechStackList({ href, icon: Icon, name }: Props) {
  const label = href.replace(/^https?:\/\//, '')
  return (
    <Link href={href} title={name}>
      <li className="mx-3 flex gap-4 rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Icon className="size-7" />
        </div>
        <dl className="flex flex-auto flex-wrap items-center gap-x-2">
          <dt className="sr-only">Name</dt>
          <div>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {name}
            </dd>
            <dt className="sr-only">Label</dt>
            <dd className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">{label}</dd>
          </div>
          <dt className="sr-only">Read more Tech Stack</dt>
          <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
            <ArrowIcon className="ml-1 size-5 stroke-current" />
          </dd>
        </dl>
      </li>
    </Link>
  )
}

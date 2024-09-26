import { siteConfig } from '@data'

import { Button } from './Button'
import { ArrowIcon, FolderIcon } from './icons'
import { TechStackList } from './TechStackList'

export function TechStack() {
  return (
    <div className="rounded-2xl border border-zinc-100 py-6 dark:border-zinc-700/40">
      <h2 className="mx-6 flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <FolderIcon className="size-6 flex-none" />
        <span className="ml-3">Tech Stack</span>
      </h2>
      <ol className="mt-6">
        {siteConfig.techStack.slice(0, 7).map(techStack => (
          <TechStackList
            key={techStack.name}
            name={techStack.name}
            icon={techStack.icon}
            href={techStack.link}
          />
        ))}
      </ol>
      <div className="mx-6 mt-6">
        <Button href="/tech" variant="secondary" className="group w-full">
          See more
          <ArrowIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
        </Button>
      </div>
    </div>
  )
}

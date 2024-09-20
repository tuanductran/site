import { ArrowIcon } from './icons'
import Link from './Link'

interface Props {
  slug: string
  title: string
  createdAt: string
}

export function NoteLink({ slug, title, createdAt }: Props) {
  return (
    <div className="group">
      <Link
        href={slug}
        title={title}
        className="flex w-full items-center justify-between bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5"
      >
        <div className="flex flex-col">
          <p className="text-base text-slate-900 font-semibold dark:text-slate-300 line-clamp-1">{title}</p>
          <p>{createdAt}</p>
        </div>
        <div className="transform text-slate-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-slate-300">
          <ArrowIcon />
        </div>
      </Link>
    </div>
  )
}

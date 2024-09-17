import { Prose } from '@components/Prose'
import type { NotionNote } from '@schema'
import type { ReactNode } from 'react'

interface NoteProps {
  note: NotionNote
  children: ReactNode
}

export function NoteLayout({ note, children }: NoteProps) {
  return (
    <section className="overflow-hidden">
      <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">
        {note.title}
      </h1>
      <div className="flex justify-between items-center my-8 text-sm text-slate-700 dark:text-slate-400">
        <p>{note.createdAt}</p>
      </div>
      <Prose>{children}</Prose>
    </section>
  )
}

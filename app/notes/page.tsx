import { notesApi } from '@db'
import { Notes } from '@pages/Notes'

const seoTitle = 'Notes'
const seoDescription = 'Explore all your notes in one place'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default async function NotesPage() {
  const notes = await notesApi.getNotes()
  const tags = Array.from(new Set(notes.flatMap(notes => notes.tags)))
  return (
    <Notes
      title={seoTitle}
      notes={notes}
      tags={tags}
    />
  )
}

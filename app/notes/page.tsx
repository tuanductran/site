import { siteConfig } from '@data'
import { getNotes } from '@db'
import { Notes } from '@pages/Notes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.siteURL}/notes`,
  },
  description: 'Explore all your notes in one place',
  openGraph: {
    title: 'Notes',
    description: 'Explore all your notes in one place',
    url: `${siteConfig.siteURL}/notes`,
    siteName: 'Notes',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.apiURL}/og?title=${encodeURIComponent('Notes')}`,
        width: 1200,
        height: 630,
        alt: 'Notes',
      },
    ],
  },
  title: 'Notes',
  twitter: {
    title: 'Notes',
    description: 'Explore all your notes in one place',
    images: [`${siteConfig.apiURL}/og?title=${encodeURIComponent('Notes')}`],
    card: 'summary_large_image',
    creator: '@tuanducdesigner',
    site: '@tuanducdesigner',
  },
}

export default async function NotesPage() {
  const notes = await getNotes()
  const tags = Array.from(new Set(notes.flatMap(notes => notes.tags)))
  return (
    <Notes
      title="Notes"
      notes={notes}
      tags={tags}
    />
  )
}

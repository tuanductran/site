import { formatDate } from '@lib/date'
import { Client, isFullPage } from '@notionhq/client'
import type { NotionNote } from '@schema'
import { cache } from 'react'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

async function getDatabaseContent(databaseId: string): Promise<NotionNote[]> {
  const db = await notion.databases.query({ database_id: databaseId })

  while (db.has_more && db.next_cursor) {
    const { results, has_more, next_cursor }
      = await notion.databases.query({
        database_id: databaseId,
        start_cursor: db.next_cursor,
      })
    db.results = [...db.results, ...results]
    db.has_more = has_more
    db.next_cursor = next_cursor
  }

  return db.results
    .map((page) => {
      if (!isFullPage(page)) {
        throw new Error('Notion page is not a full page')
      }

      return {
        createdAt: formatDate(page.created_time),
        id: page.id,
        isPublished:
            'checkbox' in page.properties.public
              ? page.properties.public.checkbox
              : false,
        slug: page.url,
        tags:
              'multi_select' in page.properties.tags
                ? page.properties.tags.multi_select.map(tag => tag.name)
                : [],
        title:
            'title' in page.properties.title
              ? page.properties.title.title[0].plain_text
              : '',
        description:
              'rich_text' in page.properties.description
                ? page.properties.description.rich_text[0].plain_text
                : '',
      }
    })
    .filter(p => p.isPublished)
}

export const getNotes = cache(async () => {
  const notes = await getDatabaseContent(process.env.NOTES_DATABASE_ID!)

  return notes
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
})

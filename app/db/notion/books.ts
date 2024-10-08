import { formatDate } from '@lib/date'
import { Client, isFullPage } from '@notionhq/client'
import type { NotionBooks } from '@schema'
import { cache } from 'react'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

async function getDatabaseContent(databaseId: string): Promise<NotionBooks[]> {
  const db = await notion.databases.query({ database_id: databaseId })

  while (db.has_more && db.next_cursor) {
    const { results, has_more, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: db.next_cursor,
    })
    db.results = [...db.results, ...results]
    db.has_more = has_more
    db.next_cursor = next_cursor
  }

  return db.results.map((page) => {
    if (!isFullPage(page)) {
      throw new Error('Notion page is not a full page')
    }

    return {
      author: 'multi_select' in page.properties.Author
        ? page.properties.Author.multi_select.map(author => author.name)
        : [],
      createdAt: formatDate(page.created_time),
      id: page.id,
      icon: page.icon?.type === 'emoji' ? page.icon.emoji : page.icon?.type === 'external' ? page.icon.external.url : '',
      slug: page.url,
      status: 'formula' in page.properties.Status ? page.properties.Status.formula : '',
      title: 'title' in page.properties.Title ? page.properties.Title.title[0].plain_text : '',
      description: 'rich_text' in page.properties.Description ? page.properties.Description.rich_text[0].plain_text : '',
    }
  })
}

export const getBooks = cache(async () => {
  const books = await getDatabaseContent(process.env.BOOKS_DATABASE_ID!)

  return books.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
})

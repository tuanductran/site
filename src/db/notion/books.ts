import { formatDate } from '@lib/date'
import { dateSortDesc } from '@lib/dateSortDesc'
import { Client, isFullPage } from '@notionhq/client'
import type { NotionBooks } from '@schema'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

class BooksService {
  constructor(
    private readonly notion: Client,
    private readonly databaseId: string,
  ) {}

  async getBooks() {
    const books = await this.getDatabaseContent(this.databaseId)

    return books
      .sort((a, b) => dateSortDesc(a.createdAt, b.createdAt))
  }

  private getDatabaseContent = async (databaseId: string): Promise<NotionBooks[]> => {
    const db = await this.notion.databases.query({ database_id: databaseId })

    while (db.has_more && db.next_cursor) {
      const { results, has_more, next_cursor }
        = await this.notion.databases.query({
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
          public_url: page.url,
          tags:
            'multi_select' in page.properties.Tags
              ? page.properties.Tags.multi_select.map(tag => tag.name)
              : [],
          status: 'formula' in page.properties.Status ? page.properties.Status.formula : '',
          title:
            'title' in page.properties.Title
              ? page.properties.Title.title[0].plain_text
              : '',
        }
      })
  }
}

export const booksApi = new BooksService(notion, process.env.BOOKS_DATABASE_ID!)

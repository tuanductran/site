import { formatDate } from '@lib/date'
import { dateSortDesc } from '@lib/dateSortDesc'
import { Client, isFullPage } from '@notionhq/client'
import type { NotionViewing } from '@schema'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

class ViewingService {
  constructor(
    private readonly notion: Client,
    private readonly databaseId: string,
  ) {}

  async getViewing() {
    const viewing = await this.getDatabaseContent(this.databaseId)

    return viewing
      .sort((a, b) => dateSortDesc(a.createdAt, b.createdAt))
  }

  private getDatabaseContent = async (databaseId: string): Promise<NotionViewing[]> => {
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
          tags:
            'multi_select' in page.properties.Tags
              ? page.properties.Tags.multi_select.map(tag => tag.name)
              : [],
          title:
              'title' in page.properties.Title
                ? page.properties.Title.title[0].plain_text
                : '',
          url: 'url' in page.properties.URL && page.properties.URL.url !== null
            ? page.properties.URL.url
            : '',
        }
      })
  }
}

export const viewingApi = new ViewingService(notion, process.env.VIEWING_DATABASE_ID!)

import { formatDate } from '@lib/date'
import { Client, isFullPage } from '@notionhq/client'
import type { NotionNote } from '@schema'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

class NotesService {
  constructor(
    private readonly notion: Client,
    private readonly databaseId: string,
  ) {}

  async getNotes() {
    const notes = await this.getDatabaseContent(this.databaseId)

    return notes
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }

  private getDatabaseContent = async (databaseId: string): Promise<NotionNote[]> => {
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
          editedAt: formatDate(page.last_edited_time),
          id: page.id,
          isFeatured:
            'checkbox' in page.properties.featured
              ? page.properties.featured.checkbox
              : false,
          isPublished:
            'checkbox' in page.properties.public
              ? page.properties.public.checkbox
              : false,
          public_url: page.public_url,
          tags:
            'multi_select' in page.properties.tags
              ? page.properties.tags.multi_select.map(tag => tag.name)
              : [],
          title:
            'title' in page.properties.title
              ? page.properties.title.title[0].plain_text
              : '',
        }
      })
      .filter(post => post.isPublished)
  }
}

export const notesApi = new NotesService(notion, process.env.NOTION_DATABASE_ID!)

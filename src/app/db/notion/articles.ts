import { formatDate } from '@lib/date'
import { slugify } from '@lib/slugify'
import { Client, isFullPage } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionArticle } from '@schema'

import { BlockTypeTransformLookup } from './BlockTypeTransformLookup'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

class ArticlesService {
  constructor(
    private readonly notion: Client,
    private readonly databaseId: string,
  ) {}

  async getArticles() {
    const articles = await this.getDatabaseContent(this.databaseId)

    return articles
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }

  async getPaginatedArticles(page: number = 1, limit: number = 10) {
    const articles = await this.getDatabaseContent(this.databaseId)

    const startIndex = (page - 1) * limit
    const paginatedArticles = articles.slice(startIndex, startIndex + limit)

    return {
      articles: paginatedArticles,
      currentPage: page,
      totalPages: Math.ceil(articles.length / limit),
    }
  }

  async getArticle(id: string) {
    return this.getPageContent(id)
  }

  private getDatabaseContent = async (databaseId: string): Promise<NotionArticle[]> => {
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
          isPublished:
            'checkbox' in page.properties.Public
              ? page.properties.Public.checkbox
              : false,
          slug:
            'title' in page.properties.Title
              ? slugify(page.properties.Title.title[0].plain_text)
              : '',
          tags:
            'multi_select' in page.properties.Tags
              ? page.properties.Tags.multi_select.map(tag => tag.name)
              : [],
          title:
            'title' in page.properties.Title
              ? page.properties.Title.title[0].plain_text
              : '',
        }
      })
      .filter(p => p.isPublished)
  }

  private getPageContent = async (pageId: string) => {
    const blocks = await this.getBlocks(pageId)

    const blocksChildren = await Promise.all(
      blocks.map(async (block) => {
        const { id } = block
        const contents = block[block.type as keyof typeof block] as any
        if (
          !['unsupported', 'child_page'].includes(block.type)
          && block.has_children
        ) {
          contents.children = await this.getBlocks(id)
        }

        return block
      }),
    )

    return Promise.all(
      blocksChildren.map(async (block) => {
        return BlockTypeTransformLookup[block.type](block)
      }),
    ).then((blocks) => {
      return blocks.reduce((acc: any, curr) => {
        if (curr.type === 'bulleted_list_item') {
          if (acc[acc.length - 1]?.type === 'bulleted_list') {
            acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr)
          }
          else {
            acc.push({
              type: 'bulleted_list',
              bulleted_list: { children: [curr] },
            })
          }
        }
        else if (curr.type === 'numbered_list_item') {
          if (acc[acc.length - 1]?.type === 'numbered_list') {
            acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr)
          }
          else {
            acc.push({
              type: 'numbered_list',
              numbered_list: { children: [curr] },
            })
          }
        }
        else {
          acc.push(curr)
        }
        return acc
      }, [])
    })
  }

  private getBlocks = async (blockId: string) => {
    const list = await this.notion.blocks.children.list({
      block_id: blockId,
    })

    while (list.has_more && list.next_cursor) {
      const { results, has_more, next_cursor }
        = await this.notion.blocks.children.list({
          block_id: blockId,
          start_cursor: list.next_cursor,
        })
      list.results = list.results.concat(results)
      list.has_more = has_more
      list.next_cursor = next_cursor
    }

    return list.results as BlockObjectResponse[]
  }
}

export const articlesApi = new ArticlesService(notion, process.env.ARTICLES_DATABASE_ID!)

import { formatDate } from '@lib/date'
import { slugify } from '@lib/slugify'
import { Client, isFullPage } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionNote } from '@schema'
import { cache } from 'react'

import { BlockTypeTransformLookup } from './BlockTypeTransformLookup'

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
        editedAt: formatDate(page.last_edited_time),
        id: page.id,
        isPublished:
            'checkbox' in page.properties.public
              ? page.properties.public.checkbox
              : false,
        slug:
            'title' in page.properties.title
              ? slugify(page.properties.title.title[0].plain_text)
              : '',
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

const getBlocks = cache(async (blockId: string) => {
  const list = await notion.blocks.children.list({
    block_id: blockId,
  })

  while (list.has_more && list.next_cursor) {
    const { results, has_more, next_cursor }
      = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: list.next_cursor,
      })
    list.results = list.results.concat(results)
    list.has_more = has_more
    list.next_cursor = next_cursor
  }

  return list.results as BlockObjectResponse[]
})

const getPageContent = cache(async (pageId: string) => {
  const blocks = await getBlocks(pageId)

  const blocksChildren = await Promise.all(
    blocks.map(async (block) => {
      const { id } = block
      const contents = block[block.type as keyof typeof block] as any
      if (
        !['unsupported', 'child_page'].includes(block.type)
        && block.has_children
      ) {
        contents.children = await getBlocks(id)
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
})

export const getNotes = cache(async () => {
  const notes = await getDatabaseContent(process.env.NOTES_DATABASE_ID!)

  return notes
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
})

export const getNote = cache(async (id: string) => {
  return await getPageContent(id)
})

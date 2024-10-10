import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getPlaiceholder } from 'plaiceholder'

const noop = async (block: BlockObjectResponse): Promise<BlockObjectResponse> => block

type BlockType = BlockObjectResponse['type']

export const BlockTypeTransformLookup: Record<BlockType, (block: BlockObjectResponse) => Promise<BlockObjectResponse>> = {
  file: noop,
  paragraph: noop,
  heading_1: noop,
  heading_2: noop,
  heading_3: noop,
  bulleted_list_item: noop,
  numbered_list_item: noop,
  quote: noop,
  to_do: noop,
  toggle: noop,
  template: noop,
  synced_block: noop,
  child_page: noop,
  child_database: noop,
  equation: noop,
  code: noop,
  callout: noop,
  divider: noop,
  breadcrumb: noop,
  table_of_contents: noop,
  column_list: noop,
  column: noop,
  link_to_page: noop,
  table: noop,
  table_row: noop,
  embed: noop,
  bookmark: noop,
  image: async (block: any) => {
    const contents = block[block.type]
    const buffer = await fetch(contents[contents.type].url).then(async res =>
      Buffer.from(await res.arrayBuffer()),
    )
    const {
      base64,
      metadata: { height, width },
    } = await getPlaiceholder(buffer, { size: 64 })
    block.image.size = { height, width }
    block.image.placeholder = base64

    return block
  },
  video: noop,
  pdf: noop,
  audio: noop,
  link_preview: noop,
  unsupported: noop,
}

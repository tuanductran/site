import Image from '@components/Image'
import Link from '@components/Link'
import { Quote } from '@components/Quote'
import { cn } from '@lib/cn'
import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  RichTextItemResponse,
  TableRowBlockObjectResponse,
  TextRichTextItemResponse,
  ToggleBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

// TODO: improve types here, cleanup the code
interface NotionBlockProps {
  block: any
}

export function NotionBlockRenderer({ block }: NotionBlockProps) {
  const { id, type } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <NotionText textItems={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <NotionText textItems={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <NotionText textItems={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <NotionText textItems={value.rich_text} />
        </h3>
      )
    case 'bulleted_list':
      return (
        <ul>
          {value.children.map((block: any) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}
        </ul>
      )
    case 'numbered_list':
      return (
        <ol>
          {value.children.map((block: any) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}
        </ol>
      )
    case 'bulleted_list_item':
      return (
        <li>
          <NotionText textItems={value.rich_text} />
          {value.children && value.children.map((block: BulletedListItemBlockObjectResponse) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}
        </li>
      )
    case 'numbered_list_item':
      return (
        <li>
          <NotionText textItems={value.rich_text} />
          {value.children && value.children.map((block: NumberedListItemBlockObjectResponse) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id} className="flex items-center justify-start space-x-3">
            <input type="checkbox" id={id} defaultChecked={value.checked} disabled />
            <NotionText textItems={value.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary className="cursor-pointer">
            <NotionText textItems={value.rich_text} />
          </summary>
          {value.children?.map((block: ToggleBlockObjectResponse) => (
            <NotionBlockRenderer key={block.id} block={block} />
          ))}
        </details>
      )
    case 'callout': {
      return (
        <div className="px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded p-1 text-sm flex items-center text-slate-900 dark:text-slate-100 mb-8">
          <div className="flex items-center size-5 mr-4">
            {value.icon.type === 'emoji' && (
              <div>{value.icon.emoji}</div>
            )}
            {value.icon.type === 'external' && (
              <Image
                src={value.icon.external.url}
                width={20}
                height={20}
                alt="Callout icon"
                priority
              />
            )}
          </div>
          <div className="w-full callout">
            <NotionText textItems={value.rich_text} />
          </div>
        </div>
      )
    }
    case 'child_page':
      return <p>{value.title}</p>
    case 'table': {
      const header = value.children[0].table_row.cells
      const body = value.children.slice(value.has_column_header ? 1 : 0)
      return (
        <div className="overflow-x-auto max-w-screen">
          <table>
            <thead>
              <tr>
                { header.map((cell: TableRowBlockObjectResponse) => {
                  const {
                    annotations: { bold, color, italic, strikethrough, underline },
                    plain_text,
                    href,
                  } = cell[0]
                  return (
                    <th
                      key={plain_text}
                      scope="col"
                      className={cn({
                        'font-bold': bold,
                        italic,
                        'line-through': strikethrough,
                        underline,
                      })}
                      style={color === 'default' ? {} : { color }}
                    >
                      {href ? <Link href={href}>{plain_text}</Link> : plain_text}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {body.map((row: TableRowBlockObjectResponse) => (
                <tr key={row.id}>
                  {row.table_row.cells.map((cell: RichTextItemResponse[]) => {
                    const {
                      annotations: { bold, color, italic, strikethrough, underline },
                      plain_text,
                      href,
                    } = cell[0]
                    return (
                      <td
                        key={plain_text}
                        scope="row"
                        className={cn({
                          'font-bold': bold,
                          italic,
                          'line-through': strikethrough,
                          underline,
                        })}
                        style={color === 'default' ? {} : { color }}
                      >
                        {href ? <Link href={href}>{plain_text}</Link> : plain_text}
                      </td>
                    )
                  },
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <Image
            className="rounded-lg object-cover"
            placeholder="blur"
            src={src}
            alt={caption || 'Cover'}
            blurDataURL={value.placeholder}
            width={value.size.width}
            height={value.size.height}
            priority
          />
          {caption && <figcaption className="text-center">{caption}</figcaption>}
        </figure>
      )
    }
    case 'divider':
      return <hr />
    case 'quote':
      return <Quote quote={value.rich_text[0].plain_text} />
    case 'code':
      return (
        <pre className={`language-${value.language}`}>
          <code>{value.rich_text[0].plain_text}</code>
        </pre>
      )
    case 'file': {
      const src_file = value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = src_file.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure>
          <div>
            <Link href={src_file}>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    }
    case 'link_preview':
    case 'embed':
    case 'bookmark':
      return (
        <Link href={value.url}>{value.url}</Link>
      )
    default:
      return (
        <div className="px-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded p-1 text-sm flex items-center text-slate-900 dark:text-slate-100 mb-8">
          <div className="flex items-center w-4 mr-4">❌</div>
          <div className="w-full callout">
            Unsupported block (
            {type === 'unsupported' ? 'unsupported by Notion API' : type}
            )
          </div>
        </div>
      )
  }
}

function NotionText({ textItems }: { textItems: TextRichTextItemResponse[] }) {
  if (!textItems) {
    return null
  }

  return (
    <>
      {textItems.map((textItem) => {
        const {
          annotations: { bold, color, italic, strikethrough, underline },
          text,
        } = textItem
        return (
          <span
            key={text.content}
            className={cn({
              'font-bold': bold,
              italic,
              'line-through': strikethrough,
              underline,
            })}
            style={color === 'default' ? {} : { color }}
          >
            {text.link ? <Link href={text.link.url}>{text.content}</Link> : text.content}
          </span>
        )
      })}
    </>
  )
}

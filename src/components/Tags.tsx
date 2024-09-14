import { cn } from '@lib/cn'
import type { FC } from 'react'

interface TagProps {
  onClick: () => void
  title: string
  isSelected: boolean
}

const Tag: FC<TagProps> = ({ onClick, title, isSelected }) => {
  return (
    <button
      type="button"
      className={cn(
        'cursor-pointer rounded-full whitespace-nowrap border px-3 py-px text-sm font-medium hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-transparent',
        isSelected ? 'border-sky-700 text-sky-900 dark:border-sky-400/50 dark:text-sky-300/90' : 'border-slate-200 dark:border-slate-700 dark:hover:border-slate-500',
      )}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

interface NotionTagsProps {
  selectedTag: string | null
  setSelectedTag: (tag: string | null) => void
  tags: string[]
}

export const NotionTags: FC<NotionTagsProps> = ({
  selectedTag,
  setSelectedTag,
  tags,
}) => {
  return (
    <div className="mb-6 flex flex-nowrap overflow-x-auto gap-2">
      <Tag
        title="All"
        isSelected={selectedTag === null}
        onClick={() => setSelectedTag(null)}
      />
      {tags.map(tag => (
        <Tag
          key={tag}
          title={tag}
          isSelected={selectedTag === tag}
          onClick={() => setSelectedTag(tag)}
        />
      ))}
    </div>
  )
}

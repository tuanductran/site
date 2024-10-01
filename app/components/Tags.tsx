import { Button } from '@headlessui/react'
import clsx from 'clsx'
import type { FC } from 'react'

interface TagProps {
  onClick: () => void
  title: string
  isSelected: boolean
}

const Tag: FC<TagProps> = ({ onClick, title, isSelected }) => {
  return (
    <Button
      type="button"
      className={clsx(
        'cursor-pointer whitespace-nowrap rounded-md border px-3 py-px text-xs hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-transparent',
        isSelected ? 'border-green-700 text-green-900 dark:border-green-400/50 dark:text-green-300/90' : 'border-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500',
      )}
      onClick={onClick}
    >
      {title}
    </Button>
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
    <div className="mt-12 flex gap-2 hide-scrollbar overflow-x-auto">
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

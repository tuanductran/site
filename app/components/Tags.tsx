import { Button } from '@headlessui/react'
import clsx from 'clsx'
import type { FC } from 'react'

interface TagProps {
  isSelected: boolean
  onClick: () => void
  title: string
}

interface NotionTagsProps {
  selectedTag: string | null
  setSelectedTag: (tag: string | null) => void
  tags: string[]
}

const Tag: FC<TagProps> = ({ isSelected, onClick, title }) => {
  return (
    <Button
      type="button"
      className={clsx(
        'cursor-pointer whitespace-nowrap rounded-md border px-3 py-px text-xs hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-transparent',
        isSelected ? 'border-sky-700 text-sky-900 dark:border-sky-400/50 dark:text-sky-300/90' : 'border-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500',
      )}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}

export const NotionTags: FC<NotionTagsProps> = ({
  selectedTag,
  setSelectedTag,
  tags,
}) => {
  return (
    <div className="mt-12 flex gap-2 hide-scrollbar overflow-x-auto">
      <Tag
        title="All Tags"
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

import { dateSortDesc } from './dateSortDesc'

export function filterTags(type: any, tag: string) {
  const sortedTags = type.sort((a, b) => dateSortDesc(a.createdAt, b.createdAt))

  if (!tag) {
    return sortedTags
  }

  return sortedTags.filter((type: any) => type.tags.includes(tag))
}

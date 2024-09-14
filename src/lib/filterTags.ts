export function filterTags(type: any, tag: string) {
  const sortedTags = type.sort(
    (a, b) =>
      Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  )

  if (!tag) {
    return sortedTags
  }

  return sortedTags.filter((type: any) => type.tags.includes(tag))
}

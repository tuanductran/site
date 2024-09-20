export function filterArticles(type, selectedTag) {
  return type
    .sort((a, b) => Number(new Date(b.created_at)))
    .filter((type) => {
      if (selectedTag === null) {
        return true
      }
      return type.tags.includes(selectedTag)
    })
}

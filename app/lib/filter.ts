export function filterStatus(type: any, status: any) {
  const sortedStatus = [...type].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (!status) {
    return sortedStatus
  }

  return sortedStatus.filter(type => type.status.string.includes(status))
}

export function filterTags(type: any, tag: any) {
  const sortedTags = [...type].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  if (!tag) {
    return sortedTags
  }

  return sortedTags.filter(type => type.tags.includes(tag))
}

export function filterArticles(articles, selectedTag) {
  return articles
    .sort((a, b) => Number(new Date(b.createdAt)))
    .filter(article => {
      if (selectedTag === null) {
        return true
      }
      return article.tags.includes(selectedTag)
    })
}

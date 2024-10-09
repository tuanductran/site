import type { NotionArticle, NotionBooks, NotionNote } from '@schema'

export function filterStatus(articles: NotionBooks[], selectedTag: string | null) {
  return articles
    .sort((a, b) => Number(new Date(b.createdAt)))
    .filter((article) => {
      if (selectedTag === null) {
        return true
      }
      return article.status.string.includes(selectedTag)
    })
}

export function filterArticles(articles: NotionArticle[] | NotionNote[], selectedTag: string | null) {
  return articles
    .sort((a, b) => Number(new Date(b.createdAt)))
    .filter((article) => {
      if (selectedTag === null) {
        return true
      }
      return article.tags.includes(selectedTag)
    })
}

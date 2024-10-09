import type { NotionArticle, NotionBooks, NotionNote } from '@schema'

export function filterStatus(articles: NotionBooks[], selectedTag: string | null) {
  const filteredArticles = articles.filter((article) => {
    return selectedTag === null || article.status.string.includes(selectedTag)
  })

  return filteredArticles.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))
}

export function filterArticles(articles: NotionArticle[] | NotionNote[], selectedTag: string | null) {
  const uniqueArticles = Array.from(new Map(articles.map(article => [article.id, article])).values())

  const filteredArticles = uniqueArticles.filter((article) => {
    return selectedTag === null || article.tags.includes(selectedTag)
  })

  return filteredArticles.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))
}

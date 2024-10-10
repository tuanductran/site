import type { NotionArticle, NotionBooks, NotionNote } from '@schema'

/**
 * Sorts and filters a list of books by status.
 * @param articles - The list of books.
 * @param selectedTag - The selected tag for filtering.
 * @returns The filtered and sorted list of books.
 */
export function filterStatus(articles: NotionBooks[], selectedTag: string | null): NotionBooks[] {
  // Sort by creation date in descending order and filter by status
  return articles
    .filter((article) => {
      // If no tag is selected, return all
      if (selectedTag === null)
        return true
      // Check if the status includes the selected tag
      return article.status?.string.includes(selectedTag) ?? false
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

/**
 * Sorts and filters a list of articles or notes by tag.
 * @param articles - The list of articles or notes.
 * @param selectedTag - The selected tag for filtering.
 * @returns The filtered and sorted list of articles or notes.
 */
export function filterArticles(articles: NotionArticle[] | NotionNote[], selectedTag: string | null): (NotionArticle | NotionNote)[] {
  // Sort by creation date in descending order and filter by tag
  return articles
    .filter((article) => {
      // If no tag is selected, return all
      if (selectedTag === null)
        return true
      // Check if the tags include the selected tag
      return article.tags?.includes(selectedTag) ?? false
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

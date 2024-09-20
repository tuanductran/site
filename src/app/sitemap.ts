import { articlesApi, notesApi } from './db'

export default async function sitemap() {
  const article = await articlesApi.getArticles()
  const articles = article.map(p => ({
    url: `https://tuanductran.site/articles/${p.slug}`,
    lastModified: p.createdAt,
  }))

  const note = await notesApi.getNotes()
  const notes = note.map(p => ({
    url: `https://tuanductran.site/notes/${p.slug}`,
    lastModified: p.createdAt,
  }))

  const routes = ['', '/articles', '/books', '/notes', '/share-cv', '/viewing'].map(route => ({
    url: `https://tuanductran.site${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...articles, ...notes]
}

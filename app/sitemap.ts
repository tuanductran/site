import { siteConfig } from '@data'
import { articlesApi } from '@db'

export default async function sitemap() {
  const article = await articlesApi.getArticles()
  const articles = article.map(p => ({
    url: `${siteConfig.siteURL}/articles/${p.slug}`,
    lastModified: p.createdAt,
  }))

  const routes = ['', '/articles', '/books', '/notes', '/share-cv', '/viewing'].map(route => ({
    url: `${siteConfig.siteURL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...articles]
}

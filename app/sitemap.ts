import { siteConfig } from '@data'
import { getArticles } from '@db'

export default async function sitemap() {
  const article = await getArticles()
  const articles = article.map(p => ({
    url: `${siteConfig.siteURL}/articles/${p.slug}`,
    lastModified: p.editedAt,
  }))

  const routes = ['', '/articles', '/books', '/share-cv'].map(route => ({
    url: `${siteConfig.siteURL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...articles]
}

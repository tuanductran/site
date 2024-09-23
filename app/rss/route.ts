import { siteConfig } from '@data'
import { articlesApi } from '@db'

export async function GET() {
  const articles = await articlesApi.getArticles()

  const ArticleItemsXml = articles.map(
    article =>
      `<item>
          <title>${article.title}</title>
          <link>${siteConfig.siteURL}/articles/${article.slug}</link>
          <description>${article.description}</description>
          <pubDate>${article.createdAt}</pubDate>
        </item>`,
  )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${siteConfig.name}</title>
        <link>${siteConfig.siteURL}</link>
        <description>${siteConfig.desc}</description>
        ${ArticleItemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}

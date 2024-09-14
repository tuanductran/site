import { siteConfig } from '@data'
import { articlesApi, notesApi } from '@db'
import type { NextApiHandler } from 'next'
import RSS from 'rss'

const generateRssFeed: NextApiHandler = async (req, res) => {
  const rssFeed = new RSS({
    title: siteConfig.name,
    description: siteConfig.desc,
    generator: 'A product created from Next.js and Notion',
    feed_url: 'https://tuanductran.site/feed.xml',
    site_url: 'https://tuanductran.site/',
    managingEditor: 'tuanductran.dev@gmail.com (Tuan Duc Tran)',
    webMaster: 'tuanductran.dev@gmail.com (Tuan Duc Tran)',
    copyright: `Copyright ${new Date().getFullYear().toString()}, ${siteConfig.name}`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  try {
    const articles = await articlesApi.getArticles()
    const notes = await notesApi.getNotes()

    for (const article of articles) {
      rssFeed.item({
        date: article.createdAt,
        description: article.title,
        title: article.title,
        categories: article.tags || [],
        url: `https://tuanductran.site/articles/${article.slug}`,
      })
    }

    for (const note of notes) {
      rssFeed.item({
        date: note.createdAt,
        description: note.title,
        title: note.title,
        categories: note.tags || [],
        url: `https://tuanductran.site/notes/${note.slug}`,
      })
    }

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600',
    )

    res.write(rssFeed.xml({ indent: true }))
    res.end()
  }
  catch (error) {
    console.error('Error generating RSS feed:', error)
    res.status(500).end()
  }
}

export default generateRssFeed

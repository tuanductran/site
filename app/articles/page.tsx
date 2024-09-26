import { articlesApi } from '@db'
import { Articles } from '@pages/Articles'

const seoTitle = 'Articles Collection'
const seoDescription = 'Explore all your articles in one place'

export const metadata = {
  title: seoTitle,
  description: seoDescription,
}

export default async function ArticlesPage() {
  const articles = await articlesApi.getArticles()
  const tags = Array.from(new Set(articles.flatMap(articles => articles.tags)))
  return (
    <Articles
      title={seoTitle}
      description={seoDescription}
      articles={articles}
      tags={tags}
    />
  )
}

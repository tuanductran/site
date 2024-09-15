import { ArticlesLayout } from '@components/layout'
import { NotionBlockRenderer } from '@components/notion/NotionBlockRenderer'
import { siteConfig } from '@data'
import { articlesApi } from '@db'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionArticle } from '@schema'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import Prism from 'prismjs'
import { useEffect } from 'react'

interface ArticleProps {
  article: NotionArticle
  articleContent: any[]
}

function ArticlePage({
  article,
  articleContent,
}: ArticleProps) {
  const { createdAt, editedAt, slug, title } = article
  const canonicalUrl = `${siteConfig.siteURL}/articles/${slug}`
  const ogImageUrl = `${siteConfig.siteURL}/api/og?title=${title}`

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <NextSeo
        title={title}
        description={title}
        canonical={canonicalUrl}
        openGraph={{
          images: [{ url: ogImageUrl }],
        }}
      />
      <ArticleJsonLd
        url={canonicalUrl}
        images={[ogImageUrl]}
        title={title}
        datePublished={createdAt}
        dateModified={editedAt}
        authorName={siteConfig.name}
        description={title}
      />
      <ArticlesLayout article={article}>
        {articleContent.map((block: BlockObjectResponse) => (
          <NotionBlockRenderer key={block.id} block={block} />
        ))}
      </ArticlesLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  ArticleProps,
  { slug: string }
> = async (context) => {
  const slug = context.params?.slug
  const articles = await articlesApi.getArticles()
  const article = articles.find(article => article.slug === slug)

  if (!article) {
    return {
      notFound: true,
    }
  }

  const articleContent = await articlesApi.getArticle(article.id)

  return {
    props: {
      article,
      articleContent,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await articlesApi.getArticles()

  return {
    paths: articles.map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

export default ArticlePage

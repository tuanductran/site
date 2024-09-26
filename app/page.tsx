import { Article } from '@components/Article'
import { Container } from '@components/Container'
import { Newsletter } from '@components/Newsletter'
import { PageTitle } from '@components/PageTitle'
import { Photos } from '@components/Photos'
import { SocialLink } from '@components/SocialLink'
import { TechStack } from '@components/TechStack'
import { siteConfig } from '@data'
import { articlesApi } from '@db'

export default async function Page() {
  const articles = await articlesApi.getArticles()
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <PageTitle>{siteConfig.name}</PageTitle>
          <p className="mt-6 max-w-2xl text-base">{siteConfig.about}</p>
          <div className="mt-6 flex gap-6">
            {siteConfig.socialMedia.map(social => (
              <SocialLink
                key={social.name}
                aria-label={`Follow me on ${social.name}`}
                href={social.link}
                icon={social.icon}
              />
            ))}
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-12">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.slice(0, 4).map(article => (
              <Article key={article.slug} article={article} dense />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <TechStack />
          </div>
        </div>
      </Container>
    </>
  )
}

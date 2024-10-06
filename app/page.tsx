import { Article } from '@components/Article'
import { Container } from '@components/Container'
import { Photos } from '@components/Photos'
import { SocialLink } from '@components/SocialLink'
import { TechStack } from '@components/TechStack'
import { siteConfig } from '@data'
import { getArticles } from '@db'

export default async function Page() {
  const articles = await getArticles()
  return (
    <>
      <Container className="relative mt-9">
        <div className="absolute inset-x-0 bottom-0 -top-32 z-0 text-slate-900/10 [mask-image:radial-gradient(circle,white,transparent)] dark:text-white/10">
          <svg aria-hidden="true" className="absolute inset-0 size-full">
            <defs>
              <pattern
                id=":Rem:"
                width="128"
                height="128"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="100%"
              >
                <path
                  d="M0 128V.5H128"
                  fill="none"
                  stroke="currentColor"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#:Rem:)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">{siteConfig.name}</h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{siteConfig.about}</p>
          <div className="pt-8 flex gap-6">
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
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.slice(0, 4).map(article => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <TechStack />
          </div>
        </div>
      </Container>
    </>
  )
}

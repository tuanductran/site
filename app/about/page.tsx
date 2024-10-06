import { Container } from '@components/Container'
import Image from '@components/Image'
import Link from '@components/Link'
import { PageTitle } from '@components/PageTitle'
import { Section, SectionContent, SectionTitle } from '@components/Section'
import { SocialLink } from '@components/SocialLink'
import { siteConfig } from '@data'
import { getBooks } from '@db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.siteURL}/books`,
  },
  description: 'A few words about me.',
  openGraph: {
    title: 'About',
    description: 'A few words about me.',
    url: `${siteConfig.siteURL}/books`,
    siteName: 'About',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.apiURL}/og?title=About`,
        width: 1200,
        height: 630,
        alt: 'About',
      },
    ],
  },
  twitter: {
    title: 'About',
    description: 'A few words about me.',
    images: [`${siteConfig.apiURL}/og?title=About`],
    card: 'summary_large_image',
    creator: '@tuanducdesigner',
    site: '@tuanducdesigner',
  },
}

export default async function AboutPage() {
  const books = await getBooks()
  const booksReading = books.filter(book => book.status.string === 'Reading again')
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src="/favicon/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg"
              alt={siteConfig.name}
              sizes="(min-width: 1024px) 32rem, 20rem"
              width={1280}
              height={1280}
              className="size-full aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              priority
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <PageTitle>{siteConfig.name}</PageTitle>
          <div className="mt-6 text-base">{siteConfig.desc}</div>
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
          <Section>
            <SectionTitle as="h2">Books worth re-reading</SectionTitle>
            <SectionContent>
              <ul className="mt-1 list-decimal list-inside">
                {booksReading.map(book => (
                  <li key={book.id}>
                    <Link href={book.slug} title={book.title} className="underline">{book.title}</Link>
                  </li>
                ))}
              </ul>
            </SectionContent>
          </Section>
        </div>
      </div>
    </Container>
  )
}

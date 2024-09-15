import { ChannelLink } from '@components/ChannelLink'
import Link from '@components/Link'
import { NoteLink } from '@components/NoteLink'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import type { NotionNote } from '@schema'
import type { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

interface IndexProps {
  notes: NotionNote[]
}

function IndexPage({ notes }: IndexProps) {
  return (
    <>
      <NextSeo
        title={siteConfig.name}
        description={siteConfig.desc}
        canonical={siteConfig.siteURL}
        openGraph={{
          images: [
            {
              url: `${siteConfig.siteURL}/api/og?title=${siteConfig.name}`,
            },
          ],
        }}
      />
      <section className="overflow-hidden">
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{siteConfig.name}</h1>
        <p className="prose prose-slate dark:prose-dark">{siteConfig.about}</p>
        <div className="prose prose-slate dark:prose-dark">
          <p>Tôi đã lựa chọn và tổng hợp những kênh YouTube nổi bật nhất về tâm linh và vũ trụ để chia sẻ với bạn và nhiều người khác.</p>
        </div>
        <div className="my-6 flex w-full flex-col space-x-0 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <ChannelLink
            imgSrc="https://yt3.googleusercontent.com/1Kux1I5B3eSkURlbMa_OBll_84fYbaufQR4Rt6q9b4-ZNNzcmmpeCUy3sG8DcfhbIi0rdwshqA=s160-c-k-c0x00ffffff-no-rj"
            channelName="BA Universe"
            channelUrl="https://www.youtube.com/@Bauniverse"
          />
          <ChannelLink
            imgSrc="https://yt3.googleusercontent.com/hyiCmM7DKOebdJ2QGn7Gq4AfojG4gCwO9gg5fSlHwwJNc34i9u2haR1VXfaayvwff7u-ST1E=s160-c-k-c0x00ffffff-no-rj"
            channelName="THIÊN HÀ TV"
            channelUrl="https://www.youtube.com/@ThienHaTV999"
          />
        </div>
        <div className="prose prose-slate dark:prose-dark">
          <p>Tôi đã tổng hợp và chia sẻ với bạn cũng như nhiều người khác những bài viết nổi bật về tâm linh và vũ trụ.</p>
        </div>
        <div className="my-6 flex w-full flex-col space-y-4">
          {notes.slice(0, 3).map(note => (
            <NoteLink
              key={note.id}
              title={note.title}
              slug={note.slug}
              createdAt={note.createdAt}
            />
          ))}
        </div>
        <div className="prose prose-slate dark:prose-dark">
          <p>
            Bảo vệ quyền riêng tư trực tuyến của bạn chưa bao giờ dễ dàng hơn thế! Tôi đang sử dụng:
            {' '}
            <Link href="https://nextdns.io/?from=wpp35fr3" title="NextDNS">NextDNS</Link>
            {' '}
            và
            {' '}
            <Link href="https://github.com/AdguardTeam/AdGuardHome" title="Adguard Home">Adguard Home</Link>
            {' '}
            để kiểm soát dữ liệu của mình, chặn theo dõi và duyệt web một cách an toàn.
          </p>
        </div>
        <div className="my-6 prose prose-slate dark:prose-dark">
          <p>
            Có thể bạn sẽ thích:
            {' '}
            <Link href="/notes/40-bi-quyet-de-song-hanh-phuc-va-tang-cuong-nang-luong-tich-cuc" title="40 Bí Quyết Để Sống Hạnh Phúc và Tăng Cường Năng Lượng Tích Cực">40 Bí Quyết Để Sống Hạnh Phúc và Tăng Cường Năng Lượng Tích Cực</Link>
            ,
            {' '}
            <Link href="/articles/my-nextdns-setup" title="My NextDNS Setup">My NextDNS Setup</Link>
            .
          </p>
        </div>
        <ul className="font-sm flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          {siteConfig.socialMedia.map(social => (
            <li key={social.link}>
              <Link
                className="flex items-center transition-all text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-300"
                href={social.link}
                title={social.name}
              >
                <social.icon />
                <p className="ml-2 h-7">{social.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const notes = await notesApi.getNotes()
  const featuredNotes = notes.filter(note => note.isFeatured)

  return {
    props: {
      notes: featuredNotes,
    },
    revalidate: 10,
  }
}

export default IndexPage

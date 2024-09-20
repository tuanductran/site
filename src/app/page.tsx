import { ChannelLink } from '@components/ChannelLink'
import { AdguardIcon, NextDNSIcon } from '@components/icons'
import Link from '@components/Link'
import { NoteLink } from '@components/NoteLink'
import { siteConfig } from '@data'
import { notesApi } from '@db'
import Image from 'next/image'

export default async function Page() {
  const notes = await notesApi.getNotes()
  const featuredNotes = notes.filter(note => note.isFeatured)
  return (
    <section>
      <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl text-slate-900 dark:text-white">{siteConfig.name}</h1>
      <p className="prose prose-slate dark:prose-dark">{siteConfig.about}</p>
      <div className="my-6">
        <div className="hide-scrollbar -my-4 flex gap-8 overflow-y-auto py-4 px-8">
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 rotate-2">
            <Image
              alt="Tự chữa lành - thông qua hiểu biết về khoa học tâm thức"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/tu-chua-lanh-thong-qua-hieu-biet-ve-khoa-hoc-tam-thuc_JVHWkk06K.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 -rotate-2">
            <Image
              alt="Tự chữa lành - làm sao để khai sáng"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/tu-chua-lanh-lam-sao-de-khai-sang_eXcUf1vx0i.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 rotate-2">
            <Image
              alt="Khí tâm trị liệu"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/khi-tam-tri-lieu_n2YIgcpHk.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 -rotate-2">
            <Image
              alt="Gửi bạn người có trái tim vô cùng nhạy cảm"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/gui-ban-nguoi-co-trai-tim-vo-cung-nhay-cam_cgUe6ZOBt.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 rotate-2">
            <Image
              alt="Mọi nỗ lực đều sẽ được hồi đáp"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/moi-no-luc-deu-se-duoc-hoi-dap_4i4AVeK0o.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 -rotate-2">
            <Image
              alt="Chỉ cần bạn tốt hơn 1% mỗi ngày"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/chi-can-ban-tot-hon-1_-moi-ngay_Bcivmur9b.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 rotate-2">
            <Image
              alt="Đế chế Atlantics và những vương quốc biến mất"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/de-che-atlantis-va-nhung-vuong-quoc-bien-mat_esxe7YWoWV.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 -rotate-2">
            <Image
              alt="Trở nên thông tuệ"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/tro-nen-thong-tue_oxL2KZedk.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="relative aspect-[9/10] w-44 sm:w-72 flex-none overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 rotate-2">
            <Image
              alt="Kiếp nào ta cũng tìm thấy nhau"
              src="https://ik.imagekit.io/vnodesign/tuanductran.site/images/kiep-nao-ta-cung-tim-thay-nhau_OXzqW52K1.jpg"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </div>
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
        {featuredNotes.slice(0, 3).map(note => (
          <NoteLink
            key={note.id}
            title={note.title}
            slug={`/notes/${note.slug}`}
            createdAt={note.createdAt}
          />
        ))}
      </div>
      <div className="prose prose-slate dark:prose-dark">
        <p>
          Bảo vệ quyền riêng tư trực tuyến của bạn chưa bao giờ dễ dàng hơn thế! Tôi đang sử dụng:
          {' '}
          <strong>NextDNS</strong>
          {' '}
          và
          {' '}
          <strong>Adguard Home</strong>
          {' '}
          để kiểm soát dữ liệu của mình, chặn theo dõi và duyệt web một cách an toàn.
        </p>
      </div>
      <div className="my-6 flex h-14 w-full flex-row space-x-2 overflow-x-auto">
        <Link
          href="https://nextdns.io/?from=wpp35fr3"
          className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800 dark:highlight-white/5 px-3 py-4"
          title="NextDNS"
        >
          <NextDNSIcon className="size-6 fill-current" />
        </Link>
        <Link
          href="https://github.com/AdguardTeam/AdGuardHome"
          className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800 dark:highlight-white/5 px-3 py-4"
          title="Adguard Home"
        >
          <AdguardIcon className="size-6 fill-current" />
        </Link>
      </div>
      <div className="prose prose-slate dark:prose-dark">
        <p>
          Có thể bạn sẽ thích:
          {' '}
          <Link href="/articles/chon-may-tinh-phu-hop-cho-cong-viec" title="Chọn Máy Tính Phù Hợp Cho Công Việc">Chọn Máy Tính Phù Hợp Cho Công Việc</Link>
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
  )
}

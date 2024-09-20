import { GitHubIcon, LinkedInIcon, NuxtIcon, VueIcon } from '@components/icons'
import Link from '@components/Link'
import type { siteMetadata } from '@schema'

export const siteConfig: siteMetadata = {
  about: (
    <>
      Chào mừng bạn đến với không gian của tôi! Tôi là Trần Tuấn Đức, một nhà phát triển
      {' '}
      <strong className="text-sky-500 dark:text-sky-400">Front-End</strong>
      {' '}
      với tình yêu dành cho
      {' '}
      <span className="not-prose">
        <Link
          href="https://vuejs.org/"
          className="inline-flex items-center rounded border border-slate-200 bg-slate-50 p-1 text-sm leading-4 text-slate-900 no-underline dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          title="Vue.js"
        >
          <VueIcon className="mr-1 inline-flex size-[14px]" />
          Vue.js
        </Link>
      </span>
      {' '}
      và
      {' '}
      <span className="not-prose">
        <Link
          href="https://nuxt.com/"
          className="inline-flex items-center rounded border border-slate-200 bg-slate-50 p-1 text-sm leading-4 text-slate-900 no-underline dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          title="Nuxt.js"
        >
          <NuxtIcon className="!mr-1 size-[14px]" />
          Nuxt.js
        </Link>
      </span>
      . Nhưng ngoài việc kiến tạo những trải nghiệm web tuyệt vời, tôi còn tìm thấy niềm đam mê sâu sắc trong việc khám phá những bí ẩn của tâm linh và vũ trụ.
    </>
  ),
  name: 'Tuan Duc Tran',
  desc: 'Chào mừng bạn đến với không gian của tôi! Tôi là Trần Tuấn Đức, một nhà phát triển Front-End với tình yêu dành cho Vue.js và Nuxt.js',
  siteURL: 'https://tuanductran.site',
  socialMedia: [
    {
      name: 'Github',
      link: 'https://github.com/tuanđuctran/',
      icon: GitHubIcon,
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/tuanductran',
      icon: LinkedInIcon,
    },
  ],
  subName: 'UI Designer',
  totalPosts: 6,
}

import { GitHubIcon, LinkedInIcon } from '@components/icons'
import type { siteMetadata } from '@schema'

export const siteConfig: siteMetadata = {
  about: (
    <>
      Chào mừng bạn đến với không gian của tôi! Tôi là Trần Tuấn Đức, một nhà phát triển Front-End với tình yêu dành cho
      {' '}
      <strong>Vue.js</strong>
      {' '}
      và
      {' '}
      <strong>Nuxt.js</strong>
      . Nhưng ngoài việc kiến tạo những trải nghiệm web tuyệt vời, tôi còn tìm thấy niềm đam mê sâu sắc trong việc khám phá những bí ẩn của tâm linh và vũ trụ.',
    </>
  ),
  name: 'Tuan Duc Tran',
  desc: 'Chào mừng bạn đến với không gian của tôi! Tôi là Trần Tuấn Đức, một nhà phát triển Front-End với tình yêu dành cho Vue.js và Nuxt.js',
  siteURL: process.env.NEXT_PUBLIC_URL || 'https://tuanductran.site',
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

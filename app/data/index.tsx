import {
  CloudflareIcon,
  GitHubIcon,
  LinkedInIcon,
  NetlifyIcon,
  NextIcon,
  NotionIcon,
  ReactIcon,
  TailwindIcon,
} from '@components/icons'
import type { siteMetadata } from '@schema'

export const siteConfig: siteMetadata = {
  about: 'Chào mừng bạn đến với không gian của tôi! Tôi là Trần Tuấn Đức, một nhà phát triển Front-End với tình yêu dành cho Vue.js và Nuxt.js. Nhưng ngoài việc kiến tạo những trải nghiệm web tuyệt vời, tôi còn tìm thấy niềm đam mê sâu sắc trong việc khám phá những bí ẩn của tâm linh và vũ trụ.',
  booksIems: [
    {
      src: 'https://ik.imagekit.io/vnodesign/tuanductran.site/images/tu-chua-lanh-thong-qua-hieu-biet-ve-khoa-hoc-tam-thuc_JVHWkk06K.jpg',
      name: 'Tự chữa lành - thông qua hiểu biết về khoa học tâm thức',
    },
    {
      src: 'https://ik.imagekit.io/vnodesign/tuanductran.site/images/tu-chua-lanh-lam-sao-de-khai-sang_eXcUf1vx0i.jpg',
      name: 'Tự chữa lành - làm sao để khai sáng',
    },
    {
      src: 'https://ik.imagekit.io/vnodesign/tuanductran.site/images/khi-tam-tri-lieu_n2YIgcpHk.jpg',
      name: 'Khí tâm trị liệu',
    },
    {
      src: 'https://ik.imagekit.io/vnodesign/tuanductran.site/images/gui-ban-nguoi-co-trai-tim-vo-cung-nhay-cam_cgUe6ZOBt.jpg',
      name: 'Gửi bạn người có trái tim vô cùng nhạy cảm',
    },
    {
      src: 'https://ik.imagekit.io/vnodesign/tuanductran.site/images/moi-no-luc-deu-se-duoc-hoi-dap_4i4AVeK0o.jpg',
      name: 'Mọi nỗ lực đều sẽ được hồi đáp',
    },
  ],
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
  navItems: [
    { href: '/', name: 'Home' },
    { href: '/articles', name: 'Articles' },
    { href: '/books', name: 'Books' },
    { href: '/notes', name: 'Notes' },
    { href: '/viewing', name: 'Viewing' },
  ],
  techStack: [
    {
      name: 'React.js',
      link: 'https://react.dev',
      icon: ReactIcon,
    },
    {
      name: 'Next.js',
      link: 'https://nextjs.org',
      icon: NextIcon,
    },
    {
      name: 'Notion',
      link: 'https://notion.so',
      icon: NotionIcon,
    },
    {
      name: 'Tailwind CSS',
      link: 'https://tailwindcss.com',
      icon: TailwindIcon,
    },
    {
      name: 'Netlify',
      link: 'https://netlify.com',
      icon: NetlifyIcon,
    },
    {
      name: 'Cloudflare',
      link: 'https://www.cloudflare.com',
      icon: CloudflareIcon,
    },
    {
      name: 'Github',
      link: 'https://github.com/tuanductran/site',
      icon: GitHubIcon,
    },
  ],
  template: [
    {
      title: '100+ My Github Starred Repositories',
      type: 'Notion',
      description: '100+ My Github Starred Repositories',
      logo: '',
      link: {
        href: 'https://tuanducdev.notion.site/b2364ca05ba7489bb2e803039bbf17cd?v=28f967c06a994eb19908422fef4d8a24&pvs=4',
        name: '100+ My Github Starred Repositories',
      },
    },
  ],
  footerItems: [
    { href: '/create-cv', name: 'Create CV' },
    { href: '/share-cv', name: 'Share CV' },
    { href: '/job', name: 'Find Job' },
  ],
}

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
  apiURL: 'https://og.tuanductran.site',
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
  desc: 'Chào mừng bạn đến với không gian của tôi! Tôi là Trần Tuấn Đức, một nhà phát triển Front-End với tình yêu dành cho Vue.js và Nuxt.js',
  footerItems: [
    { href: 'https://zalo.me/g/lgkrvf226', name: 'Dev Community' },
    { href: 'https://tuanductran.site/careers', name: 'Careers' },
  ],
  name: 'Tuan Duc Tran',
  navItems: [
    { href: '/about', name: 'About' },
    { href: '/articles', name: 'Articles' },
    { href: '/books', name: 'Books' },
    { href: '/share-cv', name: 'Share CV' },
  ],
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
  techStack: [
    {
      icon: ReactIcon,
      link: 'https://react.dev',
      name: 'React.js',
    },
    {
      icon: NextIcon,
      link: 'https://nextjs.org',
      name: 'Next.js',
    },
    {
      icon: NotionIcon,
      link: 'https://notion.so',
      name: 'Notion',
    },
    {
      icon: TailwindIcon,
      link: 'https://tailwindcss.com',
      name: 'Tailwind CSS',
    },
    {
      icon: NetlifyIcon,
      link: 'https://netlify.com',
      name: 'Netlify',
    },
    {
      icon: CloudflareIcon,
      link: 'https://www.cloudflare.com',
      name: 'Cloudflare',
    },
    {
      icon: GitHubIcon,
      link: 'https://github.com/tuanductran/site',
      name: 'Github',
    },
  ],
}

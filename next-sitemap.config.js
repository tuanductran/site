/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://tuanductran.site',
  generateRobotsTxt: true,
  autoLastmod: false,
  generateIndexSitemap: true,
  changefreq: null,
  priority: null,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

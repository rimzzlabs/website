/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rizkicitra.dev',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  },
  sitemapSize: 10000
}

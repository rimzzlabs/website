/* eslint-disable @typescript-eslint/no-var-requires */
// const withPWA = require('next-pwa')

// const isDev = process.env.NODE_ENV === 'development'

// /** @type {import('next').NextConfig} */
// module.exports = withPWA({
//   images: {
//     domains: ['ik.imagekit.io', 'og-image.vercel.app', 'media3.giphy.com', 'media0.giphy.com']
//   },
//   pwa: {
//     // buildExcludes: [/middleware-manifest.json$/],
//     dest: 'public',
//     disable: isDev
//   }
// })

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['ik.imagekit.io', 'og-image.vercel.app', 'media3.giphy.com', 'media0.giphy.com']
  },
  compiler: {
    removeConsole: true
  },
  swcMinify: true
}

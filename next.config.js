/* eslint-disable @typescript-eslint/no-var-requires */

const runtimeCaching = require('next-pwa/cache')
const isDev = process.env.NODE_ENV === 'development'

const withPWA = require('next-pwa')({
  dest: 'public',
  skipWaiting: true, // installs new SW when available without a prompt, we only need to send a reload request to user.
  register: true,
  disable: isDev,
  runtimeCaching,
  buildExcludes: [
    /chunks\/images\/.*$/, // Don't precache files under .next/static/chunks/images this improves next-optimized-images behaviour
    /chunks\/pages\/api\/.*/ // Dont cache the API it needs fresh serverinfo
  ]
  // exclude: [
  //   /middleware-manifest\.json$/, // exclude middleware to fix error @see https://github.com/shadowwalker/next-pwa/issues/288#issuecomment-955777098,
  //   /build-manifest\.json$/,
  //   /\.map$/, // dont cache map files
  //   /^.*ts.*$/ // Dont let serviceworker touch the TS streams
  // ],
})

/** @type {import('next').NextConfig} */
const config = {
  images: { domains: ['ik.imagekit.io', 'og-image.vercel.app', 'media3.giphy.com', 'media0.giphy.com', 'github.com'] },
  compiler: { removeConsole: !isDev },
  swcMinify: true,
  compress: true
}

module.exports = withPWA(config)

// module.exports = config

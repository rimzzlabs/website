/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io', 'github.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig

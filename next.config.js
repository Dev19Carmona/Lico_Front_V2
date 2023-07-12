/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "static.vecteezy.com", "previews.123rf.com"],
  },
}

module.exports = nextConfig

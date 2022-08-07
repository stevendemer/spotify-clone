/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;

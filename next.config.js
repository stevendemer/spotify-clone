/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SPOTIFY_CLIENT_ID: "15eae2b342e04dc39c09f96b6ca4fc75",
    SPOTIFY_CLIENT_SECRET: "23521db133b1433cb6949cb008cbda6c",
    SECRET_KEY: "Helloworld12345",
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;

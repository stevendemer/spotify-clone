/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SPOTIFY_CLIENT_ID: "15eae2b342e04dc39c09f96b6ca4fc75",
    SPOTIFY_CLIENT_SECRET: "23521db133b1433cb6949cb008cbda6c",
    SECRET_KEY: "Helloworld12345",
    SPOTIFY_AUTH_TOKEN:
      "BQB9dY90-RqVx5p4j9WhEApZbcWkzlzHH8uXYb1kqbvKGNe4E1Kz0UXCKo7xwU5ZNXIaxIexyI2S_a4qCVFvM7eBOtnVPorJdITa_Vt8EUc7FtR9ksEwMLUXZk5_li4h12h_VIkuUyCpu8CFpWZqZ3YAzk89nWJL1i9BVA1kFQxCUXA",
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;

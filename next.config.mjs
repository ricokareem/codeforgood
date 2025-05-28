/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "es"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;

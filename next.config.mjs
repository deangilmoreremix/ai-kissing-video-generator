/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify handles SSR/SSG via its Next.js plugin
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
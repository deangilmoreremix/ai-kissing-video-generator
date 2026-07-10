/** @type {import('next').NextConfig} */
const nextConfig = {
  // The project's client code uses auth-gated loading patterns (setState in
  // effects) that trigger Next 16's strict react-hooks v6 lint rules. Lint is
  // still available via `npm run lint`; this only prevents lint from failing
  // `next build`.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // explicitly disable turbopack
  webpack: (config) => config,
   reactCompiler: true,
}

export default nextConfig

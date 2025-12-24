/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, 
  webpack: (config) => config,
   reactCompiler: true,
}

export default nextConfig

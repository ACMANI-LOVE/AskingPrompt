/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  distDir: "out",
  output: "export",
  trailingSlash: true,
};

export default nextConfig;

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : process.env.NEXT_LOCAL_BASE_PATH;
/** @type {import('next').NextConfig} */
const nextConfig = (isProd) ? {
  basePath: basePath,
  assetPrefix: `${basePath}/`,
  distDir: "out",
  output: "export",
  trailingSlash: true,
} : {
  distDir: "out",
  output: "export",
  trailingSlash: true,
};

export default nextConfig;

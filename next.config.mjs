/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  //   basePath: "/next-food",
  //   output: "export",
  //   reactStrictMode: true,
};

export default nextConfig;

import type { NextConfig } from "next";

// Для GitHub Pages сайт живе за адресою https://<user>.github.io/viktorina/,
// тому під час збірки у CI задається NEXT_PUBLIC_BASE_PATH=/viktorina.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

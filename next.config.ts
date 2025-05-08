import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pagesにデプロイする場合のみbasePath設定を適用
  basePath: process.env.NODE_ENV === "production" ? "/unix-time-converter" : "",
  trailingSlash: true,
};

export default nextConfig;

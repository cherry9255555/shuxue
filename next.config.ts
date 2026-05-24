import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Klee One 等 next/font 字体若拉取超时会失败；这里维持默认。
  // 部署 Vercel 时无需特殊配置。
};

export default nextConfig;

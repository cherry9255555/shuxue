import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cinzel_Decorative, Klee_One } from "next/font/google";
import SakuraParticles from "@/components/theme/SakuraParticles";
import Sparkles from "@/components/theme/Sparkles";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const klee = Klee_One({
  variable: "--font-klee",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "樱花魔法院 · 数学学习",
  description: "为初中魔法考生准备的数学修行场。一次函数、二次函数、勾股定理……每个章节都是一个结界。",
};

export const viewport: Viewport = {
  themeColor: "#fdf6f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${cormorant.variable} ${cinzel.variable} ${klee.variable}`}
    >
      <head>
        {/* LXGW WenKai 霞鹜文楷 webfont（中文手账体）从 jsDelivr CDN */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        />
      </head>
      <body className="min-h-screen">
        <SakuraParticles />
        <Sparkles />
        {children}
      </body>
    </html>
  );
}

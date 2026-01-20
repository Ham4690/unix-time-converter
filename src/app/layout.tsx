import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unix時間変換ツール (Unix Time Converter) - リアルタイム確認・ミリ秒・JST対応",
  description:
    "Unix時間(エポック秒)と日時を相互に変換できる無料ツール。ミリ秒(ms)対応、JST/UTC切り替え可能。プログラミング言語別の取得方法も掲載。",
  openGraph: {
    title: "Unix時間変換ツール (Unix Time Converter)",
    description:
      "Unix時間(エポック秒)と日時を相互に変換できる無料ツール。ミリ秒(ms)対応、JST/UTC切り替え可能。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Unix時間変換ツール",
    description:
      "Unix時間と日付を相互に変換するWebアプリケーション。JST/UTC対応、ミリ秒対応。",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
  };

  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from './context/UserContext';
import { M_PLUS_1 } from 'next/font/google'

const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "1つのAPIで紡ぐマイクロストーリー",
  description: "microCMSとNext.jsから生まれたエンジニアとデザイナーのマイクロなAPIストーリー！？",
  openGraph: {
    title: "1つのAPIで紡ぐマイクロストーリー",
    description: "microCMSとNext.jsから生まれたエンジニアとデザイナーのマイクロなAPIストーリー！？",
    images: [
      {
        url: "https://microcms-nextjs-love-simulation.vercel.app/og_image.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "シンダンシノミカタ | 中小企業診断士向けWeb制作サービス",
    description: "中小企業診断士の方のホームページ制作や改善、定期更新サポートを行うWeb制作サービスです。",
    images: ["https://microcms-nextjs-love-simulation.vercel.app/og_image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={mPlus1.className}>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

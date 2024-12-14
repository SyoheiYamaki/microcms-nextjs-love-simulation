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
  title: "シミュレーションゲーム",
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

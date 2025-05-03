import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "@fontsource/rubik";
import "@fontsource/tajawal";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "علـى ويــن؟ | اكتشف الفعاليات وأماكن الترفيه القريبة منك",
  description: "دليلك ومرجعك لمدن المملكة العربية السعودية. نستكشف ونقيم أفضل التجارب في الفعاليات.",
  openGraph: {
    title: "علـى ويــن؟ | اكتشف الفعاليات وأماكن الترفيه القريبة منك",
    description: "دليلك ومرجعك لمدن المملكة العربية السعودية. نستكشف ونقيم أفضل التجارب في الفعاليات.",
    images: [
      {
        url: "https://placehold.co/1200x630",
        width: 1200,
        height: 630,
        alt: "علـى ويــن؟",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-tajawal antialiased bg-background`}>
        {children}
      </body>
    </html>
  );
}

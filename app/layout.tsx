import type { Metadata } from "next";
import { Manrope, Noto_Sans_Thai, Playfair_Display } from "next/font/google";
import { ScrollReset } from "../components/scroll-reset";
import { WishlistProvider } from "../components/wishlist";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "KORN & COINS | ทองคำ เหรียญ พระเครื่อง และเครื่องประดับ",
  description: "ร้าน KORN & COINS รับซื้อ ขาย ประเมิน และตรวจสอบทองคำ เหรียญ ธนบัตร พระเครื่อง และเครื่องประดับ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="dark" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${playfair.variable} ${notoSansThai.variable}`}>
        <ScrollReset />
        <WishlistProvider>{children}</WishlistProvider>
      </body>
    </html>
  );
}

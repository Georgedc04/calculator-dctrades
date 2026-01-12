import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ Viewport (Next.js 16 compliant) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B0F14",
};

export const metadata: Metadata = {
  /* ✅ Optimized Title (58 chars – ideal) */
  title: {
    default: "DC Trades Forex Calculator – Pip, Lot Size & Risk Tool",
    template: "%s | DC Trades Calculator",
  },

  /* ✅ Optimized Description (148 chars – ideal) */
  description:
    "Free professional forex calculator to instantly calculate pip value, lot size, and risk per trade. Built for serious traders using DC Trades.",

  applicationName: "DC Trades Calculator",

  /* ✅ PWA */
  manifest: "/site.webmanifest",

  /* ✅ SEO */
  keywords: [
    "forex calculator",
    "pip calculator",
    "risk calculator",
    "lot size calculator",
    "forex risk management",
    "DC Trades",
    "trading calculator",
  ],
  authors: [{ name: "DC Trades" }],
  creator: "DC Trades",
  publisher: "DC Trades",

  /* ✅ Open Graph (WhatsApp / Messenger / Facebook / LinkedIn) */
  openGraph: {
    title: "DC Trades Forex Calculator – Pip, Lot Size & Risk Tool",
    description:
      "Instantly calculate forex pip value, lot size, and trading risk with DC Trades professional calculator. Free, accurate & fast.",
    url: "https://calculator.dctrades.in",
    siteName: "DC Trades Calculator",
    images: [
      {
        url: "https://calculator.dctrades.in/opengraph-cal-image11.jpg",
        width: 1200,
        height: 630,
        alt: "DC Trades Forex Calculator – Pip, Lot Size & Risk Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  /* ✅ Twitter / X */
  twitter: {
    card: "summary_large_image",
    title: "DC Trades Forex Calculator – Pip, Lot Size & Risk Tool",
    description:
      "Calculate forex pip value, lot size, and risk per trade instantly with DC Trades professional calculator.",
    images: ["https://calculator.dctrades.in/opengraph-cal-image11.jpg"],
  },

  /* ✅ Favicons */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  /* ✅ Robots */
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0F14] text-white`}
      >
        {children}
      </body>
    </html>
  );
}

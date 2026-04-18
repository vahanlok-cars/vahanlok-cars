import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vahanlok-cars.vercel.app/";
const siteTitle = "Vahanlok";
const siteDescription =
  "Find your perfect car at Vahanlok. Browse new and pre-owned cars in Mumbai. Get the best deal directly via WhatsApp.";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vahanlok — New & Pre-Owned Cars in Mumbai",
    template: "%s | Vahanlok",
  },
  description: siteDescription,
  applicationName: siteTitle,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteTitle }],
  creator: siteTitle,
  publisher: siteTitle,
  category: "Automotive",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  keywords: [
    "car dealership",
    "Mumbai cars",
    "new cars",
    "pre-owned cars",
    "Vahanlok",
    "best car deals",
    "WhatsApp car sales",
    "car buying in Mumbai",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Vahanlok — New & Pre-Owned Cars in Mumbai",
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Vahanlok - New & Pre-Owned Cars in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vahanlok — New & Pre-Owned Cars in Mumbai",
    description: siteDescription,
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-white text-[#1A1A1A] font-sans`}
      >
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

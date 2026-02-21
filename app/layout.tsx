import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AB Cars — New & Pre-Owned Cars in Mumbai",
  description:
    "Find your perfect car at AB Cars. Browse new and pre-owned cars in Mumbai. Get the best deal directly via WhatsApp.",
  keywords: ["car dealership", "Mumbai cars", "new cars", "pre-owned cars", "AB Cars"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white text-[#1A1A1A] font-sans`}>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

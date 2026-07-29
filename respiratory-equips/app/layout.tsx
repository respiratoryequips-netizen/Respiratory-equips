import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Respiratory Equips | CPAP, BiPAP & Oxygen Concentrators in Pakistan",
  description:
    "Pakistan's trusted supplier of genuine CPAP, BiPAP, Oxygen Concentrators and respiratory care accessories. Nationwide delivery, 24/7 support, authorized dealer.",
  keywords: ["CPAP Pakistan", "BiPAP machine Pakistan", "Oxygen Concentrator Lahore", "Respiratory Equips"],
  openGraph: {
    title: "Respiratory Equips | CPAP, BiPAP & Oxygen Concentrators in Pakistan",
    description: "Pakistan's trusted supplier of genuine CPAP, BiPAP, Oxygen Concentrators and respiratory care accessories.",
    siteName: "Respiratory Equips",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Respiratory Equips | CPAP, BiPAP & Oxygen Concentrators in Pakistan",
    description: "Pakistan's trusted supplier of genuine CPAP, BiPAP, Oxygen Concentrators and respiratory care accessories.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <OrganizationJsonLd />
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
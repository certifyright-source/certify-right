import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Certify Right | NSW Approvals, Certification & Compliance",
    template: "%s | Certify Right",
  },
  description:
    "More than a certifier — your approval and compliance partner across NSW. Certify Right is operated by Fadi Habbouche, Registered Building Surveyor Class A3 (BDC2868). Planning advice, approval package reviews, CDC, Construction and Occupation Certificates, BCA/NCC compliance and fire safety.",
  keywords: [
    "NSW building certification",
    "NSW building approvals",
    "NSW Planning Portal",
    "approval package review",
    "Annual Fire Safety Statement",
    "Complying Development Certificate",
    "CDC Sydney",
    "Construction Certificate",
    "Occupation Certificate",
    "Principal Certifier",
    "registered building surveyor",
    "BCA compliance",
    "building inspections Sydney",
    "fire safety certificate NSW",
    "Fadi Habbouche",
    "Certify Right",
    "building certifier Merrylands",
    "building certifier Greater Sydney",
  ],
  authors: [{ name: "Certify Right" }],
  metadataBase: new URL("https://certifyright.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://certifyright.com.au",
    siteName: "Certify Right",
    title: "Certify Right | NSW Approvals, Certification & Compliance",
    description:
      "More than a certifier — your approval and compliance partner. Planning, certification, fire safety and compliance across NSW, from early advice through to final occupation. Fadi Habbouche — Registered Building Surveyor Class A3, BDC2868.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Certify Right — NSW Approvals, Certification & Compliance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certify Right | NSW Approvals, Certification & Compliance",
    description:
      "More than a certifier — your approval and compliance partner. Planning, certification, fire safety and compliance across NSW.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

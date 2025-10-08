import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import QueryProvider from '@/components/providers/QueryProvider';
import LayoutClient from '@/components/layout/LayoutClient';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChinaWholesale.com.bd - Wholesale Products",
  description: "Professional wholesale e-commerce platform for fashion accessories, children's products, and more. Serving Bangladesh with quality products from China.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </QueryProvider>
      </body>
    </html>
  );
}

'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/myComponents/Header";
import Footer from "@/myComponents/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Check if the current route starts with '/admin'
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminRoute && <Header />}
        {children}
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}

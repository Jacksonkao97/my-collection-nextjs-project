import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from './components/NavBar';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Collection Netxjs Project",
  description: "First Next.js app for my collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="flex flex-col p-2 gap-2">
        <header><NavBar /></header>
        <main>{children}</main>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}

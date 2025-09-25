import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/page-component/NavBar";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next.js Todo App Project",
  description: "A simple todo app built with Next.js and TypeScript",
  //keywords: "Next.js, TypeScript, TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-gray-100 min-h-screen`}
      >
        <NavBar />
        <main className="max-w-3l mx-auto py-10 ">{children}</main>
      </body>
    </html>
  );
}

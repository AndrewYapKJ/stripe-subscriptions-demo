import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "CodeCraft - Premium Mobile App Source Code",
  description: "Access high-quality, production-ready mobile app source code. Get complete React Native, Flutter, and native iOS/Android projects with documentation and commercial license.",
  keywords: ["mobile app source code", "react native", "flutter", "ios", "android", "app templates"],
  authors: [{ name: "CodeCraft" }],
  creator: "CodeCraft",
  publisher: "CodeCraft",
  openGraph: {
    title: "CodeCraft - Premium Mobile App Source Code",
    description: "Access high-quality, production-ready mobile app source code. Get complete React Native, Flutter, and native iOS/Android projects.",
    url: "https://codecraft.dev",
    siteName: "CodeCraft",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeCraft - Premium Mobile App Source Code",
    description: "Access high-quality, production-ready mobile app source code. Get complete React Native, Flutter, and native iOS/Android projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}

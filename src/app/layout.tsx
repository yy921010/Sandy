import type { Metadata } from "next";
import { Geist, Geist_Mono, Plaster } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/providers";
import { SITE } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plaster = Plaster({
  variable: "--font-plaster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name}`,
    default: `${SITE.name} - ${SITE.description}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/svg/Astro.svg" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plaster.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Pacifico, Agdasima, Monoton, Fira_Code } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/providers";
import { SITE } from "@/config";
import { cn } from "@/lib/utils";

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const agdasima = Agdasima({
  variable: "--font-agdasima",
  subsets: ["latin"],
  weight: "400",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
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
        className={cn(
          "antialiased",
          agdasima.variable,
          pacifico.variable,
          monoton.variable,
          firaCode.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

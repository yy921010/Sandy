"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 使用 dynamic 导入，禁用 SSR
const RiverBackground = dynamic(() => import("./river-background"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <RiverBackground />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

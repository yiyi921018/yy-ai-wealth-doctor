import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "Y&Y AI Wealth Doctor",
  description: "AI 資產配置與財務健康診斷平台。",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Y&Y Wealth",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/apple-touch-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5b942",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}

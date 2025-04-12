import type { Metadata } from "next";
import { CookieProvider } from "@/context/cookie-context";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl(process.env.NODE_ENV)),
  title: "Next + R3F + Motion",
  description: "React 19, Next 15, R3F 9, Motion 12, Tailwind 4",
  appleWebApp: {
    startupImage: "/apple-icon.png",
    statusBarStyle: "black-translucent",
    title: "Next + R3F + Motion"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`font-basis-grotesque-pro antialiased`}>
        <CookieProvider>{children}</CookieProvider>
      </body>
    </html>
  );
}

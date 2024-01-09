import type { Metadata } from "next";
import { Inter, Tomorrow } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/app/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const tomorrow = Tomorrow({
  subsets: ["latin-ext"],
  variable: "--font-heading",
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.forkit.community"),
  title: "Fork it! Community",
  description:
    "Fork it! Community’s mission is to share computer science knowledge through worldwide events.",
  openGraph: {
    url: "https://www.forkit.community",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(tomorrow.variable, inter.variable)}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="theme-color" content="#171717" />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}

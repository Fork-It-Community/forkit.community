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
  title: "Fork it! Community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(tomorrow.variable, inter.variable)}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}

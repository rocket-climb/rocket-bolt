import "./globals.css";
import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: ["400", "600"],
  style: ["normal"],
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${quicksand.variable} bg-white has-[.theme-selector.dark]:bg-slate-900 has-[.theme-selector.dark]:dark-scrollbar`}
      >
        {children}
      </body>
    </html>
  );
}

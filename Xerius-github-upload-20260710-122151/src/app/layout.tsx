import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Geist, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-heading" });
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hero-heading",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-data",
});

export const metadata: Metadata = {
  title: "Xerius | CS2 Analytics",
  description:
    "Plateforme CS2 pour centraliser pronostics, analyses, matchs live, portefeuille et signaux utiles.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geist.variable} ${barlowCondensed.variable} ${inter.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

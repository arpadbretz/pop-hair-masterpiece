import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Cormorant Garamond — closest free alternative to Kevin Murphy's
// Ivar Display headline serif. Light weights for the editorial feel.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pop Hair Salon | Prémium Fodrászat Buda",
    template: "%s | Pop Hair Salon",
  },
  description:
    "Pop Hair Salon — Prémium fodrászat és stílusépítés Budán. Személyre szabott figyelem, mesterfodrászok és minőségi Kevin Murphy termékek.",
  metadataBase: new URL("https://pop-hair-pied.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black bg-grain">
        {children}
      </body>
    </html>
  );
}

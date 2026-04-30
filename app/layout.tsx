import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "June de Belle — Pre-Order Collection",
  description:
    "Elevate your school days with our exclusive pre-order collection. Ergonomic, aesthetic bags and organizers designed for the modern student.",
  keywords: [
    "totebag sekolah",
    "pencil case aesthetic",
    "inner bag organizer",
    "kawaii school bag",
    "pre-order tas",
    "june de belle",
  ],
  openGraph: {
    title: "June de Belle — Pre-Order Collection",
    description:
      "Your everyday school essentials, beautifully designed. Limited pre-order now open.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

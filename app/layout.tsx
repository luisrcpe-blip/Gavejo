import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Gavejo Demo V3",
  description: "Demo corporativa de Gavejo Maderas y Tableros"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}

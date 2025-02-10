import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS AVA",
  description: "CS AVA - estilo GC!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'Arial, sans-serif' }} className="antialiased">
        {children}
      </body>
    </html>
  );
}

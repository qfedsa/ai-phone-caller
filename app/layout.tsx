import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KI-Telefon-Assistentin Demo",
  description: "Erleben Sie die Zukunft der Kundenqualifizierung mit unserer KI-Telefon-Assistentin",
  keywords: "KI, Künstliche Intelligenz, Telefon-Assistent, Immobilien, Lead-Qualifizierung",
  authors: [{ name: "Your Company" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#14b8a6" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

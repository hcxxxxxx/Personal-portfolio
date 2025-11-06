import type { Metadata } from "next";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "Chengxun Hong - Personal Portfolio",
  description: "Chengxun Hong's personal portfolio",
  keywords: ["portfolio", "software engineer", "AI", "Next.js", "React"],
  authors: [{ name: "Chengxun Hong" }],
  openGraph: {
    title: "Chengxun Hong - Personal Portfolio",
    description: "Chengxun Hong's personal portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <LanguageProvider>
          <ParticlesBackground />
          <LanguageToggle />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import AmbientGlow from "@/components/ui/AmbientGlow";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarıhan Gusto | Premium Restoran Deneyimi",
  description: "Nisbetiye Caddesi'nde Anadolu Sıcaklığı konseptiyle geleneksel lezzetleri modern dokunuşlarla sunan ödüllü premium restoran.",
  metadataBase: new URL("https://sarihan-gusto.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sarıhan Gusto | Premium Restoran Deneyimi",
    description: "Nisbetiye Caddesi'nde Anadolu Sıcaklığı konseptiyle geleneksel lezzetleri modern dokunuşlarla sunan ödüllü premium restoran.",
    url: "https://sarihan-gusto.com",
    siteName: "Sarıhan Gusto",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* FOUC (Tema Kayması) Engelleme Scripti */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col background text-foreground relative">
        <AmbientGlow />
        {children}
      </body>
    </html>
  );
}

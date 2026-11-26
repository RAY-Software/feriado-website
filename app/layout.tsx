import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import { ChatWidget } from "@/components/ChatWidget";
import { UserWayWidget } from "@/components/UserWayWidget";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Feriado Cantina | Cantina de Barrio en Coghlan, Buenos Aires",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: "/image/feriado/favicon.png",
    shortcut: "/image/feriado/favicon.png",
    apple: "/image/feriado/favicon.png",
  },
  description:
    "Feriado Cantina — La casa de Feriado Vermú en Coghlan. Comida casera argentina, vermú, tortilla babé, pastas, milanesas y largas sobremesas. Reservá tu mesa.",
  keywords: ["Feriado Cantina", "cantina Buenos Aires", "vermú", "Coghlan", "comida casera", "bodegón", "Feriado Vermú"],
  openGraph: {
    title: "Feriado Cantina | Cantina de Barrio en Coghlan, Buenos Aires",
    description: "La casa de Feriado Vermú. Comida casera, vermú de barrio y largas sobremesas en Coghlan.",
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Feriado Cantina",
    locale: "es_AR",
    images: [
      {
        url: `${siteUrl}/image/feriado/logo-cantina.png`,
        width: 1200,
        height: 630,
        alt: "Feriado Cantina — Cantina de barrio en Coghlan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feriado Cantina | Cantina de Barrio en Coghlan",
    description: "La casa de Feriado Vermú. Comida casera, vermú y largas sobremesas en Coghlan, Buenos Aires.",
    images: [`${siteUrl}/image/feriado/logo-cantina.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="es" className={ibmPlexSans.variable}>
      <head>
        <Script id="suppress-non-error-rejections" strategy="beforeInteractive">
          {`(function(){function r(e){if(e.reason!=null&&!(e.reason instanceof Error)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}}window.addEventListener("unhandledrejection",r,true);})();`}
        </Script>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.facebook.com" crossOrigin="anonymous" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </head>
      <body className={ibmPlexSans.className}>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1 pt-[4.6rem]">{children}</main>
          <Footer />
          <Toaster />
        </div>
        <ChatWidget />
        <UserWayWidget />
      </body>
    </html>
  );
}

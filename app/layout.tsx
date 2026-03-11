import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import { ChatWidget } from "@/components/ChatWidget";
import { UserWayWidget } from "@/components/UserWayWidget";

/* Tipografía feriado: IBM Plex Sans para todo (body y headlines) */
const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Feriado Cantina | La casa de Feriado Vermú en Buenos Aires",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: "/image/f-favicon.png",
    shortcut: "/image/f-favicon.png",
    apple: "/image/f-favicon.png",
  },
  description:
    "Feriado Cantina — Ricos tragos, tortilla babé y largas sobremesas. Cantina de barrio en Coghlan, Buenos Aires. Reservá tu mesa.",
  keywords: ["Feriado Cantina", "Feriado Vermú", "cantina Buenos Aires", "bar Coghlan", "vermú", "coctelería", "reservas"],
  openGraph: {
    title: "Feriado Cantina | La casa de Feriado Vermú en Buenos Aires",
    description: "Ricos tragos, tortilla babé y largas sobremesas. Cantina de barrio en Coghlan, Buenos Aires.",
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Feriado Cantina",
    locale: "es_AR",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Feriado Cantina — La casa de Feriado Vermú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feriado Cantina | La casa de Feriado Vermú en Buenos Aires",
    description: "Ricos tragos, tortilla babé y largas sobremesas. Reservá tu mesa en Feriado Cantina.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const productPreloads = [
    "/image/AVICMEDIA-82.jpg",
  ];

  return (
    <html lang="es" className={ibmPlexSans.variable}>
      <head>
        <Script id="suppress-non-error-rejections" strategy="beforeInteractive">
          {`(function(){function r(e){if(e.reason!=null&&!(e.reason instanceof Error)){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}}window.addEventListener("unhandledrejection",r,true);})();`}
        </Script>
        {productPreloads.map((href, i) => (
          <link key={`preload-${i}`} rel="preload" as="image" href={href} fetchPriority="high" />
        ))}
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
 
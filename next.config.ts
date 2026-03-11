import type { NextConfig } from "next";

const securityHeaders = [
  // Fuerza HTTPS por 2 años e incluye subdominios
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Evita que navegadores adivinen el MIME type
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Protección contra clickjacking para navegadores que no soportan CSP frame-ancestors
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Controla la información de referrer en requests cross-origin
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Aísla el contexto de navegación; same-origin-allow-popups es necesario para Meta Pixel
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  // Deshabilita APIs que no se usan
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // CSP: restringe orígenes permitidos para scripts, estilos, imágenes y conexiones
  // 'unsafe-inline' en script-src es necesario para Next.js Script inline + JSON-LD + Meta Pixel + GA
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://maps.googleapis.com https://cdn.userway.org",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.userway.org",
      "font-src 'self' https://fonts.gstatic.com https://cdn.userway.org https://*.userway.org",
      "img-src 'self' data: blob: https://www.facebook.com https://www.google-analytics.com https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net https://*.rayapp.io https://maps.googleapis.com https://*.googleapis.com https://cdn.userway.org https://*.userway.org",
      "frame-src 'self' https://cdn.userway.org https://*.userway.org",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    qualities: [75, 80],
    // Desactiva el optimizador solo si se establece explícitamente NEXT_DISABLE_IMAGE_OPT="true"
    unoptimized: process.env.NEXT_DISABLE_IMAGE_OPT === "true",
    // Formatos optimizados (AVIF es más eficiente que WebP)
    formats: ["image/avif", "image/webp"],
    // Tamaños de dispositivo para responsive images (320/420 para grid del menú)
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    // Incluir todos los widths que usa el srcset para que el API de optimización los permita en prod
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 420, 768, 1024, 1200, 1920],
    // Cache TTL para optimización
    minimumCacheTTL: 86400, // 1 día
    // Permitir SVGs de forma segura
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Patrones remotos
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
};

export default nextConfig;

/**
 * URL base del sitio. En preprod definir NEXT_PUBLIC_SITE_URL=https://ohmexico.preprod.rayapp.io
 * para que canonical, Open Graph y robots.txt usen el dominio correcto.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ohmexico.com";

import { notFound } from "next/navigation";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Phone, ArrowRight, Star } from "lucide-react";
import IndividualLocationMap from "@/components/IndividualLocationMap";
import { locations } from "@/lib/location-data";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((loc) => loc.id === slug);

  if (!location) {
    return {
      title: "Ubicación no encontrada | Feriado Cantina",
      description: "La ubicación solicitada no fue encontrada.",
    };
  }

  const title = `${location.name} | Feriado Cantina - ${location.city}`;
  const description = `Visitá ${location.name} en ${location.fullAddress}. Disfrutá comida casera argentina, vermú Feriado y un ambiente de barrio único. Horarios: ${location.hours}. Llamanos al ${location.phone}.`;
  const url = `${siteUrl}/ubicaciones/${location.id}`;
  const imageUrl = `${siteUrl}/image/feriado/logo-cantina.png`;

  return {
    title,
    description,
    keywords: [
      `Feriado Cantina ${location.shortName}`,
      `cantina ${location.city}`,
      `vermú Coghlan`,
      `comida casera Buenos Aires`,
      "bodegón Coghlan",
      "vermú Feriado",
      "cantina de barrio",
      location.fullAddress,
    ],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Feriado Cantina",
      locale: "es_AR",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${location.name} – ${location.fullAddress}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function LocationDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((loc) => loc.id === slug);

  if (!location) {
    notFound();
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/ubicaciones/${location.id}`,
    name: location.name,
    description: `${location.name} - Cantina de barrio en ${location.city}. Comida casera argentina, vermú Feriado, tortilla babé, pastas y largas sobremesas.`,
    url: `${siteUrl}/ubicaciones/${location.id}`,
    logo: `${siteUrl}/image/feriado/favicon.png`,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: location.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    image: `${siteUrl}/image/feriado/logo-cantina.png`,
    hasMap: location.googleMapsUrl,
    priceRange: "$$",
    servesCuisine: ["Argentina", "Cantina", "Bodegón"],
    hasMenu: `${siteUrl}/menu`,
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "ARS",
    smokingAllowed: false,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: location.aggregateRating.ratingValue,
      reviewCount: location.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: location.reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: r.author,
      },
      reviewBody: r.text,
      datePublished: r.date,
    })),
    amenityFeature: location.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: a.value,
    })),
    sameAs: [
      "https://www.instagram.com/feriadocantina/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-background text-foreground">
        <div className="relative h-screen bg-feriado-red">
          <div className="absolute inset-0 flex items-center justify-center">
            <ResponsiveImage
              src="/image/feriado/logo-cantina.png"
              alt={location.name}
              width={600}
              height={400}
              mobileSrc="/image/feriado/logo-cantina.png"
              className="object-contain max-h-[40vh] opacity-20"
              loading="eager"
            />
          </div>
          
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="absolute inset-0 flex items-center justify-center pt-24">
            <div className="text-center max-w-4xl mx-auto px-4 w-full">
              <div className="absolute top-8 left-8">
                <Link 
                  href="/ubicaciones"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Todas las ubicaciones
                </Link>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                {location.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium drop-shadow">
                {location.city}, {location.state}
              </p>
              <p className="text-lg text-white/80 mb-10 drop-shadow">
                {location.fullAddress}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground font-semibold rounded-lg hover:bg-feriado-cream transition-colors shadow-lg"
                >
                  <MapPin className="w-5 h-5 text-feriado-red" />
                  Cómo llegar
                </a>
                
                <Link
                  href="/#reservar-mesa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Reservá tu mesa
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-foreground pb-4 border-b border-feriado-blue/20">
                  Información de contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="bg-feriado-cream p-3 rounded-full flex-shrink-0">
                      <MapPin className="w-6 h-6 text-feriado-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">Dirección</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{location.fullAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="bg-feriado-cream p-3 rounded-full flex-shrink-0">
                      <Clock className="w-6 h-6 text-feriado-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">Horarios</h3>
                      <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">{location.hours}</p>
                    </div>
                  </div>

                  {location.phone && (
                    <div className="flex items-start gap-5">
                      <div className="bg-feriado-cream p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-feriado-red" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">Teléfono</h3>
                          <a 
                            href={`tel:${location.phone}`}
                            className="text-muted-foreground hover:text-primary transition-colors text-base"
                          >
                            {location.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {location.hasDelivery && (
                <div className="bg-feriado-cream border border-feriado-blue/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">🚚 Pedí online</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Pedí desde tu casa y disfrutá el sabor de Feriado Cantina donde estés.
                  </p>
                  <a
                    href="https://pedir.tucan.la/menu/Feriadocoghlan/Sal%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-xl transition-colors shadow-md"
                  >
                    Pedir online
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground pb-4 border-b border-feriado-blue/20">
                Qué vas a encontrar
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <Star className="w-7 h-7 text-feriado-yellow mt-0.5 flex-shrink-0" fill="currentColor" />
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Comida Casera Argentina</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Tortilla babé, milanesa napolitana, pizzas de media masa, pastas caseras y mucho más. Todo hecho como en casa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <Star className="w-7 h-7 text-feriado-yellow mt-0.5 flex-shrink-0" fill="currentColor" />
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Vermú Feriado</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Nuestro vermú artesanal en sus versiones Rosado y Rojo, cócteles de la casa y una carta de bebidas para cada momento.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <Star className="w-7 h-7 text-feriado-yellow mt-0.5 flex-shrink-0" fill="currentColor" />
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Ambiente de Barrio</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Vereda, buena música, amigos y largas sobremesas. Feriado Cantina es esa esquina de barrio que estabas buscando.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-feriado-blue/5 border border-feriado-blue/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-primary mb-3">Explorá nuestro menú</h3>
                <p className="text-foreground/80 mb-5">
                  Descubrí nuestra carta completa de platos, postres y bebidas.
                </p>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/70 font-semibold transition-colors text-lg"
                >
                  Ver menú completo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-feriado-cream border-y border-feriado-blue/10">
          <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
            <div className="mb-10 lg:text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cómo encontrarnos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl lg:mx-auto">
                Descubrí dónde queda Feriado Cantina.
                Acceso directo a indicaciones y mapa detallado.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <IndividualLocationMap 
                  location={{
                    name: location.name,
                    coordinates: location.coordinates
                  }}
                  className="h-[400px] shadow-xl border-none"
                />
              </div>
              
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-feriado-red" />
                    Ubicación exacta
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {location.fullAddress}
                  </p>
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors w-full justify-center shadow-md"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-xl">🚶</span> Barrio Coghlan
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Estamos en el corazón de Coghlan, a pocas cuadras de la estación. Zona tranquila con estacionamiento en la calle.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-xl">🐕</span> Pet Friendly
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Vení con tu mascota. Tenemos vereda y mesas al aire libre para que disfruten juntos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 lg:py-28 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para visitar {location.name}?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Reservá tu mesa hoy y sumergite en la experiencia Feriado. Comida casera, vermú de barrio y las mejores sobremesas. ¡Te esperamos!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link
                href="/#reservar-mesa"
                className="px-10 py-4 bg-white hover:bg-gray-100 text-primary font-bold rounded-xl transition-all hover:scale-105 shadow-xl text-lg w-full sm:w-auto"
              >
                Reservar mesa
              </Link>
              
              <Link
                href="/ubicaciones"
                className="px-10 py-4 border-2 border-white/80 text-white hover:bg-white/10 font-bold rounded-xl transition-colors text-lg w-full sm:w-auto"
              >
                Ver ubicaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

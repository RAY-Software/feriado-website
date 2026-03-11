import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import Link from "next/link";
import { ChevronRight, MapPin, Clock, Phone } from "lucide-react";
import { locations } from "@/lib/location-data";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ubicaciones | Feriado Cantina — Cantina de barrio en Buenos Aires",
  description: "Encontrá Feriado Cantina en Buenos Aires. Vení a disfrutar de ricos tragos, coctelería de autor y la mejor hospitalidad.",
  alternates: { canonical: `${siteUrl}/ubicaciones` },
};

export default function UbicacionesPage() {
  const states = Array.from(new Set(locations.map((loc) => loc.state))).sort();

  return (
    <>
      {/* SEO Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Feriado Cantina - Ubicaciones",
            description: "Encontrá Feriado Cantina en Buenos Aires.",
            url: `${siteUrl}/ubicaciones`,
            numberOfItems: locations.length,
            itemListElement: locations.map((location, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Restaurant",
                "@id": `${siteUrl}/ubicaciones#${location.id}`,
                name: location.name,
                description: `${location.name} - Cantina de barrio en ${location.city}, ${location.state}.`,
                url: `${siteUrl}/ubicaciones#${location.id}`,
                telephone: location.phone,
                hasMap: location.googleMapsUrl,
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
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-white text-foreground pt-24 pb-32 lg:pb-16 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[calc(100vh-8rem)]">
            
            {/* Left Column (Sticky Sidebar) */}
            <div className="lg:col-span-1 lg:sticky lg:top-28 lg:h-fit lg:self-start">
              <div className="py-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Nuestras ubicaciones
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Disfrutá de la experiencia Feriado Cantina en Buenos Aires.
                  Encontrá nuestra cantina y vení a compartir buenos tragos, platitos y sobremesas.
                </p>
                
                {/* Filters */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Filtrar por zona</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-primary text-primary-foreground shadow-md"
                    >
                      Todas ({locations.length})
                    </button>
                    {states.map((state) => (
                      <button
                        key={state}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-white/90 text-foreground border border-gray-200 hover:border-primary/40"
                      >
                        {state} ({locations.filter(l => l.state === state).length})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Scrollable List) */}
            <div className="lg:col-span-2">
              <div className="py-2 pb-16 lg:pb-12">
                <div className="space-y-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto pr-0 lg:pr-4 scrollbar-hide">
                  {locations.map((location) => (
                    <div 
                      key={location.id}
                      id={location.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border border-pale-chestnut/30"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        
                        {/* Location Image */}
                        <div className="md:col-span-1 relative h-48 md:h-auto min-h-[200px] bg-pale-chestnut/10 flex items-center justify-center">
                          {location.image ? (
                            <ResponsiveImage
                              src={location.image}
                              alt={location.name}
                              fill
                              mobileSrc={location.image}
                              className="object-cover"
                            />
                          ) : (
                            <div className="text-center p-4">
                              <MapPin className="w-10 h-10 text-primary/60 mx-auto mb-2" />
                              <p className="text-xs font-medium text-primary/60 uppercase tracking-widest">Feriado Cantina</p>
                            </div>
                          )}
                        </div>

                        {/* Location Info */}
                        <div className="md:col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            {/* Header */}
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-foreground mb-1">{location.name}</h3>
                              <p className="text-muted-foreground text-sm">{location.city}, {location.state}</p>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-6">
                              {/* Address */}
                              <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-foreground font-medium">{location.fullAddress}</p>
                              </div>

                              {/* Hours */}
                              <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-foreground font-medium whitespace-pre-line">{location.hours}</p>
                              </div>

                              {/* Phone */}
                              {location.phone && (
                                <div className="flex items-start gap-3">
                                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <a 
                                    href={`tel:${location.phone}`} 
                                    className="text-sm text-foreground font-medium hover:text-primary transition-colors"
                                  >
                                    {location.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-pale-chestnut/20">
                            <Link
                              href={`/ubicaciones/${location.id}`}
                              className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/5 font-medium rounded-lg transition-colors text-sm bg-white"
                            >
                              Ver más detalles
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                            
                            <a
                              href={location.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-foreground font-medium hover:text-primary transition-colors border border-pale-chestnut/40 rounded-lg text-sm hover:border-primary/40 bg-white"
                            >
                              Cómo llegar
                              <ChevronRight className="w-4 h-4" />
                            </a>
                            
                            <Link
                              href="/#reservar-mesa"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors text-sm"
                            >
                              Reservar
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

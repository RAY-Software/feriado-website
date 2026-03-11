import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import Link from "next/link";
import { ChevronRight, MapPin, Clock, Phone } from "lucide-react";
import { locations } from "@/lib/location-data";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ubicaciones | Feriado Cantina — Cantina de Barrio en Coghlan",
  description: "Encontrá Feriado Cantina en Coghlan, Buenos Aires. Vení a disfrutar comida casera argentina y vermú de barrio.",
  alternates: { canonical: `${siteUrl}/ubicaciones` },
};

export default function UbicacionesPage() {
  return (
    <>
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
                "@id": `${siteUrl}/ubicaciones/${location.id}`,
                name: location.name,
                description: `${location.name} - Cantina de barrio en ${location.city}.`,
                url: `${siteUrl}/ubicaciones/${location.id}`,
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

      <div className="min-h-screen bg-background text-foreground pt-24 pb-32 lg:pb-16 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[calc(100vh-8rem)]">
            
            <div className="lg:col-span-1 lg:sticky lg:top-28 lg:h-fit lg:self-start">
              <div className="py-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Nuestra ubicación
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Encontrá Feriado Cantina en el corazón de Coghlan.
                  Vení a disfrutar comida casera, vermú de barrio y buena compañía.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="py-2 pb-16 lg:pb-12">
                <div className="space-y-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto pr-0 lg:pr-4 scrollbar-hide">
                  {locations.map((location) => (
                    <div 
                      key={location.id}
                      id={location.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border border-feriado-blue/10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        
                        <div className="md:col-span-1 relative h-48 md:h-auto min-h-[200px] bg-feriado-cream flex items-center justify-center">
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
                              <MapPin className="w-10 h-10 text-feriado-red/60 mx-auto mb-2" />
                              <p className="text-xs font-medium text-feriado-red/60 uppercase tracking-widest">Feriado Cantina</p>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2 p-6 flex flex-col justify-between">
                          <div>
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-foreground mb-1">{location.name}</h3>
                              <p className="text-muted-foreground text-sm">{location.city}, {location.state}</p>
                            </div>

                            <div className="space-y-3 mb-6">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-feriado-red mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-foreground font-medium">{location.fullAddress}</p>
                              </div>

                              <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-feriado-red mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-foreground font-medium whitespace-pre-line">{location.hours}</p>
                              </div>

                              {location.phone && (
                                <div className="flex items-start gap-3">
                                  <Phone className="w-4 h-4 text-feriado-red mt-0.5 flex-shrink-0" />
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

                          <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-feriado-blue/10">
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
                              className="inline-flex items-center gap-2 px-4 py-2 text-foreground font-medium hover:text-primary transition-colors border border-feriado-blue/20 rounded-lg text-sm hover:border-primary/40 bg-white"
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

                            {location.hasDelivery && (
                              <a
                                href="https://pedir.tucan.la/menu/Feriadocoghlan/Sal%C3%B3n"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-lg transition-colors text-sm"
                              >
                                Pedir online
                                <ChevronRight className="w-4 h-4" />
                              </a>
                            )}
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

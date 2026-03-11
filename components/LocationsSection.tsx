"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { locations, type Location } from "@/lib/location-data";

declare const google: any;

export function LocationsSection() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const scriptLoadedRef = useRef<boolean>(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const mapStyles: google.maps.MapTypeStyle[] = [
    { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  ];

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;
      try {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: selectedLocation.coordinates.lat,
            lng: selectedLocation.coordinates.lng,
          },
          zoom: 16,
          styles: mapStyles,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        mapInstanceRef.current = map;
        setMapLoaded(true);
        const marker = new google.maps.Marker({
          position: {
            lat: selectedLocation.coordinates.lat,
            lng: selectedLocation.coordinates.lng,
          },
          map,
          title: selectedLocation.name,
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            scale: 1.5,
            fillColor: "#E83324",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            strokeOpacity: 1,
            anchor: new google.maps.Point(12, 22),
          },
          animation: google.maps.Animation.DROP,
        });
        markerRef.current = marker;
        setMapError(null);
      } catch (err) {
        console.error("Map init error", err);
        setMapError("Error inicializando el mapa");
      }
    };

    const MAX_ATTEMPTS = 120;
    const waitForGoogleMaps = (callback: () => void, maxAttempts = MAX_ATTEMPTS) => {
      let attempts = 0;
      const check = () => {
        attempts++;
        if (typeof window !== "undefined" && window.google && google.maps && google.maps.Map) {
          callback();
        } else if (attempts < maxAttempts) {
          setTimeout(check, 100);
        } else {
          setMapError("Timeout esperando Google Maps");
        }
      };
      check();
    };

    if (typeof window !== "undefined" && window.google && google.maps && google.maps.Map) {
      initMap();
      return;
    }

    if (scriptLoadedRef.current) {
      waitForGoogleMaps(initMap);
      return;
    }

    scriptLoadedRef.current = true;
    const apiKey =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      (typeof window !== "undefined" ? (window as any).NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : undefined);
    if (!apiKey) {
      setMapError("⚠️ API Key requerida: define NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local");
      return;
    }
    (window as any).initGoogleMapFeriado = () => waitForGoogleMaps(initMap);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMapFeriado`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError("Error cargando Google Maps API");
      scriptLoadedRef.current = false;
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      const newCenter = {
        lat: selectedLocation.coordinates.lat,
        lng: selectedLocation.coordinates.lng,
      };
      mapInstanceRef.current.setCenter(newCenter);

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      markerRef.current = new google.maps.Marker({
        position: newCenter,
        map: mapInstanceRef.current,
        title: selectedLocation.name,
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          scale: 1.5,
          fillColor: "#E83324",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          strokeOpacity: 1,
          anchor: new google.maps.Point(12, 22),
        },
        animation: google.maps.Animation.DROP,
      });
    }
  }, [selectedLocation]);

  return (
    <section id="locations" className="py-16 lg:py-24 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="mb-2 sm:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                Nuestra ubicación
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-feriado-blue/10">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-0 lg:gap-2 lg:py-2 lg:pr-2">
            <div className="relative h-64 lg:h-[380px] lg:col-span-3 min-h-[250px] bg-gray-100 transition-all duration-500 order-2 lg:order-1 lg:rounded-l-2xl overflow-hidden">
              <div
                ref={mapRef}
                className="absolute inset-0 w-full h-full"
                style={{ minHeight: "250px", backgroundColor: "#f5f5f5" }}
              />

              {(!mapLoaded || mapError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 lg:rounded-l-2xl">
                  <div className="text-center text-muted-foreground p-6 max-w-xs mx-auto">
                    {mapError ? (
                      <>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-feriado-red/20 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-feriado-red"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-feriado-red mb-4 whitespace-pre-line">{mapError}</p>
                        {mapError.includes("API Key") && (
                          <div className="text-xs text-muted-foreground space-y-2 text-left">
                            <p className="font-semibold">Setup steps:</p>
                            <p>
                              1. Go to{" "}
                              <a
                                href="https://console.cloud.google.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                              >
                                Google Cloud Console
                              </a>
                            </p>
                            <p>2. Enable &quot;Maps JavaScript API&quot;</p>
                            <p>3. Create an API key</p>
                            <p>4. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 border-2 border-feriado-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-sm">Cargando mapa...</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col transition-all duration-500 ease-in-out order-1 lg:order-2 lg:col-span-5 lg:rounded-2xl overflow-hidden lg:bg-white">
              <div className="flex items-center justify-between px-6 lg:px-8 pt-4 lg:pt-5 pb-6 lg:pb-8">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-1 text-foreground">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground">
                    {selectedLocation.city}, {selectedLocation.state}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={selectedLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-foreground font-medium hover:text-primary transition-colors border border-feriado-blue/20 rounded-lg hover:border-primary/40"
                  >
                    Cómo llegar
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex-1 px-6 lg:px-8 pt-6 lg:pt-8 pb-4 flex flex-col justify-end">
                <div className="grid grid-cols-1 gap-6 pb-0">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wide">
                      Dirección
                    </p>
                    <p className="text-base text-foreground font-medium leading-relaxed">
                      {selectedLocation.fullAddress}
                    </p>
                  </div>
                  {selectedLocation.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wide">
                        Teléfono
                      </p>
                      <p className="text-base text-foreground">{selectedLocation.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 lg:px-8 pt-3 pb-5 border-t border-feriado-blue/10 bg-feriado-cream/50 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-base text-foreground font-medium whitespace-pre-line">
                    {selectedLocation.hours}
                  </p>
                  <a
                    href="#reservar-mesa"
                    className="inline-flex items-center justify-between pl-3 pr-4 py-2 bg-primary hover:opacity-90 text-primary-foreground rounded-xl transition-colors text-lg font-medium w-fit"
                  >
                    Reservar
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

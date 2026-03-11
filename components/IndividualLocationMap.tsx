"use client";

import { useRef, useEffect, useState } from "react";

declare const google: any;

interface LocationData {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface IndividualLocationMapProps {
  location: LocationData;
  className?: string;
}

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

export default function IndividualLocationMap({ location, className = "" }: IndividualLocationMapProps) {
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const scriptLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;
      try {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
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
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
          },
          map: map,
          title: location.name,
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
      } catch (error) {
        console.error("Error inicializando el mapa:", error);
        setMapError("Error inicializando el mapa.");
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
          setMapError("Timeout esperando a que Google Maps se inicialice completamente");
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

    (window as any).initGoogleMapIndividualFeriado = () => {
      waitForGoogleMaps(initMap);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMapIndividualFeriado`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError("Error cargando Google Maps API.");
      scriptLoadedRef.current = false;
    };
    document.head.appendChild(script);
  }, [location]);

  return (
    <div className={`relative bg-gray-100 rounded-2xl overflow-hidden border border-pale-chestnut/30 ${className}`}>
      <div 
        ref={mapRef}
        className="w-full h-full min-h-[300px]"
        style={{ backgroundColor: "#f5f5f5" }}
      />
      
      {(!mapLoaded || mapError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
          <div className="text-center text-muted-foreground p-6 max-w-xs mx-auto">
            {mapError ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-sm text-primary mb-4 whitespace-pre-line">{mapError}</p>
              </>
            ) : (
              <>
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm">Loading map...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

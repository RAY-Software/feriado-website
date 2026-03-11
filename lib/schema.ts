import { locations } from "./location-data";
import { siteUrl } from "./site";

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Feriado Cantina",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/image/logo-new.png`,
  sameAs: [
    "https://www.instagram.com/feriadocantina/",
  ],
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Feriado Cantina",
  url: `${siteUrl}/`,
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/#reservar-mesa`,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "FoodEstablishmentReservation",
      name: "Table Reservation",
    },
  },
});

export const getRestaurantSchema = (locId?: string) => {
  const selectedLocations = locId 
    ? locations.filter(l => l.id === locId)
    : locations;

  return selectedLocations.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/ubicaciones/${loc.id}`,
    name: loc.name,
    description: "Cantina de barrio en Coghlan, Buenos Aires. Vermú, coctelería, platitos para picar y largas sobremesas. La casa de Feriado Vermú.",
    url: `${siteUrl}/ubicaciones/${loc.id}`,
    logo: `${siteUrl}/image/logo-new.png`,
    telephone: loc.phone,
    image: `${siteUrl}/image/logo-new.png`,
    servesCuisine: ["Argentina", "Cantina", "Coctelería"],
    priceRange: "$$",
    hasMap: loc.googleMapsUrl,
    hasMenu: `${siteUrl}/menu`,
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "ARS",
    smokingAllowed: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zipCode,
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    },
    openingHoursSpecification: loc.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    amenityFeature: loc.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: a.value,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "135",
      bestRating: "5",
      worstRating: "1",
    },
  }));
};

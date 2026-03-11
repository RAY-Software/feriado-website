import { locations } from "./location-data";
import { siteUrl } from "./site";

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OH México",
  url: `${siteUrl}/`,
  logo: `${siteUrl}/image/ohmexico-logo.png`,
  sameAs: [
    "https://www.instagram.com/ohmexico/",
    "https://www.facebook.com/ohmexico/",
  ],
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OH México",
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
    "@id": `${siteUrl}/locations/${loc.id}`,
    name: loc.name,
    description: `Authentic Mexican restaurant in Miami Beach at ${loc.shortName}. Enjoy bold tacos, handcrafted cocktails, and the vibrant spirit of Mexico.`,
    url: `${siteUrl}/locations/${loc.id}`,
    logo: `${siteUrl}/image/ohmexico-logo.png`,
    telephone: loc.phone,
    image: `${siteUrl}/image/ohmexico-logo.png`,
    servesCuisine: ["Mexican", "Latin American"],
    priceRange: "$$",
    hasMap: loc.googleMapsUrl,
    hasMenu: `${siteUrl}/menu`,
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "USD",
    smokingAllowed: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zipCode,
      addressCountry: "US",
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
    // Simplified reviews/rating for the global schema to keep it concise
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "135",
      bestRating: "5",
      worstRating: "1",
    },
  }));
};

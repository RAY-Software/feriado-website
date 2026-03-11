export interface OpeningHoursSpec {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface LocationReview {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface LocationAmenity {
  name: string;
  value: boolean;
}

export interface Location {
  id: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
  phone: string;
  hours: string;
  status: string;
  image: string;
  googleMapsUrl: string;
  hasDelivery: boolean;
  coordinates: { lat: number; lng: number };
  openingHoursSpecification: OpeningHoursSpec[];
  amenities: LocationAmenity[];
  reviews: LocationReview[];
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
  };
}

export const locations: Location[] = [
  {
    id: "feriado-cantina",
    name: "Feriado Cantina",
    shortName: "Feriado Cantina",
    address: "Av. Cabildo 3702",
    city: "Buenos Aires",
    state: "CABA",
    zipCode: "C1429",
    fullAddress: "Av. Cabildo 3702, Coghlan, Buenos Aires, Argentina",
    phone: "+5491150000000",
    hours: "Lun–Mié 10 a.m.–1 a.m. · Jue–Sáb 10 a.m.–2 a.m. · Dom 10 a.m.–1 a.m.",
    status: "Abierto",
    image: "/image/mapa-cantina.jpg",
    googleMapsUrl: "https://www.google.com/maps?ll=-34.557001,-58.480026&z=17&t=m&hl=es&gl=AR&mapclient=embed&cid=9286526469502501557",
    hasDelivery: false,
    coordinates: { lat: -34.557001, lng: -58.480026 },
    openingHoursSpecification: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Sunday"],
        opens: "10:00",
        closes: "01:00",
      },
      {
        dayOfWeek: ["Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "02:00",
      },
    ],
    amenities: [
      { name: "Pet Friendly", value: true },
      { name: "Terraza", value: true },
      { name: "Wi-Fi", value: true },
      { name: "Aire Acondicionado", value: true },
      { name: "Bar Completo", value: true },
      { name: "Accesible", value: true },
    ],
    reviews: [
      {
        author: "Martín L.",
        rating: 5,
        text: "El mejor lugar para tomar un vermú en Coghlan. La tortilla española es espectacular y la atención es de primera. Siempre vuelvo con amigos.",
        date: "2026-01-15",
      },
      {
        author: "Lucía R.",
        rating: 5,
        text: "La coctelería es increíble y los platitos para picar son deliciosos. El ambiente es súper cálido y barrial. 100% recomendado.",
        date: "2026-02-02",
      },
    ],
    aggregateRating: {
      ratingValue: 5.0,
      reviewCount: 2,
    },
  },
];

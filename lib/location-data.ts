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
    address: "Washington 3498",
    city: "Buenos Aires",
    state: "CABA",
    zipCode: "C1430",
    fullAddress: "Washington 3498, Coghlan, C1430 Ciudad Autónoma de Buenos Aires, Argentina",
    phone: "+5411 3921-6518",
    hours: "Lun–Mié–Dom 10:00–00:00 · Jue–Sáb 10:00–01:00",
    status: "Abierto",
    image: "/image/feriado/mapa-cantina.jpg",
    googleMapsUrl: "https://www.google.com/maps?ll=-34.557001,-58.480026&z=17&t=m&hl=es&gl=AR&mapclient=embed&cid=9286526469502501557",
    hasDelivery: true,
    coordinates: { lat: -34.557001, lng: -58.480026 },
    openingHoursSpecification: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Sunday"],
        opens: "10:00",
        closes: "00:00",
      },
      {
        dayOfWeek: ["Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "01:00",
      },
    ],
    amenities: [
      { name: "Pet Friendly", value: true },
      { name: "Terraza al aire libre", value: true },
      { name: "Wi-Fi", value: true },
      { name: "Bar completo", value: true },
      { name: "Acceso para silla de ruedas", value: true },
      { name: "Opciones vegetarianas", value: true },
      { name: "Menú infantil", value: true },
    ],
    reviews: [
      {
        author: "Martín G.",
        rating: 5,
        text: "Un lugar espectacular en Coghlan. La tortilla babé es increíble y el vermú Feriado es lo mejor que probé. Ambiente de barrio perfecto para ir con amigos.",
        date: "2026-01-15",
      },
      {
        author: "Lucía P.",
        rating: 5,
        text: "Me encanta Feriado Cantina, la comida es casera y abundante. Las pastas del jueves son imperdibles. Gran atención y la vereda es ideal para las tardes de sol.",
        date: "2026-01-22",
      },
      {
        author: "Santiago R.",
        rating: 5,
        text: "La mejor cantina de barrio de Buenos Aires. El vermú con soda y las aceitunas son el combo perfecto. Siempre volvemos.",
        date: "2026-02-01",
      },
      {
        author: "Camila D.",
        rating: 5,
        text: "Feriado Cantina tiene esa onda de bodegón porteño que tanto se extrañaba. La milanesa napolitana es un viaje de ida. Recomendadísimo.",
        date: "2026-02-08",
      },
      {
        author: "Federico M.",
        rating: 5,
        text: "Vinimos por el vermú y nos quedamos por todo. Pizzas de media masa espectaculares, postres caseros y una atención de diez. Barrio Coghlan tiene su joya.",
        date: "2026-02-14",
      },
      {
        author: "Valentina S.",
        rating: 5,
        text: "Pet friendly, buena música, comida riquísima y precios justos. ¿Qué más se puede pedir? Feriado Cantina es nuestro lugar favorito del barrio.",
        date: "2026-02-20",
      },
    ],
    aggregateRating: {
      ratingValue: 5.0,
      reviewCount: 6,
    },
  },
];

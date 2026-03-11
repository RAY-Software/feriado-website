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
    id: "ohmexico-espanola-way",
    name: "Oh México Española Way",
    shortName: "Española Way",
    address: "1440 Washington Ave",
    city: "Miami Beach",
    state: "FL",
    zipCode: "33139",
    fullAddress: "1440 Washington Ave, Miami Beach, FL 33139, Estados Unidos",
    phone: "+13055320490",
    hours: "Vie–Sáb 11 a.m.–1 a.m. · Dom 11 a.m.–11 p.m. · Lun–Jue 12–11 p.m.",
    status: "Abierto",
    image: "/image/AVICMEDIA-125.jpg",
    googleMapsUrl: "https://maps.app.goo.gl/mwBBiSn9oXqX47gf6",
    hasDelivery: false,
    coordinates: { lat: 25.7815, lng: -80.13 },
    openingHoursSpecification: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "23:00",
      },
      {
        dayOfWeek: ["Friday", "Saturday"],
        opens: "11:00",
        closes: "01:00",
      },
      {
        dayOfWeek: ["Sunday"],
        opens: "11:00",
        closes: "23:00",
      },
    ],
    amenities: [
      { name: "Pet Friendly", value: true },
      { name: "Outdoor Seating", value: true },
      { name: "Wi-Fi", value: true },
      { name: "Air Conditioning", value: true },
      { name: "Full Bar", value: true },
      { name: "Wheelchair Accessible", value: true },
    ],
    reviews: [
      {
        author: "Diego G.",
        rating: 5,
        text: "Amazing food and atmosphere. The al pastor tacos and micheladas are unbelievable. Every time I come to OH México Española Way I leave happy.",
        date: "2026-01-20",
      },
      {
        author: "Carmen Z.",
        rating: 5,
        text: "The nachos and the guacamole are incredible. The drinks are perfectly made and the music sets just the right mood. Never left disappointed.",
        date: "2026-01-28",
      },
    ],
    aggregateRating: {
      ratingValue: 5.0,
      reviewCount: 2,
    },
  },
  {
    id: "ohmexico-lincoln",
    name: "Oh México Lincoln Road",
    shortName: "Lincoln Road",
    address: "836 Lincoln Rd",
    city: "Miami Beach",
    state: "FL",
    zipCode: "33139",
    fullAddress: "836 Lincoln Rd, Miami Beach, FL 33139, Estados Unidos",
    phone: "+13055357400",
    hours: "Vie–Sáb 12–11 p.m. · Dom–Jue 12–10 p.m.",
    status: "Abierto",
    image: "/image/AVICMEDIA-173-1-2-1-1.jpg",
    googleMapsUrl: "https://maps.app.goo.gl/2Rof8kCvg3K2Y5vK6",
    hasDelivery: false,
    coordinates: { lat: 25.7906, lng: -80.1374 },
    openingHoursSpecification: [
      {
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "22:00",
      },
      {
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "23:00",
      },
    ],
    amenities: [
      { name: "Pet Friendly", value: true },
      { name: "Outdoor Seating", value: true },
      { name: "Wi-Fi", value: true },
      { name: "Air Conditioning", value: true },
      { name: "Full Bar", value: true },
      { name: "Wheelchair Accessible", value: true },
    ],
    reviews: [
      {
        author: "Miguel C.",
        rating: 5,
        text: "Best spot on Lincoln Road for a night out. The quesadillas and cocktails are top-notch. Pet friendly too — huge plus!",
        date: "2026-02-03",
      },
      {
        author: "Santiago M.",
        rating: 5,
        text: "Great food, great service, never misses. The birria tacos and the drink selection are outstanding. Highly recommend.",
        date: "2026-02-08",
      },
    ],
    aggregateRating: {
      ratingValue: 5.0,
      reviewCount: 2,
    },
  },
  {
    id: "ohmexico-ocean",
    name: "Oh México Ocean Drive",
    shortName: "Ocean Drive",
    address: "804 Ocean Dr",
    city: "Miami Beach",
    state: "FL",
    zipCode: "33139",
    fullAddress: "804 Ocean Dr, Miami Beach, FL 33139, Estados Unidos",
    phone: "+17868830709",
    hours: "Vie–Sáb 12 p.m.–12 a.m. · Dom–Jue 12–11 p.m.",
    status: "Abierto",
    image: "/image/AVICMEDIA-90.jpg",
    googleMapsUrl: "https://maps.app.goo.gl/QAB5bYxCojpXTv388",
    hasDelivery: false,
    coordinates: { lat: 25.7759, lng: -80.1306 },
    openingHoursSpecification: [
      {
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "23:00",
      },
      {
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "00:00",
      },
    ],
    amenities: [
      { name: "Pet Friendly", value: true },
      { name: "Outdoor Seating", value: true },
      { name: "Wi-Fi", value: true },
      { name: "Air Conditioning", value: true },
      { name: "Full Bar", value: true },
      { name: "Wheelchair Accessible", value: true },
      { name: "Ocean View", value: true },
    ],
    reviews: [
      {
        author: "Roberto R.",
        rating: 5,
        text: "I come here often and it never disappoints. The micheladas are spectacular and the guacamole is next level. Great vibes all around.",
        date: "2026-02-14",
      },
      {
        author: "Ana L.",
        rating: 5,
        text: "Love this place on Ocean Drive! The food is delicious and the service is always excellent. Happy hour is a must. 100% recommended!",
        date: "2026-02-19",
      },
    ],
    aggregateRating: {
      ratingValue: 5.0,
      reviewCount: 2,
    },
  },
];

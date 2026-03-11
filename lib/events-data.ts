/** Primary location shown on the event page (e.g. for "All locations" we pick one). */
export interface EventLocation {
  name: string;
  city: string;
  state: string;
  address: string;
}

export interface EventItem {
  id: string;
  /** URL slug for /events/[slug] */
  slug: string;
  title: string;
  /** Bold line: days · time · location (shown on card and at top of event page) */
  schedule: string;
  /** Explanatory paragraph (shown below schedule on event page) */
  description: string;
  image: string;
  /** ISO date-time for hero/sidebar/ICS/schema (representative date for recurring events) */
  startDate: string;
  endDate: string;
  location: EventLocation;
  /** Optional price in USD */
  price?: number;
  /** Optional capacity for "Limited capacity: N spots" */
  capacity?: number;
  tags: string[];
  highlights: string[];
}

const EVENT_IDS = ['event01', 'event02', 'event03'] as const;

// Reusable location objects (match lib/location-data)
const LOC = {
  espanolaWay: { name: 'Oh México Española Way', city: 'Miami Beach', state: 'FL', address: '1440 Washington Ave, Miami Beach, FL 33139' },
  lincolnRoad: { name: 'Oh México Lincoln Road', city: 'Miami Beach', state: 'FL', address: '836 Lincoln Rd, Miami Beach, FL 33139' },
  oceanDrive: { name: 'Oh México Ocean Drive', city: 'Miami Beach', state: 'FL', address: '804 Ocean Dr, Miami Beach, FL 33139' },
};

export const events: EventItem[] = [
  {
    id: 'event01',
    slug: 'happy-hour',
    title: 'Happy Hour',
    schedule: 'Mon to Fri · 4pm–7pm · All locations',
    description: 'Join us for discounted drinks and authentic Mexican bites during Happy Hour. The perfect way to unwind after work with friends or colleagues.',
    image: '/image/Copy-of-Cantarito-Spicy-Watermelon-3.jpg',
    startDate: '2026-07-14T16:00:00-04:00',
    endDate: '2026-07-14T19:00:00-04:00',
    location: LOC.espanolaWay,
    tags: ['happy hour', 'drinks', 'bites'],
    highlights: [
      'Discounted handcrafted cocktails and margaritas',
      'Ice-cold beers and micheladas',
      'Tacos and small plates to share',
      'Vibrant Mexican atmosphere',
      'Walk-ins welcome, no reservation required',
    ],
  },
  {
    id: 'event02',
    slug: 'lunch-special',
    title: 'Lunch Special',
    schedule: 'Mon to Fri · 12pm–4pm · All locations',
    description: 'Our Lunch Special brings you great value and authentic Mexican flavors in the middle of the day. Perfect for a quick lunch.',
    image: '/image/Oh-Mexico-13.jpg',
    startDate: '2026-07-14T12:00:00-04:00',
    endDate: '2026-07-14T16:00:00-04:00',
    location: LOC.lincolnRoad,
    tags: ['lunch', 'value', 'mexican'],
    highlights: [
      'Great value lunch combos',
      'Authentic Mexican dishes and tacos',
      'Quick service for the midday rush',
      'Dine-in or takeout',
      'Available at all locations',
    ],
  },
  {
    id: 'event03',
    slug: 'taco-tuesday',
    title: 'Taco Tuesday',
    schedule: 'Tues · 3pm–7pm · All locations',
    description: 'Celebrate Taco Tuesday with us! The best day of the week gets the OH México treatment with special taco offerings.',
    image: '/image/tacos-de-birria.jpg',
    startDate: '2026-07-14T15:00:00-04:00',
    endDate: '2026-07-14T19:00:00-04:00',
    location: LOC.oceanDrive,
    tags: ['taco tuesday', 'tacos', 'specials'],
    highlights: [
      'Special Taco Tuesday menu every Tuesday 3pm–7pm',
      'Authentic bold flavors',
      'Pair with our micheladas or margaritas',
      'Walk-ins welcome; reservations recommended',
    ],
  },
];

export function getEventById(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventIds(): readonly string[] {
  return EVENT_IDS;
}

export function getAllEventSlugs(): string[] {
  return events.map((e) => e.slug);
}

/** Map legacy eventId to slug for redirects */
export function getSlugByEventId(eventId: string): string | undefined {
  return getEventById(eventId)?.slug;
}

export function getRelatedEvents(currentSlug: string, limit: number = 3): EventItem[] {
  const current = getEventBySlug(currentSlug);
  if (!current) return events.slice(0, limit);
  return events.filter((e) => e.slug !== currentSlug).slice(0, limit);
}

export function isValidEventId(id: string): id is (typeof EVENT_IDS)[number] {
  return EVENT_IDS.includes(id as (typeof EVENT_IDS)[number]);
}

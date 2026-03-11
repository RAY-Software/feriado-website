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

const LOC = {
  cantina: { name: 'Feriado Cantina', city: 'Buenos Aires', state: 'CABA', address: 'Av. Cabildo 3702, Coghlan, Buenos Aires' },
};

export const events: EventItem[] = [
  {
    id: 'event01',
    slug: 'happy-hour',
    title: 'Hora Feliz',
    schedule: 'Lun a Vie · 16–19 hs · Feriado Cantina',
    description: 'Vení a disfrutar de tragos y platitos con descuento durante la Hora Feliz. La excusa perfecta para encontrarte con amigos después del laburo.',
    image: '/image/Copy-of-Cantarito-Spicy-Watermelon-3.jpg',
    startDate: '2026-07-14T16:00:00-03:00',
    endDate: '2026-07-14T19:00:00-03:00',
    location: LOC.cantina,
    tags: ['hora feliz', 'tragos', 'platitos'],
    highlights: [
      'Cócteles y tragos de autor con descuento',
      'Vermú tirado y aperitivos clásicos',
      'Platitos para picar y compartir',
      'Ambiente cálido y barrial',
      'Sin reserva, venís cuando querés',
    ],
  },
  {
    id: 'event02',
    slug: 'lunch-special',
    title: 'Menú del Mediodía',
    schedule: 'Lun a Vie · 12–16 hs · Feriado Cantina',
    description: 'Nuestro Menú del Mediodía trae sabores caseros y buen precio al medio del día. Perfecto para un almuerzo rápido y rico.',
    image: '/image/Oh-Mexico-13.jpg',
    startDate: '2026-07-14T12:00:00-03:00',
    endDate: '2026-07-14T16:00:00-03:00',
    location: LOC.cantina,
    tags: ['almuerzo', 'menú', 'mediodía'],
    highlights: [
      'Combos de almuerzo a buen precio',
      'Platos caseros y de estación',
      'Servicio rápido para el mediodía',
      'Para comer en el salón o llevar',
      'Disponible en Feriado Cantina',
    ],
  },
  {
    id: 'event03',
    slug: 'martes-de-vermu',
    title: 'Martes de Vermú',
    schedule: 'Mar · 15–19 hs · Feriado Cantina',
    description: 'Celebrá el Martes de Vermú con nosotros. El mejor día de la semana recibe el tratamiento Feriado con ofertas especiales de vermú y picadas.',
    image: '/image/tacos-de-birria.jpg',
    startDate: '2026-07-14T15:00:00-03:00',
    endDate: '2026-07-14T19:00:00-03:00',
    location: LOC.cantina,
    tags: ['martes de vermú', 'vermú', 'picadas'],
    highlights: [
      'Ofertas especiales de vermú todos los martes de 15 a 19 hs',
      'Sabores auténticos de cantina',
      'Acompañá con nuestras picadas y platitos',
      'Sin reserva; recomendamos venir temprano',
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

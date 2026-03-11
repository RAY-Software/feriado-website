export interface EventLocation {
  name: string;
  city: string;
  state: string;
  address: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  schedule: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  location: EventLocation;
  price?: number;
  capacity?: number;
  tags: string[];
  highlights: string[];
}

const EVENT_IDS = ['event01', 'event02', 'event03'] as const;

const LOC = {
  cantina: { name: 'Feriado Cantina', city: 'Buenos Aires', state: 'CABA', address: 'Washington 3498, Coghlan, C1430 CABA, Argentina' },
};

export const events: EventItem[] = [
  {
    id: 'event01',
    slug: 'happy-hour',
    title: 'Happy Hour',
    schedule: 'Lun a Vie · 17:00–20:00 · Feriado Cantina',
    description: 'Vení a disfrutar del happy hour con tragos con vermú Feriado a precio especial. El mejor plan para arrancar la noche con amigos.',
    image: '/image/feriado/vaso-vermu.png',
    startDate: '2026-07-14T17:00:00-03:00',
    endDate: '2026-07-14T20:00:00-03:00',
    location: LOC.cantina,
    tags: ['happy hour', 'tragos', 'vermú'],
    highlights: [
      'Vermú Feriado con soda a precio especial',
      'Tragos de la casa con descuento',
      'Picadas y platitos para compartir',
      'Ambiente de barrio y buena música',
      'Sin reserva, venís cuando querés',
    ],
  },
  {
    id: 'event02',
    slug: 'jueves-al-dente',
    title: 'Jueves al Dente',
    schedule: 'Jueves · 12:00–00:00 · Feriado Cantina',
    description: 'Todos los jueves nuestras pastas caseras a precio especial. Desde sorrentinos hasta tallarines con estofado. El jueves es de pasta.',
    image: '/image/feriado/aceituna.png',
    startDate: '2026-07-16T12:00:00-03:00',
    endDate: '2026-07-17T00:00:00-03:00',
    location: LOC.cantina,
    tags: ['pastas', 'jueves', 'especial'],
    highlights: [
      'Pastas caseras a precio especial todos los jueves',
      'Sorrentinos, tallarines, ravioles y más',
      'Acompañá con un vermú Feriado',
      'Reservas recomendadas',
    ],
  },
  {
    id: 'event03',
    slug: 'vermú-de-barrio',
    title: 'Vermú de Barrio',
    schedule: 'Sáb y Dom · 12:00–18:00 · Feriado Cantina',
    description: 'Los fines de semana son para el vermú. Vení a disfrutar de la vereda, las aceitunas y las largas sobremesas en Feriado Cantina.',
    image: '/image/feriado/sifon-vaso.png',
    startDate: '2026-07-18T12:00:00-03:00',
    endDate: '2026-07-18T18:00:00-03:00',
    location: LOC.cantina,
    tags: ['vermú', 'fin de semana', 'barrio'],
    highlights: [
      'Vermú Feriado Rosado y Rojo',
      'Picadas con aceitunas, quesos y fiambres',
      'Vereda y mesas al aire libre',
      'Música y buena onda de barrio',
      'Pet friendly — vení con tu mascota',
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

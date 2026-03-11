import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock, CalendarPlus, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

import { getEventBySlug, getAllEventSlugs, getRelatedEvents } from '@/lib/events-data';
import type { EventItem } from '@/lib/events-data';
import { siteUrl } from '@/lib/site';
import { EventCard } from '@/components/events/EventCard';
import { ShareEventButton } from '@/components/events/ShareEventButton';
import { ResponsiveImage } from '@/components/ResponsiveImage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);

  if (!event) {
    return { title: 'Evento no encontrado | Feriado Cantina' };
  }

  const excerpt = event.description.length > 160
    ? event.description.slice(0, 157) + '...'
    : event.description;

  return {
    title: `${event.title} | ${event.location.city} | Feriado Cantina`,
    description: excerpt,
    openGraph: {
      title: `${event.title} | Feriado Cantina`,
      description: excerpt,
      url: `${siteUrl}/events/${event.slug}`,
      images: [
        {
          url: `${siteUrl}${event.image}`,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: `${siteUrl}/events/${event.slug}`,
    },
  };
}

function generateICS(event: EventItem): string {
  const formatDates = (dateString: string) =>
    new Date(dateString).toISOString().replace(/-|:|\.\d+/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Feriado Cantina//Eventos//ES',
    'BEGIN:VEVENT',
    `UID:${event.id}@feriadovermu.com`,
    `DTSTAMP:${formatDates(new Date().toISOString())}`,
    `DTSTART:${formatDates(event.startDate)}`,
    `DTEND:${formatDates(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location.name}, ${event.location.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}

export default async function EventSlugPage({ params }: Props) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(event.slug, 3);
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const formattedDate = format(startDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = `${format(startDate, 'h:mm a')} – ${format(endDate, 'h:mm a')}`;

  const isLiveMusic = event.tags.some((t) => /live|music|band|mariachi/i.test(t));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address.split(',')[0]?.trim() ?? event.location.address,
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: 'US',
      },
    },
    image: event.image.startsWith('/') ? `${siteUrl}${event.image}` : event.image,
    description: event.description,
    url: `${siteUrl}/events/${event.slug}`,
    organizer: {
      '@type': 'Organization',
      name: 'Feriado Cantina',
      url: `${siteUrl}/`,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/#reservar-mesa`,
      availability: 'https://schema.org/InStock',
      ...(event.price != null && { price: event.price, priceCurrency: 'USD' }),
    },
    ...(isLiveMusic && {
      performer: { '@type': 'PerformingGroup', name: 'Feriado Cantina Live' },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Events', item: `${siteUrl}/events/` },
      { '@type': 'ListItem', position: 3, name: event.title, item: `${siteUrl}/events/${event.slug}` },
    ],
  };

  return (
    <>
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] bg-white border-t border-graphite-black/10">
        <a
          href="/#reservar-mesa"
          className="flex w-full items-center justify-center py-3 text-primary-foreground font-bold font-headline uppercase tracking-wide rounded-xl transition-colors shadow-sm bg-primary hover:opacity-90"
        >
          Book now
        </a>
      </div>

      <main className="pb-24 lg:pb-32 bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-graphite-black/10 bg-white pt-2 md:pt-4 lg:pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center text-sm flex-wrap gap-x-1 text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 flex-shrink-0 mx-1" />
              <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
              <ChevronRight className="w-4 h-4 flex-shrink-0 mx-1" />
              <span className="font-bold truncate text-foreground">{event.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] md:h-[60vh] flex items-end">
          <div className="absolute inset-0">
            <ResponsiveImage
              src={event.image}
              alt={event.title}
              fill
              mobileSrc={event.image}
              className="object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-black/90 via-graphite-black/50 to-graphite-black/20" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-16">
            <div className="max-w-3xl">
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold text-white uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md">
                {event.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-white/90 text-lg md:text-xl font-bold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-accent" />
                  <span suppressHydrationWarning>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-accent" />
                  <span>{event.location.name}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Details */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none mb-12 text-foreground/90">
                <p className="text-2xl font-medium mb-8 leading-relaxed text-foreground">
                  {event.description}
                </p>

                {event.highlights.length > 0 && (
                  <>
                    <h3 className="text-4xl font-bold mt-10 mb-6 text-foreground">What to expect</h3>
                    <ul className="space-y-4">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="flex-shrink-0 w-3 h-3 mt-2.5 rounded-full bg-accent" />
                          <span className="text-xl text-foreground/90">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* Location & Hours */}
              <div className="rounded-2xl p-6 md:p-8 border border-graphite-black/10 mt-12 bg-white">
                <h3 className="text-3xl font-bold mb-6 text-graphite-black">Location & Hours</h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 bg-background/50">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-graphite-black">{event.location.name}</h4>
                    <p className="mb-4 text-graphite-black/80 text-lg md:text-xl">{event.location.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:underline inline-flex items-center gap-1 text-primary text-lg"
                    >
                      Get Directions <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sticky Event Details + CTAs */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-28 rounded-2xl shadow-xl border border-graphite-black/10 overflow-hidden p-6 md:p-8 bg-white">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

                <h3 className="text-4xl font-bold mb-8 text-graphite-black">Event Details</h3>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-8 h-8 shrink-0 mt-0.5 text-accent" />
                    <div>
                      <p className="font-bold text-xl text-graphite-black" suppressHydrationWarning>{formattedDate}</p>
                      <p className="text-graphite-black/70 text-lg">Add to your calendar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 shrink-0 mt-0.5 text-accent" />
                    <div>
                      <p className="font-bold text-xl text-graphite-black" suppressHydrationWarning>{formattedTime}</p>
                      <p className="text-graphite-black/70 text-lg">Local time</p>
                    </div>
                  </div>
                  {event.price != null && (
                    <div className="flex flex-col gap-1 pt-6 border-t border-graphite-black/10 mt-2">
                      <p className="text-sm uppercase font-bold tracking-wider text-graphite-black/70">Price</p>
                      <p className="text-5xl font-bold text-primary">${event.price}</p>
                    </div>
                  )}
                  {event.capacity != null && (
                    <div className="flex items-center gap-2 pt-2 text-base font-bold text-primary">
                      <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                      <span>Limited capacity: {event.capacity} spots available</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href="/#reservar-mesa"
                    className="flex items-center justify-center py-4 text-primary-foreground font-bold font-headline text-2xl uppercase tracking-wide rounded-xl transition-all shadow-md bg-primary hover:opacity-90 hover:shadow-lg"
                  >
                    Book now
                  </a>
                  <a
                    href={generateICS(event)}
                    download={`${event.slug}.ics`}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl transition-colors border-2 font-bold bg-white hover:bg-background/50 border-graphite-black/20 text-graphite-black text-xl"
                  >
                    <CalendarPlus className="w-6 h-6 text-accent" />
                    Add to Calendar
                  </a>
                  <ShareEventButton
                    title={event.title}
                    slug={event.slug}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl transition-colors font-bold mt-2 hover:bg-background/50 w-full text-graphite-black text-xl"
                    iconClassName="w-6 h-6 text-accent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 mt-16 border-t border-graphite-black/10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

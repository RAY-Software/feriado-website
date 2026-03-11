import type { Metadata } from 'next';
import { events } from '@/lib/events-data';
import { EventCard } from '@/components/events/EventCard';

export const metadata: Metadata = {
  title: 'Events | OH México',
  description: 'Discover Happy Hour, Live Mariachi, Brunch and more at OH México. Join us for authentic Mexican vibes across our Miami locations.',
};

import { getOrganizationSchema, getRestaurantSchema } from '@/lib/schema';

export default function EventsPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {restaurantSchemas.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <div className="min-h-screen pt-4 pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-foreground">
            Events
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto md:mx-0 text-muted-foreground">
            Join us at OH México for Happy Hour, live mariachi, authentic Mexican brunch, and more — bold flavors and vibrant vibes at every location.
          </p>
        </header>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl border border-graphite-black/20 shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-3 text-graphite-black">No upcoming events</h3>
            <p className="text-graphite-black/80 text-lg">Check back soon for new experiences at OH México.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

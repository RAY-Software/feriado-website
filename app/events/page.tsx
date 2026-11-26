import type { Metadata } from 'next';
import { events } from '@/lib/events-data';
import { EventCard } from '@/components/events/EventCard';

export const metadata: Metadata = {
  title: 'Eventos | Feriado Cantina',
  description: 'Descubrí Happy Hour, música en vivo, brunch y más en Feriado Cantina. Sumate a vivir la experiencia de nuestra cantina de barrio en Buenos Aires.',
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
            Eventos
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto md:mx-0 text-muted-foreground">
            Vení a Feriado Cantina por Happy Hour, música en vivo, brunch y mucho más — sabores auténticos y buena onda en cada rincón.
          </p>
        </header>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl border border-foreground/20 shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-3 text-foreground">No hay eventos próximos</h3>
            <p className="text-foreground/80 text-lg">Volvé pronto para nuevas experiencias en Feriado Cantina.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

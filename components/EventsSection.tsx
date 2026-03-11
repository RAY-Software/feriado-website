'use client';

import Link from 'next/link';
import { memo } from 'react';
import { events } from '@/lib/events-data';
import { EventCard } from '@/components/events/EventCard';

function EventsSectionInner() {
  return (
    <section id="events" className="pt-16 pb-24 relative overflow-hidden scroll-mt-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Eventos
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Vení a Feriado Cantina a disfrutar de la Hora Feliz, vermú, coctelería artesanal y más — sabores auténticos y buena onda todos los días.
            </p>
          </div>

          <div className="mt-8 sm:mt-0 flex-shrink-0">
            <Link
              href="/events"
              className="flex items-center justify-between pl-6 pr-5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold transition-colors duration-300 rounded-xl text-base md:text-lg"
            >
              <span>Ver todos</span>
              <span className="ml-2 text-xl leading-none">›</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}

export const EventsSection = memo(EventsSectionInner);

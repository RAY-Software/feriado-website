import Link from 'next/link';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { ChevronRight } from 'lucide-react';
import type { EventItem } from '@/lib/events-data';

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  const excerpt =
    event.description.length > 120
      ? event.description.slice(0, 117) + '...'
      : event.description;

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-foreground/20 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      <Link
        href={`/events/${event.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${event.title}`}
      />

      <div className="relative aspect-video overflow-hidden">
        <ResponsiveImage
          src={event.image}
          alt={event.title}
          fill
          mobileSrc={event.image}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">
          {event.title}
        </h3>

        <p className="text-sm font-semibold text-foreground/80">
          {event.schedule}
        </p>

        <p className="text-sm leading-relaxed flex-1 text-foreground/80">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-sm font-semibold text-accent group-hover:underline transition-all duration-200">
            Ver evento
            <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
              <ChevronRight className="w-4 h-4 inline" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

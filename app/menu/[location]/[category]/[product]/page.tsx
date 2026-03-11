import { ResponsiveImage } from '@/components/ResponsiveImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import {
  getMenuItemBySlug,
  getRelatedMenuItems,
  getCategoryLabel,
  getMenuItemSlug,
  isValidMenuLocation,
  MENU_LOCATION_LABELS,
  type MenuLocationKey,
  type MenuItem,
} from '@/lib/menu-data';

interface PageProps {
  params: Promise<{ location: string; category: string; product: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { location, category, product } = await params;
  if (!isValidMenuLocation(location)) return { title: 'Carta — Feriado Cantina' };
  const item = getMenuItemBySlug(location, category, product);
  if (!item) return { title: 'Carta — Feriado Cantina' };
  return {
    title: `${item.name} — ${MENU_LOCATION_LABELS[location as MenuLocationKey]} — Feriado Cantina`,
    description:
      item.description ||
      `${item.name} en la carta de Feriado Cantina ${MENU_LOCATION_LABELS[location as MenuLocationKey]}.`,
  };
}

import { getOrganizationSchema, getRestaurantSchema } from '@/lib/schema';

export default async function MenuProductPage({ params }: PageProps) {
  const { location, category, product } = await params;
  if (!isValidMenuLocation(location)) notFound();
  const item = getMenuItemBySlug(location, category, product);
  if (!item) notFound();

  const locationKey = location as MenuLocationKey;
  const locationLabel = MENU_LOCATION_LABELS[locationKey];
  const categoryLabel = getCategoryLabel(locationKey, category);
  const relatedItems = getRelatedMenuItems(locationKey, category, product);

  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema(`feriado-cantina`);

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
      <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:underline text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/menu" className="hover:underline text-foreground">
                Menu
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/menu?location=${location}`}
                className="hover:underline text-foreground"
              >
                {locationLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/menu/${location}/${category}`}
                className="hover:underline text-foreground"
              >
                {categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground" aria-current="page">
              {item.name}
            </li>
          </ol>
        </nav>

        {/* Product detail card */}
        <article
          className="rounded-2xl border border-[#e8e2d8] overflow-hidden shadow-lg bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {item.image && (
              <div className="relative aspect-square md:aspect-auto md:min-h-[400px] bg-[#f4f0eb]">
                <ResponsiveImage
                  src={item.image}
                  alt={item.name}
                  fill
                  mobileSrc={item.image}
                  className="object-cover"
                  loading="eager"
                />
              </div>
            )}

            <div className={`p-6 md:p-8 flex flex-col justify-center ${!item.image ? 'md:col-span-2 text-center items-center max-w-2xl mx-auto' : ''}`}>
              {/* Location badge */}
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                {locationLabel}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {item.name}
              </h1>

              {item.price && (
                <p className="text-2xl font-bold text-primary mb-4">
                  ${item.price}
                </p>
              )}

              {item.description && (() => {
                const [mainDesc, ...priceParts] = item.description.split('\n');
                const priceLine = priceParts.join('\n').trim();
                return (
                  <div className="flex flex-col gap-2 mb-6">
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {mainDesc}
                    </p>
                    {priceLine && (
                      <p className="text-base font-semibold text-primary">
                        {priceLine}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Category tag */}
              <div className="mt-auto pt-4 border-t border-[#f0ebe3]">
                <Link
                  href={`/menu/${location}/${category}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                  {categoryLabel}
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Suggestions / Related items */}
        {relatedItems.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-5 text-foreground">
              More from {categoryLabel}
            </h2>
            <div className="flex flex-col gap-4">
              {relatedItems.map((related: MenuItem) => {
                const relatedSlug = getMenuItemSlug(related.name);
                const relatedHref = `/menu/${location}/${related.categoryId}/${relatedSlug}`;
                return (
                  <Link
                    key={related.name}
                    href={relatedHref}
                    className="flex flex-col sm:flex-row sm:items-stretch gap-3 rounded-xl border border-[#e8e2d8] overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300 bg-white"
                  >
                    {related.image && (
                      <div className="relative w-full sm:w-24 h-28 sm:h-auto sm:min-h-[96px] flex-shrink-0 bg-[#f4f0eb]">
                        <ResponsiveImage
                          src={related.image}
                          alt={related.name}
                          fill
                          mobileSrc={related.image}
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="p-3 flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="font-bold text-foreground line-clamp-1 hover:text-primary transition-colors">
                        {related.name}
                      </h3>
                      {related.price && (
                        <p className="text-sm font-semibold text-primary mt-0.5">
                          ${related.price}
                        </p>
                      )}
                      {related.description && (() => {
                        const [mainDesc, ...priceParts] = related.description.split('\n');
                        const priceLine = priceParts.join('\n').trim();
                        return (
                          <div className="flex flex-col gap-0.5 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {mainDesc}
                            </p>
                            {priceLine && (
                              <p className="text-xs font-semibold text-primary">
                                {priceLine}
                              </p>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Navigation links */}
        <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[#e8e2d8]">
          <Link
            href={`/menu/${location}/${category}`}
            className="inline-flex items-center gap-1 font-medium transition-colors hover:text-primary text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to {categoryLabel}
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 font-medium transition-colors hover:text-primary text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
            Full Menu
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

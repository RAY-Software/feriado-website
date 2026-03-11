import { ResponsiveImage } from '@/components/ResponsiveImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import {
  isValidMenuLocation,
  MENU_LOCATION_LABELS,
  getCategoryByLocationAndId,
  getMenuItemsByLocationAndCategory,
  getMenuItemSlug,
  type MenuLocationKey,
  type MenuItem,
} from '@/lib/menu-data';

interface PageProps {
  params: Promise<{ location: string; category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { location, category } = await params;
  if (!isValidMenuLocation(location)) return { title: 'Menu — OH México' };
  const cat = getCategoryByLocationAndId(location as MenuLocationKey, category);
  if (!cat) return { title: 'Menu — OH México' };
  return {
    title: `${cat.label} — ${MENU_LOCATION_LABELS[location as MenuLocationKey]} Menu — OH México`,
    description:
      cat.description ||
      `Browse our ${cat.label} at OH México ${MENU_LOCATION_LABELS[location as MenuLocationKey]}.`,
  };
}

import { getOrganizationSchema, getRestaurantSchema } from '@/lib/schema';

export default async function MenuCategoryPage({ params }: PageProps) {
  const { location, category } = await params;
  if (!isValidMenuLocation(location)) notFound();
  const locationKey = location as MenuLocationKey;
  const cat = getCategoryByLocationAndId(locationKey, category);
  if (!cat || cat.id === 'all') notFound();
  const items = getMenuItemsByLocationAndCategory(locationKey, category);
  const locationLabel = MENU_LOCATION_LABELS[locationKey];

  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema(`ohmexico-${location}`);

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
            <li className="font-medium text-foreground" aria-current="page">
              {cat.label}
            </li>
          </ol>
        </nav>

        {/* Category image */}
        {cat.image && (
          <div className="relative w-full aspect-[21/9] max-h-60 rounded-2xl overflow-hidden shadow-lg mb-6 bg-[#f4f0eb]">
            <ResponsiveImage
              src={cat.image}
              alt={cat.label}
              fill
              mobileSrc={cat.image}
              className="object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {cat.label}
              </h1>
              <p className="text-sm text-white/80 mt-1">{locationLabel}</p>
            </div>
          </div>
        )}

        {/* Title (when no image) */}
        {!cat.image && (
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="inline-block w-1 h-8 rounded-full bg-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {cat.label}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-4">{locationLabel}</p>
            {cat.description && (
              <p className="text-base text-muted-foreground mt-3 max-w-2xl">
                {cat.description}
              </p>
            )}
          </header>
        )}

        {/* Category description (when image present) */}
        {cat.image && cat.description && (
          <p className="text-base text-muted-foreground mb-6 max-w-2xl">{cat.description}</p>
        )}

        <p className="text-xs font-medium text-muted-foreground mb-6 uppercase tracking-wide">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>

        {/* Product list */}
        <div className="space-y-4">
          {items.map((item: MenuItem) => {
            const productSlug = getMenuItemSlug(item.name);
            const href = `/menu/${location}/${item.categoryId}/${productSlug}`;
            return (
              <Link
                key={item.name}
                href={href}
                className="flex flex-col sm:flex-row sm:items-stretch gap-4 rounded-2xl border border-[#e8e2d8] overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300 bg-white"
              >
                {item.image && (
                  <div className="relative w-full sm:w-44 md:w-52 h-40 sm:h-auto sm:min-h-[160px] flex-shrink-0 bg-[#f4f0eb]">
                    <ResponsiveImage
                      src={item.image}
                      alt={item.name}
                      fill
                      mobileSrc={item.image}
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5 min-w-0">
                  <div className="flex flex-row items-start justify-between gap-4">
                    <h2 className="text-lg font-bold text-foreground hover:text-primary transition-colors flex-1 min-w-0">
                      {item.name}
                    </h2>
                    {item.price && (
                      <p className="font-semibold whitespace-nowrap flex-shrink-0 text-primary">
                        ${item.price}
                      </p>
                    )}
                  </div>
                  {item.description && (() => {
                    const [mainDesc, ...priceParts] = item.description.split('\n');
                    const priceLine = priceParts.join('\n').trim();
                    return (
                      <div className="flex flex-col gap-1">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {mainDesc}
                        </p>
                        {priceLine && (
                          <p className="text-sm font-semibold text-primary mt-1">
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

        {/* Back to full menu */}
        <div className="flex justify-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 font-medium transition-colors hover:text-primary text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to full menu
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

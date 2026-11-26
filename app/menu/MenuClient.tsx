'use client';

import { useState, useMemo, useEffect } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  menuItemsByLocation,
  menuFilterGroupsByLocation,
  getCategoryIdsForFilterGroup,
  MENU_LOCATION_LABELS,
  getMenuItemSlug,
  getCategoryLabel,
  getCategoryByLocationAndId,
  isValidMenuLocation,
  type MenuLocationKey,
  type MenuItem,
} from '@/lib/menu-data';

function locationBtnCls(active: boolean) {
  return `flex-shrink-0 px-5 py-3 rounded-full text-base font-semibold whitespace-nowrap leading-none transition-all duration-300 ${
    active
      ? 'bg-primary text-white shadow-lg'
      : 'bg-feriado-blue text-white hover:bg-feriado-blue/90'
  }`;
}

function categoryBtnCls(active: boolean) {
  return `flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap leading-none transition-all duration-300 ${
    active
      ? 'bg-accent text-white shadow-md'
      : 'bg-feriado-cream text-foreground border border-feriado-blue/10 hover:bg-feriado-cream/80'
  }`;
}

const LOCATION_KEYS: MenuLocationKey[] = ['espanola-way', 'lincoln-road', 'ocean-drive'];

type MenuClientProps = {
  initialLocation?: MenuLocationKey;
  initialCategory?: string;
};

export default function MenuClient({
  initialLocation,
  initialCategory,
}: MenuClientProps = {}) {
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<MenuLocationKey>(
    initialLocation ?? 'espanola-way'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory ?? 'all'
  );

  const filterGroups = menuFilterGroupsByLocation[selectedLocation];
  const allItems = menuItemsByLocation[selectedLocation];

  useEffect(() => {
    if (initialLocation !== undefined && initialCategory !== undefined) return;
    const locationParam = searchParams.get('location');
    const categoryParam = searchParams.get('category');
    if (locationParam && isValidMenuLocation(locationParam)) {
      setSelectedLocation(locationParam);
      const groups = menuFilterGroupsByLocation[locationParam];
      const hasGroup = groups.some((g) => g.id === categoryParam);
      if (categoryParam && hasGroup) {
        setSelectedCategory(categoryParam);
      } else {
        setSelectedCategory('all');
      }
    }
  }, [searchParams, initialLocation, initialCategory]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return allItems;
    const categoryIds = getCategoryIdsForFilterGroup(selectedCategory);
    if (categoryIds.length === 0) return allItems;
    return allItems.filter((item) => categoryIds.includes(item.categoryId));
  }, [allItems, selectedCategory]);

  const sections = useMemo(() => {
    if (selectedCategory === 'all') {
      const categoryIds = filterGroups.flatMap((g) => g.categoryIds);
      const uniqueIds = [...new Set(categoryIds)].filter(Boolean);
      return uniqueIds
        .map((categoryId) => ({
          categoryId,
          items: allItems.filter((item) => item.categoryId === categoryId),
        }))
        .filter((s) => s.items.length > 0);
    }
    const categoryIds = getCategoryIdsForFilterGroup(selectedCategory);
    return categoryIds
      .map((categoryId) => ({
        categoryId,
        items: allItems.filter((item) => item.categoryId === categoryId),
      }))
      .filter((s) => s.items.length > 0);
  }, [selectedCategory, filterGroups, allItems]);

  const handleLocationChange = (key: MenuLocationKey) => {
    setSelectedLocation(key);
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen text-foreground pt-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:underline text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground" aria-current="page">
              Menu
            </li>
          </ol>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-left text-foreground">
            Our Menu
          </h1>
          <p className="text-lg max-w-3xl mb-8 text-left text-muted-foreground">
            Bold tacos, handcrafted cocktails and the vibrant spirit of Mexico.
          </p>

          {/* Location selector */}
          <div
            className="flex flex-wrap justify-start gap-3 mb-5 p-4 rounded-2xl"
            style={{ backgroundColor: '#f4f0eb' }}
          >
            <span className="self-center text-sm font-semibold text-foreground mr-1">
              Location:
            </span>
            {LOCATION_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleLocationChange(key)}
                className={locationBtnCls(selectedLocation === key)}
              >
                {MENU_LOCATION_LABELS[key]}
              </button>
            ))}
          </div>

          {/* Category selector — sub navbar (grouped to reduce options) */}
          {filterGroups.length > 1 && (
            <div className="overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex gap-2 min-w-max">
                {filterGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedCategory(group.id)}
                    className={categoryBtnCls(selectedCategory === group.id)}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu list by category */}
        <div className="space-y-12">
          {sections.map(({ categoryId, items }) => {
            const categoryHref = `/menu/${selectedLocation}/${categoryId}`;
            const categoryLabel = getCategoryLabel(selectedLocation, categoryId);
            const categoryMeta = getCategoryByLocationAndId(selectedLocation, categoryId);
            return (
              <section key={categoryId}>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="min-w-0">
                    <Link
                      href={categoryHref}
                      className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors block text-foreground"
                    >
                      {categoryLabel}
                    </Link>
                    {categoryMeta?.description && (
                      <p className="text-sm mt-1 text-muted-foreground">
                        {categoryMeta.description}
                      </p>
                    )}
                  </div>
                  <Link
                    href={categoryHref}
                    className="text-sm font-medium hover:underline whitespace-nowrap flex-shrink-0 transition-colors text-primary"
                  >
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {items.map((item: MenuItem) => {
                    const productSlug = getMenuItemSlug(item.name);
                    const href = `/menu/${selectedLocation}/${item.categoryId}/${productSlug}`;
                    const hasImage = !!item.image;
                    return (
                      <Link
                        key={`${selectedLocation}-${item.categoryId}-${item.name}`}
                        href={href}
                        className={`flex rounded-2xl border border-[#e8e2d8] overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-300 bg-white ${
                          hasImage
                            ? 'flex-col sm:flex-row sm:items-stretch gap-4'
                            : 'flex-row items-center'
                        }`}
                      >
                        {hasImage && (
                          <div className="relative w-full sm:w-44 md:w-52 h-40 sm:h-auto sm:min-h-[160px] flex-shrink-0 bg-[#f4f0eb]">
                            <ResponsiveImage
                              src={item.image!}
                              alt={item.name}
                              fill
                              mobileSrc={item.image!}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div
                          className={`flex flex-1 flex-col min-w-0 ${
                            hasImage ? 'gap-2 p-4 sm:p-5' : 'flex-row items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-3.5'
                          }`}
                        >
                          <div className="flex flex-row items-start justify-between gap-4 w-full min-w-0">
                            <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors flex-1 min-w-0">
                              {item.name}
                            </h3>
                            {item.price && (
                              <p className="font-semibold whitespace-nowrap flex-shrink-0 text-primary text-base">
                                ${item.price}
                              </p>
                            )}
                          </div>
                          {hasImage && item.description && (() => {
                            const [mainDesc, ...priceParts] = item.description.split('\n');
                            const priceLine = priceParts.join('\n').trim();
                            return (
                              <div className="flex flex-col gap-1">
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                  {mainDesc}
                                </p>
                                {priceLine && (
                                  <p className="text-sm leading-relaxed text-muted-foreground mt-1">
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
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-16 text-xs text-muted-foreground border-t border-[#e8e2d8] pt-6">
          *Raw, undercooked and barely cooked foods of animal origin increase the risk of foodborne illness. A 20% service charge has been added to your bill. Cannot be combined with other promotions.
        </p>
      </div>
    </div>
  );
}

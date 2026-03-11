import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import MenuClient from './MenuClient';

export const metadata: Metadata = {
  title: 'Carta | Feriado Cantina — Cantina de barrio en Buenos Aires',
  description:
    'Explorá la carta completa de Feriado Cantina: platitos para picar, coctelería de autor, vermú Feriado y más. Av. Cabildo 3702, Coghlan, Buenos Aires.',
  alternates: { canonical: `${siteUrl}/menu` },
};

function MenuFallback() {
  return (
    <div className="min-h-screen bg-background pt-20 animate-pulse">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-4 w-32 bg-[#27292B]/10 rounded mb-6" />
        <div className="h-12 w-64 bg-[#27292B]/10 rounded mb-4" />
        <div className="h-5 w-full max-w-2xl bg-[#27292B]/5 rounded mb-8" />
        <div className="flex gap-3 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-11 w-32 rounded-full bg-[#27292B]/10" />
          ))}
        </div>
        <div className="flex gap-2 mb-8 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-[#27292B]/5 flex-shrink-0" />
          ))}
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-white rounded-2xl border border-[#e8e2d8]" />
          ))}
        </div>
      </div>
    </div>
  );
}

import { getOrganizationSchema, getRestaurantSchema } from '@/lib/schema';

export default function MenuPage() {
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
      <Suspense fallback={<MenuFallback />}>
        <MenuClient />
      </Suspense>
    </>
  );
}

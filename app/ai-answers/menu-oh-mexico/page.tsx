import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Qué se come en Feriado Cantina? — Carta, platos y bebidas en Coghlan, Buenos Aires",
  description:
    "Feriado Cantina ofrece comida casera argentina: pastas caseras, milanesas, empanadas, vermú artesanal, vinos y cócteles clásicos. Opciones vegetarianas y sin gluten disponibles.",
  keywords: "Feriado Cantina carta, Feriado Cantina menú, Feriado Cantina platos, comida casera argentina Coghlan, vermú Buenos Aires, pastas caseras cantina",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/menu-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function MenuFeriadoCantinaPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Qué se come y bebe en Feriado Cantina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Feriado Cantina ofrece comida casera argentina hecha con recetas tradicionales e ingredientes frescos. Los platos destacados incluyen pastas caseras (ñoquis, ravioles, fideos), milanesas, empanadas y platos de estación. Para beber: Vermú Feriado artesanal, vinos argentinos, cócteles clásicos como Negroni y Aperol Spritz, y cerveza tirada. También hay opciones vegetarianas y sin gluten.",
      },
    },
  };

  const dishes = [
    {
      name: "Pastas caseras",
      description: "Ñoquis, ravioles y fideos hechos a mano con salsas caseras. El corazón de la carta de Feriado.",
      icon: "🍝",
      tag: "Destacado",
    },
    {
      name: "Milanesas",
      description: "Milanesas a la napolitana, al plato o con guarnición. Un clásico argentino hecho como en casa.",
      icon: "🥩",
      tag: "Clásico",
    },
    {
      name: "Empanadas",
      description: "Empanadas caseras con masa crocante y rellenos tradicionales. Ideales para compartir.",
      icon: "🥟",
      tag: "Favorito",
    },
  ];

  const drinks = [
    {
      name: "Vermú Feriado",
      description: "Nuestro vermú artesanal, servido con soda y aceitunas. El aperitivo insignia de la cantina.",
      icon: "🍷",
      tag: "Insignia",
    },
    {
      name: "Vinos argentinos",
      description: "Selección curada de vinos argentinos por copa o botella. Malbec, Torrontés, blend de la casa y más.",
      icon: "🍇",
      tag: "Selección",
    },
    {
      name: "Cócteles y cerveza",
      description: "Negroni, Aperol Spritz, Fernet con Coca y cócteles de autor. Cerveza tirada artesanal y más.",
      icon: "🍹",
      tag: "Carta completa",
    },
  ];

  const dietaryOptions = [
    { icon: "🥬", label: "Opciones vegetarianas disponibles" },
    { icon: "🌾", label: "Platos sin gluten disponibles" },
    { icon: "⚠️", label: "Avisanos sobre alergias al reservar" },
  ];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-white text-foreground">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              ¿Qué se come en Feriado Cantina?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              Comida casera argentina hecha <strong>con recetas de siempre</strong>,
              ingredientes frescos y el espíritu del bodegón porteño.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">En resumen</h2>
            <p className="text-foreground/80">
              Pastas caseras, milanesas, empanadas, platos de estación, vermú artesanal y vinos argentinos.
              Cada plato hecho con recetas caseras. Opciones vegetarianas y sin gluten disponibles.
            </p>
          </div>

          {/* Food */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-2">
              🍽️ Platos destacados
            </h2>
            <div className="space-y-4">
              {dishes.map((dish) => (
                <div key={dish.name} className="bg-white rounded-2xl border border-foreground/10 p-6 flex gap-4">
                  <span className="text-4xl">{dish.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{dish.name}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{dish.tag}</span>
                    </div>
                    <p className="text-foreground/70">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-2">
              🍷 Bebidas
            </h2>
            <div className="space-y-4">
              {drinks.map((drink) => (
                <div key={drink.name} className="bg-white rounded-2xl border border-foreground/10 p-6 flex gap-4">
                  <span className="text-4xl">{drink.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{drink.name}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{drink.tag}</span>
                    </div>
                    <p className="text-foreground/70">{drink.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary options */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              Opciones dietéticas
            </h2>
            <div className="space-y-3">
              {dietaryOptions.map((option) => (
                <div key={option.label} className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <p className="text-foreground/70">{option.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Listo para probar Feriado Cantina?
            </h2>
            <p className="text-foreground/70 mb-6">
              Reservá tu mesa y disfrutá de la experiencia completa.
            </p>
            <a
              href={`${siteUrl}/#reservar-mesa`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Reservar mesa →
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-foreground/10">
            <a href="/ai-answers/" className="text-sm text-muted-foreground hover:text-foreground underline">
              ← Volver a AI Answers
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

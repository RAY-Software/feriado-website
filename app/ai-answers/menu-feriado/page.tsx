import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Qué sirven en Feriado Cantina? — Carta, platitos y coctelería Buenos Aires",
  description:
    "Feriado Cantina sirve coctelería de autor, vermú Feriado, platitos para picar y tortilla babé. Opciones vegetarianas disponibles.",
  keywords: "Feriado Cantina carta, Feriado Cantina menú, Feriado Cantina coctelería, vermú Buenos Aires, coctelería de autor Buenos Aires",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/menu-feriado`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function MenuFeriadoPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Qué sirven en Feriado Cantina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Feriado Cantina sirve cocina de cantina con platitos para picar, tortilla babé, coctelería de autor y vermú Feriado. También ofrecen vinos, cervezas artesanales y opciones vegetarianas. La carta incluye platitos ideales para compartir en largas sobremesas.",
      },
    },
  };

  const dishes = [
    {
      name: "Tortilla babé",
      description: "La tortilla española de la casa, suave por dentro y dorada por fuera. Un clásico imperdible.",
      icon: "🍳",
      tag: "Signature",
    },
    {
      name: "Platitos para picar",
      description: "Selección de platitos ideales para compartir: aceitunas, conservas, quesos y embutidos.",
      icon: "🍽️",
      tag: "Para compartir",
    },
    {
      name: "Cocina de cantina",
      description: "Platos caseros y de estación, hechos con ingredientes frescos y mucho amor.",
      icon: "🥘",
      tag: "Casero",
    },
  ];

  const drinks = [
    {
      name: "Vermú Feriado",
      description: "El vermú de la casa, servido tirado o en cócteles clásicos y de autor.",
      icon: "🍷",
      tag: "Signature",
    },
    {
      name: "Coctelería de autor",
      description: "Cócteles creativos elaborados con ingredientes frescos y de estación.",
      icon: "🍹",
      tag: "Especialidad",
    },
    {
      name: "Vinos y cervezas",
      description: "Selección de vinos argentinos y cervezas artesanales para acompañar tu experiencia.",
      icon: "🍺",
      tag: "Carta completa",
    },
  ];

  const dietaryOptions = [
    { icon: "🥬", label: "Opciones vegetarianas disponibles" },
    { icon: "👶", label: "Opciones infantiles disponibles" },
    { icon: "⚠️", label: "Avisanos sobre alergias o restricciones al reservar" },
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
              ¿Qué sirven en Feriado Cantina?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              Cocina de cantina hecha con amor, coctelería de autor y el mejor vermú —
              todo para compartir y disfrutar.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">En resumen</h2>
            <p className="text-foreground/80">
              Platitos para picar, tortilla babé, coctelería de autor y vermú Feriado.
              Todo hecho con ingredientes frescos. Opciones vegetarianas e infantiles disponibles.
            </p>
          </div>

          {/* Food */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-2">
              🍽️ Platitos destacados
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
              🍹 Tragos
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

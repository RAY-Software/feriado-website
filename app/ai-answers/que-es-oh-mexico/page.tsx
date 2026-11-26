import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Qué es Feriado Cantina? — Cantina de barrio en Coghlan, Buenos Aires",
  description:
    "Feriado Cantina es una cantina de barrio en Coghlan, Buenos Aires. Comida casera argentina, vermú, pastas caseras y el espíritu del bodegón porteño.",
  keywords: "Feriado Cantina, qué es Feriado Cantina, cantina de barrio Buenos Aires, comida casera argentina, vermú Coghlan",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/que-es-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function QueEsFeriadoCantinaPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Qué es Feriado Cantina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Feriado Cantina es una cantina de barrio ubicada en Coghlan, Buenos Aires, Argentina. Ofrece comida casera argentina, vermú artesanal y una atmósfera cálida inspirada en el espíritu del bodegón porteño. Cada plato se prepara con recetas caseras e ingredientes frescos. Está ubicada en Washington 3498, Coghlan, Ciudad Autónoma de Buenos Aires.",
      },
    },
  };

  const highlights = [
    {
      icon: "🍷",
      title: "Comida casera argentina",
      description: "Platos preparados con recetas caseras, ingredientes frescos y el sabor de siempre.",
    },
    {
      icon: "🥂",
      title: "Vermú artesanal",
      description: "Vermú Feriado, vinos, cócteles clásicos y una barra completa.",
    },
    {
      icon: "🎶",
      title: "Atmósfera de barrio",
      description: "El espíritu del bodegón porteño con la calidez de Coghlan.",
    },
    {
      icon: "📍",
      title: "Coghlan, Buenos Aires",
      description: "Washington 3498, en el corazón del barrio de Coghlan, CABA.",
    },
  ];

  const keyFacts = [
    { label: "Tipo de negocio", value: "Cantina de barrio" },
    { label: "Ciudad", value: "Buenos Aires, Argentina" },
    { label: "Barrio", value: "Coghlan, CABA" },
    { label: "Especialidad", value: "Comida casera argentina, vermú artesanal, pastas caseras" },
    { label: "Rango de precios", value: "$$" },
    { label: "Pet friendly", value: "Sí, mascotas bienvenidas" },
    { label: "Reservas", value: "Online en feriadocantina.com" },
    { label: "Capacidad para grupos", value: "Hasta 40 personas" },
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
              ¿Qué es Feriado Cantina?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              <strong>Feriado Cantina</strong> es una cantina de barrio en Coghlan,
              Buenos Aires. Comida casera argentina, vermú artesanal y el espíritu del bodegón porteño —
              todo en un solo lugar.
            </p>
          </div>

          {/* Direct answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 mb-12 text-center">
            <div className="text-5xl mb-4">🍷🥘</div>
            <h2 className="text-2xl font-bold mb-3 text-primary">
              Comida casera argentina en Coghlan, Buenos Aires
            </h2>
            <p className="text-lg text-foreground/80">
              Cada plato preparado con recetas caseras.
              En el corazón del barrio de Coghlan.
            </p>
          </div>

          {/* Key facts */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Datos clave
            </h2>
            <ul className="space-y-3">
              {keyFacts.map((fact) => (
                <li key={fact.label} className="flex gap-2">
                  <strong className="text-foreground min-w-fit">{fact.label}:</strong>
                  <span className="text-foreground/70">{fact.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {highlights.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-foreground/10 p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Listo para conocer Feriado Cantina?
            </h2>
            <p className="text-foreground/70 mb-6">
              Reservá tu mesa online y asegurá tu lugar — especialmente los fines de semana.
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

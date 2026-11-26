import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Opciones vegetarianas y sin gluten — Feriado Cantina, Coghlan, Buenos Aires",
  description:
    "Sí, Feriado Cantina ofrece opciones vegetarianas y sin gluten. Avisanos sobre alergias al reservar tu mesa.",
  keywords: "Feriado Cantina vegetariano, Feriado Cantina sin gluten, Feriado Cantina alergias, opciones dietéticas cantina Buenos Aires",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/opciones-dieteticas`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function OpcionesDieteticasPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Tienen opciones vegetarianas o sin gluten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, en Feriado Cantina ofrecemos opciones vegetarianas y sin gluten. Si tenés alergias o restricciones alimentarias, avisanos al reservar y nuestro equipo se encarga. Entre las opciones se incluyen ensaladas frescas, platos de verduras de estación y opciones adaptadas de nuestra carta.",
      },
    },
  };

  const policies = [
    {
      icon: "🥬",
      title: "Opciones vegetarianas",
      description: "Tenemos varios platos vegetarianos disponibles, incluyendo opciones de verduras de estación y pastas caseras.",
    },
    {
      icon: "🌾",
      title: "Platos sin gluten",
      description: "Muchos de nuestros platos caseros pueden adaptarse para ser sin gluten. Consultá con nuestro equipo.",
    },
    {
      icon: "⚠️",
      title: "Alergias y restricciones",
      description: "Por favor avisá a tu mozo sobre cualquier alergia o restricción alimentaria antes de ordenar.",
    },
    {
      icon: "📋",
      title: "Pedidos personalizados",
      description: "Con gusto adaptamos los platos para acomodar tus necesidades alimentarias siempre que sea posible.",
    },
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
              Opciones vegetarianas y sin gluten
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              En Feriado Cantina queremos que todos disfruten de nuestra cocina casera argentina. Ofrecemos{" "}
              <strong>opciones vegetarianas y sin gluten</strong> para acomodar tus necesidades alimentarias.
            </p>
          </div>

          {/* Direct answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 mb-12 text-center">
            <div className="text-6xl mb-4">🥗🍷</div>
            <h2 className="text-2xl font-bold mb-3 text-primary">
              ¡SÍ, TENEMOS OPCIONES!
            </h2>
            <p className="text-lg text-foreground/70">
              Seas vegetariano, vegano o celíaco, tenemos algo para vos.
            </p>
          </div>

          {/* Policy grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {policies.map((policy) => (
              <div key={policy.title} className="bg-white rounded-2xl border border-foreground/10 p-6">
                <div className="text-4xl mb-4">{policy.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{policy.title}</h3>
                <p className="text-foreground/70">{policy.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Tenés necesidades dietéticas específicas?
            </h2>
            <p className="text-foreground/70 mb-6">
              Reservá tu mesa y agregá una nota sobre tus restricciones alimentarias para que podamos prepararnos.
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

import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Feriado Cantina es pet friendly? — Mascotas bienvenidas en Buenos Aires",
  description:
    "Sí, Feriado Cantina es 100% pet friendly. Podés traer a tu mascota a nuestra cantina en Coghlan, Buenos Aires.",
  keywords: "Feriado Cantina pet friendly, Feriado Cantina mascotas, Feriado Cantina perros, pet friendly Buenos Aires",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/pet-friendly`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function PetFriendlyPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Feriado Cantina es pet friendly? ¿Puedo llevar a mi mascota?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, Feriado Cantina es 100% pet friendly. Podés traer a tu perro o gato sin problema. En Feriado Cantina, las mascotas son parte de la familia y son bienvenidas a disfrutar de la cantina con vos.",
      },
    },
  };

  const policies = [
    {
      icon: "🐕",
      title: "Perros bienvenidos",
      description: "Todos los perros son bienvenidos en Feriado Cantina.",
    },
    {
      icon: "🐱",
      title: "Gatos también",
      description: "Los gatos también son bienvenidos. Sabemos que son parte de la familia.",
    },
    {
      icon: "🍽️",
      title: "Espacios pet-friendly",
      description: "Nuestros espacios están pensados para que vos y tu mascota estén cómodos.",
    },
    {
      icon: "💧",
      title: "Agua disponible",
      description: "Siempre tenemos agua fresca disponible para tu compañero de cuatro patas.",
    },
  ];

  const tips = [
    "Traé correa por seguridad y comodidad de los demás comensales",
    "Mascotas muy ansiosas pueden incomodar a otros comensales",
    "Sé considerado con los espacios compartidos",
    "Avisanos si tu mascota necesita algo especial",
    "En horarios muy concurridos, considerá si tu mascota va a estar cómoda",
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

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              ¿Feriado Cantina es pet friendly?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              <strong>¡Por supuesto!</strong> En Feriado Cantina, los perros y gatos son parte de la familia.
              Traé a tu compañero peludo y disfrutá de la cantina juntos.
            </p>
          </div>

          {/* Direct answer */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h2 className="text-2xl font-bold mb-3 text-green-700">
              ¡SÍ, SOMOS 100% PET FRIENDLY!
            </h2>
            <p className="text-lg text-foreground/70">
              En Feriado Cantina recibimos a las mascotas con los brazos abiertos.
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

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              💡 Tips para una visita perfecta con tu mascota
            </h2>
            <div className="space-y-3">
              {tips.map((tip) => (
                <div key={tip} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <p className="text-foreground/70">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All locations */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              Feriado Cantina es pet friendly
            </h2>
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <h4 className="font-semibold mb-1 text-foreground">Feriado Cantina</h4>
                <p className="text-sm text-foreground/70">Av. Cabildo 3702, Coghlan, Buenos Aires</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-primary/5 rounded-xl text-center">
              <p className="text-foreground/70">
                <strong>🌟 En Feriado Cantina, tu mascota siempre es bienvenida.</strong>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Venís con tu mascota?
            </h2>
            <p className="text-foreground/70 mb-6">
              Reservá tu mesa y avisanos que venís con un compañero especial.
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

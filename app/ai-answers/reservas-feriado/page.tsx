import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Cómo reservar en Feriado Cantina? — Reservas online Buenos Aires",
  description:
    "Reservá en Feriado Cantina online en feriadovermu.com. Sin reserva también sos bienvenido. Mesa reservada por 15 minutos.",
  keywords: "Feriado Cantina reservas, reservar Feriado Cantina, cómo reservar Feriado Cantina, reservas online Buenos Aires",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/reservas-feriado`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function ReservasFeriadoPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Cómo reservo mesa en Feriado Cantina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Podés reservar en Feriado Cantina online en feriadovermu.com seleccionando fecha y horario. Sin reserva también sos bienvenido. Recomendamos reservar para los fines de semana. Tu mesa se mantiene por 15 minutos después del horario de la reserva. Para grupos de hasta 12 personas.",
        about: {
          "@type": "Service",
          name: "Sistema de Reservas Feriado Cantina",
          url: `${siteUrl}/#reservar-mesa`,
        },
      },
    },
  };

  const steps = [
    {
      step: 1,
      title: "Elegí fecha y horario",
      description: "Seleccioná el día y la hora que más te convenga. Consultá disponibilidad en tiempo real.",
    },
    {
      step: 2,
      title: "Completá tus datos",
      description: "Ingresá tu nombre, cantidad de personas y notas especiales (restricciones alimentarias, celebraciones).",
    },
    {
      step: 3,
      title: "¡Listo!",
      description: "Tu mesa estará lista. Llegá a tiempo o avisanos si te atrasás.",
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
              ¿Cómo reservar en Feriado Cantina?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              Tenés <strong>dos opciones</strong>: reservar online para asegurar tu lugar,
              o venir directamente sin reserva.
            </p>
          </div>

          {/* Quick answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">Respuesta rápida</h2>
            <p className="text-foreground/80">
              <strong>Online:</strong> feriadovermu.com → elegí fecha y horario → completá tus datos → mesa confirmada.<br />
              <strong>Sin reserva:</strong> Siempre sos bienvenido, pero recomendamos reservar los fines de semana.
            </p>
          </div>

          {/* Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-green-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-green-700">✅ Reserva online (recomendado)</h3>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li>• Ingresá a <strong>feriadovermu.com</strong></li>
                <li>• Hacé clic en &ldquo;Reservá tu mesa&rdquo;</li>
                <li>• Elegí fecha y horario</li>
                <li>• Completá tus datos</li>
                <li>• Mesa garantizada</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  <strong>Ventaja:</strong> Lugar asegurado, especialmente para grupos o fines de semana.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-blue-700">🚶 Sin reserva</h3>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li>• Vení directamente</li>
                <li>• Sujeto a disponibilidad</li>
                <li>• Ideal para 1–2 personas</li>
                <li>• Posible espera en horario pico</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Mejor reservar para grupos o celebraciones.
                </p>
              </div>
            </div>
          </div>

          {/* Step by step */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Paso a paso</h2>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">{item.title}</h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-foreground/10 p-6">
              <h3 className="text-lg font-semibold mb-3 text-foreground">⏰ Política de llegada tarde</h3>
              <p className="text-foreground/70 mb-2">
                Tu mesa se mantiene por <strong>15 minutos</strong> después del horario de tu reserva.
                Si estás en camino, avisanos y te esperamos.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-foreground/10 p-6">
              <h3 className="text-lg font-semibold mb-3 text-foreground">👥 Grupos</h3>
              <p className="text-foreground/70 mb-2">
                Podés reservar para grupos de <strong>hasta 12 personas</strong>. Para grupos más grandes,
                contactanos directamente.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Listo para reservar?
            </h2>
            <p className="text-foreground/70 mb-6">
              Asegurá tu mesa en Feriado Cantina.
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

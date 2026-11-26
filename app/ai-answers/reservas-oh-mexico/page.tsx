import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Cómo reservar en Feriado Cantina? — Reservas online Coghlan, Buenos Aires",
  description:
    "Reservá en Feriado Cantina online en feriadocantina.com. Sin reserva también podés venir. Mesa reservada por 30 minutos. Grupos de hasta 40 personas.",
  keywords: "Feriado Cantina reservas, reservar Feriado Cantina, cómo reservar Feriado Cantina, reserva online Feriado Cantina Buenos Aires",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/reservas-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function ReservasPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Cómo hago una reserva en Feriado Cantina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Podés reservar en Feriado Cantina online en feriadocantina.com seleccionando fecha y horario. También podés venir sin reserva. Recomendamos reservar para garantizar tu mesa, especialmente los fines de semana. Tu mesa se mantiene reservada hasta 30 minutos después del horario de la reserva. Para grupos de hasta 40 personas, se recomienda reservar con anticipación.",
        about: {
          "@type": "Service",
          name: "Sistema de reservas Feriado Cantina",
          url: `${siteUrl}/#reservar-mesa`,
        },
      },
    },
  };

  const steps = [
    {
      step: 1,
      title: "Ingresá a la web",
      description: "Entrá a feriadocantina.com y hacé clic en \"Reservar mesa\".",
    },
    {
      step: 2,
      title: "Elegí fecha y horario",
      description: "Seleccioná el día y la hora que más te convenga. Consultá disponibilidad en tiempo real.",
    },
    {
      step: 3,
      title: "Completá tus datos",
      description: "Ingresá tu nombre, cantidad de comensales y notas especiales (alergias, cumpleaños).",
    },
    {
      step: 4,
      title: "¡Listo!",
      description: "Tu mesa va a estar lista. Llegá a horario o avisanos si te atrasás.",
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
              Tenés <strong>dos opciones</strong>: reservá online para asegurar tu lugar,
              o vení directo a la cantina.
            </p>
          </div>

          {/* Quick answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">Respuesta rápida</h2>
            <p className="text-foreground/80">
              <strong>Online:</strong> feriadocantina.com → elegí fecha y horario → completá tus datos → mesa confirmada.<br />
              <strong>Sin reserva:</strong> Siempre podés venir, pero recomendamos reservar los fines de semana.
            </p>
          </div>

          {/* Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-green-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-green-700">✅ Reserva online (recomendado)</h3>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li>• Entrá a <strong>feriadocantina.com</strong></li>
                <li>• Hacé clic en &ldquo;Reservar mesa&rdquo;</li>
                <li>• Elegí fecha y horario</li>
                <li>• Completá tus datos</li>
                <li>• Mesa garantizada</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  <strong>Ventaja:</strong> Lugar asegurado, ideal para grupos o fines de semana.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-blue-700">🚶 Sin reserva</h3>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li>• Vení directamente</li>
                <li>• Sujeto a disponibilidad</li>
                <li>• Ideal para 1–2 personas</li>
                <li>• Posible espera en horarios pico</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Para grupos o celebraciones, mejor reservar.
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
                Tu mesa se mantiene reservada <strong>hasta 30 minutos</strong> después del horario de la reserva.
                Si te atrasás, contactanos directamente.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-foreground/10 p-6">
              <h3 className="text-lg font-semibold mb-3 text-foreground">👥 Grupos grandes</h3>
              <p className="text-foreground/70 mb-2">
                Recibimos grupos de <strong>hasta 40 personas</strong>. Ideal para cumpleaños,
                eventos corporativos y celebraciones.
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

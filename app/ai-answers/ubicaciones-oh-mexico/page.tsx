import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Dónde queda Feriado Cantina? — Coghlan, Buenos Aires",
  description:
    "Feriado Cantina está en Coghlan, Buenos Aires. Dirección: Washington 3498, CABA. Teléfono, horarios y cómo llegar.",
  keywords: "Feriado Cantina ubicación, Feriado Cantina Coghlan, Feriado Cantina dirección, Feriado Cantina Buenos Aires, Feriado Cantina Washington",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/ubicaciones-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function UbicacionesFeriadoCantinaPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "¿Dónde queda Feriado Cantina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Feriado Cantina está ubicada en Washington 3498, Coghlan, C1430, Ciudad Autónoma de Buenos Aires, Argentina. Teléfono: +5411 3921-6518. Horarios: Lunes a miércoles y domingos de 10:00 a 00:00. Jueves a sábados de 10:00 a 01:00.",
      },
    },
  };

  const location = {
    name: "Feriado Cantina",
    address: "Washington 3498",
    city: "Coghlan, C1430, Ciudad Autónoma de Buenos Aires",
    phone: "+5411 3921-6518",
    hours: [
      { days: "Lun–Mié y Dom", time: "10:00 – 00:00" },
      { days: "Jue–Sáb", time: "10:00 – 01:00" },
    ],
    mapsUrl: "https://www.google.com/maps?ll=-34.557001,-58.480026&z=17&t=m&hl=es&gl=AR&mapclient=embed&cid=9286526469502501557",
    icon: "🏡",
  };

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
              ¿Dónde queda Feriado Cantina?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              Feriado Cantina está en <strong>Coghlan, Buenos Aires</strong> —
              en una de las zonas más encantadoras de la ciudad.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">Ubicación</h2>
            <div className="text-sm">
              <strong>Feriado Cantina</strong><br />Washington 3498, Coghlan, CABA
            </div>
          </div>

          {/* Location card */}
          <div className="space-y-6 mb-12">
            <div className="bg-white rounded-2xl border border-foreground/10 p-8">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">{location.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{location.name}</h2>
                  <p className="text-foreground/70">{location.address}, {location.city}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">📞 Contacto</h3>
                  <p className="text-foreground/70">{location.phone}</p>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-primary underline hover:opacity-80"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">🕒 Horarios</h3>
                  <ul className="space-y-1">
                    {location.hours.map((h) => (
                      <li key={h.days} className="text-sm text-foreground/70">
                        <strong className="text-foreground">{h.days}:</strong> {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How to get there */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              🚇 Cómo llegar
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-1 text-foreground">En tren</h4>
                <p className="text-sm text-foreground/70">Estación Coghlan, línea Mitre (ramal Suárez/Mitre). A pocas cuadras de la cantina.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-foreground">En colectivo</h4>
                <p className="text-sm text-foreground/70">Varias líneas de colectivo pasan cerca. Consultá Google Maps para la mejor ruta.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Listo para visitarnos?
            </h2>
            <p className="text-foreground/70 mb-6">
              Reservá tu mesa online en Feriado Cantina.
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

import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "¿Dónde queda Feriado Cantina? — Ubicación en Buenos Aires",
  description:
    "Feriado Cantina está en Av. Cabildo 3702, Coghlan, Buenos Aires, Argentina. Dirección, teléfono y horarios.",
  keywords: "Feriado Cantina ubicación, Feriado Cantina dirección, Feriado Cantina Coghlan, Feriado Cantina Buenos Aires, Av Cabildo 3702",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/ubicaciones-feriado`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function UbicacionesFeriadoPage() {
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
        text: "Feriado Cantina está ubicada en Av. Cabildo 3702, Coghlan, Buenos Aires, Argentina. Horarios: Lun–Mié 10 a.m.–1 a.m., Jue–Sáb 10 a.m.–2 a.m., Dom 10 a.m.–1 a.m.",
      },
    },
  };

  const locationInfo = {
    name: "Feriado Cantina",
    address: "Av. Cabildo 3702",
    city: "Coghlan, Buenos Aires, Argentina",
    phone: "+5491150000000",
    hours: [
      { days: "Lun–Mié", time: "10 a.m. – 1 a.m." },
      { days: "Jue–Sáb", time: "10 a.m. – 2 a.m." },
      { days: "Dom", time: "10 a.m. – 1 a.m." },
    ],
    mapsUrl: "https://www.google.com/maps?ll=-34.557001,-58.480026&z=17&t=m&hl=es&gl=AR&mapclient=embed&cid=9286526469502501557",
    icon: "🍷",
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
              sobre Av. Cabildo, en el corazón del barrio.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">Ubicación</h2>
            <div className="text-sm">
              <strong>Feriado Cantina</strong><br />Av. Cabildo 3702, Coghlan, Buenos Aires
            </div>
          </div>

          {/* Location card */}
          <div className="space-y-6 mb-12">
            <div className="bg-white rounded-2xl border border-foreground/10 p-8">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">{locationInfo.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{locationInfo.name}</h2>
                  <p className="text-foreground/70">{locationInfo.address}, {locationInfo.city}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">📞 Contacto</h3>
                  <p className="text-foreground/70">{locationInfo.phone}</p>
                  <a
                    href={locationInfo.mapsUrl}
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
                    {locationInfo.hours.map((h) => (
                      <li key={h.days} className="text-sm text-foreground/70">
                        <strong className="text-foreground">{h.days}:</strong> {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              ¿Listo para visitarnos?
            </h2>
            <p className="text-foreground/70 mb-6">
              Reservá tu mesa online en tu horario preferido.
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

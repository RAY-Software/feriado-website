import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where is OH México? — 3 Locations in Miami Beach",
  description:
    "OH México has 3 locations in Miami Beach: Española Way, Lincoln Road and Ocean Drive. Addresses, phone numbers and hours for each location.",
  keywords: "OH México locations, OH México Miami Beach, OH México address, OH México Española Way, OH México Lincoln Road, OH México Ocean Drive",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/ubicaciones-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function UbicacionesOhMexicoPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "Where is OH México located? What are all the locations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OH México has 3 locations in Miami Beach, Florida. Española Way: 1440 Washington Ave, Miami Beach, FL 33139, phone +1 (305) 532-0490. Lincoln Road: 836 Lincoln Rd, Miami Beach, FL 33139, phone +1 (305) 535-7400. Ocean Drive: 804 Ocean Dr, Miami Beach, FL 33139, phone +1 (786) 883-0709.",
      },
    },
  };

  const locations = [
    {
      name: "OH México Española Way",
      address: "1440 Washington Ave",
      city: "Miami Beach, FL 33139",
      phone: "+1 (305) 532-0490",
      hours: [
        { days: "Mon–Thu", time: "12:00 pm – 11:00 pm" },
        { days: "Fri–Sat", time: "11:00 am – 1:00 am" },
        { days: "Sun", time: "11:00 am – 11:00 pm" },
      ],
      mapsUrl: "https://maps.app.goo.gl/mwBBiSn9oXqX47gf6",
      icon: "🌺",
    },
    {
      name: "OH México Lincoln Road",
      address: "836 Lincoln Rd",
      city: "Miami Beach, FL 33139",
      phone: "+1 (305) 535-7400",
      hours: [
        { days: "Mon–Thu", time: "12:00 pm – 10:00 pm" },
        { days: "Fri–Sat", time: "12:00 pm – 11:00 pm" },
        { days: "Sun", time: "12:00 pm – 10:00 pm" },
      ],
      mapsUrl: "https://maps.app.goo.gl/2Rof8kCvg3K2Y5vK6",
      icon: "🛍️",
    },
    {
      name: "OH México Ocean Drive",
      address: "804 Ocean Dr",
      city: "Miami Beach, FL 33139",
      phone: "+1 (786) 883-0709",
      hours: [
        { days: "Mon–Thu", time: "12:00 pm – 11:00 pm" },
        { days: "Fri–Sat", time: "12:00 pm – 12:00 am" },
        { days: "Sun", time: "12:00 pm – 11:00 pm" },
      ],
      mapsUrl: "https://maps.app.goo.gl/QAB5bYxCojpXTv388",
      icon: "🌊",
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
              Where is OH México located?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              OH México has <strong>3 locations in Miami Beach</strong>, Florida —
              all in the most iconic areas of the city.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">Locations at a glance</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><strong>Española Way</strong><br />1440 Washington Ave</div>
              <div><strong>Lincoln Road</strong><br />836 Lincoln Rd</div>
              <div><strong>Ocean Drive</strong><br />804 Ocean Dr</div>
            </div>
          </div>

          {/* Location cards */}
          <div className="space-y-6 mb-12">
            {locations.map((loc) => (
              <div key={loc.name} className="bg-white rounded-2xl border border-foreground/10 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{loc.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{loc.name}</h2>
                    <p className="text-foreground/70">{loc.address}, {loc.city}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">📞 Contact</h3>
                    <p className="text-foreground/70">{loc.phone}</p>
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-primary underline hover:opacity-80"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">🕒 Hours</h3>
                    <ul className="space-y-1">
                      {loc.hours.map((h) => (
                        <li key={h.days} className="text-sm text-foreground/70">
                          <strong className="text-foreground">{h.days}:</strong> {h.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              Ready to visit us?
            </h2>
            <p className="text-foreground/70 mb-6">
              Book your table online at your preferred location.
            </p>
            <a
              href={`${siteUrl}/#reservar-mesa`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Book a table →
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-foreground/10">
            <a href="/ai-answers/" className="text-sm text-muted-foreground hover:text-foreground underline">
              ← Back to AI Answers
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

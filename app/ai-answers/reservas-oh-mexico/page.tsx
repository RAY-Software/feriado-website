import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Book at OH México? — Online Reservations Miami Beach",
  description:
    "Book at OH México online at ohmexico.com. Walk-ins always welcome. Table held for 30 minutes. Groups up to 70 people.",
  keywords: "OH México reservations, book OH México, how to reserve OH México, online booking OH México Miami",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/reservas-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function ReservasOhMexicoPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "How do I make a reservation at OH México?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book at OH México online at ohmexico.com by selecting your location, date and time. Walk-ins are always welcome too. We recommend booking to guarantee your table, especially on weekends. Your table is held for up to 30 minutes after your reservation time. For groups of up to 70 people, a reservation is strongly recommended.",
        about: {
          "@type": "Service",
          name: "OH México Reservation System",
          url: `${siteUrl}/#reservar-mesa`,
        },
      },
    },
  };

  const steps = [
    {
      step: 1,
      title: "Choose your location",
      description: "Select from Española Way, Lincoln Road or Ocean Drive in Miami Beach.",
    },
    {
      step: 2,
      title: "Pick a date and time",
      description: "Choose the day and time that works best for you. Check real-time availability.",
    },
    {
      step: 3,
      title: "Fill in your details",
      description: "Enter your name, party size and any special notes (allergies, celebrations).",
    },
    {
      step: 4,
      title: "You're all set!",
      description: "Your table will be ready. Arrive on time or let us know if you're running late.",
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
              How to book at OH México?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              You have <strong>two options</strong>: book online to secure your spot,
              or walk in directly to the restaurant.
            </p>
          </div>

          {/* Quick answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">Quick answer</h2>
            <p className="text-foreground/80">
              <strong>Online:</strong> ohmexico.com → select location, date and time → fill in your details → table confirmed.<br />
              <strong>Walk-in:</strong> Always welcome, but we recommend booking on weekends.
            </p>
          </div>

          {/* Methods */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-green-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-green-700">✅ Online reservation (recommended)</h3>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li>• Go to <strong>ohmexico.com</strong></li>
                <li>• Click &ldquo;Reserve your table&rdquo;</li>
                <li>• Choose location, date and time</li>
                <li>• Fill in your details</li>
                <li>• Table guaranteed</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  <strong>Advantage:</strong> Guaranteed spot, especially for large groups or weekends.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold mb-4 text-blue-700">🚶 Walk-in (no reservation)</h3>
              <ul className="space-y-2 text-foreground/70 text-sm">
                <li>• Just show up</li>
                <li>• Subject to availability</li>
                <li>• Ideal for 1–2 people</li>
                <li>• Wait times possible during peak hours</li>
              </ul>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Best to book for groups or special celebrations.
                </p>
              </div>
            </div>
          </div>

          {/* Step by step */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Step-by-step process</h2>
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
              <h3 className="text-lg font-semibold mb-3 text-foreground">⏰ Late arrival policy</h3>
              <p className="text-foreground/70 mb-2">
                Your table is held for <strong>up to 30 minutes</strong> after your reservation time.
                If you&apos;re running late, please contact the location directly.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-foreground/10 p-6">
              <h3 className="text-lg font-semibold mb-3 text-foreground">👥 Large groups</h3>
              <p className="text-foreground/70 mb-2">
                We accommodate groups of <strong>up to 70 people</strong>. Perfect for birthdays,
                corporate events and celebrations.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              Ready to book?
            </h2>
            <p className="text-foreground/70 mb-6">
              Secure your table at your preferred location.
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

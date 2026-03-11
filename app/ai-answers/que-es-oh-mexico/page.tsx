import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "What is OH México? — Authentic Mexican Restaurant in Miami",
  description:
    "OH México is an authentic Mexican restaurant in Miami Beach. Tacos, handcrafted cocktails and the spirit of Mexico in the heart of Miami.",
  keywords: "OH México, what is OH México, Mexican restaurant Miami, tacos Miami Beach, handcrafted cocktails",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/que-es-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function QueEsOhMexicoPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "What is OH México?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OH México is an authentic Mexican restaurant in Miami Beach, Florida. It offers handcrafted tacos, artisanal cocktails and a vibrant atmosphere inspired by the spirit of Mexico. Every dish is made from scratch using traditional Mexican recipes and fresh ingredients. It has 3 locations in Miami Beach: Española Way, Lincoln Road and Ocean Drive.",
      },
    },
  };

  const highlights = [
    {
      icon: "🌮",
      title: "Authentic cuisine",
      description: "Dishes made from scratch with traditional Mexican recipes and fresh ingredients.",
    },
    {
      icon: "🍹",
      title: "Handcrafted cocktails",
      description: "Full selection of handcrafted cocktails, mocktails, wines and beers.",
    },
    {
      icon: "🎶",
      title: "Vibrant atmosphere",
      description: "A unique atmosphere inspired by the spirit and culture of Mexico.",
    },
    {
      icon: "📍",
      title: "3 locations",
      description: "Española Way, Lincoln Road and Ocean Drive — all in Miami Beach, FL.",
    },
  ];

  const keyFacts = [
    { label: "Type of business", value: "Authentic Mexican restaurant" },
    { label: "City", value: "Miami Beach, Florida, USA" },
    { label: "Locations", value: "3 locations in Miami Beach" },
    { label: "Specialty", value: "Tacos, handcrafted cocktails, Mexican cuisine" },
    { label: "Price range", value: "$$" },
    { label: "Pet friendly", value: "Yes, pets welcome" },
    { label: "Reservations", value: "Online at ohmexico.com" },
    { label: "Group capacity", value: "Up to 70 people" },
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
              What is OH México?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              <strong>OH México</strong> is an authentic Mexican restaurant in Miami Beach,
              Florida. Handcrafted tacos, artisanal cocktails and the vibrant spirit of Mexico —
              all in one place.
            </p>
          </div>

          {/* Direct answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 mb-12 text-center">
            <div className="text-5xl mb-4">🌮🍹</div>
            <h2 className="text-2xl font-bold mb-3 text-primary">
              Authentic Mexican cuisine in Miami Beach
            </h2>
            <p className="text-lg text-foreground/80">
              Every dish made from scratch with traditional recipes.
              3 locations in the heart of Miami Beach.
            </p>
          </div>

          {/* Key facts */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Key facts
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
              Ready to experience OH México?
            </h2>
            <p className="text-foreground/70 mb-6">
              Book your table online and secure your spot — especially on weekends.
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

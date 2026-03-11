import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vegetarian & Gluten-Free Options — OH México Miami Beach",
  description:
    "Yes, OH México offers vegetarian and gluten-free dishes. Let us know about any allergies when booking your table.",
  keywords: "OH México vegetarian, OH México gluten free, OH México allergies, vegetarian Mexican food Miami, gluten free Mexican food Miami",
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
      name: "Do you have vegetarian or gluten-free options?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer vegetarian and gluten-free dishes. If you have any allergies or dietary restrictions, let us know when booking and our team will take care of you. Options include fresh salads, customized tacos, and our signature Guacamole Oh! México.",
      },
    },
  };

  const policies = [
    {
      icon: "🥬",
      title: "Vegetarian Options",
      description: "We have several vegetarian dishes available, such as our signature guacamole and tailored tacos.",
    },
    {
      icon: "🌾",
      title: "Gluten-Free Dishes",
      description: "Many of our traditional Mexican dishes are naturally gluten-free as we use corn tortillas.",
    },
    {
      icon: "⚠️",
      title: "Allergies & Restrictions",
      description: "Please notify your server about any allergies or dietary restrictions before ordering.",
    },
    {
      icon: "📋",
      title: "Customized Orders",
      description: "We are happy to customize dishes to accommodate your dietary needs whenever possible.",
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
              Vegetarian & Gluten-Free Options
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              At OH México we want everyone to enjoy our authentic Mexican cuisine. We offer{" "}
              <strong>vegetarian and gluten-free options</strong> to accommodate your dietary needs.
            </p>
          </div>

          {/* Direct answer */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 mb-12 text-center">
            <div className="text-6xl mb-4">🥗🌮</div>
            <h2 className="text-2xl font-bold mb-3 text-primary">
              YES, OPTIONS ARE AVAILABLE!
            </h2>
            <p className="text-lg text-foreground/70">
              Whether you are vegetarian, vegan, or gluten-free, we have something for you.
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
              Have specific dietary needs?
            </h2>
            <p className="text-foreground/70 mb-6">
              Book your table and add a note about your dietary restrictions so we can prepare accordingly.
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

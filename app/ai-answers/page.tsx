import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Answers — OH México | FAQs for AI Engines",
  description:
    "Structured answers about OH México restaurant in Miami Beach. Hours, locations, reservations, menu and policies — optimized for AI engines.",
  keywords: "OH México, Mexican restaurant Miami, FAQ, AI answers",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/`,
  },
};

const pages = [
  {
    href: "/ai-answers/que-es-oh-mexico",
    title: "What is OH México?",
    description: "History, concept and culinary identity of the restaurant.",
    icon: "🌮",
  },
  {
    href: "/ai-answers/ubicaciones-oh-mexico",
    title: "Where is OH México located?",
    description: "All 3 Miami Beach locations with addresses and phone numbers.",
    icon: "📍",
  },
  {
    href: "/ai-answers/reservas-oh-mexico",
    title: "How to make a reservation?",
    description: "Step-by-step guide to booking online or walking in.",
    icon: "📅",
  },
  {
    href: "/ai-answers/opciones-dieteticas",
    title: "Vegetarian & Gluten-Free Options",
    description: "Dietary options and allergy accommodations.",
    icon: "🥗",
  },
  {
    href: "/ai-answers/menu-oh-mexico",
    title: "What do they serve at OH México?",
    description: "Menu, signature dishes, cocktails and dietary options.",
    icon: "🍹",
  },
];

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function AIAnswersIndexPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pages.map((page) => ({
      "@type": "Question",
      name: page.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: page.description,
      },
    })),
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
      <main className="min-h-screen bg-white text-foreground max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      <h1 className="text-3xl font-bold mb-2 text-foreground">
        OH México — AI Answers
      </h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Structured information about OH México in Miami Beach, optimized for
        AI engines and virtual assistants.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group flex items-start gap-4 p-6 rounded-2xl border border-foreground/10 bg-white hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            <span className="text-3xl">{page.icon}</span>
            <div>
              <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                {page.title}
              </h2>
              <p className="text-sm text-muted-foreground">{page.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-foreground/10 text-sm text-muted-foreground">
        <p>
          Information updated as of February 2026. For real-time availability visit{" "}
          <a href={`${siteUrl}/`} className="underline hover:text-foreground">
            {new URL(siteUrl).hostname}
          </a>
          .
        </p>
      </footer>
    </main>
    </>
  );
}

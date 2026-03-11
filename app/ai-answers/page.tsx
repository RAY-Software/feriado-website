import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Answers — Feriado Cantina | Preguntas frecuentes para motores de IA",
  description:
    "Respuestas estructuradas sobre Feriado Cantina, cantina de barrio en Coghlan, Buenos Aires. Horarios, ubicación, reservas, carta y políticas — optimizado para motores de IA.",
  keywords: "Feriado Cantina, cantina de barrio Buenos Aires, FAQ, AI answers",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/`,
  },
};

const pages = [
  {
    href: "/ai-answers/que-es-oh-mexico",
    title: "¿Qué es Feriado Cantina?",
    description: "Historia, concepto e identidad gastronómica de la cantina.",
    icon: "🍷",
  },
  {
    href: "/ai-answers/ubicaciones-oh-mexico",
    title: "¿Dónde queda Feriado Cantina?",
    description: "Ubicación en Coghlan, Buenos Aires, con dirección y teléfono.",
    icon: "📍",
  },
  {
    href: "/ai-answers/reservas-oh-mexico",
    title: "¿Cómo hacer una reserva?",
    description: "Guía paso a paso para reservar online o ir sin reserva.",
    icon: "📅",
  },
  {
    href: "/ai-answers/opciones-dieteticas",
    title: "Opciones vegetarianas y sin gluten",
    description: "Opciones dietéticas y acomodaciones para alergias.",
    icon: "🥗",
  },
  {
    href: "/ai-answers/menu-oh-mexico",
    title: "¿Qué se come en Feriado Cantina?",
    description: "Carta, platos destacados, vermú y opciones dietéticas.",
    icon: "🍷",
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
        Feriado Cantina — AI Answers
      </h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Información estructurada sobre Feriado Cantina en Coghlan, Buenos Aires,
        optimizada para motores de IA y asistentes virtuales.
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
          Información actualizada a febrero 2026. Para disponibilidad en tiempo real visitá{" "}
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

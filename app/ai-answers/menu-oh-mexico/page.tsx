import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "What does OH México serve? — Menu, Dishes & Cocktails Miami Beach",
  description:
    "OH México serves Taco Birria, Tampiqueña Steak, guacamole, handcrafted cocktails including Cantaritos, Tequila Pops and Margaritas. Vegetarian and gluten-free options available.",
  keywords: "OH México menu, OH México tacos, OH México cocktails, taco birria Miami, cantarito Miami Beach, Tampiqueña Steak Miami, guacamole Miami",
  robots: "index, follow",
  alternates: {
    canonical: `${siteUrl}/ai-answers/menu-oh-mexico`,
  },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function MenuOhMexicoPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();
  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: "What kind of food and drinks does OH México serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "OH México serves authentic Mexican cuisine made from scratch. Signature dishes include Taco Birria (slow braised beef with melted Mexican cheese, birria broth, onion and cilantro) and Tampiqueña Steak (grilled skirt steak with a guajillo enchilada and guacamole). Also featured are TACOH!S (AL PASTOR, Carne Asada, Cochinita pibil, Baja fish), Guacamole Oh! México and Enchiladas. For drinks: Cantaritos (Smoky Watermelon, Flor de Mayo, Paloma), Tequila Pops and handcrafted Margaritas. Also available: mocktails, micheladas and an extensive selection of tequilas and mezcals. Vegetarian and gluten-free options available.",
      },
    },
  };

  const dishes = [
    {
      name: "Taco Birria",
      description: "Slow braised beef with melted Mexican cheese, birria broth, onion and cilantro. One of the menu's most beloved dishes.",
      icon: "🌮",
      tag: "Signature",
    },
    {
      name: "Tampiqueña Steak",
      description: "Grilled skirt steak with a cheese-filled enchilada covered in guajillo sauce and guacamole. A true Mexican classic.",
      icon: "🥩",
      tag: "Classic",
    },
    {
      name: "Guacamole Oh! México",
      description: "Fresh Hass avocados, tomatoes, charred corn, serrano peppers, red onions, cilantro and roasted pumpkin seeds.",
      icon: "🥑",
      tag: "Favorite",
    },
  ];

  const drinks = [
    {
      name: "Smoky Watermelon Cantarito",
      description: "One of OH México's signature cantaritos — bold, smoky and refreshing. Also available: Flor de Mayo, Paloma, Chachalaca and Mezcal Negroni.",
      icon: "🍉",
      tag: "Signature",
    },
    {
      name: "Tequila Pops",
      description: "Mango peach pop, Watermelon blackberry pop and Passion fruit strawberry pop. Fresh and perfect to pair with your meal.",
      icon: "🥂",
      tag: "Specialty",
    },
    {
      name: "Margaritas & Cocktails",
      description: "OH México Margarita, Skinny, Cadillac, La Vieja and more — on the rocks or frozen. Plus mocktails, micheladas and an extensive tequila and mezcal list.",
      icon: "🍹",
      tag: "Full menu",
    },
  ];

  const dietaryOptions = [
    { icon: "🥬", label: "Vegetarian options available" },
    { icon: "🌾", label: "Gluten-free dishes available" },
    { icon: "⚠️", label: "Let us know about allergies when booking" },
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
              What does OH México serve?
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              Authentic Mexican cuisine made <strong>from scratch</strong> with traditional
              recipes and fresh ingredients, plus handcrafted signature cocktails.
            </p>
          </div>

          {/* Summary */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold mb-3 text-primary">In a nutshell</h2>
            <p className="text-foreground/80">
              Artisanal TACOH!S, grilled meats, guacamoles, seafood appetizers, handcrafted cocktails and the spirit of Mexico.
              Every dish made from scratch. Vegetarian and gluten-free options available.
            </p>
          </div>

          {/* Food */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-2">
              🍽️ Featured dishes
            </h2>
            <div className="space-y-4">
              {dishes.map((dish) => (
                <div key={dish.name} className="bg-white rounded-2xl border border-foreground/10 p-6 flex gap-4">
                  <span className="text-4xl">{dish.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{dish.name}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{dish.tag}</span>
                    </div>
                    <p className="text-foreground/70">{dish.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-foreground/10 pb-2">
              🍹 Drinks
            </h2>
            <div className="space-y-4">
              {drinks.map((drink) => (
                <div key={drink.name} className="bg-white rounded-2xl border border-foreground/10 p-6 flex gap-4">
                  <span className="text-4xl">{drink.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{drink.name}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{drink.tag}</span>
                    </div>
                    <p className="text-foreground/70">{drink.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary options */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 mb-12">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              Dietary options
            </h2>
            <div className="space-y-3">
              {dietaryOptions.map((option) => (
                <div key={option.label} className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <p className="text-foreground/70">{option.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl border border-foreground/10 p-8 text-center">
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              Ready to try OH México?
            </h2>
            <p className="text-foreground/70 mb-6">
              Book your table and enjoy the full experience.
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

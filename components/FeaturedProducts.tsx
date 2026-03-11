"use client";

import { useState, useCallback } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import Link from "next/link";

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    name: "Tampiqueña Steak",
    description:
      "Grilled skirt steak served with enchilada, rice, beans and guacamole — a classic Tampiqueña from northern Mexico.",
    price: "",
    image: "/image/Tampiquena-steak2.jpg",
  },
  {
    name: "Seared Tuna Tostada",
    description:
      "Crispy tostada topped with seared tuna, avocado and house-made sauces for the perfect bite in every crunch.",
    price: "",
    image: "/image/Tostada-de-atun.jpg",
  },
  {
    name: "Molcajete Mixto",
    description:
      "Sizzling hot molcajete with a mix of meats, melted cheese and roasted salsa to share at the center of the table.",
    price: "",
    image: "/image/molcajete-mixto.jpg",
  },
  {
    name: "Taco Birria",
    description:
      "Slow braised beef with melted Mexican cheese, birria broth, onion and cilantro. One of our most beloved tacos.",
    price: "",
    image: "/image/tacos-de-birria.jpg",
  },
  {
    name: "Michelada",
    description:
      "Classic Mexican beer cocktail with lime, spices and our house mix — the perfect refresher on Miami Beach.",
    price: "",
    image: "/image/Oh-Mexico-1.jpg",
  },
  {
    name: "Margaritas",
    description:
      "Signature margaritas shaken with fresh lime juice and premium tequila, available in several refreshing flavors.",
    price: "",
    image: "/image/Oh-Mexico-13.jpg",
  },
];

export function FeaturedProducts() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleProductClick = useCallback((index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="menu"
      className="pt-8 pb-24 relative overflow-hidden scroll-mt-24"
      style={{ backgroundColor: "rgb(255 255 255)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
              Our favorites
            </h2>
          </div>

          <div className="mt-6 sm:mt-0 flex-shrink-0">
            <Link
              href="/menu"
              prefetch={false}
              className="flex items-center justify-between pl-6 pr-5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold transition-colors duration-300 rounded-xl text-base md:text-lg"
            >
              <span>View menu</span>
              <span className="ml-2 text-xl leading-none">›</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4">
          {products.map((item, index) => {
            const isSelected = selectedIndex === index;
            const hasSelection = selectedIndex !== null;
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleProductClick(index)
                }
                className={`relative cursor-pointer rounded-xl overflow-hidden ${
                  hasSelection ? "" : "hover:scale-[1.02]"
                }`}
                style={{
                  transform: isSelected ? "scale(1.05)" : undefined,
                  zIndex: isSelected ? 20 : 10,
                  transition: "transform 0.35s ease-out, box-shadow 0.35s ease-out",
                  contain: "layout paint",
                }}
                onClick={() => handleProductClick(index)}
              >
                <div className="relative h-64 md:h-80 lg:h-96">
                  <ResponsiveImage
                    src={item.image}
                    alt={`${item.name} - Authentic Mexican Food in Miami`}
                    fill
                    mobileSrc={item.image}
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div
                  className={`absolute inset-0 flex flex-col justify-end ${
                    isSelected ? "p-4 md:p-6 lg:p-8" : "p-3 md:p-4 lg:p-6"
                  }`}
                  style={{ transition: "padding 0.25s ease-out" }}
                >
                  <h3 className="font-bold text-white leading-tight mb-1 drop-shadow-lg text-sm md:text-base">
                    {item.name}
                  </h3>

                  {isSelected && (
                    <div className="transition-opacity duration-200 opacity-100">
                      <p className="text-foreground text-[10px] md:text-xs mb-1 leading-tight drop-shadow-md">
                        {item.description}
                      </p>
                      <Link
                        href="/menu"
                        className="inline-block w-full bg-primary hover:bg-venetian-red text-primary-foreground font-medium text-center py-1.5 px-3 rounded-md transition-colors duration-200 text-xs md:text-sm drop-shadow-sm"
                        style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.3)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Order now
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

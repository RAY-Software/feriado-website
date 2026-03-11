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
  { name: "Tortilla Española", description: "Tortilla babé, nuestra especialidad. Jugosa por dentro, dorada por fuera.", price: "", image: "/image/AVICMEDIA-82.jpg" },
  { name: "Pizza al Corte", description: "Pizza media masa al corte, estilo cantina. Recién salida del horno.", price: "", image: "/image/AVICMEDIA-118.jpg" },
  { name: "Vermú Feriado", description: "Nuestro vermú de la casa. Rosado o Rojo, con soda y hielo. Día ganado.", price: "", image: "/image/sifon-vasoicon.png" },
  { name: "Sanguche de Bondiola", description: "Bondiola braseada con chimichurri y cebolla caramelizada en pan casero.", price: "", image: "/image/AVICMEDIA-160.jpg" },
  { name: "Pasta Casera", description: "Pastas frescas hechas en casa, con salsas de la abuela.", price: "", image: "/image/AVICMEDIA-184.jpg" },
  { name: "Coctelería", description: "Tragos de autor, clásicos y creaciones de la casa. Para brindar siempre.", price: "", image: "/image/DSC08578-1-1.jpg" },
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
              Nuestros favoritos
            </h2>
          </div>

          <div className="mt-6 sm:mt-0 flex-shrink-0">
            <Link
              href="/menu"
              prefetch={false}
              className="flex items-center justify-between pl-6 pr-5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold transition-colors duration-300 rounded-xl text-base md:text-lg"
            >
              <span>Ver carta</span>
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
                    alt={`${item.name} - Feriado Cantina - Cocina de cantina en Buenos Aires`}
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
                        Pedir
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

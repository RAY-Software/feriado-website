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
    name: "Tortilla Babé",
    description:
      "Nuestra tortilla de papas cremosa por dentro, doradita por fuera. El plato estrella de Feriado Cantina.",
    price: "",
    image: "/image/feriado/aceituna.png",
  },
  {
    name: "Milanesa Napolitana",
    description:
      "Milanesa de ternera con salsa de tomate, jamón y queso gratinado. Un clásico argentino como tiene que ser.",
    price: "",
    image: "/image/feriado/silla.png",
  },
  {
    name: "Pizza Media Masa",
    description:
      "Pizza al corte de media masa, crocante y generosa. Mozzarella, tomate y la que más te guste.",
    price: "",
    image: "/image/feriado/disco.png",
  },
  {
    name: "Vermú Feriado",
    description:
      "Nuestro vermú de la casa: Feriado Rosado o Rojo, con soda, hielo y rodaja de naranja. Perfecto para la sobremesa.",
    price: "",
    image: "/image/feriado/sifon-vaso.png",
  },
  {
    name: "Pastas Caseras",
    description:
      "Sorrentinos, tallarines, ravioles y más. Hechas en casa con las mejores salsas. Especial los jueves.",
    price: "",
    image: "/image/feriado/vaso-vermu.png",
  },
  {
    name: "Picada de la Casa",
    description:
      "Aceitunas, quesos, fiambres y pan casero. La compañera ideal del vermú de barrio.",
    price: "",
    image: "/image/feriado/frase-casa.png",
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
      className="pt-8 pb-24 relative overflow-hidden scroll-mt-24 bg-background"
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
              <span>Ver menú</span>
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
                className={`relative cursor-pointer rounded-xl overflow-hidden bg-white ${
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
                <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center p-4 bg-feriado-cream">
                  <ResponsiveImage
                    src={item.image}
                    alt={`${item.name} - Feriado Cantina`}
                    width={400}
                    height={400}
                    mobileSrc={item.image}
                    className="object-contain max-h-full"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />

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
                      <p className="text-white text-[10px] md:text-xs mb-1 leading-tight drop-shadow-md">
                        {item.description}
                      </p>
                      <a
                        href="https://pedir.tucan.la/menu/Feriadocoghlan/Sal%C3%B3n"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-center py-1.5 px-3 rounded-md transition-colors duration-200 text-xs md:text-sm drop-shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Pedir ahora
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-feriado-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-feriado-red/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

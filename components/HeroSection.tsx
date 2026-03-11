"use client";

import { useState, useEffect } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

// Imágenes del carrusel hero (misma función que temple-mexico: cross-fade cada 7.5s)
const heroImages = [
  {
    src: "/image/AVICMEDIA-82.jpg",
    alt: "Feriado Cantina ambiente y gastronomía",
  },
  {
    src: "/image/AVICMEDIA-118.jpg",
    alt: "Feriado Cantina experiencia",
  },
  {
    src: "/image/AVICMEDIA-160.jpg",
    alt: "Feriado Cantina momentos",
  },
  {
    src: "/image/AVICMEDIA-184.jpg",
    alt: "Feriado Cantina",
  },
  {
    src: "/image/DSC08578-1-1.jpg",
    alt: "Feriado Cantina — cantina de barrio en Buenos Aires",
  },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Carrusel: cambia de imagen cada 7.5 segundos con cross-fade (como temple-mexico)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex =
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1;
        setPrevImageIndex(prevIndex);
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
        return nextIndex;
      });
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative h-[80vh] flex items-end overflow-hidden scroll-mt-24"
    >
      {/* Cross-fade entre imagen anterior y actual (misma lógica que temple-mexico) */}
      <div className="absolute inset-0">
        {prevImageIndex !== null && (
          <ResponsiveImage
            key={`prev-${prevImageIndex}`}
            src={heroImages[prevImageIndex].src}
            alt={heroImages[prevImageIndex].alt}
            fill
            mobileSrc={heroImages[prevImageIndex].src}
            className="object-cover object-center transition-opacity duration-1000 opacity-100"
          />
        )}
        <ResponsiveImage
          key={`current-${currentImageIndex}`}
          src={heroImages[currentImageIndex].src}
          alt={heroImages[currentImageIndex].alt}
          fill
          mobileSrc={heroImages[currentImageIndex].src}
          className={`object-cover object-center transition-opacity duration-1000 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-graphite-black/70 via-graphite-black/30 to-transparent" />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8 lg:pb-16 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
            Ricos tragos, tortilla babé y largas sobremesas.
          </h1>
          <p className="text-xl md:text-2xl text-surface-dark-muted mb-6">
            La casa de Feriado Vermú. Es donde te juntás con amigos, familia y amores. Es buen comer y buen beber, todos los días, todo el día.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#reservar-mesa"
              className="inline-flex items-center justify-between pl-4 pr-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium transition-colors rounded-xl text-base"
            >
              <span>Reservar</span>
              <span className="ml-2 text-lg font-light">›</span>
            </a>
            <a
              href="https://pedir.tucan.la/menu/Feriadocoghlan/Salón"
              className="inline-flex items-center justify-between pl-4 pr-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors rounded-xl text-base"
            >
              <span>Pedir online</span>
              <span className="ml-2 text-lg font-light">›</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

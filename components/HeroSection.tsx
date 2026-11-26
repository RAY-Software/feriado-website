"use client";

import { useState, useEffect } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const heroImages = [
  {
    src: "/image/feriado/logo-cantina.png",
    alt: "Feriado Cantina — cantina de barrio",
  },
  {
    src: "/image/feriado/sifon-vaso.png",
    alt: "Vermú Feriado con soda",
  },
  {
    src: "/image/feriado/vaso-vermu.png",
    alt: "Vermú Feriado",
  },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      className="relative h-[80vh] flex items-end overflow-hidden scroll-mt-24 bg-feriado-cream"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {prevImageIndex !== null && (
          <ResponsiveImage
            key={`prev-${prevImageIndex}`}
            src={heroImages[prevImageIndex].src}
            alt={heroImages[prevImageIndex].alt}
            width={600}
            height={600}
            mobileSrc={heroImages[prevImageIndex].src}
            className="object-contain max-h-[50vh] transition-opacity duration-1000 opacity-100"
          />
        )}
        <ResponsiveImage
          key={`current-${currentImageIndex}`}
          src={heroImages[currentImageIndex].src}
          alt={heroImages[currentImageIndex].alt}
          width={600}
          height={600}
          mobileSrc={heroImages[currentImageIndex].src}
          className={`object-contain max-h-[50vh] transition-opacity duration-1000 absolute ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-feriado-cream/90 via-feriado-cream/30 to-transparent" />
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8 lg:pb-16 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-foreground">
            La casa de Feriado Vermú en Coghlan.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Comida casera, vermú de barrio y largas sobremesas. Ricos tragos, tortilla babé y buena compañía. Te esperamos.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#reservar-mesa"
              className="inline-flex items-center justify-between pl-4 pr-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium transition-colors rounded-xl text-base"
            >
              <span>Reservar mesa</span>
              <span className="ml-2 text-lg font-light">›</span>
            </a>
            <a
              href="https://pedir.tucan.la/menu/Feriadocoghlan/Sal%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
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

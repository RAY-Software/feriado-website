"use client";

import { useState, useEffect } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

// Imágenes del carrusel hero (misma función que temple-mexico: cross-fade cada 7.5s)
const heroImages = [
  {
    src: "/image/AVICMEDIA-82.jpg",
    alt: "OH México ambiente y gastronomía",
  },
  {
    src: "/image/AVICMEDIA-118.jpg",
    alt: "OH México experiencia",
  },
  {
    src: "/image/AVICMEDIA-160.jpg",
    alt: "OH México momentos",
  },
  {
    src: "/image/AVICMEDIA-184.jpg",
    alt: "OH México",
  },
  {
    src: "/image/DSC08578-1-1.jpg",
    alt: "OH México — auténtica cocina mexicana en Miami",
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
            Authentic Mexican flavors, right here in Miami Beach.
          </h1>
          <p className="text-xl md:text-2xl text-surface-dark-muted mb-6">
            From authentic Mexican dishes to handcrafted cocktails, experience the vibrant spirit of Mexico in every bite and sip. Serving Miami since 1997.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#reservar-mesa"
              className="inline-flex items-center justify-between pl-4 pr-6 py-3 bg-accent hover:bg-[#b86b1f] text-white font-medium transition-colors rounded-xl text-base"
            >
              <span>Book now</span>
              <span className="ml-2 text-lg font-light">›</span>
            </a>
            <a
              href="#order-online"
              className="inline-flex items-center justify-between pl-4 pr-6 py-3 bg-primary hover:bg-[#9a3528] text-primary-foreground font-medium transition-colors rounded-xl text-base"
            >
              <span>Order online</span>
              <span className="ml-2 text-lg font-light">›</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

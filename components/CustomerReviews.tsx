"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  location?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Martín G.",
    rating: 5,
    text: "Un lugar espectacular en Coghlan. La tortilla babé es increíble y el vermú Feriado es lo mejor que probé. Ambiente de barrio perfecto para ir con amigos.",
    location: "Coghlan",
  },
  {
    id: 2,
    name: "Lucía P.",
    rating: 5,
    text: "Me encanta Feriado Cantina, la comida es casera y abundante. Las pastas del jueves son imperdibles. Gran atención y la vereda es ideal para las tardes de sol.",
    location: "Belgrano",
  },
  {
    id: 3,
    name: "Santiago R.",
    rating: 5,
    text: "La mejor cantina de barrio de Buenos Aires. El vermú con soda y las aceitunas son el combo perfecto. Siempre volvemos.",
    location: "Saavedra",
  },
  {
    id: 4,
    name: "Camila D.",
    rating: 5,
    text: "Feriado Cantina tiene esa onda de bodegón porteño que tanto se extrañaba. La milanesa napolitana es un viaje de ida. Recomendadísimo.",
    location: "Villa Urquiza",
  },
  {
    id: 5,
    name: "Federico M.",
    rating: 5,
    text: "Vinimos por el vermú y nos quedamos por todo. Pizzas de media masa espectaculares, postres caseros y una atención de diez. Barrio Coghlan tiene su joya.",
    location: "Núñez",
  },
  {
    id: 6,
    name: "Valentina S.",
    rating: 5,
    text: "Pet friendly, buena música, comida riquísima y precios justos. ¿Qué más se puede pedir? Feriado Cantina es nuestro lugar favorito del barrio.",
    location: "Coghlan",
  },
];

const avatarImages = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-6.webp",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
  "/avatars/avatar-5.webp",
  "/avatars/avatar-2.png",
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const getVisibleReviews = () => {
    const visibleCount = Math.min(3, reviews.length);
    const visibleReviews = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  const renderStars = (rating: number) =>
    Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-feriado-yellow text-feriado-yellow" />
    ));

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="relative">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200 shadow-md"
              aria-label="Reseña anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200 shadow-md"
              aria-label="Reseña siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out">
              {getVisibleReviews().map((review, index) => (
                <div
                  key={`${review.id}-${currentIndex}-${index}`}
                  className="bg-white rounded-2xl p-8 shadow-md transition-shadow duration-300 hover:shadow-lg flex flex-col min-h-[260px] border border-foreground/10 border-l-4 border-l-feriado-red"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-foreground text-base leading-relaxed mb-6 flex-1">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-feriado-cream ring-2 ring-feriado-blue/30">
                      <ResponsiveImage
                        src={avatarImages[(review.id - 1) % avatarImages.length]}
                        alt={`${review.name} avatar`}
                        width={40}
                        height={40}
                        mobileSrc={avatarImages[(review.id - 1) % avatarImages.length]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-foreground font-medium text-base">
                        {review.name}
                      </h3>
                      {review.location && (
                        <p className="text-muted-foreground text-sm">
                          {review.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "bg-feriado-blue w-6"
                    : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                aria-label={`Ir a reseña ${index + 1}`}
                title={`Ir a reseña ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    name: "Diego G.",
    rating: 5,
    text: "Amazing food and atmosphere. The al pastor tacos and micheladas are unbelievable. Every time I come to OH México I leave happy — there's nothing like it.",
    location: "Miami",
  },
  {
    id: 2,
    name: "Carmen Z.",
    rating: 5,
    text: "The loaded fries with cheese and bacon are incredible. The drinks are perfectly made and the music sets just the right mood. Never left disappointed.",
    location: "Brickell",
  },
  {
    id: 3,
    name: "Miguel C.",
    rating: 5,
    text: "Best spot for a night out. The quesadillas and cocktails are top-notch. Pet friendly too — huge plus!",
    location: "Wynwood",
  },
  {
    id: 4,
    name: "Santiago M.",
    rating: 5,
    text: "Great food, great service, never misses. The tequila tacos and the drink selection are outstanding. Highly recommend.",
    location: "Coral Gables",
  },
  {
    id: 5,
    name: "Roberto R.",
    rating: 5,
    text: "I come here often and it never disappoints. The micheladas are spectacular and the guacamole is next level. Great vibes all around.",
    location: "South Beach",
  },
  {
    id: 6,
    name: "Ana L.",
    rating: 5,
    text: "Love this place! The food is delicious and the service is always excellent. Happy hour is a must. 100% recommended!",
    location: "Midtown",
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
      <Star key={i} className="w-4 h-4 fill-occre text-occre" />
    ));

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            What our guests say
          </h2>
        </div>

        <div className="relative">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-accent hover:bg-accent/90 text-white transition-colors duration-200 shadow-md"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-accent hover:bg-accent/90 text-white transition-colors duration-200 shadow-md"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out">
              {getVisibleReviews().map((review, index) => (
                <div
                  key={`${review.id}-${currentIndex}-${index}`}
                  className="bg-white rounded-2xl p-8 shadow-md transition-shadow duration-300 hover:shadow-lg flex flex-col min-h-[260px] border border-foreground/10 border-l-4 border-l-accent"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-foreground text-base leading-relaxed mb-6 flex-1">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-pale-chestnut/40 ring-2 ring-accent/30">
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
                    ? "bg-accent w-6"
                    : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                aria-label={`Go to review slide ${index + 1}`}
                title={`Go to review slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

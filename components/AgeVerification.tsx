"use client";

import { useState, useEffect, useRef } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPositionRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check localStorage only on client side
    const isVerified = localStorage.getItem("age-verified");
    if (!isVerified) {
      scrollPositionRef.current = window.scrollY;

      setIsOpen(true);
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (isClient && !isOpen) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      
      if (scrollPositionRef.current !== null) {
        window.scrollTo({ top: scrollPositionRef.current, behavior: "auto" });
        scrollPositionRef.current = null;
      }
    }
  }, [isOpen, isClient]);

  const handleVerify = () => {
    localStorage.setItem("age-verified", "true");
    setIsOpen(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.responsibility.org/";
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-surface-dark/95 backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full mx-4 rounded-lg border border-foreground/10 p-8 text-center bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <ResponsiveImage
            src="/image/image-removebg-preview.png"
            alt="OH México"
            width={190}
            height={64}
            mobileSrc="/image/image-removebg-preview.png"
            className="w-40 h-auto object-contain"
          />
          
          <h2 className="font-headline text-3xl font-bold tracking-wide text-graphite-black uppercase">
            Are you over 21 years old?
          </h2>
          
          <div className="flex gap-4 w-full mt-4">
            <Button
              className="w-full bg-primary hover:bg-[#9a3528] text-primary-foreground text-lg py-6"
              onClick={handleVerify}
            >
              YES
            </Button>
            
            <Button
              className="w-full bg-transparent hover:bg-black/5 text-graphite-black border border-graphite-black/20 text-lg py-6"
              onClick={handleReject}
            >
              NO
            </Button>
          </div>
          
          <p className="text-sm text-graphite-black/70 mt-4 font-body leading-relaxed">
            This website contains information about alcoholic beverages. You must be of legal drinking age to enter this site.
          </p>
        </div>
      </div>
    </div>
  );
}

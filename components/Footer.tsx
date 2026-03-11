"use client";

import React from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useRouter, usePathname } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToLocations = () => {
    if (pathname !== "/locations") {
      router.push("/locations");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToHome = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) || window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) || window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToReservar = () => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => document.getElementById("reservar-mesa")?.scrollIntoView({ behavior: "smooth" }), 200);
    } else {
      document.getElementById("reservar-mesa")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateTop = (path: string) => {
    if (pathname !== path) {
      router.push(path);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="py-2 lg:py-3 bg-white border-t border-gray-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50/90 backdrop-blur-sm rounded-2xl px-16 pt-8 pb-8 lg:px-32 lg:pt-10 lg:pb-10 mx-4 lg:mx-8 border border-gray-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 lg:items-start">
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <ResponsiveImage
                src="/image/OH-Mexico.png"
                alt="OH! Mexico Restaurant & Tequileria"
                width={260}
                height={80}
                mobileSrc="/image/OH-Mexico.png"
                className="h-16 w-auto object-contain lg:h-20 min-w-[200px] lg:min-w-[260px]"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-6">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8 mb-4 lg:mb-0">
                  <button
                    onClick={handleScrollToHome}
                    aria-label="Scroll to home section"
                    className="text-foreground hover:opacity-90 transition-colors font-medium cursor-pointer"
                  >
                    Home
                  </button>
                  <button
                    onClick={handleScrollToLocations}
                    aria-label="Scroll to locations section"
                    className="text-foreground hover:opacity-90 transition-colors font-medium cursor-pointer"
                  >
                    Locations
                  </button>
                </div>
                <div className="flex justify-center lg:justify-end items-center">
                  <button
                    onClick={handleScrollToReservar}
                    aria-label="Scroll to reservations section"
                    className="relative flex items-center justify-between pl-3 pr-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                    <span>Reservations</span>
                    <span className="ml-2 text-lg font-light">›</span>
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 mb-12" />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <button
                  onClick={() => handleNavigateTop("/terminos-y-politicas")}
                  aria-label="Navigate to Terms & Policies page"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer"
                >
                  Terms & Policies
                </button>
                <a
                  href="https://www.ohmexicorestaurant.com/newsroom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Newsroom
                </a>
                <a
                  href="https://www.ohmexicorestaurant.com/privacy-policy-2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <button
                  onClick={() => handleNavigateTop("/accessibility-statement")}
                  aria-label="Navigate to Accessibility Statement page"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer"
                >
                  Accessibility Statement
                </button>
                <a
                  href="https://www.verestaurants.com/careers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Careers
                </a>
                <a
                  href="https://www.vidayestilo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Affiliated with Vida y Estilo
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mx-8 sm:mx-16 lg:mx-24 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/ohmexico/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:opacity-90 transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          <div className="text-foreground text-sm text-center">
            © {new Date().getFullYear()} OH MÉXICO. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.rayapp.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center pl-2 pr-2 py-0.5 border-2 border-gray-300 text-foreground rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="text-sm mr-1">Powered by</span>
              <ResponsiveImage src="/raylogo.png" alt="RAY logo" width={24} height={24} mobileSrc="/raylogo.png" className="h-6 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useRouter, usePathname } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToLocations = () => {
    if (pathname !== "/ubicaciones") {
      router.push("/ubicaciones");
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
    <footer className="py-2 lg:py-3 bg-secondary border-t border-feriado-red/20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-feriado-red/90 backdrop-blur-sm rounded-2xl px-16 pt-8 pb-8 lg:px-32 lg:pt-10 lg:pb-10 mx-4 lg:mx-8 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 lg:items-start">
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <ResponsiveImage
                src="/image/feriado/logo-cantina.png"
                alt="Feriado Cantina"
                width={260}
                height={80}
                mobileSrc="/image/feriado/logo-cantina.png"
                className="h-16 w-auto object-contain lg:h-20 min-w-[200px] lg:min-w-[260px] brightness-0 invert"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between mb-6">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8 mb-4 lg:mb-0">
                  <button
                    onClick={handleScrollToHome}
                    aria-label="Ir al inicio"
                    className="text-white hover:opacity-90 transition-colors font-medium cursor-pointer"
                  >
                    Inicio
                  </button>
                  <button
                    onClick={handleScrollToLocations}
                    aria-label="Ir a ubicación"
                    className="text-white hover:opacity-90 transition-colors font-medium cursor-pointer"
                  >
                    Ubicación
                  </button>
                </div>
                <div className="flex justify-center lg:justify-end items-center">
                  <button
                    onClick={handleScrollToReservar}
                    aria-label="Ir a reservas"
                    className="relative flex items-center justify-between pl-3 pr-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                    <span>Reservar</span>
                    <span className="ml-2 text-lg font-light">›</span>
                  </button>
                </div>
              </div>
              <div className="border-t border-white/20 mt-4 mb-12" />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <button
                  onClick={() => handleNavigateTop("/terminos-y-politicas")}
                  aria-label="Ir a Términos y Políticas"
                  className="text-white/70 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Términos y Políticas
                </button>
                <a
                  href="https://feriadovermu.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Feriado Vermú
                </a>
                <button
                  onClick={() => handleNavigateTop("/accessibility-statement")}
                  aria-label="Ir a Accesibilidad"
                  className="text-white/70 hover:text-white transition-colors text-sm cursor-pointer"
                >
                  Accesibilidad
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mx-8 sm:mx-16 lg:mx-24 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/feriadocantina/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-90 transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          <div className="text-white text-sm text-center">
            © {new Date().getFullYear()} Feriado Cantina. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.rayapp.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center pl-2 pr-2 py-0.5 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span className="text-sm mr-1">Powered by</span>
              <ResponsiveImage src="/raylogo.png" alt="RAY logo" width={24} height={24} mobileSrc="/raylogo.png" className="h-6 w-auto brightness-0 invert" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

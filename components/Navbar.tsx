"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu as MenuIcon, X } from "lucide-react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

export function Navbar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const router = useRouter();
   const pathname = usePathname();

   const scrollTo = (id: string) => {
      if (pathname !== "/") {
         router.push("/");
         setTimeout(
            () =>
               document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" }),
            200,
         );
      } else {
         document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setIsMenuOpen(false);
   };

   return (
      <nav
         className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-feriado-blue/10"
         style={{ backgroundColor: "rgba(235, 231, 218, 0.95)" }}
      >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[5.5rem]">
               <Link
                  href="/"
                  prefetch={false}
                  className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
                  onClick={() => scrollTo("home")}
               >
                  <ResponsiveImage
                     src="/image/feriado/logo-cantina.png"
                     alt="Feriado Cantina"
                     width={190}
                     height={64}
                     mobileSrc="/image/feriado/logo-cantina.png"
                     className="h-16 w-auto object-contain"
                     loading="eager"
                  />
               </Link>
               <div className="hidden lg:flex items-center gap-3">
                  <button
                     type="button"
                     onClick={() => scrollTo("home")}
                     aria-label="Ir al inicio"
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Inicio
                  </button>
                  <Link
                     href="/ubicaciones"
                     prefetch={false}
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Ubicación
                  </Link>
                  <button
                     type="button"
                     onClick={() => scrollTo("menu")}
                     aria-label="Ir al menú"
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Menú
                  </button>
                  <a
                     href="https://pedir.tucan.la/menu/Feriadocoghlan/Sal%C3%B3n"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-between pl-3 pr-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     <span>Pedir online</span>
                     <span className="ml-2 text-lg font-light">›</span>
                  </a>
                  <button
                     type="button"
                     onClick={() => scrollTo("reservar-mesa")}
                     aria-label="Ir a reservas"
                     className="flex items-center justify-between pl-3 pr-4 py-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     <span>Reservar</span>
                     <span className="ml-2 text-lg font-light">›</span>
                  </button>
               </div>
               <button
                  type="button"
                  className="lg:hidden p-2 text-foreground rounded-md hover:bg-feriado-cream transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menú"
               >
                  {isMenuOpen ? (
                     <X className="h-6 w-6" />
                  ) : (
                     <MenuIcon className="h-6 w-6" />
                  )}
               </button>
            </div>
            {isMenuOpen && (
               <div className="lg:hidden py-4 border-t border-feriado-blue/10 flex flex-col gap-1">
                  <button
                     type="button"
                     onClick={() => scrollTo("home")}
                     aria-label="Ir al inicio"
                     className="block text-left px-3 py-2 text-foreground hover:opacity-90 text-2xl font-medium transition-colors cursor-pointer"
                  >
                     Inicio
                  </button>
                  <Link
                     href="/ubicaciones"
                     prefetch={false}
                     onClick={() => setIsMenuOpen(false)}
                     className="block text-left px-3 py-2 text-foreground hover:opacity-90 text-2xl font-medium transition-colors cursor-pointer"
                  >
                     Ubicación
                  </Link>
                  <button
                     type="button"
                     onClick={() => scrollTo("menu")}
                     aria-label="Ir al menú"
                     className="block text-left w-fit px-3 py-2 text-foreground hover:opacity-90 text-2xl font-medium transition-colors cursor-pointer"
                  >
                     Menú
                  </button>
                  <a
                     href="https://pedir.tucan.la/menu/Feriadocoghlan/Sal%C3%B3n"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block w-fit px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     Pedir online ›
                  </a>
                  <button
                     type="button"
                     onClick={() => scrollTo("reservar-mesa")}
                     aria-label="Ir a reservas"
                     className="block text-left w-fit px-4 py-2.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     Reservar ›
                  </button>
               </div>
            )}
         </div>
      </nav>
   );
}

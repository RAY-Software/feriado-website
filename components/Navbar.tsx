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
         className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200/60"
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
                     src="/image/logo-new.png"
                     alt="Feriado Cantina"
                     width={190}
                     height={64}
                     mobileSrc="/image/logo-new.png"
                     className="h-16 w-auto object-contain"
                     loading="eager"
                  />
               </Link>
               <div className="hidden lg:flex items-center gap-3">
                  <button
                     type="button"
                     onClick={() => scrollTo("home")}
                     aria-label="Scroll to home section"
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Inicio
                  </button>
                  <Link
                     href="/ubicaciones"
                     prefetch={false}
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Ubicaciones
                  </Link>
                  <button
                     type="button"
                     onClick={() => scrollTo("menu")}
                     aria-label="Scroll to menu section"
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Carta
                  </button>
                  <Link
                     href="/order"
                     prefetch={false}
                     className="text-foreground hover:opacity-90 transition-colors text-base font-medium px-4 py-2 cursor-pointer"
                  >
                     Novedades
                  </Link>
                  <Link
                     href="https://pedir.tucan.la/menu/Feriadocoghlan/Salón"
                     prefetch={false}
                     className="flex items-center justify-between pl-3 pr-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     <span>Pedir online</span>
                     <span className="ml-2 text-lg font-light">›</span>
                  </Link>
                  <button
                     type="button"
                     onClick={() => scrollTo("reservar-mesa")}
                     aria-label="Scroll to reservations section"
                     className="flex items-center justify-between pl-3 pr-4 py-1.5 bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     <span>Reservar</span>
                     <span className="ml-2 text-lg font-light">›</span>
                  </button>
               </div>
               <button
                  type="button"
                  className="lg:hidden p-2 text-foreground rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Menu"
               >
                  {isMenuOpen ? (
                     <X className="h-6 w-6" />
                  ) : (
                     <MenuIcon className="h-6 w-6" />
                  )}
               </button>
            </div>
            {isMenuOpen && (
               <div className="lg:hidden py-4 border-t border-gray-200 flex flex-col gap-1">
                  <button
                     type="button"
                     onClick={() => scrollTo("home")}
                     aria-label="Scroll to home section"
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
                     Ubicaciones
                  </Link>
                  <button
                     type="button"
                     onClick={() => scrollTo("menu")}
                     aria-label="Scroll to menu section"
                     className="block text-left w-fit px-3 py-2 text-foreground hover:opacity-90 text-2xl font-medium transition-colors cursor-pointer"
                  >
                     Carta
                  </button>
                  <Link
                     href="/order"
                     prefetch={false}
                     onClick={() => setIsMenuOpen(false)}
                     className="block text-left w-fit px-3 py-2 text-foreground hover:opacity-90 text-2xl font-medium transition-colors cursor-pointer"
                  >
                     Novedades
                  </Link>
                  <Link
                     href="https://pedir.tucan.la/menu/Feriadocoghlan/Salón"
                     prefetch={false}
                     onClick={() => setIsMenuOpen(false)}
                     className="block w-fit px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     Pedir online ›
                  </Link>
                  <button
                     type="button"
                     onClick={() => scrollTo("reservar-mesa")}
                     aria-label="Scroll to reservations section"
                     className="block text-left w-fit px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors text-base font-medium cursor-pointer"
                  >
                     Reservar ›
                  </button>
               </div>
            )}
         </div>
      </nav>
   );
}

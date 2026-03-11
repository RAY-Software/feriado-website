"use client";

import { useEffect } from "react";

const USERWAY_ACCOUNT = "5zbRHKuroo";
const USERWAY_SRC = "https://cdn.userway.org/widget.js";

/**
 * Inyecta el widget de UserWay solo en el cliente.
 * Evita ejecutar document/body en SSR (que rompe y muestra el overlay de error de Next).
 * Evita que unhandled rejections con valores no-Error (ej. HTMLLinkElement) rompan el overlay de Next.
 */
export function UserWayWidget() {
   useEffect(() => {
      if (typeof window === "undefined") return;

      const onUnhandledRejection = (e: PromiseRejectionEvent) => {
         if (e.reason != null && !(e.reason instanceof Error)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.warn(
               "[UserWay/third-party] Unhandled rejection (non-Error):",
               e.reason,
            );
         }
      };
      window.addEventListener("unhandledrejection", onUnhandledRejection, true);

      if (document.querySelector(`script[data-account="${USERWAY_ACCOUNT}"]`)) {
         return () =>
            window.removeEventListener(
               "unhandledrejection",
               onUnhandledRejection,
               true,
            );
      }

      const s = document.createElement("script");
      s.setAttribute("data-account", USERWAY_ACCOUNT);
      s.setAttribute("data-position", "5"); // Bottom Left
      s.setAttribute("data-mobile-position", "5"); // Bottom Left on Mobile
      s.setAttribute("data-color", "#B33D26"); // Venetian Red
      s.setAttribute("src", USERWAY_SRC);
      (document.body || document.head).appendChild(s);

      return () =>
         window.removeEventListener(
            "unhandledrejection",
            onUnhandledRejection,
            true,
         );
   }, []);

   return null;
}

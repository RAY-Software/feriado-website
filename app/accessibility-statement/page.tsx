import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Declaración de Accesibilidad | Feriado Cantina",
  description:
    "Feriado Cantina se compromete a garantizar la accesibilidad digital para personas con discapacidades. Leé nuestra declaración de accesibilidad y cómo contactarnos para asistencia.",
  alternates: { canonical: `${siteUrl}/accessibility-statement` },
};

import { getOrganizationSchema, getRestaurantSchema } from "@/lib/schema";

export default function AccessibilityStatementPage() {
  const orgSchema = getOrganizationSchema();
  const restaurantSchemas = getRestaurantSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {restaurantSchemas.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Declaración de Accesibilidad
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Nuestro compromiso para garantizar que nuestro sitio web sea accesible para todos.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* General */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            General
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Feriado Cantina se esfuerza por garantizar que sus servicios sean
            accesibles para personas con discapacidades. Feriado Cantina ha
            invertido una cantidad significativa de recursos para ayudar a que su
            sitio web sea más fácil de usar y más accesible para personas con
            discapacidades, con la firme creencia de que los esfuerzos de
            accesibilidad web benefician a todos los usuarios y que cada persona
            tiene derecho a vivir con dignidad, igualdad, comodidad e
            independencia.
          </p>
        </section>

        {/* Accessibility on the website */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Accesibilidad en www.feriadocantina.com
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            www.feriadocantina.com ofrece el widget de accesibilidad web de
            UserWay, impulsado por un servidor de accesibilidad dedicado. El
            software permite a www.feriadocantina.com mejorar su cumplimiento
            con las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1).
          </p>
        </section>

        {/* Enabling the Accessibility Menu */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Activación del menú de accesibilidad
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            El menú de accesibilidad de www.feriadocantina.com se puede activar
            haciendo clic en el ícono del menú de accesibilidad que aparece en
            la esquina de la página. Después de activar el menú de
            accesibilidad, esperá un momento para que se cargue completamente.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Descargo de responsabilidad
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Feriado Cantina continúa sus esfuerzos para mejorar constantemente
            la accesibilidad de su sitio y servicios, con la creencia de que es
            nuestra obligación moral colectiva permitir un uso fluido, accesible
            y sin obstáculos también para quienes tienen discapacidades.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En un esfuerzo continuo por mejorar y solucionar problemas de
            accesibilidad, también escaneamos regularmente
            www.feriadocantina.com con el escáner de accesibilidad de UserWay
            para identificar y corregir cada posible barrera de accesibilidad en
            nuestro sitio. A pesar de nuestros esfuerzos por hacer que todas las
            páginas y contenidos de www.feriadocantina.com sean completamente
            accesibles, es posible que algunos contenidos aún no se hayan
            adaptado completamente a los estándares de accesibilidad más
            estrictos. Esto puede deberse a no haber encontrado o identificado
            la solución tecnológica más apropiada.
          </p>
        </section>

        {/* Third-Party Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Contenido de terceros
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Feriado Cantina puede contener enlaces a sitios web de terceros
            (&ldquo;Sitios de terceros&rdquo;). Estos enlaces se proporcionan
            únicamente como conveniencia y no como un respaldo de nuestra parte
            del contenido de dichos sitios. El contenido de dichos sitios es
            desarrollado y proporcionado por terceros, no por Feriado Cantina, y
            no tenemos control sobre ningún contenido o términos legales
            contenidos en los sitios de terceros. Debés contactar a los
            administradores de esos sitios si tenés alguna inquietud sobre
            dichos enlaces o cualquier contenido en sitios de terceros.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Feriado Cantina no garantiza, respalda ni asume ninguna
            responsabilidad por ningún producto o servicio anunciado u ofrecido
            por un tercero (&ldquo;Proveedor de servicios de terceros&rdquo;) a
            través de nuestro sitio web. Si utilizás algún producto o servicio
            proporcionado por un tercero en conjunto con nuestro sitio web,
            reconocés y aceptás que (i) sos responsable de comprender los
            términos y condiciones de uso del producto o servicio del tercero;
            (ii) no controlamos al tercero ni su producto o servicio; (iii) el
            uso de su producto o servicio es bajo tu propio riesgo; y (iv) no
            somos responsables y no podemos ser considerados responsables por el
            producto o servicio, o las acciones u omisiones del tercero. Sujeto
            a estos descargos de responsabilidad, podemos utilizar ciertos
            proveedores de servicios de terceros para recopilar datos y
            autenticar información sobre vos, tu dispositivo y tu cuenta.
          </p>
        </section>

        {/* Here For You */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Estamos para ayudarte
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Si tenés dificultades con cualquier contenido en
            www.feriadocantina.com o necesitás asistencia con alguna parte de
            nuestro sitio, contactanos durante el horario de atención que se
            detalla a continuación y con gusto te ayudaremos.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Contactanos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Si deseás reportar un problema de accesibilidad, tenés preguntas o
            necesitás asistencia, contactá al equipo de atención al cliente de
            Feriado Cantina:
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="font-semibold text-foreground">Email:</span>
            <Link
              href="mailto:hola@feriadocantina.com"
              className="text-primary hover:underline font-medium"
            >
              hola@feriadocantina.com
            </Link>
          </div>
        </section>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </article>
    </div>
    </>
  );
}

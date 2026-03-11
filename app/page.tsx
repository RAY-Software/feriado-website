import type { Metadata } from "next";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { BookingForm } from "@/components/BookingForm";
import { LocationsSection } from "@/components/LocationsSection";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { locations } from "@/lib/location-data";
import { siteUrl } from "@/lib/site";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import CustomerReviews from "@/components/CustomerReviews";
import { EventsSection } from "@/components/EventsSection";

export const metadata: Metadata = {
   alternates: {
      canonical: `${siteUrl}/`,
   },
};

const faqData = [
   {
      question: "¿Necesito reservar o puedo ir sin reserva?",
      answer:
         "Siempre podés venir sin reserva, pero te recomendamos reservar para garantizar tu mesa — especialmente los fines de semana.",
   },
   {
      question: "¿Qué pasa si llego tarde a mi reserva?",
      answer:
         "Mantenemos tu mesa por hasta 15 minutos. Si venís en camino, avisanos y te esperamos.",
   },
   {
      question: "¿Para cuántas personas puedo reservar?",
      answer:
         "Podés hacer una reserva para hasta 12 personas. Para grupos más grandes, contactanos para ayudarte con tu pedido.",
   },
   {
      question: "¿Feriado Cantina es pet friendly?",
      answer: "¡Por supuesto! Tu mascota siempre es bienvenida.",
   },
   {
      question: "¿Tienen opciones vegetarianas o para celíacos?",
      answer:
         "Sí, ofrecemos platos vegetarianos y opciones aptas para celíacos. Si tenés alguna alergia o restricción, avisanos al reservar y nos encargamos.",
   },
   {
      question: "¿Qué tipo de bebidas sirven?",
      answer:
         "Tenemos una carta completa de tragos con vermú Feriado, cócteles de la casa, vinos y cervezas. Preguntale a tu mozo por las recomendaciones.",
   },
];

const faqStructuredData = {
   "@context": "https://schema.org",
   "@type": "FAQPage",
   url: `${siteUrl}/`,
   inLanguage: "es",
   mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
   })),
};

import AgeVerification from "@/components/AgeVerification";
import { getOrganizationSchema, getWebSiteSchema, getRestaurantSchema } from "@/lib/schema";

export default function Home() {
   const orgSchema = getOrganizationSchema();
   const webSiteSchema = getWebSiteSchema();
   const restaurantSchemas = getRestaurantSchema();

   return (
      <>
         <AgeVerification />
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqStructuredData),
            }}
         />
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(orgSchema),
            }}
         />
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(webSiteSchema),
            }}
         />
         {restaurantSchemas.map((data, i) => (
            <script
               key={i}
               type="application/ld+json"
               dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
         ))}

         <HeroSection />

         <FeaturedProducts />

         <EventsSection />

         <section className="py-16 lg:py-24 bg-background">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
               <div
                  id="reservar-mesa"
                  className="relative min-h-[70vh] rounded-3xl overflow-visible scroll-mt-24"
               >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden bg-feriado-red" />
                  <div className="relative z-10 w-full min-h-[70vh] flex items-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="text-left">
                           <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-snug text-foreground">
                                 Reservá tu mesa hoy
                              </h2>
                              <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-lg leading-relaxed">
                                 Asegurá tu lugar para una experiencia gastronómica
                                 inolvidable. Comida casera argentina, vermú artesanal
                                 y la mejor onda de barrio te esperan.
                              </p>
                              <div className="space-y-4 text-foreground">
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-feriado-yellow rounded-full" />
                                    <span>
                                       Comida casera argentina hecha con amor
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-feriado-yellow rounded-full" />
                                    <span>
                                       Vermú Feriado y tragos de la casa
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-feriado-yellow rounded-full" />
                                    <span>
                                       Ambiente de barrio perfecto para cualquier
                                       ocasión
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="lg:ml-8">
                           <BookingForm />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <LocationsSection />
         <CustomerReviews />

         <section className="pt-8 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                     Preguntas frecuentes
                  </h2>
               </div>
               <Accordion type="single" collapsible className="space-y-4">
                  {faqData.map((item, index) => (
                     <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="group rounded-xl border border-foreground/15 bg-white text-foreground shadow-sm transition-all duration-300 data-[state=open]:border-primary/45 data-[state=open]:bg-feriado-cream data-[state=open]:shadow-md"
                     >
                        <AccordionTrigger className="w-full px-6 py-4 text-left hover:no-underline">
                           <h3 className="text-left text-xl font-normal text-foreground transition-colors duration-300 group-data-[state=open]:text-primary group-hover:text-primary">
                              {item.question}
                           </h3>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                           <p className="whitespace-pre-line text-base leading-relaxed text-foreground/80 group-data-[state=open]:text-foreground/90">
                              {item.answer}
                           </p>
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </div>
         </section>
      </>
   );
}

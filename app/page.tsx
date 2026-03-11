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
      question: "Do I need a reservation or can I walk in?",
      answer:
         "Walk-ins are always welcome, but we recommend reserving to guarantee your table — especially on weekends.",
   },
   {
      question: "What if I arrive late to my reservation?",
      answer:
         "We hold your table for up to 15 minutes. If you're on your way, just reach out and we'll wait for you.",
   },
   {
      question: "How many people can I book for?",
      answer:
         "You can make a reservation through OpenTable for up to 12 guests. For larger groups, we recommend contacting our Private Events team to assist you with your request.",
   },
   {
      question: "Is OH México pet friendly?",
      answer: "Absolutely! Your furry friends are always welcome.",
   },
   {
      question: "Do you have vegetarian or gluten-free options?",
      answer:
         "Yes, we offer vegetarian and gluten-free dishes. If you have any allergies or dietary restrictions, let us know when booking and we'll take care of you.",
   },
   {
      question: "What kind of drinks do you serve?",
      answer:
         "We have a full selection of handcrafted cocktails, mocktails, wines and beers. Ask your server for the recommendations.",
   },
];

const faqStructuredData = {
   "@context": "https://schema.org",
   "@type": "FAQPage",
   url: `${siteUrl}/`,
   inLanguage: "en",
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

         <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
               <div
                  id="reservar-mesa"
                  className="relative min-h-[70vh] rounded-3xl overflow-visible scroll-mt-24"
               >
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                     <ResponsiveImage
                        src="/image/AVICMEDIA-117.jpg"
                        alt="Reserve your table for authentic Mexican cuisine at OH México in Miami"
                        fill
                        mobileSrc="/image/AVICMEDIA-117.jpg"
                        className="object-cover"
                        loading="lazy"
                     />
                  </div>
                  <div className="relative z-10 w-full min-h-[70vh] flex items-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="text-left">
                           <div className="bg-[rgb(250,249,246)] backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80">
                              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-snug text-foreground">
                                 Reserve your table today
                              </h2>
                              <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-lg leading-relaxed">
                                 Secure your spot for an unforgettable dining
                                 experience. Authentic Mexican flavors,
                                 handcrafted cocktails and warm hospitality
                                 await.
                              </p>
                              <div className="space-y-4 text-foreground">
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                    <span>
                                       Authentic Mexican dishes made from
                                       scratch
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                    <span>
                                       Handcrafted cocktails and signature
                                       drinks
                                    </span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                    <span>
                                       Vibrant atmosphere perfect for any
                                       occasion
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

         <section className="pt-8 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                     Frequently asked questions
                  </h2>
               </div>
               <Accordion type="single" collapsible className="space-y-4">
                  {faqData.map((item, index) => (
                     <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="group rounded-xl border border-graphite-black/15 bg-white text-foreground shadow-sm transition-all duration-300 data-[state=open]:border-primary/45 data-[state=open]:bg-pale-chestnut/35 data-[state=open]:shadow-md"
                     >
                        <AccordionTrigger className="w-full px-6 py-4 text-left hover:no-underline">
                           <h3 className="text-left text-xl font-normal text-graphite-black transition-colors duration-300 group-data-[state=open]:text-primary group-hover:text-primary">
                              {item.question}
                           </h3>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                           <p className="whitespace-pre-line text-base leading-relaxed text-graphite-black/80 group-data-[state=open]:text-graphite-black/90">
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

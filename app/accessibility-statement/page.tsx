import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Declaración de Accesibilidad | Feriado Cantina",
  description:
    "Feriado Cantina se compromete a garantizar la accesibilidad digital para personas con discapacidad. Leé nuestra declaración de accesibilidad y cómo contactarnos.",
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
            Accessibility Statement
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our commitment to ensuring our website is accessible to everyone.
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
            Feriado Cantina strives to ensure that its services are
            accessible to people with disabilities. Feriado Cantina has
            invested a significant amount of resources to help ensure that its
            website is made easier to use and more accessible for people with
            disabilities, with the strong belief that website accessibility
            efforts assist all users and that every person has the right to live
            with dignity, equality, comfort and independence.
          </p>
        </section>

        {/* Accessibility on the website */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Accessibility on feriadovermu.com
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            feriadovermu.com makes UserWay&apos;s Web Accessibility
            Widget available which is powered by a dedicated accessibility
            server. The software allows feriadovermu.com to improve
            its compliance with the Web Content Accessibility Guidelines (WCAG
            2.1).
          </p>
        </section>

        {/* Enabling the Accessibility Menu */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Enabling the Accessibility Menu
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The feriadovermu.com accessibility menu can be enabled by
            clicking the accessibility menu icon that appears on the corner of
            the page. After triggering the accessibility menu, please wait a
            moment for the accessibility menu to load in its entirety.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Disclaimer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Feriado Cantina continues its efforts to constantly improve
            the accessibility of its site and services in the belief that it is
            our collective moral obligation to allow seamless, accessible and
            unhindered use also for those of us with disabilities.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            In an ongoing effort to continually improve and remediate
            accessibility issues, we also regularly scan
            feriadovermu.com with UserWay&apos;s Accessibility Scanner
            to identify and fix every possible accessibility barrier on our
            site. Despite our efforts to make all pages and content on
            feriadovermu.com fully accessible, some content may not
            have yet been fully adapted to the strictest accessibility
            standards. This may be a result of not having found or identified
            the most appropriate technological solution.
          </p>
        </section>

        {/* Third-Party Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Third-Party Content
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Feriado Cantina may contain links to third-party websites
            (&ldquo;Third-Party Sites&rdquo;). These links are provided solely
            as a convenience to you and not as an endorsement by us of the
            content on such Third-Party Sites. The content of such Third-Party
            Sites is developed and provided by others, not by Feriado
            Cantina, and we have no control over any content or legal terms
            contained in any Third-Party Sites. You should contact those site
            administrators if you have any concerns regarding such links or any
            content located on Third-Party Sites.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Feriado Cantina does not warrant, endorse, guarantee, or
            assume any responsibility or liability for any product or service
            advertised or offered by a third party (&ldquo;Third-Party Service
            Provider&rdquo;) through our Website. If you use any product or
            service provided by a third party in conjunction with our Website,
            you acknowledge and agree that (i) you are responsible for
            understanding the terms and conditions of your use of the
            third-party product or service; (ii) we do not control the
            third-party or its product or service; (iii) your use of their
            product or service is at your own risk; and (iv) we are not
            responsible and may not be held liable for the product or service,
            or the actions or omissions, of the third-party. Subject to these
            disclaimers, we may use certain Third-Party Service Providers to
            gather data and authenticate information regarding you, your device,
            and your Account.
          </p>
        </section>

        {/* Here For You */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Here For You
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you are experiencing difficulty with any content on
            feriadovermu.com or require assistance with any part of
            our site, please contact us during normal business hours as detailed
            below and we will be happy to assist.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary/30">
            Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you wish to report an accessibility issue, have any questions or
            need assistance, please contact Feriado Cantina Customer
            Support as follows:
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="font-semibold text-foreground">Email:</span>
            <Link
              href="mailto:hola@feriadovermu.com"
              className="text-primary hover:underline font-medium"
            >
              hola@feriadovermu.com
            </Link>
          </div>
        </section>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </article>
    </div>
    </>
  );
}

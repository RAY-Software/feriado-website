import { notFound } from "next/navigation";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Phone, ArrowRight, Star } from "lucide-react";
import IndividualLocationMap from "@/components/IndividualLocationMap";
import { locations } from "@/lib/location-data";
import { siteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((loc) => loc.id === slug);

  if (!location) {
    return {
      title: "Location Not Found | OH México",
      description: "The requested location could not be found.",
    };
  }

  const title = `${location.name} | OH México Miami Beach`;
  const description = `Visit OH México ${location.shortName} at ${location.fullAddress}. Enjoy authentic Mexican cuisine, handcrafted cocktails, and a vibrant atmosphere. Hours: ${location.hours}. Call us at ${location.phone}.`;
  const url = `${siteUrl}/locations/${location.id}`;
  const imageUrl = location.image
    ? `${siteUrl}${location.image}`
    : `${siteUrl}/image/ohmexico-logo.png`;

  return {
    title,
    description,
    keywords: [
      `OH México ${location.shortName}`,
      `Mexican restaurant ${location.city}`,
      `${location.shortName} Mexican food`,
      `authentic Mexican ${location.city}`,
      "tacos Miami Beach",
      "margaritas Miami",
      "Mexican restaurant Miami Beach",
      "OH México locations",
      location.fullAddress,
    ],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "OH México",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `OH México ${location.shortName} – ${location.fullAddress}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function LocationDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((loc) => loc.id === slug);

  if (!location) {
    notFound();
    return null; // Ensure TypeScript knows we don't continue
  }

  // Complete Schema.org structured data — passes validator.schema.org and Google Rich Results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/locations/${location.id}`,
    name: location.name,
    description: `${location.name} - Authentic Mexican restaurant in ${location.city}, ${location.state}. Enjoy bold tacos, handcrafted cocktails, and the vibrant spirit of Mexico.`,
    url: `${siteUrl}/locations/${location.id}`,
    logo: `${siteUrl}/image/ohmexico-logo.png`,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification: location.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    image: location.image
      ? `${siteUrl}${location.image}`
      : `${siteUrl}/image/ohmexico-logo.png`,
    hasMap: location.googleMapsUrl,
    priceRange: "$$",
    servesCuisine: ["Mexican", "Latin American"],
    hasMenu: `${siteUrl}/menu`,
    paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
    currenciesAccepted: "USD",
    smokingAllowed: false,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: location.aggregateRating.ratingValue,
      reviewCount: location.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: location.reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: r.author,
      },
      reviewBody: r.text,
      datePublished: r.date,
    })),
    amenityFeature: location.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.name,
      value: a.value,
    })),
    sameAs: [
      "https://www.instagram.com/ohmexico/",
      "https://www.facebook.com/ohmexico/",
    ],
  };

  // Provide a default image for the hero if empty
  const heroImage = location.image ? location.image : "/image/AVICMEDIA-117.jpg";

  // Filter other locations
  const otherLocations = locations.filter((loc) => loc.id !== location.id).slice(0, 3);

  return (
    <>
      {/* SEO Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-white text-foreground">
        {/* Hero Section */}
        <div className="relative h-screen">
          <ResponsiveImage
            src={heroImage}
            alt={location.name}
            fill
            mobileSrc={heroImage}
            className="object-cover"
            loading="eager"
          />
          
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center justify-center pt-24">
            <div className="text-center max-w-4xl mx-auto px-4 w-full">
              {/* Back navigation */}
              <div className="absolute top-8 left-8">
                <Link 
                  href="/locations"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  All locations
                </Link>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                {location.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium drop-shadow">
                {location.city}, {location.state}
              </p>
              <p className="text-lg text-white/80 mb-10 drop-shadow">
                {location.fullAddress}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground font-semibold rounded-lg hover:bg-pale-chestnut/20 transition-colors shadow-lg"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  Get directions
                </a>
                
                <Link
                  href="/#reservar-mesa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Book your table
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Location Details */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-foreground pb-4 border-b border-pale-chestnut/30">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-5">
                    <div className="bg-pale-chestnut/10 p-3 rounded-full flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">Address</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{location.fullAddress}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-5">
                    <div className="bg-pale-chestnut/10 p-3 rounded-full flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">Hours</h3>
                      <p className="text-muted-foreground text-base leading-relaxed whitespace-pre-line">{location.hours}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  {location.phone && (
                    <div className="flex items-start gap-5">
                      <div className="bg-pale-chestnut/10 p-3 rounded-full flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">Phone</h3>
                          <a 
                            href={`tel:${location.phone}`}
                            className="text-muted-foreground hover:text-primary transition-colors text-base"
                          >
                            {location.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Availability block */}
              {location.hasDelivery && (
                <div className="bg-pale-chestnut/10 border border-primary/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">🚚 Online Delivery</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Order from home and enjoy the authentic taste of OH México wherever you are.
                  </p>
                  <Link
                    href="/order"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-colors shadow-md"
                  >
                    Order online
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>

            {/* What to Expect */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground pb-4 border-b border-pale-chestnut/30">
                What to expect
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <Star className="w-7 h-7 text-accent mt-0.5 flex-shrink-0" fill="currentColor" />
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Authentic Mexican Flavors</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Savor traditional dishes made with fresh, authentic ingredients. From bold tacos to sizzling molcajetes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <Star className="w-7 h-7 text-accent mt-0.5 flex-shrink-0" fill="currentColor" />
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Handcrafted Cocktails</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Enjoy our signature margaritas, refreshing micheladas, and a premium selection of tequila and mezcal.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <Star className="w-7 h-7 text-accent mt-0.5 flex-shrink-0" fill="currentColor" />
                  <div>
                    <h3 className="font-bold text-foreground text-xl mb-2">Vibrant Atmosphere</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Experience the spirit and warmth of Mexico right here in Miami. The perfect setting for friends, family, and celebrations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-primary/5 border border-primary/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-primary mb-3">Explore our menu</h3>
                <p className="text-foreground/80 mb-5">
                  Discover our full selection of tacos, entrees, and handcrafted drinks.
                </p>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/70 font-semibold transition-colors text-lg"
                >
                  View full menu
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Locations */}
        {otherLocations.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">Otras ubicaciones cercanas</h2>
                <p className="text-muted-foreground text-lg">Discover our other restaurants nearby.</p>
              </div>
              <Link 
                href="/locations"
                className="mt-4 md:mt-0 text-primary hover:text-primary/70 font-semibold transition-colors flex items-center gap-1"
              >
                View all locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherLocations.map(otherLoc => (
                <Link
                  key={otherLoc.id}
                  href={`/locations/${otherLoc.id}`}
                  className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{otherLoc.shortName}</h3>
                  <p className="text-muted-foreground text-base mb-2">{otherLoc.address}, {otherLoc.city}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
            <div className="mb-10 lg:text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How to find us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl lg:mx-auto">
                Discover where OH México {location.shortName} is located. 
                Get direct access to directions and a detailed map view.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Map */}
              <div className="lg:col-span-2">
                <IndividualLocationMap 
                  location={{
                    name: location.name,
                    coordinates: location.coordinates
                  }}
                  className="h-[400px] shadow-xl border-none"
                />
              </div>
              
              {/* Directions Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Exact location
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {location.fullAddress}
                  </p>
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors w-full justify-center shadow-md"
                  >
                    Open in Google Maps
                  </a>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-xl">🚗</span> By Car
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Located conveniently in Miami Beach. Check nearby lots or street regulations for parking.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="text-xl">☀️</span> Welcome
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Enjoy the beautiful Florida weather right by the beach. Walk-ins are always warmly welcomed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 lg:py-28 text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to visit OH México {location.shortName}?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Reserve your table today and immerse yourself in the vibrant spirit, delicious flavors, and rich traditions of Mexico. We are waiting for you!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link
                href="/#reservar-mesa"
                className="px-10 py-4 bg-white hover:bg-gray-100 text-primary font-bold rounded-xl transition-all hover:scale-105 shadow-xl text-lg w-full sm:w-auto"
              >
                Book a table
              </Link>
              
              <Link
                href="/locations"
                className="px-10 py-4 border-2 border-white/80 text-white hover:bg-white/10 font-bold rounded-xl transition-colors text-lg w-full sm:w-auto"
              >
                See all locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

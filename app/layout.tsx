import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://Group360.vercel.app"),
  title: "360 EVENTS Ahmedabad | Event Management & Pass Booking",
  description:
    "Book premium event passes & VIP experiences at 360 EVENTS. Gujarat's leading event management company for Navratri, Dandiya, and luxury celebrations in Ahmedabad. 2M+ satisfied guests.",
  keywords: [
    "360 events Ahmedabad",
    "event management Ahmedabad",
    "pass booking Ahmedabad",
    "Navratri events Ahmedabad",
    "Dandiya passes Ahmedabad",
    "luxury events Ahmedabad",
    "event passes booking",
    "VIP event access Ahmedabad",
    "premium event management",
    "corporate events Ahmedabad",
    "event management Gujarat",
    "group events Ahmedabad",
  ],
  authors: [{ name: "360 EVENTS", url: "https://Group360.vercel.app" }],
  creator: "360 EVENTS",
  publisher: "360 EVENTS",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Uhv8JXPHX4zMQxv60JcO1jiUkVxdyMSoQZatYQ7Mteg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "360 EVENTS",
    title: "360 EVENTS Ahmedabad | Event Management & Pass Booking",
    description:
      "Book premium event passes at 360 EVENTS. Gujarat's leading event management company for Navratri, Dandiya, and luxury celebrations.",
    url: "https://Group360.vercel.app",
    images: [
      {
        url: "https://Group360.vercel.app/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "360 EVENTS — Premium Event Management in Ahmedabad",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "360 EVENTS Ahmedabad | Event Management & Pass Booking",
    description:
      "Book premium event passes at 360 EVENTS. Gujarat's leading event management company.",
    images: ["https://Group360.vercel.app/images/hero-bg.jpg"],
    creator: "@360events",
  },
  alternates: {
    canonical: "https://Group360.vercel.app",
    languages: {
      "en-IN": "https://Group360.vercel.app",
    },
  },
  category: "Event Management",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://Group360.vercel.app",
    name: "360 EVENTS",
    alternateName: "Group 360 Events",
    description:
      "Premier event management and pass booking service in Ahmedabad specializing in Navratri, Dandiya, and luxury celebrations.",
    url: "https://Group360.vercel.app",
    telephone: "+919999000001",
    email: "contact@360events.in",
    logo: "https://Group360.vercel.app/images/hero-bg.jpg",
    image: "https://Group360.vercel.app/images/hero-bg.jpg",
    foundingDate: "2022",
    address: {
      "@type": "PostalAddress",
      streetAddress: "360 Tower, Sindhu Bhavan Road",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380054",
      addressCountry: "IN",
    },
    priceRange: "₹₹₹",
    areaServed: [
      {
        "@type": "City",
        name: "Ahmedabad",
      },
      {
        "@type": "City",
        name: "Mumbai",
      },
      {
        "@type": "City",
        name: "London",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2000",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/360events",
      "https://www.instagram.com/360events",
      "https://www.linkedin.com/company/360events",
    ],
    serviceType: "Event Planning and Management",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://Group360.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Event Passes",
        item: "https://Group360.vercel.app/passes",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: "360 EVENTS Premium Experiences",
    description: "Premium event passes and VIP experiences",
    url: "https://Group360.vercel.app/passes",
    organizer: {
      "@type": "Organization",
      name: "360 EVENTS",
      url: "https://Group360.vercel.app",
    },
    location: {
      "@type": "City",
      name: "Ahmedabad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ffd700" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="32x32"
          type="image/x-icon"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://Group360.vercel.app" />
        {/* <meta
          name="google-site-verification"
          content="Uhv8JXPHX4zMQxv60JcO1jiUkVxdyMSoQZatYQ7Mteg"
        /> */}

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface text-on-surface font-body-md parchment-texture selection:bg-secondary/30 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

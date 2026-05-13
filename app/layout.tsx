import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "360 EVENTS | The Gold Standard of Festive Hospitality",
  description:
    "Gujarat's premier luxury event management firm since 2012. Curating world-class Navratri, Dandiya, and heritage celebrations with 2M+ elite guest experiences across Ahmedabad, Mumbai, and London.",
  keywords: [
    "360 Events",
    "luxury events Gujarat",
    "Navratri events Ahmedabad",
    "Dandiya celebrations",
    "corporate hospitality India",
    "heritage events",
    "festive hospitality",
    "VVIP event access",
    "event management Ahmedabad",
    "premium celebrations Gujarat",
  ],
  authors: [{ name: "360 EVENTS" }],
  creator: "360 EVENTS",
  publisher: "360 EVENTS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "360 EVENTS",
    title: "360 EVENTS | The Gold Standard of Festive Hospitality",
    description:
      "Gujarat's premier luxury event management firm. 12+ years curating world-class celebrations with 2M+ elite guest experiences.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "360 EVENTS — luxury festive hospitality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "360 EVENTS | The Gold Standard of Festive Hospitality",
    description:
      "Gujarat's premier luxury event management firm. 12+ years curating world-class celebrations.",
    images: ["/images/hero-bg.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventPlanning",
  name: "360 EVENTS",
  description:
    "Gujarat's premier luxury event management firm specializing in Navratri, Dandiya, and heritage celebrations since 2012.",
  foundingDate: "2012",
  url: "https://360events.in",
  logo: "/images/hero-bg.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "360 Tower, Sindhu Bhavan Road",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380054",
    addressCountry: "IN",
  },
  telephone: ["+919999000001", "+919999000002"],
  areaServed: ["Ahmedabad", "Mumbai", "London"],
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface text-on-surface font-body-md parchment-texture selection:bg-secondary/30 antialiased">
        {children}
      </body>
    </html>
  );
}

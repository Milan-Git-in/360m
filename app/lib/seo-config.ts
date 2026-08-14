/**
 * SEO Configuration for 360 EVENTS
 * This file contains all SEO-related configurations and constants
 */

export const SEO_CONFIG = {
  // Site Information
  siteUrl: "https://Group360.vercel.app",
  siteName: "360 EVENTS",
  siteDescription:
    "Book premium event passes at 360 EVENTS. Gujarat's leading event management company for Navratri, Dandiya, and luxury celebrations in Ahmedabad.",
  locale: "en_IN",

  // Company Information
  company: {
    name: "360 EVENTS",
    alternateName: "Group 360 Events",
    foundingDate: "2022",
    email: "contact@360events.in",
    phone: "+919999000001",
    address: {
      streetAddress: "360 Tower, Sindhu Bhavan Road",
      city: "Ahmedabad",
      state: "Gujarat",
      postalCode: "380054",
      country: "IN",
    },
  },

  // Social Media
  social: {
    facebook: "https://www.facebook.com/360events",
    instagram: "https://www.instagram.com/360events",
    linkedin: "https://www.linkedin.com/company/360events",
    twitter: "https://twitter.com/360events",
  },

  // Keywords Strategy
  keywords: {
    primary: [
      "event management Ahmedabad",
      "event passes booking",
      "Navratri events Ahmedabad",
      "Dandiya passes",
      "premium event access",
    ],
    secondary: [
      "luxury events Gujarat",
      "VIP event booking",
      "group event passes",
      "corporate events Ahmedabad",
      "festival celebrations Ahmedabad",
    ],
    locationBased: [
      "event management in Ahmedabad",
      "passes booking near me",
      "events in Ahmedabad",
      "event organizers in Gujarat",
    ],
  },

  // Areas Served
  areaServed: [
    { name: "Ahmedabad", type: "City" },
    { name: "Mumbai", type: "City" },
    { name: "London", type: "City" },
  ],

  // Page-specific metadata
  pages: {
    home: {
      title: "360 EVENTS Ahmedabad | Event Management & Pass Booking",
      description:
        "Book premium event passes & VIP experiences at 360 EVENTS. Gujarat's leading event management company for Navratri, Dandiya, and luxury celebrations.",
      keywords: [
        "360 events Ahmedabad",
        "event management",
        "pass booking",
        "Navratri events",
      ],
    },
    passes: {
      title: "Event Passes & VIP Booking | 360 EVENTS Ahmedabad",
      description:
        "Book premium event passes online at 360 EVENTS. VIP access to Navratri, Dandiya, and luxury celebrations. Flexible payment, instant confirmation.",
      keywords: [
        "event passes",
        "VIP booking",
        "pass booking Ahmedabad",
        "premium event access",
      ],
    },
  },

  // Open Graph defaults
  ogImage: {
    url: "https://Group360.vercel.app/images/hero-bg.jpg",
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "360 EVENTS — Premium Event Management",
  },

  // Schema.org Organization Rating
  rating: {
    ratingValue: 4.9,
    reviewCount: 2000,
    bestRating: 5,
    worstRating: 1,
  },

  // Robots.txt rules
  robotsRules: {
    allowCrawlers: true,
    crawlDelay: 1,
    googleBotCrawlDelay: 0,
  },

  // Performance & Core Web Vitals targets
  performance: {
    targetLCP: 2500, // Largest Contentful Paint (ms)
    targetFID: 100, // First Input Delay (ms)
    targetCLS: 0.1, // Cumulative Layout Shift
    targetFCP: 1800, // First Contentful Paint (ms)
  },

  // Mobile optimization
  mobile: {
    viewportEnabled: true,
    touchIconEnabled: true,
    webAppCapable: true,
  },

  // Sitemap configuration
  sitemap: {
    changeFrequency: "daily",
    priority: 0.8,
  },
};

/**
 * Generate structured data for events
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  price: string;
  priceCurrency: string;
  availability: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    image: event.image,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: "OfflineEventAttendanceMode",
    eventStatus: "EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    offers: {
      "@type": "Offer",
      url: `${SEO_CONFIG.siteUrl}/passes`,
      price: event.price,
      priceCurrency: event.priceCurrency,
      availability: event.availability,
    },
    organizer: {
      "@type": "Organization",
      name: SEO_CONFIG.company.name,
      url: SEO_CONFIG.siteUrl,
    },
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

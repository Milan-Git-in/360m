
export interface PassFeature {
  icon: string;
  label: string;
}

export interface PassTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  includes: string[];
  tag?: string;
  isSoldOut: boolean;
}

export interface Pass {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  category: "single-night" | "season" | "vvip";
  isFeatured: boolean;
  tiers: PassTier[];
}

export const defaultPasses: Pass[] = [
  {
    id: "kirtidan-gadhvi-night",
    title: "Kirtidan Gadhvi Night",
    subtitle: "Experience the magic of Kirtidan Gadhvi live",
    description:
      "Join us for an unforgettable evening with the legendary Kirtidan Gadhvi. Experience traditional garba in a luxurious setting with premium amenities and unmatched hospitality.",
    img: "/images/event-1.jpg",
    category: "single-night",
    isFeatured: true,
    tiers: [
      {
        id: "base",
        name: "General Access",
        price: 999,
        includes: ["Garba Arena Access", "Live Music", "Standard Parking"],
        isSoldOut: false,
      },
      {
        id: "food",
        name: "General + Food",
        price: 1499,
        includes: [
          "Garba Arena Access",
          "Live Music",
          "Food & Beverages Package",
          "Standard Parking",
        ],
        tag: "POPULAR",
        isSoldOut: false,
      },
      {
        id: "dome",
        name: "Dome Suite",
        price: 2499,
        includes: [
          "Rain-Protected Dome Access",
          "Garba Arena Access",
          "Food & Beverages Package",
          "VIP Parking",
          "Express Entry",
        ],
        tag: "PREMIUM",
        isSoldOut: false,
      },
    ],
  },
  {
    id: "falguni-pathak-night",
    title: "Falguni Pathak Night",
    subtitle: "The Dandiya Queen returns to Gujarat",
    description:
      "Dance to the iconic tunes of Falguni Pathak. A night of energetic garba, vibrant colors, and premium hospitality awaits you.",
    img: "/images/event-2.jpg",
    category: "single-night",
    isFeatured: true,
    tiers: [
      {
        id: "base",
        name: "General Access",
        price: 1499,
        includes: ["Garba Arena Access", "Live Music", "Standard Parking"],
        isSoldOut: false,
      },
      {
        id: "vip",
        name: "VIP Access",
        price: 3499,
        includes: [
          "VIP Arena Access (Closer to stage)",
          "Garba Arena Access",
          "Food & Beverages Package",
          "VIP Parking",
          "Express Entry",
        ],
        tag: "BEST SELLER",
        isSoldOut: false,
      },
      {
        id: "royal",
        name: "Royal Lounge",
        price: 7500,
        includes: [
          "Exclusive Royal Lounge Access",
          "Rain-Protected Dome",
          "Premium Food & Beverages",
          "Valet Parking",
          "Dedicated Attendant",
        ],
        isSoldOut: true,
      },
    ],
  },
  {
    id: "season-pass-2026",
    title: "Full Season Pass 2026",
    subtitle: "Unrestricted access for all 9 nights",
    description:
      "The ultimate Navratri experience. Enjoy unrestricted access to all 9 nights of celebrations with exclusive perks and priority services.",
    img: "/images/event-3.jpg",
    category: "season",
    isFeatured: false,
    tiers: [
      {
        id: "season-general",
        name: "Season General",
        price: 6999,
        originalPrice: 8991,
        includes: [
          "Access to all 9 nights",
          "Garba Arena Access",
          "Season Parking Pass",
        ],
        isSoldOut: false,
      },
      {
        id: "season-dome",
        name: "Season Dome",
        price: 12999,
        includes: [
          "Access to all 9 nights",
          "Rain-Protected Dome Access",
          "Garba Arena Access",
          "Season VIP Parking Pass",
          "Express Entry every night",
        ],
        isSoldOut: false,
      },
      {
        id: "season-vvip",
        name: "Season VVIP Royal",
        price: 49999,
        includes: [
          "Access to all 9 nights",
          "Royal Lounge Access",
          "Premium Food & Beverages",
          "Season Valet Parking",
          "Dedicated Concierge",
        ],
        tag: "ELITE",
        isSoldOut: false,
      },
    ],
  },
  {
    id: "kinjal-dave-special",
    title: "Kinjal Dave Special",
    subtitle: "High energy traditional beats",
    description:
      "Experience the high energy of Kinjal Dave. Perfect for groups and families looking for a traditional yet luxurious garba night.",
    img: "/images/event-4.jpg",
    category: "single-night",
    isFeatured: false,
    tiers: [
      {
        id: "base",
        name: "General Access",
        price: 799,
        includes: ["Garba Arena Access", "Live Music", "Standard Parking"],
        isSoldOut: false,
      },
      {
        id: "food",
        name: "General + Food",
        price: 1299,
        includes: [
          "Garba Arena Access",
          "Live Music",
          "Food & Beverages Package",
          "Standard Parking",
        ],
        isSoldOut: false,
      },
    ],
  },
  {
    id: "corporate-table",
    title: "Imperial Corporate Table",
    subtitle: "Host your team in style",
    description:
      "The perfect setting for corporate hosting. An exclusive table for 10 guests with premium catering and dedicated service.",
    img: "/images/hero-bg.jpg",
    category: "vvip",
    isFeatured: true,
    tiers: [
      {
        id: "table-10",
        name: "Table of 10",
        price: 15000,
        includes: [
          "Reserved Table for 10 Guests",
          "Premium Multi-Cuisine Buffet",
          "Dedicated Waitstaff",
          "Valet Parking for 5 cars",
          "Corporate Branding Opportunity",
        ],
        isSoldOut: false,
      },
      {
        id: "table-20",
        name: "Table of 20",
        price: 28000,
        originalPrice: 30000,
        includes: [
          "Reserved Table for 20 Guests",
          "Premium Multi-Cuisine Buffet",
          "Dedicated Waitstaff",
          "Valet Parking for 10 cars",
          "Corporate Branding Opportunity",
          "Private Security Escort",
        ],
        tag: "VALUE",
        isSoldOut: false,
      },
    ],
  },
];

export type CategoryKey = "all" | "single-night" | "season" | "vvip";

export const categories: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All Passes" },
  { key: "single-night", label: "Single Night" },
  { key: "season", label: "Season Passes" },
  { key: "vvip", label: "VVIP & Tables" },
];

export function getPassById(passes: Pass[], id: string): Pass | undefined {
  return passes.find((p) => p.id === id);
}

export function filterPasses(passes: Pass[], category: CategoryKey): Pass[] {
  if (category === "all") return passes;
  return passes.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Get the lowest price among available tiers
export function getStartingPrice(pass: Pass): number {
  if (!pass.tiers || pass.tiers.length === 0) return 0;
  return Math.min(...pass.tiers.map((t) => t.price));
}

// Check if all tiers are sold out
export function isPassFullySoldOut(pass: Pass): boolean {
  if (!pass.tiers || pass.tiers.length === 0) return true;
  return pass.tiers.every((t) => t.isSoldOut);
}

export function buildWhatsAppUrl(params: {
  pass: Pass;
  tier: PassTier;
  quantity: number;
  customerName: string;
  customerPhone: string;
}) {
  const { pass, tier, quantity, customerName, customerPhone } = params;
  
  const totalPrice = tier.price * quantity;

  let message = `Hello 360 EVENTS! 🌟\n\nI would like to book passes. Here are my details:\n\n`;
  message += `🎫 *Event:* ${pass.title}\n`;
  message += `💎 *Selected Tier:* ${tier.name}\n`;
  message += `🔢 *Quantity:* ${quantity}\n`;
  
  message += `\n*Included Features:*\n`;
  tier.includes.forEach(inc => {
      message += `• ${inc}\n`;
  });

  message += `\n💰 *Total Price:* ${formatPrice(totalPrice)}\n\n`;
  message += `👤 *Name:* ${customerName || "Not provided"}\n`;
  message += `📱 *Phone:* ${customerPhone || "Not provided"}\n\n`;
  message += `Please confirm my booking and share the payment details.`;

  const encodedMessage = encodeURIComponent(message);
  // Using the phone number defined in requirements (+91 96387 70089)
  return `https://api.whatsapp.com/send/?phone=919638770089&text=${encodedMessage}`;
}

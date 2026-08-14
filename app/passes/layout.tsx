import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Passes & VIP Booking | 360 EVENTS Ahmedabad",
  description:
    "Book premium event passes online at 360 EVENTS Ahmedabad. VIP access to Navratri, Dandiya, and luxury celebrations. Flexible payment, instant confirmation.",
  keywords: [
    "event passes Ahmedabad",
    "pass booking",
    "VIP passes",
    "Navratri passes",
    "Dandiya passes",
    "premium event access",
    "group bookings",
    "event tickets Ahmedabad",
  ],
  alternates: {
    canonical: "https://Group360.vercel.app/passes",
  },
  openGraph: {
    title: "Event Passes & VIP Booking | 360 EVENTS Ahmedabad",
    description:
      "Book premium event passes online. VIP access to Navratri and luxury celebrations.",
    url: "https://Group360.vercel.app/passes",
    type: "website",
  },
};

export default function PassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

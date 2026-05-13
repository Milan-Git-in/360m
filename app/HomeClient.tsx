"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LegacySection from "./components/LegacySection";
import PartnersSection from "./components/PartnersSection";
import EventShowcase from "./components/EventShowcase";
import HospitalitySection from "./components/HospitalitySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function HomeClient() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <LegacySection />
        <PartnersSection />
        <EventShowcase />
        <HospitalitySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

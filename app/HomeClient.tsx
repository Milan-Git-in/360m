"use client";

import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import PopularEvents from "./components/PopularEvents";
import EventsByArtist from "./components/EventsByArtist";
import ExploreEvents from "./components/ExploreEvents";
import Footer from "./components/Footer";

export default function HomeClient() {
  return (
    <div className="bg-primary min-h-screen text-on-surface  font-poppins relative">
      <Navbar />
      <main className="space-y-12">
        <HeroCarousel />
        <PopularEvents />
        <EventsByArtist />
      </main>
      <Footer />
    </div>
  );
}

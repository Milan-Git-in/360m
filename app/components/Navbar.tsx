"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-20 h-24 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <a href="/" className="flex items-center gap-3" aria-label="360 Events Home">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-secondary-fixed font-bold text-xl tracking-tighter">
          360
        </div>
        <div className="font-headline-md text-2xl text-primary font-bold tracking-tight">
          EVENTS
        </div>
      </a>
      <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-12">
        <a
          className="font-label-md tracking-[0.2em] text-on-surface-variant hover:text-secondary transition-all"
          href="#legacy"
        >
          Our Legacy
        </a>
        <a
          className="font-label-md tracking-[0.2em] text-on-surface-variant hover:text-secondary transition-all"
          href="#partners"
        >
          Partners
        </a>
        <a
          className="font-label-md tracking-[0.2em] text-on-surface-variant hover:text-secondary transition-all"
          href="#packages"
        >
          Hospitality
        </a>
        <a
          className="font-label-md tracking-[0.2em] text-on-surface-variant hover:text-secondary transition-all"
          href="#contact"
        >
          Contact
        </a>
      </nav>
      <a
        className="metallic-gold-btn px-8 py-3 rounded-full font-label-md hover:scale-105 transition-all duration-500 active:scale-95 tracking-widest shadow-lg hidden sm:block"
        href="https://wa.me/919999000001"
        aria-label="Book via WhatsApp"
        rel="noopener noreferrer"
        target="_blank"
      >
        WhatsApp Booking
      </a>
    </header>
  );
}

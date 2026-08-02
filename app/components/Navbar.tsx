"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Ticket } from "lucide-react";

const navLinks = [
  { label: "Our Legacy", href: "#legacy" },
  { label: "Partners", href: "#partners" },
  { label: "Hospitality", href: "#packages" },
  { label: "Passes & Tickets", href: "/passes", highlight: true },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <header
        id="site-header"
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-20 h-20 md:h-24 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" aria-label="360 Events Home">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-secondary-fixed font-bold text-lg md:text-xl tracking-tighter transition-transform duration-500 group-hover:rotate-6">
            360
          </div>
          <div className={`font-headline-md text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
            isScrolled ? "text-primary" : "text-surface-bright"
          }`}>
            EVENTS
          </div>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={`relative group font-label-md tracking-[0.2em] transition-colors duration-300 py-1 ${
                isScrolled
                  ? link.highlight
                    ? "text-secondary hover:text-primary"
                    : "text-on-surface-variant hover:text-primary"
                  : link.highlight
                  ? "text-secondary-fixed hover:text-white"
                  : "text-surface-variant/90 hover:text-white"
              }`}
              href={link.href}
            >
              {link.label}
              <span 
                className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                  isScrolled ? "bg-primary" : "bg-white"
                }`} 
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          className="metallic-gold-btn px-8 py-3 rounded-full font-label-md hover:scale-105 transition-all duration-500 active:scale-95 tracking-widest shadow-lg hidden lg:block"
          href="/passes"
          aria-label="Browse event passes and tickets"
        >
          Get Passes
        </a>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden w-11 h-11 rounded-xl bg-primary/10 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-primary shadow-2xl shadow-black/50 flex flex-col"
              aria-label="Mobile navigation"
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-secondary-fixed font-bold text-sm">
                    360
                  </div>
                  <span className="font-headline-md text-lg text-secondary-fixed">
                    EVENTS
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 py-8 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                      link.highlight
                        ? "bg-secondary-fixed/10 text-secondary-fixed border border-secondary-fixed/20"
                        : "text-surface-variant/70 hover:bg-white/5 hover:text-surface-bright"
                    }`}
                  >
                    {link.highlight && <Ticket size={18} className="shrink-0" />}
                    <span className="font-label-md tracking-[0.2em] text-sm">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Sidebar CTA */}
              <div className="px-6 pb-8">
                <a
                  href="/passes"
                  onClick={() => setIsSidebarOpen(false)}
                  className="metallic-gold-btn w-full py-5 rounded-2xl font-label-md tracking-widest text-center block hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
                >
                  GET PASSES
                </a>
                <a
                  href="https://wa.me/919638770089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-3 py-4 rounded-2xl font-label-md tracking-widest text-center text-surface-variant/50 border border-white/10 hover:bg-white/5 transition-colors text-sm"
                >
                  WHATSAPP BOOKING
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

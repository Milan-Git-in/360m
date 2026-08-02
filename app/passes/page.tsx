"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import PassCard from "../components/PassCard";
import { categories, getStartingPrice, type Pass, type CategoryKey } from "../data/passes";

export default function PassesPage() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [sortOrder, setSortOrder] = useState<"default" | "low" | "high">("default");

  const sortOptions = [
    { value: "default", label: "Featured First" },
    { value: "low", label: "Price: Low → High" },
    { value: "high", label: "Price: High → Low" },
  ] as const;

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/api/passes")
      .then((res) => res.json())
      .then((data) => {
        setPasses(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load passes", err);
        setIsLoading(false);
      });
  }, []);

  const filtered = activeCategory === "all" ? passes : passes.filter(p => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    const priceA = getStartingPrice(a);
    const priceB = getStartingPrice(b);
    
    if (sortOrder === "low") return priceA - priceB;
    if (sortOrder === "high") return priceB - priceA;
    // Default: featured first, then by price ascending
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return priceA - priceB;
  });

  return (
    <div className="min-h-screen bg-primary text-surface overflow-x-hidden">
      {/* Back nav */}
      <div className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-20 h-20">
          <Link
            href="/"
            className="flex items-center gap-3 text-surface-variant/60 hover:text-secondary-fixed transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-label-md tracking-widest text-xs">
              BACK TO HOME
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-secondary-fixed font-bold text-sm">
              360
            </div>
            <span className="font-headline-md text-lg text-secondary-fixed">
              EVENTS
            </span>
          </Link>
        </div>
      </div>

      {/* Hero header */}
      <section className="pt-36 pb-8 px-6 md:px-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-5 py-1.5 mb-6 border border-secondary-fixed/30 text-secondary-fixed font-label-md tracking-[0.4em] rounded-full bg-white/5 backdrop-blur-md text-xs">
              NAVRATRI 2026
            </div>
            <h1 className="font-headline-xl text-secondary-fixed italic text-5xl md:text-7xl mb-4">
              Passes & Tickets
            </h1>
            <p className="font-body-lg text-surface-variant/60 max-w-2xl mx-auto">
              Secure your entry to the most spectacular Navratri celebration.
              Choose from General to Imperial — every pass is a gateway to
              unforgettable nights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="px-6 md:px-20 py-8 sticky top-20 z-40 bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`shrink-0 px-5 py-2.5 rounded-full font-label-md text-[11px] tracking-widest transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-secondary-fixed text-on-secondary-fixed shadow-lg shadow-secondary/20"
                      : "bg-white/5 text-surface-variant/50 border border-white/10 hover:bg-white/10 hover:text-surface-variant/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0" ref={sortRef}>
              <span className="font-label-md text-[10px] tracking-widest text-surface-variant/40">
                SORT
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-surface-variant/70 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer min-w-[180px] justify-between"
                >
                  <span>{sortOptions.find((o) => o.value === sortOrder)?.label}</span>
                  <ChevronDown
                    size={14}
                    className={`text-surface-variant/40 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full bg-primary-container border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOrder(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          sortOrder === option.value
                            ? "bg-secondary-fixed/20 text-secondary-fixed"
                            : "text-surface-variant/60 hover:bg-white/5 hover:text-surface-variant/90"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pass grid */}
      <section className="px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <p className="text-surface-variant/30 font-label-md text-xs tracking-widest mb-8">
            {sorted.length} PASS{sorted.length !== 1 ? "ES" : ""} AVAILABLE
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-10 h-10 border-2 border-secondary-fixed/30 border-t-secondary-fixed rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sorted.map((pass, index) => (
                  <PassCard key={pass.id} pass={pass} index={index} />
                ))}
              </div>

              {sorted.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-surface-variant/40 font-body-lg">
                    No passes found for this category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white/5 rounded-3xl border border-white/10 p-12">
            <h2 className="font-headline-md text-secondary-fixed italic text-3xl mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-surface-variant/50 font-body-md mb-8 max-w-lg mx-auto">
              Our concierge team can guide you to the perfect pass for your group
              size and preferences.
            </p>
            <a
              href="https://wa.me/919638770089?text=Hello%20360%20EVENTS!%20I%20need%20help%20choosing%20the%20right%20pass%20for%20my%20group."
              target="_blank"
              rel="noopener noreferrer"
              className="metallic-gold-btn px-10 py-4 rounded-full font-label-md tracking-widest hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg inline-block"
            >
              ASK OUR CONCIERGE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { useEffect, useState, useRef } from "react";
import { defaultPasses, Pass, formatPrice, getStartingPrice } from "../data/passes";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function HeroCarousel() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // In the future this might be fetched from an API
    setPasses(defaultPasses.filter(p => p.isFeatured));
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(newIndex);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth"
    });
  };

  if (passes.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {passes.map((pass, index) => (
          <div 
            key={pass.id} 
            className="w-full flex-shrink-0 snap-center px-4"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-surface-variant group">
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${pass.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-surface-bright mb-2">
                  {pass.title}
                </h2>
                
                <div className="flex items-center gap-2 text-xs md:text-sm text-on-surface-variant mb-4">
                  <span>Sun 11 Oct - Tue 20 Oct</span>
                  <span>•</span>
                  <span>Navratri</span>
                  <span>•</span>
                  <span>Ahmedabad</span>
                </div>
                
                <div className="flex items-center gap-1 text-on-surface-variant text-xs mb-4">
                  <Eye size={14} />
                  <span>Views (2.3K)</span>
                </div>
                
                <Link
                  href={`/passes/${pass.id}`}
                  className="bg-secondary text-white font-bold py-3 px-8 rounded-full text-sm hover:scale-105 transition-transform inline-block"
                >
                  Book Now {formatPrice(getStartingPrice(pass))}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {passes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === idx ? "bg-secondary w-6" : "bg-outline-variant"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

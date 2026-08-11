import { useEffect, useState } from "react";
import { defaultPasses, Pass, formatPrice, getStartingPrice } from "../data/passes";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PopularEvents() {
  const [passes, setPasses] = useState<Pass[]>([]);

  useEffect(() => {
    // Exclude the featured ones for this list or keep all
    setPasses(defaultPasses);
  }, []);

  if (passes.length === 0) return null;

  return (
    <section className="px-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-playfair text-xl font-bold text-on-surface">Popular Events</h2>
          <p className="text-sm text-on-surface-variant">Popular events to attend with friends</p>
        </div>
        <Link href="#" className="flex items-center gap-1 text-sm font-semibold text-secondary hover:underline">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {passes.map((pass) => (
          <Link
            href={`/passes/${pass.id}`}
            key={pass.id}
            className="bg-primary-container border border-outline-variant rounded-3xl overflow-hidden flex flex-col group cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] bg-surface-variant overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 pointer-events-none"
                style={{ backgroundImage: `url(${pass.img})` }}
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs font-bold text-secondary mb-1">
                Sun 11 Oct - Tue 20 Oct | ...
              </p>
              <h3 className="font-poppins text-base font-bold text-on-surface mb-1 line-clamp-2">
                {pass.title}
              </h3>
              <p className="text-xs text-on-surface-variant mb-4">
                {pass.subtitle}
              </p>
              
              <div className="mt-auto">
                <span className="font-bold text-on-surface-variant text-sm">
                  {formatPrice(getStartingPrice(pass))} onwards
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { type Pass, formatPrice, getStartingPrice, isPassFullySoldOut } from "../data/passes";

interface PassCardProps {
  pass: Pass;
  index: number;
}

export default function PassCard({ pass, index }: PassCardProps) {
  const isSoldOut = isPassFullySoldOut(pass);
  const startingPrice = getStartingPrice(pass);

  const hasDome = pass.tiers.some(t => t.name.toLowerCase().includes("dome") || t.includes.some(i => i.toLowerCase().includes("dome")));
  const hasFood = pass.tiers.some(t => t.name.toLowerCase().includes("food") || t.includes.some(i => i.toLowerCase().includes("food") || i.toLowerCase().includes("buffet")));

  const featuredTierTag = pass.tiers.find(t => t.tag === "BEST SELLER")?.tag || pass.tiers.find(t => t.tag)?.tag;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-700 flex flex-col ${
        pass.isFeatured
          ? "bg-primary-container border-2 border-secondary shadow-[0_0_40px_rgba(225,6,0,0.15)]"
          : "bg-primary-container border border-outline-variant hover:border-secondary/60"
      }`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <Image
          src={pass.img}
          alt={pass.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover group-hover:scale-110 transition-transform duration-1000 ${
            isSoldOut ? "grayscale opacity-40" : "opacity-50 group-hover:opacity-70"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent pointer-events-none" />

        {/* Tag badge */}
        {(featuredTierTag || isSoldOut) && (
          <div
            className={`absolute top-4 right-4 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest shadow-lg ${
              isSoldOut
                ? "bg-red-500/90 text-white"
                : "bg-secondary text-white"
            }`}
          >
            {isSoldOut ? "SOLD OUT" : featuredTierTag}
          </div>
        )}

        {/* Category badges row */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {hasDome && (
            <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider border border-white/20">
              🌧️ Dome Options
            </span>
          )}
          {hasFood && (
            <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider border border-white/20">
              🍽️ Food Options
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-8 flex flex-col flex-1">
        <h3
          className={`font-headline-md italic mb-1 text-xl ${
            pass.isFeatured ? "text-secondary" : "text-on-surface"
          }`}
        >
          {pass.title}
        </h3>
        <p className="text-on-surface-variant text-sm mb-5 line-clamp-2">
          {pass.subtitle}
        </p>

        {/* Tiers preview */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          <span className="text-[11px] text-on-surface-variant font-medium mb-1 w-full uppercase tracking-widest">
            {pass.tiers.length} Options Available:
          </span>
          {pass.tiers.map((t) => (
            <span
              key={t.id}
              className={`text-[10px] px-2 py-1 rounded border ${t.isSoldOut ? "border-red-500/30 text-red-400/50 line-through" : "border-outline-variant text-on-surface-variant bg-primary/50"}`}
            >
              {t.name}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between gap-4 mt-auto">
          <div>
            <span className="text-[10px] text-on-surface-variant font-label-md tracking-widest block mb-1">
              STARTING FROM
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-secondary">
                {formatPrice(startingPrice)}
              </span>
            </div>
          </div>

          <Link
            href={`/passes/${pass.id}`}
            className={`px-6 py-3 rounded-full font-label-md text-xs tracking-widest transition-all duration-300 whitespace-nowrap ${
              isSoldOut
                ? "bg-outline-variant text-on-surface-variant cursor-not-allowed pointer-events-none"
                : "bg-secondary text-white hover:bg-secondary/90 hover:scale-105 active:scale-95 shadow-md shadow-secondary/30"
            }`}
            aria-label={`View details for ${pass.title}`}
          >
            {isSoldOut ? "SOLD OUT" : "VIEW OPTIONS"}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      aria-label="Hero banner"
      className="relative min-h-screen flex items-end sm:items-center overflow-hidden pb-16 sm:pb-10 pt-10"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          alt="Luxury festive event in Gujarat showcasing traditional decorations and grand hospitality"
          src="/images/hero-bg.jpg"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.3] scale-105 animate-[pulse_8s_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-primary" />
      </motion.div>
      <div className="relative z-10 px-6 md:px-20 w-full max-w-7xl mx-auto text-center pt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-8 border border-secondary-fixed/50 text-secondary-fixed font-label-md tracking-[0.3em] sm:tracking-[0.4em] rounded-full bg-white/5 backdrop-blur-md text-[11px] sm:text-sm">
            ESTABLISHED 2022
          </div>
          <h1 className="font-headline-xl text-[36px] sm:text-[54px] md:text-[100px] text-surface-bright mb-4 sm:mb-8 leading-[1.1] italic text-glow">
            THE GOLD STANDARD OF
            <br />
            <span className="font-bold not-italic block mt-4">
              FESTIVE HOSPITALITY
            </span>
          </h1>
          <p className="font-body-md sm:font-body-lg text-surface-variant mb-6 sm:mb-12 max-w-2xl mx-auto leading-relaxed opacity-90 tracking-wide text-sm sm:text-lg">
            Defining the pinnacle of luxury celebrations and elite corporate
            access across Gujarat&apos;s most iconic heritage arenas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pb-4">
            <a
              href="#contact"
              className="metallic-gold-btn px-8 sm:px-12 py-4 sm:py-6 rounded-full font-label-md text-sm sm:text-lg hover:shadow-[0_0_30px_rgba(233,195,73,0.4)] transition-all duration-500 tracking-widest text-center"
            >
              Corporate Partnerships
            </a>
            <a
              href="#showcase"
              className="px-8 sm:px-12 py-4 sm:py-6 rounded-full font-label-md text-sm sm:text-lg text-surface-bright border border-white/20 hover:bg-white/10 transition-all tracking-widest backdrop-blur-sm text-center"
            >
              Explore Portfolio
            </a>
          </div>

          {/* Scroll indicator — inside content flow so it's always visible */}
          <motion.div
            style={{ opacity }}
            className="mt-8 sm:mt-12 text-white/40 animate-bounce hidden sm:flex justify-center"
            aria-hidden="true"
          >
            <ChevronsDown size={36} />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

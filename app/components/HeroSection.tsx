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
      className="relative h-screen flex items-center overflow-hidden"
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
      <div className="relative z-10 px-6 md:px-20 w-full max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-6 py-2 mb-8 border border-secondary-fixed/50 text-secondary-fixed font-label-md tracking-[0.4em] rounded-full bg-white/5 backdrop-blur-md">
            ESTABLISHED 2012
          </div>
          <h1 className="font-headline-xl text-[54px] md:text-[100px] text-surface-bright mb-8 leading-[1] italic text-glow">
            THE GOLD STANDARD OF
            <br />
            <span className="font-bold not-italic block mt-4">
              FESTIVE HOSPITALITY
            </span>
          </h1>
          <p className="font-body-lg text-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed opacity-90 tracking-wide">
            Defining the pinnacle of luxury celebrations and elite corporate
            access across Gujarat&apos;s most iconic heritage arenas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="metallic-gold-btn px-12 py-6 rounded-full font-label-md text-lg hover:shadow-[0_0_30px_rgba(233,195,73,0.4)] transition-all duration-500 tracking-widest">
              Corporate Partnerships
            </button>
            <button className="px-12 py-6 rounded-full font-label-md text-surface-bright border border-white/20 hover:bg-white/10 transition-all tracking-widest backdrop-blur-sm">
              Explore Portfolio
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 animate-bounce"
        aria-hidden="true"
      >
        <ChevronsDown size={40} />
      </motion.div>
    </section>
  );
}

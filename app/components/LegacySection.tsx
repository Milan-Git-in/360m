"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import AnimatedCounter from "./AnimatedCounter";

export default function LegacySection() {
  return (
    <section
      id="legacy"
      aria-labelledby="legacy-heading"
      className="py-32 px-6 md:px-20 bg-surface"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-16">
              <FadeIn delay={0.2}>
                <div className="group cursor-default">
                  <span className="text-7xl md:text-9xl font-bold text-primary italic leading-none group-hover:text-secondary transition-colors duration-500 block text-glow">
                    <AnimatedCounter from={0} to={4} suffix="+" />
                  </span>
                  <p className="font-label-md text-secondary tracking-[0.3em] mt-6">
                    Years of Crafting Perfection
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="group cursor-default">
                  <span className="text-7xl md:text-9xl font-bold text-primary italic leading-none group-hover:text-secondary transition-colors duration-500 block text-glow">
                    <AnimatedCounter from={0} to={2} suffix="M+" />
                  </span>
                  <p className="font-label-md text-secondary tracking-[0.3em] mt-6">
                    Elite Guest Experiences
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <FadeIn>
              <h2
                id="legacy-heading"
                className="font-headline-xl text-primary leading-tight text-5xl"
              >
                A Legacy Carved in Culture.
              </h2>
              <p className="font-body-lg text-on-surface-variant leading-loose max-w-xl mt-6">
                At 360 EVENTS, we don&apos;t just manage gatherings; we curate
                historical milestones. Our firm stands as the premier gateway to
                Gujarat&apos;s cultural heartbeat, blending ancestral heritage
                with modern-day luxury management.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl group mt-10">
                <Image
                  src="/images/heritage-event.jpg"
                  alt="Grand heritage event venue in Gujarat with traditional decor and festive lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

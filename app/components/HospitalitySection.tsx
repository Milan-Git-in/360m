"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";

const packages = [
  {
    title: "The Nightly",
    description: "Premium access for singular celebrations.",
    img: "/images/heritage-event.jpg",
    alt: "Nightly pass event experience with premium heritage hospitality",
    highlight: false,
    height: "h-[600px]",
  },
  {
    title: "The Season Suite",
    description: "Full-access immersion into the complete festival cycle.",
    img: "/images/season-suite.jpg",
    alt: "Season suite offering exclusive access to the full festival experience",
    highlight: true,
    height: "h-[650px] lg:-mt-6",
    badge: "SIGNATURE",
  },
  {
    title: "Imperial VVIP",
    description: "Bespoke concierge and private arena access.",
    img: "/images/hero-bg.jpg",
    alt: "Imperial VVIP private arena access with bespoke concierge services",
    highlight: false,
    height: "h-[600px]",
  },
];

export default function HospitalitySection() {
  return (
    <section
      id="packages"
      aria-labelledby="hospitality-heading"
      className="py-32 px-6 md:px-20 bg-primary text-surface overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-24">
            <h2
              id="hospitality-heading"
              className="font-headline-xl text-secondary-fixed mb-6 italic text-5xl"
            >
              Exclusive Passage
            </h2>
            <p className="font-label-md text-surface-variant max-w-xl mx-auto uppercase tracking-widest leading-relaxed">
              Reserved for those who demand the extraordinary.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {packages.map((pkg, index) => (
            <FadeIn
              key={pkg.title}
              delay={index * 0.2}
              y={pkg.highlight ? 0 : 30}
            >
              <article
                className={`group relative rounded-3xl overflow-hidden transition-all duration-700 ${pkg.height} ${
                  pkg.highlight
                    ? "bg-white/10 border-2 border-secondary-fixed shadow-[0_0_50px_rgba(233,195,73,0.2)]"
                    : "bg-white/5 border border-white/10 hover:border-secondary-fixed"
                }`}
              >
                <Image
                  src={pkg.img}
                  alt={pkg.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={`object-cover group-hover:scale-110 transition-transform duration-1000 ${
                    pkg.highlight ? "opacity-60" : "opacity-40"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent p-10 flex flex-col justify-end">
                  {pkg.badge && (
                    <div className="absolute top-8 right-8 bg-secondary-fixed text-on-secondary-fixed px-4 py-1.5 rounded-full text-xs font-bold tracking-widest">
                      {pkg.badge}
                    </div>
                  )}
                  <h3
                    className={`font-headline-md mb-4 italic ${
                      pkg.highlight
                        ? "text-5xl text-secondary-fixed mb-6"
                        : "text-4xl"
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className={`mb-10 leading-relaxed ${
                      pkg.highlight
                        ? "text-surface-bright font-body-lg mb-12"
                        : "text-surface-variant font-body-md opacity-80"
                    }`}
                  >
                    {pkg.description}
                  </p>
                  <a
                    className={`metallic-gold-btn rounded-full font-label-md text-center w-full block tracking-widest ${
                      pkg.highlight
                        ? "py-5 px-10 text-lg hover:shadow-[0_0_20px_rgba(233,195,73,0.5)]"
                        : "py-4 px-8 hover:brightness-110"
                    }`}
                    href="/passes"
                    aria-label={`Browse ${pkg.title} passes`}
                  >
                    {pkg.highlight ? "Explore Passes" : "View Passes"}
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

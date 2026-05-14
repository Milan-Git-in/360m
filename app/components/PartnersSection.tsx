"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

const partners = [
  {
    name: "Jasmine Sandlas",
    img: "/images/js.png",
    alt: "Jasmine Sandlas",
  },
  {
    name: "Aditya Gadhvi",
    img: "/images/ag.png",
    alt: "Aditya Gadhvi",
  },
  {
    name: "Geeta Rabari",
    img: "/images/gr.png",
    alt: "Geeta Rabari",
  },
  {
    name: "Honey Singh",
    img: "/images/hs.png",
    alt: "Honey Singh",
  },
];

// Two videos that loop in the background, cross-fading between them
const bgVideos = ["/v1.mp4", "/v3.mp4", "/v5.mp4"];

function BackgroundVideos() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [showA, setShowA] = useState(true);

  // Assign which video ref is "active" vs "standby"
  const activeRef = showA ? videoARef : videoBRef;
  const standbyRef = showA ? videoBRef : videoARef;

  // On mount, start video A
  useEffect(() => {
    const vid = videoARef.current;
    if (vid) {
      vid.src = bgVideos[0];
      vid.load();
      vid.play().catch(() => {});
    }
  }, []);

  // When active video ends, swap to standby with next video
  useEffect(() => {
    const active = activeRef.current;
    if (!active) return;

    const handleEnded = () => {
      const nextIdx = (currentIdx + 1) % bgVideos.length;
      const standby = standbyRef.current;
      if (standby) {
        standby.src = bgVideos[nextIdx];
        standby.load();
        standby.play().catch(() => {});
      }
      // Cross-fade
      setShowA((prev) => !prev);
      setCurrentIdx(nextIdx);
    };

    active.addEventListener("ended", handleEnded);
    return () => active.removeEventListener("ended", handleEnded);
  }, [activeRef, standbyRef, currentIdx]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <video
        ref={videoARef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
          showA ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={videoBRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
          showA ? "opacity-0" : "opacity-100"
        }`}
        muted
        playsInline
        preload="auto"
      />
      {/* Dark overlay so partners are still readable */}
      <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />
      {/* Mandala radial on top */}
      <div className="absolute inset-0 mandala-bg" />
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="py-32 px-6 md:px-20 relative overflow-hidden"
    >
      <BackgroundVideos />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2
            id="partners-heading"
            className="font-headline-xl text-secondary-fixed mb-24 italic text-5xl"
          >
            Star Studded Moments
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <FadeIn key={partner.name} delay={index * 0.15}>
              <div className="group relative overflow-hidden rounded-full aspect-square bg-surface shadow-2xl transition-transform duration-700 hover:-translate-y-4 cursor-pointer">
                <Image
                  src={partner.img}
                  alt={partner.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/60">
                  <span className="text-secondary-fixed font-headline-md text-2xl italic px-4 text-center">
                    {partner.name}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

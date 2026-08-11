"use client";

import React, { useEffect, useRef, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";

export default function Footer() {
  const [year] = useState<number>(new Date().getFullYear());
  const waveRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    // placeholder for future JS-driven wave tweaks
  }, []);

  return (
    <footer className="relative overflow-hidden mt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-[#111214] to-transparent opacity-95 pointer-events-none" />

      {/* Decorative floating circles */}
      <div className="absolute -top-10 left-8 w-40 h-40 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute -top-6 right-12 w-28 h-28 rounded-full bg-secondary/10 blur-2xl animate-float" />

      {/* Wave SVG */}
      <div className="w-full -mt-1 rotate-180 opacity-45">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 block"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            d="M0,40 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="#0b0c0d"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center text-primary font-bold text-xl">
              <Image src="/Logo.png" alt="360 Group" width={80} height={80} />
            </div>
            <h3 className="text-3xl font-bold text-white mt-4">360 GROUP</h3>
            <p className="text-on-surface-variant mt-3 max-w-sm">
              We design immersive, high-quality experiences with premium
              hospitality and attention to detail.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:col-span-1">
            <div className="flex gap-6">
              <div>
                <div className="text-4xl font-bold text-secondary">
                  <AnimatedCounter from={0} to={4} suffix=" yrs" />
                </div>
                <div className="text-sm text-on-surface-variant">
                  Experience
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary">
                  <AnimatedCounter from={0} to={5000000} duration={3} compact />
                </div>
                <div className="text-sm text-on-surface-variant">
                  People served
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-on-surface-variant">
                Ready to host your next premium gathering? Contact us on
                WhatsApp for bookings and corporate hosting.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <a
              href="https://wa.me/919638770089"
              className="px-6 py-3 rounded-full bg-secondary text-white font-bold"
            >
              Contact via WhatsApp
            </a>
            <div className="text-sm text-on-surface-variant">
              360 GROUP. All Rights Reserved. {year}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 6s infinite;
        }
        .animate-float {
          animation: float 8s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </footer>
  );
}

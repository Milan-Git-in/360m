"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Check, ShieldCheck, Ticket } from "lucide-react";
import { useEffect } from "react";
import { formatPrice, isPassFullySoldOut, type Pass } from "../../data/passes";
import WhatsAppBookingModal from "../../components/WhatsAppBookingModal";

export default function PassDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? decodeURIComponent(params.id) : "";
  
  const [pass, setPass] = useState<Pass | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for selected tier and modal
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/passes")
      .then((res) => res.json())
      .then((data: Pass[]) => {
        const found = data.find((p) => p.id === id) || null;
        setPass(found);
        if (found && found.tiers && found.tiers.length > 0) {
          setSelectedTierId(found.tiers[0].id);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load pass. ID searched:", id, err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-center px-6">
        <div className="w-10 h-10 border-2 border-secondary-fixed/30 border-t-secondary-fixed rounded-full animate-spin" />
      </div>
    );
  }

  if (!pass) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-headline-xl text-secondary-fixed italic text-4xl mb-4">
            Pass Not Found
          </h1>
          <p className="text-surface-variant/50 mb-2">
            This pass may no longer be available or the link is invalid.
          </p>
          <p className="text-surface-variant/30 text-xs mb-8">
            (Searching for ID: {id})
          </p>
          <Link
            href="/passes"
            className="metallic-gold-btn px-8 py-4 rounded-full font-label-md tracking-widest inline-block"
          >
            BROWSE ALL PASSES
          </Link>
        </div>
      </div>
    );
  }

  const isSoldOut = isPassFullySoldOut(pass);
  const selectedTier = pass.tiers.find(t => t.id === selectedTierId) || pass.tiers[0];
  const hasDome = pass.tiers.some(t => t.name.toLowerCase().includes("dome") || t.includes.some(i => i.toLowerCase().includes("dome")));
  const hasFood = pass.tiers.some(t => t.name.toLowerCase().includes("food") || t.includes.some(i => i.toLowerCase().includes("food") || i.toLowerCase().includes("buffet")));

  return (
    <div className="min-h-screen bg-primary text-surface overflow-x-hidden">
      {/* Top nav */}
      <div className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-20 h-20">
          <Link
            href="/passes"
            className="flex items-center gap-3 text-surface-variant/60 hover:text-secondary-fixed transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-label-md tracking-widest text-xs">
              ALL PASSES
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

      {/* Hero image */}
      <section className="relative pt-20 h-[50dvh] md:h-[60dvh]">
        <Image
          src={pass.img}
          alt={pass.title}
          fill
          sizes="100vw"
          priority
          className={`object-cover ${isSoldOut ? "grayscale opacity-30" : "opacity-40"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badges */}
              <div className="flex gap-3 mb-4 flex-wrap">
                {isSoldOut && (
                  <span className="px-4 py-1 rounded-full text-xs font-bold tracking-widest bg-red-500/90 text-white">
                    SOLD OUT
                  </span>
                )}
                {hasDome && (
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-wider border border-white/20">
                    🌧️ Dome Options
                  </span>
                )}
                {hasFood && (
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-wider border border-white/20">
                    🍽️ Food Options
                  </span>
                )}
              </div>

              <h1 className="font-headline-xl text-secondary-fixed italic text-4xl md:text-6xl mb-2">
                {pass.title}
              </h1>
              <p className="text-surface-variant/60 font-body-lg max-w-2xl">
                {pass.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left — Details */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="font-headline-md text-surface-bright text-2xl italic mb-4">
                  About This Event
                </h2>
                <p className="font-body-lg text-surface-variant/60 leading-relaxed">
                  {pass.description}
                </p>
              </motion.div>

              {/* Tiers / Sub-Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="font-headline-md text-surface-bright text-2xl italic mb-6 flex items-center gap-3">
                  <Ticket className="text-secondary-fixed" />
                  Select Your Pass Tier
                </h2>
                <div className="space-y-4">
                  {pass.tiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => !tier.isSoldOut && setSelectedTierId(tier.id)}
                      className={`relative p-6 rounded-3xl border transition-all duration-300 ${
                        tier.isSoldOut
                          ? "bg-white/5 border-white/5 opacity-60 cursor-not-allowed"
                          : selectedTierId === tier.id
                          ? "bg-secondary-fixed/10 border-secondary-fixed shadow-[0_0_30px_rgba(233,195,73,0.15)] cursor-pointer"
                          : "bg-white/5 border-white/10 hover:border-secondary-fixed/50 cursor-pointer"
                      }`}
                    >
                      {/* Tier Tag */}
                      {(tier.tag || tier.isSoldOut) && (
                        <div className={`absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                          tier.isSoldOut ? "bg-red-500 text-white" : "bg-secondary-fixed text-on-secondary-fixed"
                        }`}>
                          {tier.isSoldOut ? "SOLD OUT" : tier.tag}
                        </div>
                      )}
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <h3 className="font-headline-md text-xl mb-1 text-surface-bright">{tier.name}</h3>
                          <div className="flex items-baseline gap-2 mb-4 md:mb-0">
                            <span className="text-2xl font-bold text-secondary-fixed">
                              {formatPrice(tier.price)}
                            </span>
                            {tier.originalPrice && (
                              <span className="text-sm text-surface-variant/40 line-through">
                                {formatPrice(tier.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 md:ml-8">
                          <ul className="space-y-2">
                            {tier.includes.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-surface-variant/80">
                                <Check size={16} className="text-secondary-fixed shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Radio indicator (mobile hidden, desktop visible) */}
                        <div className="hidden md:flex shrink-0 w-6 h-6 rounded-full border-2 items-center justify-center border-white/20">
                          {selectedTierId === tier.id && <div className="w-3 h-3 rounded-full bg-secondary-fixed" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — Booking card (sticky) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-28"
              >
                <div className="bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/30">
                  <div className="mb-4">
                    <span className="text-surface-variant/50 font-label-md text-[10px] tracking-widest uppercase block mb-1">
                      SELECTED TIER
                    </span>
                    <h3 className="font-headline-md text-xl text-surface-bright">{selectedTier.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-secondary-fixed">
                        {formatPrice(selectedTier.price)}
                      </span>
                      {selectedTier.originalPrice && (
                        <span className="text-lg text-surface-variant/30 line-through">
                          {formatPrice(selectedTier.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick features */}
                  <div className="space-y-3 mb-8">
                    {selectedTier.includes.slice(0, 4).map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-surface-variant/70 text-sm"
                      >
                        <Check
                          size={16}
                          className="text-secondary-fixed shrink-0 mt-0.5"
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                    {selectedTier.includes.length > 4 && (
                      <div className="text-xs text-secondary-fixed/70 ml-7">
                        + {selectedTier.includes.length - 4} more features
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={selectedTier.isSoldOut}
                    className="w-full py-5 rounded-2xl font-label-md tracking-widest text-base transition-all duration-300 shadow-lg metallic-gold-btn hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {selectedTier.isSoldOut ? "TIER SOLD OUT" : "BOOK THIS TIER"}
                  </button>

                  <div className="flex items-center gap-2 justify-center mt-5 text-surface-variant/30">
                    <ShieldCheck size={14} />
                    <span className="text-[11px] tracking-wider">
                      Secure WhatsApp Booking
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Booking Modal */}
      {selectedTier && (
        <WhatsAppBookingModal
          pass={pass}
          tier={selectedTier}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

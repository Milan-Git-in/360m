"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, ExternalLink } from "lucide-react";
import { type Pass, type PassTier, formatPrice, buildWhatsAppUrl } from "../data/passes";

interface WhatsAppBookingModalProps {
  pass: Pass;
  tier: PassTier;
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppBookingModal({
  pass,
  tier,
  isOpen,
  onClose,
}: WhatsAppBookingModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const increment = useCallback(
    () => setQuantity((q) => Math.min(q + 1, 20)),
    []
  );
  const decrement = useCallback(
    () => setQuantity((q) => Math.max(q - 1, 1)),
    []
  );

  const totalPrice = tier.price * quantity;

  const handleBook = () => {
    const url = buildWhatsAppUrl({
      pass,
      tier,
      quantity,
      customerName,
      customerPhone,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-primary rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-8 pb-6 border-b border-white/10">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-2">
                {tier.tag && (
                  <span className="px-3 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold tracking-widest rounded-full">
                    {tier.tag}
                  </span>
                )}
              </div>
              <h3 className="font-headline-md text-surface-bright text-2xl italic pr-12">
                {pass.title}
              </h3>
              <p className="text-secondary-fixed text-sm mt-1 font-medium">
                Tier: {tier.name}
              </p>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              {/* Quantity */}
              <div>
                <label className="font-label-md text-surface-variant text-xs tracking-wider block mb-3">
                  QUANTITY
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrement}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-3xl font-bold text-white min-w-[3ch] text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={increment}
                    disabled={quantity >= 20}
                    className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <label className="font-label-md text-surface-variant text-xs tracking-wider block">
                  YOUR DETAILS
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full py-3.5 px-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-variant/30 focus:border-secondary-fixed/50 focus:outline-none transition-colors text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (e.g. +91 98765 43210)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full py-3.5 px-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-surface-variant/30 focus:border-secondary-fixed/50 focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* Footer — Price Summary & CTA */}
            <div className="p-8 pt-0">
              <div className="bg-white/5 rounded-2xl p-5 mb-6 border border-white/5">
                <div className="flex justify-between text-sm text-surface-variant/60 mb-2">
                  <span>
                    {formatPrice(tier.price)} × {quantity}
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-baseline">
                  <span className="font-label-md text-surface-variant text-xs tracking-wider">
                    ESTIMATED TOTAL
                  </span>
                  <span className="text-2xl font-bold text-secondary-fixed">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={tier.isSoldOut}
                className="w-full py-5 rounded-2xl font-label-md tracking-widest text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg metallic-gold-btn hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                BOOK VIA WHATSAPP
                <ExternalLink size={18} />
              </button>

              <p className="text-center text-[11px] text-surface-variant/30 mt-4 tracking-wide">
                Opens WhatsApp with your booking details pre-filled
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

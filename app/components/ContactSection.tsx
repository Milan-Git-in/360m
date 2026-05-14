"use client";

import { ArrowRight, MapPin, MessageCircle, Smartphone } from "lucide-react";
import FadeIn from "./FadeIn";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-32 px-6 md:px-20 bg-surface relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <FadeIn>
            <div>
              <h2
                id="contact-heading"
                className="font-headline-xl text-primary mb-8 text-5xl"
              >
                Corporate Concierge
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-16 leading-relaxed">
                Secure bulk reservations and institutional partnerships through
                our dedicated enterprise team. Excellence, guaranteed for your
                organization.
              </p>
              <address className="space-y-12 not-italic">
                <div className="flex items-start gap-6">
                  <MapPin
                    className="text-secondary mt-1 shrink-0"
                    size={32}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-label-md text-primary mb-3">
                      Headquarters
                    </h3>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      360 Tower, Sindhu Bhavan Road,
                      <br />
                      Ahmedabad, Gujarat 380054
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <Smartphone
                    className="text-secondary mt-1 shrink-0"
                    size={32}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-label-md text-primary mb-3">
                      Private Lines
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-on-surface-variant font-body-md">
                      <a href="tel:+919638770089" className="hover:text-secondary transition-colors">
                        +91 96387 70089

                      </a>
                      <a href="tel:+919638770289" className="hover:text-secondary transition-colors">
                        +91 96387 70289
                      </a>
                    </div>
                  </div>
                </div>
              </address>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/10 rounded-[4rem] blur-3xl" />
              <div className="relative bg-white rounded-[3rem] p-12 shadow-2xl border border-outline-variant/30 text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-10 shadow-xl shadow-green-500/20">
                  <MessageCircle size={40} aria-hidden="true" />
                </div>
                <h3 className="font-headline-md text-primary mb-4 text-3xl">
                  Direct Connection
                </h3>
                <p className="font-body-md text-on-surface-variant mb-12">
                  Instant responses for enterprise inquiries.
                </p>
                <a
                  className="w-full metallic-gold-btn py-6 rounded-2xl font-label-md flex items-center justify-center gap-4 hover:scale-105 transition-transform duration-300 shadow-lg text-lg"
                  href="https://wa.me/919638770089"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Contact 360 Events via corporate WhatsApp"
                >
                  CORPORATE WHATSAPP
                  <ArrowRight size={24} aria-hidden="true" />
                </a>
                <p className="mt-8 text-xs text-on-surface-variant/50 font-label-md tracking-widest">
                  Available 10:00 AM - 07:00 PM IST
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

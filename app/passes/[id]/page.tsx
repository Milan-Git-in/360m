"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Share2,
  Calendar,
  MapPin,
  Globe,
  Clock,
  Users,
  Ticket,
  ChevronDown,
  X,
} from "lucide-react";
import { formatPrice, defaultPasses, type Pass } from "../../data/passes";
import { useCart, buildWhatsAppMessage } from "../../components/CartContext";

export default function PassDetailPage() {
  const params = useParams();
  const id =
    typeof params?.id === "string" ? decodeURIComponent(params.id) : "";

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pass, setPass] = useState<Pass | null>(null);

  useEffect(() => {
    if (id) {
      const found = defaultPasses.find((p) => p.id === id) || null;
      setPass(found);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  if (!pass) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary mb-4">
            Pass Not Found
          </h1>
          <Link
            href="/"
            className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const startingPrice = pass.tiers?.length
    ? Math.min(...pass.tiers.map((t) => t.price))
    : 0;

  const handleBookTickets = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-primary text-on-surface pb-24 font-poppins relative">
      {/* Top Nav */}
      <div className="absolute top-4 left-4 z-10 flex items-center justify-between w-[calc(100%-2rem)] max-w-3xl md:left-1/2 md:-translate-x-1/2">
        <Link
          href="/"
          className="w-10 h-10 bg-primary-container/90 backdrop-blur border border-outline-variant rounded-full flex items-center justify-center text-on-surface shadow-md"
        >
          <ChevronLeft size={24} />
        </Link>
        <button className="w-10 h-10 bg-primary-container/90 backdrop-blur border border-outline-variant rounded-full flex items-center justify-center text-on-surface shadow-md">
          <Share2 size={20} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="w-full aspect-[4/5] md:h-[60vh] max-w-3xl mx-auto relative md:rounded-b-3xl overflow-hidden shadow-sm">
        <Image
          src={pass.img}
          alt={pass.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 -mt-10 relative z-10 max-w-3xl mx-auto">
        <h1 className="text-[32px] font-bold text-on-surface mb-4 leading-tight uppercase">
          {pass.title}
        </h1>

        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-3 text-on-surface-variant font-semibold">
            <Calendar size={22} className="text-secondary" />
            <span>Sun 11 Oct - Tue 13 Oct | 8:30 PM</span>
          </div>
          <div className="flex items-center gap-3 text-on-surface-variant font-semibold">
            <MapPin size={22} className="text-secondary" />
            <span>Sacred Raas, Ahmedabad</span>
          </div>
        </div>

        {/* About the Event */}
        <div className="bg-primary-container rounded-2xl p-5 mb-6 border border-outline-variant shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
            <h2 className="text-xl font-bold text-on-surface">
              About the Event
            </h2>
          </div>
          <p className="text-on-surface-variant text-[15px] leading-relaxed mb-4">
            Ahmedabad get ready for something which you have never seen before.
            <br />
            <br />
            Some celebrations become traditions.
            <br />
            Others become unforgettable memories.
          </p>
          <button className="text-secondary font-bold text-[15px]">
            Show more
          </button>
        </div>

        {/* Event Guide */}
        <div className="bg-primary-container rounded-2xl p-5 mb-6 border border-outline-variant shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
              <h2 className="text-xl font-bold text-on-surface">Event Guide</h2>
            </div>
            <button className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-bold border border-secondary/20">
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary p-5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-outline-variant">
              <Globe size={26} className="text-secondary" />
              <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase mt-1">
                Language
              </span>
              <span className="text-base font-semibold text-on-surface">
                Gujarati
              </span>
            </div>
            <div className="bg-primary p-5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-outline-variant">
              <Clock size={26} className="text-secondary" />
              <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase mt-1">
                Duration
              </span>
              <span className="text-base font-semibold text-on-surface">
                3 Hours 15 Mins
              </span>
            </div>
            <div className="bg-primary p-5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-outline-variant">
              <Users size={26} className="text-secondary" />
              <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase mt-1">
                Entry Allowed For
              </span>
              <span className="text-base font-semibold text-on-surface">
                5+ years
              </span>
            </div>
            <div className="bg-primary p-5 rounded-xl flex flex-col items-center justify-center text-center gap-2 border border-outline-variant">
              <Ticket size={26} className="text-secondary" />
              <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase mt-1">
                Tickets Needed For
              </span>
              <span className="text-base font-semibold text-on-surface">
                5+ years
              </span>
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="bg-primary-container rounded-2xl p-5 mb-6 border border-outline-variant shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
            <h2 className="text-xl font-bold text-on-surface">Venue</h2>
          </div>

          <div className="bg-primary p-5 rounded-xl border border-outline-variant">
            <h3 className="font-bold text-on-surface text-[17px] mb-3">
              Sacred Raas, Ahmedabad
            </h3>
            <div className="flex gap-3 mb-5">
              <MapPin
                size={22}
                className="text-on-surface-variant shrink-0 mt-0.5"
              />
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                Sacred Raas Behind Nirvana Party Lawn, LJ University Road,
                Sarkhej - Gandhinagar Hwy, Makarba, Ahmedabad, Gujarat 382210,
                India
              </p>
            </div>
            <button className="bg-secondary text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg hover:bg-secondary/90 transition-colors">
              <MapPin size={18} /> Get Directions
            </button>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-primary-container rounded-2xl p-5 mb-6 border border-outline-variant shadow-[0_2px_10px_rgba(0,0,0,0.3)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
            <h2 className="text-xl font-bold text-on-surface">
              Terms &amp; Conditions
            </h2>
          </div>
          <ChevronDown className="text-on-surface-variant" size={24} />
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-primary-container border-t border-outline-variant p-4 flex items-center justify-between z-40 pb-6 md:pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.4)] md:max-w-3xl md:left-1/2 md:-translate-x-1/2 md:rounded-t-3xl">
        <div>
          <span className="text-xs text-on-surface-variant block mb-1">
            Starts from
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[22px] font-bold text-on-surface">
              {formatPrice(startingPrice)}
            </span>
            <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded border border-secondary/20">
              Available
            </span>
          </div>
        </div>
        <button
          onClick={handleBookTickets}
          className="bg-secondary text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_12px_rgba(225,6,0,0.4)] hover:bg-secondary/90 transition-colors active:scale-95 transition-transform"
        >
          BOOK TICKETS
        </button>
      </div>

      {/* Booking Flow Modal / Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-primary z-50 flex flex-col font-poppins animate-in slide-in-from-bottom max-w-3xl mx-auto">
          {/* Top Bar */}
          <div className="bg-secondary text-white p-4 flex items-center justify-between shrink-0 shadow-md">
            <button
              onClick={() => {
                if (bookingStep === 2) setBookingStep(1);
                else setIsBookingOpen(false);
              }}
              className="p-2"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-center">
              <h2 className="font-bold text-[15px] tracking-wide">
                {pass.title.toUpperCase()}
              </h2>
              <p className="text-[11px] text-white/70 mt-0.5">
                Sacred Raas, Ahmedabad
              </p>
            </div>
            <button
              onClick={() => {
                setIsBookingOpen(false);
                setBookingStep(1);
              }}
              className="p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Stepper */}
          <div className="pt-8 pb-4 shrink-0 flex flex-col items-center">
            <div className="flex items-center justify-center w-full max-w-[200px] mb-6">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${bookingStep === 1 ? "bg-secondary text-white ring-4 ring-secondary/20" : "bg-secondary text-white"}`}
              >
                1
              </div>
              <div
                className={`h-[2px] flex-1 mx-1 ${bookingStep === 2 ? "bg-secondary" : "bg-outline-variant"}`}
              ></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${bookingStep === 2 ? "bg-secondary text-white ring-4 ring-secondary/20" : "bg-primary-container text-on-surface-variant border border-outline-variant"}`}
              >
                2
              </div>
            </div>
            <h3 className="font-bold text-on-surface text-[17px]">
              {bookingStep === 1 ? "Date & Time" : "Tickets"}
            </h3>
          </div>

          {/* Step Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {bookingStep === 1 ? (
              <>
                <h4 className="font-bold text-on-surface mb-5 text-[17px]">
                  Select Date
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { day: "SUN", date: "11", month: "Oct" },
                    { day: "MON", date: "12", month: "Oct" },
                    { day: "TUE", date: "13", month: "Oct" },
                  ].map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(d.date)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all ${
                        selectedDate === d.date
                          ? "border-secondary bg-secondary/10 shadow-[0_0_0_2px_#e10600,0_4px_15px_rgba(225,6,0,0.1)]"
                          : "border-outline-variant bg-primary-container hover:border-secondary/40"
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase mb-1 ${selectedDate === d.date ? "text-secondary" : "text-on-surface-variant"}`}
                      >
                        {d.day}
                      </span>
                      <span className="text-[32px] font-bold text-on-surface leading-none mb-1">
                        {d.date}
                      </span>
                      <span
                        className={`text-sm font-semibold ${selectedDate === d.date ? "text-secondary" : "text-on-surface-variant"}`}
                      >
                        {d.month}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-primary-container rounded-2xl border border-outline-variant overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.2)]">
                {pass.tiers.map((tier, idx) => (
                  <div key={tier.id}>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-[17px] font-medium text-on-surface mb-1">
                            {tier.name}
                          </h4>
                          <span className="text-sm font-bold text-secondary">
                            {formatPrice(tier.price)}
                          </span>
                        </div>
                        <TierAddButton
                          passId={pass.id}
                          passTitle={pass.title}
                          tier={tier}
                        />
                      </div>

                      {tier.includes.length > 0 && (
                        <div className="mt-4 bg-primary rounded-xl border border-outline-variant overflow-hidden">
                          {expandedTier === tier.id ? (
                            <div className="p-4">
                              <ul className="space-y-3 mb-4">
                                {tier.includes.map((feature, fIdx) => (
                                  <li
                                    key={fIdx}
                                    className="flex items-start gap-3 text-sm text-on-surface-variant"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 mt-1.5 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <button
                                onClick={() => setExpandedTier(null)}
                                className="flex items-center justify-end w-full gap-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                              >
                                View Less{" "}
                                <ChevronDown size={14} className="rotate-180" />
                              </button>
                            </div>
                          ) : (
                            <div
                              className="p-4 flex items-center justify-between cursor-pointer"
                              onClick={() => setExpandedTier(tier.id)}
                            >
                              <div className="flex items-center gap-3 text-sm text-on-surface-variant line-clamp-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                                <span>{tier.includes[0]}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs font-semibold text-on-surface bg-primary-container px-3 py-1.5 rounded-full border border-outline-variant whitespace-nowrap shrink-0 ml-2">
                                View More ({tier.includes.length}){" "}
                                <ChevronDown size={14} />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {idx < pass.tiers.length - 1 && (
                      <div className="h-px bg-outline-variant mx-5" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="p-4 bg-primary-container border-t border-outline-variant shrink-0 pb-8 md:pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
            <BookingBottomBar
              bookingStep={bookingStep}
              selectedDate={selectedDate}
              passTitle={pass.title}
              onNext={() => setBookingStep((s) => Math.min(2, s + 1))}
              onClose={() => {
                setIsBookingOpen(false);
                setBookingStep(1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TierAddButton({
  passId,
  passTitle,
  tier,
}: {
  passId: string;
  passTitle: string;
  tier: any;
}) {
  const { items, addItem, updateQty } = useCart();
  const found = items.find((i) => i.passId === passId && i.tierId === tier.id);

  if (tier.isSoldOut) {
    return (
      <button className="bg-outline-variant text-on-surface-variant px-5 py-1.5 rounded-lg text-sm font-medium cursor-not-allowed">
        Sold out
      </button>
    );
  }

  if (found) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(passId, tier.id, found.qty - 1)}
          className="w-8 h-8 rounded-md border border-outline-variant flex items-center justify-center"
          aria-label="Decrease"
        >
          -
        </button>
        <span className="min-w-[26px] text-center font-bold">{found.qty}</span>
        <button
          onClick={() =>
            addItem(
              {
                passId,
                passTitle,
                tierId: tier.id,
                tierName: tier.name,
                price: tier.price,
              },
              1,
            )
          }
          className="w-8 h-8 rounded-md bg-secondary text-white flex items-center justify-center"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        addItem(
          {
            passId,
            passTitle,
            tierId: tier.id,
            tierName: tier.name,
            price: tier.price,
          },
          1,
        )
      }
      className="bg-secondary text-white px-5 py-1.5 rounded-lg text-sm font-medium shadow-md hover:bg-secondary/90 transition-colors"
    >
      Add
    </button>
  );
}

function BookingBottomBar({
  bookingStep,
  selectedDate,
  passTitle,
  onNext,
  onClose,
}: {
  bookingStep: number;
  selectedDate: string | null;
  passTitle: string;
  onNext: () => void;
  onClose: () => void;
}) {
  const { items, totalCount, totalAmount, clear } = useCart();

  const handleClick = () => {
    if (bookingStep === 1) {
      onNext();
      return;
    }
    if (!items.length) return;
    const message = buildWhatsAppMessage(items, {
      event: passTitle,
      date: selectedDate,
    });
    const url = `https://wa.me/919638770089?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    // optionally clear local cart
    clear();
    onClose();
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-on-surface-variant">Total</div>
          <div className="text-lg font-bold">{formatPrice(totalAmount)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-on-surface-variant">Items</div>
          <div className="text-lg font-bold">{totalCount}</div>
        </div>
      </div>
      <button
        onClick={handleClick}
        disabled={bookingStep === 1 && !selectedDate}
        className={`w-full py-4 rounded-xl font-bold text-[15px] tracking-wide transition-all shadow-md ${
          bookingStep === 1 && !selectedDate
            ? "bg-outline-variant text-on-surface-variant cursor-not-allowed"
            : "bg-secondary text-white hover:bg-secondary/90 shadow-[0_4px_12px_rgba(225,6,0,0.3)]"
        }`}
      >
        {bookingStep === 1 ? "Continue" : `Checkout via WhatsApp`}
      </button>
    </div>
  );
}

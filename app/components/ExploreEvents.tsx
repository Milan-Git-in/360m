import Link from "next/link";
import Image from "next/image";
import AnimatedCounter from "./AnimatedCounter";
import { defaultPasses } from "../data/passes";

export default function ExploreEvents() {
  const featured = defaultPasses.slice(0, 3);

  return (
    <section className="px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div className="md:col-span-2 bg-primary-container rounded-3xl overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
          <div className="p-10 flex flex-col-reverse md:flex-row gap-6 items-center md:items-end">
            <div className="md:w-1/2">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-on-surface mb-3">
                Our Showcase
              </h2>
              <p className="text-on-surface-variant mb-6 max-w-xl">
                Curated highlights from our current portfolio — premium acts,
                immersive hospitality and unforgettable nights. Book directly or
                reach out for curated experiences.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/passes"
                  className="px-6 py-3 rounded-full bg-secondary text-white font-bold shadow"
                >
                  View Passes
                </Link>
                <a
                  href="https://wa.me/919638770089"
                  className="px-6 py-3 rounded-full border border-outline-variant text-on-surface hover:bg-surface-variant"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div className="md:w-1/2 flex gap-4">
              {featured.map((p) => (
                <div
                  key={p.id}
                  className="w-40 md:w-60 rounded-2xl overflow-hidden relative"
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={240}
                    height={240}
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-md text-sm font-semibold">
                    {p.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-primary-container rounded-3xl p-6 shadow-lg flex flex-col justify-center items-start gap-6">
          <h3 className="text-on-surface-variant text-sm tracking-widest uppercase">
            By the numbers
          </h3>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-baseline justify-between w-full">
              <div>
                <div className="text-3xl font-bold text-secondary">
                  <AnimatedCounter from={0} to={4} suffix=" yrs" />
                </div>
                <div className="text-sm text-on-surface-variant">
                  Years of experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">
                  <AnimatedCounter from={0} to={5000000} suffix="+" />
                </div>
                <div className="text-sm text-on-surface-variant">
                  People served
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="text-2xl font-bold">Featured passes</div>
              <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-hide py-2">
                {defaultPasses.map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[160px] rounded-xl p-3 bg-primary flex flex-col gap-2 border border-outline-variant"
                  >
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-on-surface-variant">
                      {p.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

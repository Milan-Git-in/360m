"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultPasses, Pass } from "../data/passes";
import Image from "next/image";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Pass[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        const lowerQ = query.toLowerCase();
        const matches = defaultPasses.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQ) ||
            p.subtitle.toLowerCase().includes(lowerQ),
        );
        setResults(matches);
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image src="/Logo.png" alt="360 Group" width={80} height={80} />
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs mt-0.5">
            <span className="font-semibold">Limited to Ahmedabad</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
          >
            <Search size={18} />
          </button>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-primary z-[100] flex flex-col p-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                size={18}
              />
              <input
                autoFocus
                type="text"
                placeholder="Search events, artists..."
                className="w-full bg-surface-variant text-on-surface rounded-full py-3 pl-10 pr-4 outline-none border border-outline-variant focus:border-secondary transition-colors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setQuery("");
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {query.length > 0 && results.length === 0 ? (
              <div className="text-center text-on-surface-variant mt-10">
                No events found for "{query}"
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {results.map((pass) => (
                  <div
                    key={pass.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push(`/passes/${pass.id}`);
                    }}
                    className="flex items-center gap-4 bg-surface-variant/50 p-3 rounded-2xl border border-outline-variant hover:border-secondary/50 transition-colors cursor-pointer"
                  >
                    <div
                      className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url(${pass.img})` }}
                    />
                    <div>
                      <h4 className="font-bold text-on-surface text-sm line-clamp-1">
                        {pass.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-1">
                        {pass.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {query.length === 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-wider">
                  Suggested
                </h3>
                <div className="flex flex-col gap-3">
                  {defaultPasses.slice(0, 3).map((pass) => (
                    <div
                      key={pass.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push(`/passes/${pass.id}`);
                      }}
                      className="flex items-center gap-4 p-2 rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"
                    >
                      <Search
                        className="text-on-surface-variant shrink-0"
                        size={16}
                      />
                      <span className="text-on-surface text-sm font-medium">
                        {pass.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

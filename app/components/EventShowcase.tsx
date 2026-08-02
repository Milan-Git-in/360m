"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import FadeIn from "./FadeIn";

const events = [
  {
    src: "/v1.mp4",
    title: "Garba Night Live",
    subtitle: "10,000+ guests dancing under the stars",
    tag: "SOLD OUT",
  },
  {
    src: "/v2.mp4",
    title: "Rang Lagyo — Grand Entrance",
    subtitle: "Immersive venue design & heritage décor",
    tag: "FLAGSHIP",
  },
  {
    src: "/v3.mp4",
    title: "The 360 Experience",
    subtitle: "A cinematic glimpse into our world",
    tag: "EXCLUSIVE",
  },
  {
    src: "/v4.mp4",
    title: "Rang Lagyo Season 3.0",
    subtitle: "Artist announcements & BookMyShow premiere",
    tag: "SOLD OUT",
  },
  {
    src: "/v5.mp4",
    title: "Festival of Lights",
    subtitle: "Spectacular stage production & live performances",
    tag: "PREMIUM",
  },
  {
    src: "/v6.mp4",
    title: "Heritage Dandiya Raas",
    subtitle: "Traditional Dandiya with a modern stage spectacle",
    tag: "FLAGSHIP",
  },
  {
    src: "/v7.mp4",
    title: "Closing Night Gala",
    subtitle: "The grand finale — an unforgettable farewell",
    tag: "SOLD OUT",
  },
];

export default function EventShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animFrameRef = useRef<number>(0);

  const activeEvent = events[activeIndex];

  // Use requestAnimationFrame for smooth progress tracking
  const trackProgress = useCallback(() => {
    const video = videoRef.current;
    if (video && !video.paused) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(pct) ? 0 : pct);
    }
    animFrameRef.current = requestAnimationFrame(trackProgress);
  }, []);

  const stopTracking = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
  }, []);

  // When activeIndex changes, load and play the new source
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set the new source and load it
    video.src = activeEvent.src;
    video.load();

    const handleCanPlay = () => {
      if (isPlaying) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
    // Only re-run when activeIndex changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Manage progress tracking and ended event
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    };

    const handlePlay = () => {
      stopTracking();
      animFrameRef.current = requestAnimationFrame(trackProgress);
    };

    const handlePause = () => {
      stopTracking();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Start tracking if already playing
    if (!video.paused) {
      animFrameRef.current = requestAnimationFrame(trackProgress);
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      stopTracking();
    };
  }, [trackProgress, stopTracking]);

  // Keep muted state in sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const goTo = (index: number) => {
    setProgress(0);
    setIsPlaying(true);
    setActiveIndex((index + events.length) % events.length);
  };

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="py-32 px-6 md:px-20 bg-primary relative overflow-hidden"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-secondary/5 blur-[160px]" />
      </div>

      <div className="max-w-7xl md:mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-1.5 mb-6 border border-secondary-fixed/30 text-secondary-fixed font-label-md tracking-[0.4em] rounded-full bg-white/5 backdrop-blur-md text-xs">
              PAST EVENTS
            </div>
            <h2
              id="showcase-heading"
              className="font-headline-xl text-secondary-fixed italic text-5xl md:text-6xl"
            >
              Moments That Defined Us
            </h2>
            <p className="font-body-lg text-surface-variant/70 mt-4 max-w-xl mx-auto">
              Every event is a legacy. Relive the energy, the grandeur, and the sold-out nights.
            </p>
          </div>
        </FadeIn>

        {/* Main video player — single persistent element, no AnimatePresence unmount */}
        <FadeIn delay={0.15}>
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10
          h-[70dvh] w-[90dvw] sm:w-full sm:h-[66dvh]
          shadow-2xl shadow-black/40 aspect-video bg-black group">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted={isMuted}
              preload="auto"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Tag badge */}
            <div className="absolute top-6 left-6 z-20">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest rounded-full shadow-lg"
                >
                  {activeEvent.tag}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <h3 className="font-headline-md text-white text-2xl md:text-4xl italic mb-2 truncate">
                        {activeEvent.title}
                      </h3>
                      <p className="text-white/60 font-body-md text-sm md:text-base truncate">
                        {activeEvent.subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-secondary/30"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary-fixed rounded-full transition-[width] duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
              aria-label="Previous event"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
              aria-label="Next event"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </FadeIn>

        {/* Thumbnail strip */}
        <FadeIn delay={0.3}>
          <div className="mt-8 flex items-center gap-4 overflow-x-auto py-3 px-2 scrollbar-hide">
            {events.map((event, index) => (
              <button
                key={event.src}
                onClick={() => goTo(index)}
                aria-label={`Play ${event.title}`}
                className={`relative shrink-0 w-36 md:w-44 aspect-video rounded-xl overflow-hidden transition-all duration-300 group/thumb ${
                  index === activeIndex
                    ? "ring-2 ring-secondary-fixed ring-offset-2 ring-offset-primary shadow-lg shadow-black/50"
                    : "opacity-50 hover:opacity-90 grayscale hover:grayscale-0 hover:scale-[1.02]"
                }`}
              >
                <video
                  src={event.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors flex items-center justify-center">
                  {index !== activeIndex && (
                    <Play
                      size={20}
                      className="text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                    />
                  )}
                </div>
                {index === activeIndex && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden rounded-b-xl">
                    <div
                      className="h-full bg-secondary-fixed transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Event counter */}
        <div className="mt-6 text-center">
          <span className="font-label-md text-surface-variant/40 tracking-widest text-xs">
            {String(activeIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

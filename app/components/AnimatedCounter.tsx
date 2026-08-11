"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  compact?: boolean;
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  suffix = "",
  compact = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(v) {
          setValue(Math.round(v));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  const fmt = new Intl.NumberFormat("en-IN", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 0,
  });

  return (
    <span ref={ref}>
      {compact ? fmt.format(value) : value}
      {suffix}
    </span>
  );
}

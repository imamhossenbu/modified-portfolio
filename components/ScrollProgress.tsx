"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const progressTo = gsap.quickTo(progressRef.current, "scaleX", {
      duration: 0.2,
      ease: "power2.out",
    });

    const glowTo = gsap.quickTo(glowRef.current, "left", {
      duration: 0.2,
      ease: "power2.out",
    });

    const updateProgress = () => {
      if (typeof window === "undefined") return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const progressPercent = Math.min(Math.max(progress, 0), 1);

      progressTo(progressPercent);

      glowTo(progressPercent * 100);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-1 w-full overflow-hidden bg-transparent pointer-events-none">
      {/* Reads the copper/signal tokens directly from globals.css, so
                this bar switches with light/dark mode instead of staying a
                fixed blue like before. */}
      <div
        ref={progressRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)]/40 via-[var(--accent)] to-[var(--signal)] shadow-[0_0_14px_var(--accent-dim)]"
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 h-full w-16 -translate-x-1/2 bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_70%)] opacity-70"
      />
    </div>
  );
}

"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll reveals for a section:
 *  - `[data-reveal]` elements rise and fade in, batched so neighbours stagger
 *  - `[data-line]` hairlines draw themselves from the left
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = Array.from(root.querySelectorAll("[data-reveal]"));
      const lines = Array.from(root.querySelectorAll("[data-line]"));

      if (items.length) {
        gsap.set(items, { y: 44, opacity: 0 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.95,
              stagger: 0.09,
              ease: "power3.out",
            }),
        });
      }

      if (lines.length) {
        gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.batch(lines, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              scaleX: 1,
              duration: 1.2,
              stagger: 0.09,
              ease: "power3.inOut",
            }),
        });
      }
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

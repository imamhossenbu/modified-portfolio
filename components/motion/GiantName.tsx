"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Oversized footer wordmark whose letters rise as the page ends. */
export default function GiantName({ text = "IMAM HOSSEN" }: { text?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".giant-char",
        { yPercent: 105 },
        {
          yPercent: 0,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom 104%",
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="giant-name" aria-hidden="true">
      {text.split("").map((char, index) => (
        <span key={index} className="giant-char">
          {char === " " ? " " : char}
        </span>
      ))}
    </div>
  );
}

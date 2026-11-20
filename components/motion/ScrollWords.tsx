"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollWordsProps = {
  text: string;
  /** Words to paint in the accent colour. */
  highlight?: string[];
  className?: string;
};

/** Paragraph that "lights up" word by word as it is scrolled through. */
export default function ScrollWords({
  text,
  highlight = [],
  className = "",
}: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scroll-word",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  const highlighted = new Set(highlight.map((word) => word.toLowerCase()));

  return (
    <p ref={ref} className={`scroll-words ${className}`}>
      {text.split(" ").map((word, index) => {
        const clean = word.replace(/[^\p{L}\p{N}.+#-]/gu, "").toLowerCase();
        const isAccent =
          highlighted.has(clean) || highlighted.has(clean.replace(/[.,]$/, ""));

        return (
          <span
            key={`${word}-${index}`}
            className={`scroll-word ${isAccent ? "is-accent" : ""}`}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

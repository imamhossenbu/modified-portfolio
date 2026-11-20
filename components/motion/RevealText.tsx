"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealTextProps = {
  text: string;
  as?: "h2" | "h3";
  className?: string;
};

/** Heading whose words slide up out of a mask when scrolled into view. */
export default function RevealText({
  text,
  as: Tag = "h2",
  className = "",
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-word-inner",
        { yPercent: 115, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.95,
          stagger: 0.055,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="reveal-word" aria-hidden="true">
          <span className="reveal-word-inner">{word}</span>
        </span>
      ))}
    </Tag>
  );
}

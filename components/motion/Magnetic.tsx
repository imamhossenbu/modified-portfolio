"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type MagneticProps = {
  children: React.ReactNode;
  /** How far the element follows the cursor (0 – 1). */
  strength?: number;
  className?: string;
};

/** Pulls its child toward the cursor, then springs back on leave. */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.9,
      ease: "elastic.out(1, 0.35)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.9,
      ease: "elastic.out(1, 0.35)",
    });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}

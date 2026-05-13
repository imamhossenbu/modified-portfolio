"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;

    if (!dot || !glow) return;

    gsap.set([dot, glow, ...trailRefs.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
    });

    const moveCursor = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.04,
        ease: "power2.out",
      });

      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 0.22,
        ease: "power3.out",
      });

      trailRefs.current.forEach((trail, index) => {
        gsap.to(trail, {
          x: clientX,
          y: clientY,
          duration: 0.18 + index * 0.08,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) trailRefs.current[index] = el;
          }}
          className={`custom-cursor-trail trail-${index + 1}`}
        />
      ))}

      <div ref={glowRef} className="custom-cursor-glow" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
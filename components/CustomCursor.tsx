/* eslint-disable react-hooks/refs */
"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const trails = useRef(
    Array.from({ length: 12 }, () => ({
      x: 0,
      y: 0,
    }))
  );

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    let firstMove = true;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (firstMove) {
        trails.current.forEach((trail) => {
          trail.x = e.clientX;
          trail.y = e.clientY;
        });

        trailRefs.current.forEach((el) => {
          if (el) {
            el.style.opacity = "1";
          }
        });

        firstMove = false;
      }
    };

    const animateTrail = () => {
      let x = mouse.current.x;
      let y = mouse.current.y;

      trails.current.forEach((trail, index) => {
        trail.x += (x - trail.x) * 0.35;
        trail.y += (y - trail.y) * 0.35;

        x = trail.x;
        y = trail.y;

        const el = trailRefs.current[index];

        if (el) {
          el.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
        }
      });

      animationFrame = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateTrail();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {trails.current.map((_, index) => {
        const size = Math.max(4, 15 - index);
        const opacity = Math.max(0.12, 0.75 - index * 0.055);

        return (
          <div
            key={index}
            ref={(el) => {
              if (el) trailRefs.current[index] = el;
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "9999px",
              background: "var(--blue-main)",
              boxShadow: "0 0 18px rgba(79, 110, 247, 0.75)",
              pointerEvents: "none",
              opacity: 0,
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              filter: `blur(${index > 6 ? 1 : 0}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
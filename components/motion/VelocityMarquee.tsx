"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkle } from "lucide-react";

const ROWS = [
  ["Full Stack Developer", "Next.js", "TypeScript", "Node.js", "NestJS"],
  ["Web Apps", "Mobile Apps", "Flutter", "SaaS Products", "GSAP Motion"],
];

/**
 * Two giant text rows that drift on their own, speed up with scroll
 * velocity, lean into the motion, and flip direction with the scroll.
 */
export default function VelocityMarquee() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = Array.from(
      wrap.querySelectorAll<HTMLDivElement>(".vmarquee-track"),
    );
    const offsets = tracks.map(() => 0);
    let halves = tracks.map((track) => track.scrollWidth / 2);

    let lastScroll = window.scrollY;
    let velocity = 0;
    let direction = 1;
    let skew = 0;
    let visible = false;

    const measure = () => {
      halves = tracks.map((track) => track.scrollWidth / 2);
    };

    const tick = (_time: number, deltaTime: number) => {
      const scroll = window.scrollY;
      const delta = scroll - lastScroll;
      lastScroll = scroll;
      if (!visible) return;

      velocity += (delta - velocity) * 0.12;
      if (Math.abs(delta) > 0.5) direction = delta > 0 ? 1 : -1;
      skew += (gsap.utils.clamp(-10, 10, velocity * 0.35) - skew) * 0.1;

      const step = (0.06 * deltaTime + Math.abs(velocity) * 0.9) * direction;

      // Sparkles turn with the page: scroll down spins them one way, up the other
      wrap.style.setProperty("--spin", `${scroll * 0.45}deg`);

      tracks.forEach((track, index) => {
        const half = halves[index];
        if (!half) return;
        const rowDirection = index % 2 === 0 ? -1 : 1;
        offsets[index] = gsap.utils.wrap(
          -half,
          0,
          offsets[index] + step * rowDirection,
        );
        track.style.transform = `translate3d(${offsets[index]}px,0,0) skewX(${-skew * rowDirection}deg)`;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(wrap);
    gsap.ticker.add(tick);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={wrapRef} className="vmarquee" aria-hidden="true">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="vmarquee-row">
          <div className="vmarquee-track">
            {[0, 1, 2, 3].map((copy) =>
              row.map((label) => (
                <span
                  key={`${copy}-${label}`}
                  className={`vmarquee-item ${rowIndex === 1 ? "is-outline" : ""}`}
                >
                  {label}
                  <Sparkle className="vmarquee-icon" fill="currentColor" />
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

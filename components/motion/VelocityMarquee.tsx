"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Code2, Globe, Layers, Smartphone } from "lucide-react";
import {
  SiFlutter,
  SiGreensock,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si";

/* Every label is paired with the icon of the thing it names. */
const ROWS = [
  [
    { label: "Full Stack Developer", icon: Code2 },
    { label: "Next.js", icon: SiNextdotjs },
    { label: "TypeScript", icon: SiTypescript },
    { label: "Node.js", icon: SiNodedotjs },
    { label: "NestJS", icon: SiNestjs },
  ],
  [
    { label: "Web Apps", icon: Globe },
    { label: "Mobile Apps", icon: Smartphone },
    { label: "Flutter", icon: SiFlutter },
    { label: "SaaS Products", icon: Layers },
    { label: "GSAP Motion", icon: SiGreensock },
  ],
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
              row.map(({ label, icon: Icon }) => (
                <span
                  key={`${copy}-${label}`}
                  className={`vmarquee-item ${rowIndex === 1 ? "is-outline" : ""}`}
                >
                  <Icon className="vmarquee-icon" />
                  {label}
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

export const PRELOADER_EVENT = "preloader:done";

const announceDone = () => {
  document.documentElement.dataset.preloader = "done";
  window.dispatchEvent(new Event(PRELOADER_EVENT));
};

/** Full-screen intro: counter runs 0 → 100, then the curtain lifts. */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const [finished, setFinished] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (finished) {
      lenis?.start();
      return;
    }
    lenis?.stop();
  }, [lenis, finished]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => {
        announceDone();
        setFinished(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const progress = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".preloader-char",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.035 },
      )
        .fromTo(
          ".preloader-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.1,
        )
        .to(
          progress,
          {
            value: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(progress.value),
                ).padStart(3, "0");
              }
            },
          },
          0,
        )
        .fromTo(
          ".preloader-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.7, ease: "power2.inOut" },
          0,
        )
        .to(".preloader-char", {
          yPercent: -110,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.in",
        })
        .to(".preloader-meta", { opacity: 0, duration: 0.3 }, "<")
        .to(root, {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
          onStart: () => {
            gsap.delayedCall(0.3, announceDone);
          },
          onComplete: () => setFinished(true),
        });
    }, root);

    return () => ctx.revert();
  }, []);

  if (finished) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader-row">
        <span className="preloader-meta">Imam Hossen</span>
        <span className="preloader-meta">Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="preloader-title">
        {["Imam", "Hossen."].map((word) => (
          <span key={word} className="preloader-word">
            {word.split("").map((char, index) => (
              <span key={index} className="preloader-char">
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>

      <div className="preloader-row is-bottom">
        <span className="preloader-meta">Design — Develop — Deploy</span>
        <span className="preloader-counter">
          <span ref={counterRef}>000</span>
          <i>%</i>
        </span>
      </div>

      <span className="preloader-bar" />
    </div>
  );
}

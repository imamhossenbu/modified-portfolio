"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

export const PRELOADER_EVENT = "preloader:done";

const NAME = ["Imam", "Hossen."];
const GLYPHS = "<>/{}[]();=+*#01";
const BAR_CELLS = 24;

/** Boot log: each line prints once the counter passes its threshold. */
const LOG = [
  { at: 0, prompt: "$", text: "npm run imam-portfolio" },
  { at: 14, prompt: ">", text: "loading next.js + typescript", status: "ok" },
  { at: 32, prompt: ">", text: "compiling components", status: "ok" },
  { at: 50, prompt: ">", text: "connecting node.js api", status: "ok" },
  { at: 68, prompt: ">", text: "warming up gsap motion", status: "ok" },
  { at: 90, prompt: "✓", text: "ready — welcome" },
];

const announceDone = () => {
  document.documentElement.dataset.preloader = "done";
  window.dispatchEvent(new Event(PRELOADER_EVENT));
};

/** Name decodes left to right: settled letters are real, the rest are glyphs. */
const scramble = (word: string, settled: number) =>
  word
    .split("")
    .map((char, index) =>
      index < settled
        ? char
        : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    )
    .join("");

/** Full-screen intro styled as a terminal booting the site. */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
    const totalChars = NAME.join("").length;
    let frame = 0;

    const render = () => {
      const value = progress.value;

      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(value)).padStart(3, "0");
      }

      if (barRef.current) {
        const filled = Math.round((value / 100) * BAR_CELLS);
        barRef.current.textContent = `[${"█".repeat(filled)}${"░".repeat(BAR_CELLS - filled)}]`;
      }

      lineRefs.current.forEach((line, index) => {
        if (!line) return;
        line.classList.toggle("is-on", value >= LOG[index].at);
        line.classList.toggle("is-done", value >= LOG[index].at + 12);
      });

      // Re-roll the undecoded glyphs every third frame so they flicker, not blur
      frame += 1;
      if (frame % 3 !== 0 && value < 100) return;

      let settled = Math.floor((value / 92) * totalChars);
      NAME.forEach((word, index) => {
        const el = wordRefs.current[index];
        if (el) el.textContent = scramble(word, settled);
        settled -= word.length;
      });
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".preloader-fade",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 },
      )
        .to(
          progress,
          {
            value: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: render,
          },
          0,
        )
        .to(".preloader-fade", {
          opacity: 0,
          y: -18,
          duration: 0.45,
          stagger: 0.04,
          ease: "power3.in",
          delay: 0.2,
        })
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
      <div className="preloader-row preloader-fade">
        <span className="preloader-meta preloader-chrome">
          <i />
          <i />
          <i />
          imam@portfolio: ~
        </span>
        <span className="preloader-meta">Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="preloader-body">
        <div className="preloader-log preloader-fade">
          {LOG.map((line, index) => (
            <span
              key={line.text}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className="preloader-line"
            >
              <b>{line.prompt}</b>
              {line.text}
              {line.status && <em>{line.status}</em>}
            </span>
          ))}
        </div>

        <div className="preloader-title preloader-fade">
          {NAME.map((word, index) => (
            <span
              key={word}
              ref={(el) => {
                wordRefs.current[index] = el;
              }}
              className="preloader-word"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="preloader-row is-bottom preloader-fade">
        <span ref={barRef} className="preloader-ascii">
          [{"░".repeat(BAR_CELLS)}]
        </span>
        <span className="preloader-counter">
          <span ref={counterRef}>000</span>
          <i>%</i>
        </span>
      </div>

      <span className="preloader-bar" />
    </div>
  );
}

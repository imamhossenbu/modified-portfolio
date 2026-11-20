"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

type Mode = "default" | "link" | "button" | "text";

const BUTTON_SELECTOR =
  'button, [role="button"], .hero-x-btn, .btn-x, .nav-x-cta, .hero-social-link, .contact-social-link';
const TEXT_SELECTOR = "input, textarea";
const LINK_SELECTOR = "a, [data-cursor='link']";

/**
 * A ring that trails the pointer and changes with what is under it:
 *  - buttons: the ring snaps around the button and hugs its shape
 *  - links:   the ring swells into a filled disc with an arrow
 *  - fields:  the ring thins into a text caret
 * The native cursor stays visible, so precision is never lost.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let mode: Mode = "default";
    let hovered: Element | null = null;
    let pointer = { x: -100, y: -100 };
    let shown = false;

    const shape = (vars: gsap.TweenVars) =>
      gsap.to(ring, { duration: 0.4, ease: "power3.out", overwrite: "auto", ...vars });

    const hug = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      const pad = 6;

      shape({
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
        borderRadius: Math.min(radius + pad, (rect.height + pad * 2) / 2),
      });
      xTo(rect.left + rect.width / 2);
      yTo(rect.top + rect.height / 2);
    };

    const setMode = (next: Mode, el: Element | null) => {
      if (next === mode && el === hovered) return;
      mode = next;
      hovered = el;
      ring.dataset.mode = next;

      if (next === "link") shape({ width: 58, height: 58, borderRadius: 29 });
      else if (next === "text") shape({ width: 3, height: 28, borderRadius: 2 });
      else if (next === "default") shape({ width: 30, height: 30, borderRadius: 15 });
    };

    const resolve = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return setMode("default", null);

      const button = target.closest(BUTTON_SELECTOR);
      if (button) return setMode("button", button);

      const field = target.closest(TEXT_SELECTOR);
      if (field) return setMode("text", field);

      const link = target.closest(LINK_SELECTOR);
      if (link) return setMode("link", link);

      setMode("default", null);
    };

    const follow = () => {
      if (mode === "button" && hovered?.isConnected) {
        hug(hovered);
      } else {
        xTo(pointer.x);
        yTo(pointer.y);
      }
    };

    const handleMove = (e: MouseEvent) => {
      pointer = { x: e.clientX, y: e.clientY };

      if (!shown) {
        shown = true;
        gsap.set(ring, { x: pointer.x, y: pointer.y });
        gsap.to(ring, { opacity: 1, duration: 0.3 });
      }

      resolve(e.target);
      follow();
    };

    // The page can move under a still pointer; keep the ring on its button
    let scrollFrame = 0;
    const handleScroll = () => {
      if (scrollFrame || !shown) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        resolve(document.elementFromPoint(pointer.x, pointer.y));
        follow();
      });
    };

    const handleDown = () => gsap.to(ring, { scale: 0.86, duration: 0.2 });
    const handleUp = () => gsap.to(ring, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.4)" });
    const handleLeave = () => {
      shown = false;
      gsap.to(ring, { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(scrollFrame);
      gsap.killTweensOf(ring);
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor-ring" data-mode="default" aria-hidden="true">
      <ArrowUpRight />
    </div>
  );
}

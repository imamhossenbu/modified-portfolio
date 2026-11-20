"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-linked animations cache their start/end positions. Whenever the page
 * changes height (images load, "view more", a new route) those positions go
 * stale, so re-measure — otherwise late sections never animate in.
 */
function ScrollTriggerRefresher() {
  const pathname = usePathname();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.body.scrollHeight;

    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 400);
    };

    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      // Small shifts are not worth a full re-measure, which is costly mid-scroll
      if (Math.abs(height - lastHeight) < 60) return;
      lastHeight = height;
      refresh();
    });

    observer.observe(document.body);
    refresh();

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef | null>(null);

  // One clock for everything: GSAP's ticker drives Lenis, and every Lenis
  // scroll updates ScrollTrigger in the same frame. Two separate loops is
  // what makes scroll-linked animation stutter.
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    const lenis = lenisRef.current?.lenis;

    lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <ScrollTriggerRefresher />
      {children}
    </ReactLenis>
  );
}

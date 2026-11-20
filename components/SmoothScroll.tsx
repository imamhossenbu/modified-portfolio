"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
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
  return (
    <ReactLenis
      root
      options={{
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

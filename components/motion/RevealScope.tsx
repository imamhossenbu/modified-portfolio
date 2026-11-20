"use client";

import { useRef } from "react";
import { useReveal } from "@/components/motion/useReveal";

/** Wraps server-rendered content so its `data-reveal` / `data-line` children animate. */
export default function RevealScope({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useReveal(ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

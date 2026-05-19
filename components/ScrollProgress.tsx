"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const progressTo = gsap.quickTo(progressRef.current, "scaleX", {
            duration: 0.25,
            ease: "power3.out",
        });

        const glowTo = gsap.quickTo(glowRef.current, "left", {
            duration: 0.25,
            ease: "power3.out",
        });

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            const progressPercent = Math.min(Math.max(progress, 0), 1);

            progressTo(progressPercent);
            glowTo(progressPercent * 100);
        };

        updateProgress();

        window.addEventListener("scroll", updateProgress);
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <div className="fixed left-0 top-0 z-99999 h-0.75 w-full overflow-hidden bg-transparent">
            <div
                ref={progressRef}
                className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-[#ff9494] via-[#ff7474] to-[#ffd1d1] shadow-[0_0_18px_rgba(255,148,148,0.9)]"
            />

            <div
                ref={glowRef}
                className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9494] opacity-90 shadow-[0_0_18px_rgba(255,148,148,1),0_0_35px_rgba(255,116,116,0.8)]"
            />
        </div>
    );
}
// src/components/BackgroundParticles.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundParticles() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current!;
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < 25; i++) {
            const div = document.createElement("div");
            div.className =
                "absolute w-3 h-3 rounded-full bg-blue-main/20 blur-sm";
            container.appendChild(div);
            particles.push(div);

            gsap.to(div, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                repeat: -1,
                yoyo: true,
                duration: 6 + Math.random() * 6,
                ease: "sine.inOut",
            });
        }
    }, []);

    return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
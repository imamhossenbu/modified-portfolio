"use client";

import { ReactLenis } from "lenis/react";

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
            {children}
        </ReactLenis>
    );
}
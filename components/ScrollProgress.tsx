"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // scaleX এর জন্য GSAP-এর সুপার ফাস্ট কুইকঅপ্টিমাইজড মেথড
        const progressTo = gsap.quickTo(progressRef.current, "scaleX", {
            duration: 0.2,
            ease: "power2.out",
        });

        // গ্লো বা ডট-এর ডাইনামিক মুভমেন্টের জন্য (পার্সেন্টেজ বেসড)
        const glowTo = gsap.quickTo(glowRef.current, "left", {
            duration: 0.2,
            ease: "power2.out",
        });

        const updateProgress = () => {
            if (typeof window === "undefined") return;

            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            const progressPercent = Math.min(Math.max(progress, 0), 1);

            progressTo(progressPercent);
            // x-অক্ষের পজিশনকে পার্সেন্টেজে কনভার্ট করে পাঠানো হচ্ছে
            glowTo(progressPercent * 100);
        };

        // ইনিশিয়াল ক্যালকুলেশন
        updateProgress();

        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <div className="fixed left-0 top-0 z-[100] h-1 w-full overflow-hidden bg-transparent pointer-events-none">
            <div
                ref={progressRef}
                className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#4f6ef7]/40 via-[#4f6ef7] to-[#8fa3f9] shadow-[0_0_12px_rgba(79,110,247,0.5)]"
            />
        </div>
    );
}
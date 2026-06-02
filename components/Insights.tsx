"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { Briefcase, Clock, Code2, Users, Sparkles } from "lucide-react";

const insights = [
    {
        value: 20,
        suffix: "+",
        label: "Projects Completed",
        icon: Briefcase,
    },
    {
        value: 1,
        suffix: "+",
        label: "Years Experience",
        icon: Clock,
    },
    {
        value: 15,
        suffix: "+",
        label: "Technologies Used",
        icon: Code2,
    },
    {
        value: 100,
        suffix: "%",
        label: "Client Focused",
        icon: Users,
    },
];

export default function Insights() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [startCount, setStartCount] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".insight-animate",
                { y: 70, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.9,
                    stagger: 0.14,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        once: true,
                        onEnter: () => setStartCount(true),
                    },
                }
            );

            gsap.to(".insight-floating-icon", {
                y: -14,
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.25,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="insights"
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
        >
            <div className="mx-auto max-w-7xl">
                <div className="insight-animate mb-14 text-center">
                    <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-main">
                        Insights
                    </p>

                    <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                        My work in numbers
                    </h2>

                    <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
                        A quick overview of my development journey, project work, and
                        technical growth.
                    </p>
                </div>

                <div className="insight-animate insight-modern-panel">
                   

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {insights.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div key={index} className="insight-stat-card">
                                    <div className="insight-stat-icon">
                                        <Icon size={26} />
                                    </div>

                                    <h3 className="mt-6 flex items-baseline justify-center text-5xl font-black gradient-text">
                                        {startCount ? (
                                            <CountUp
                                                end={item.value}
                                                duration={2.4}
                                                suffix={item.suffix}
                                            />
                                        ) : (
                                            `0${item.suffix}`
                                        )}
                                    </h3>

                                    <p className="mt-3 text-center font-bold text-[var(--foreground)]">
                                        {item.label}
                                    </p>

                                    <span className="insight-card-line" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
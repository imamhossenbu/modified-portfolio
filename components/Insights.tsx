"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/components/motion/useReveal";

gsap.registerPlugin(ScrollTrigger);

const insights = [
  { value: 20, suffix: "+", label: "Projects Completed" },
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Technologies Used" },
  { value: 100, suffix: "%", label: "Client Focused" },
];

export default function Insights() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);
  useReveal(sectionRef);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => setStartCount(true),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="insights" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="05"
          label="Insights"
          title="My work in numbers"
          description="A quick overview of my development journey, project work, and technical growth."
        />

        <div ref={statsRef} className="stats-x">
          {insights.map((item, index) => (
            <div key={item.label} className="stats-x-item" data-reveal>
              <span className="row-line" data-line />
              <span className="stats-x-num">0{index + 1}</span>

              <p className="stats-x-value">
                {startCount ? (
                  <CountUp end={item.value} duration={2.4} />
                ) : (
                  "0"
                )}
                <i>{item.suffix}</i>
              </p>

              <p className="stats-x-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

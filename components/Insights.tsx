"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessagesSquare, PenTool, Code2, Rocket } from "lucide-react";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/components/motion/useReveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: "+", label: "Projects completed" },
  { value: 1, suffix: "+", label: "Years of experience" },
  { value: 40, suffix: "+", label: "Tools & technologies" },
];

const steps = [
  {
    title: "Understand",
    text: "We talk through the idea, who it is for and what it must do, then agree on the scope.",
    icon: MessagesSquare,
  },
  {
    title: "Design",
    text: "I plan the structure and the interface first, so the build has a clear target.",
    icon: PenTool,
  },
  {
    title: "Build",
    text: "Frontend, backend and database come together in clean, reusable code.",
    icon: Code2,
  },
  {
    title: "Launch",
    text: "Deploy, check it on real devices, fix what shows up, and hand it over.",
    icon: Rocket,
  },
];

export default function Insights() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const flowRef = useRef<HTMLOListElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
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

  // The pipeline fills as it is scrolled through, switching each step on in turn
  useEffect(() => {
    const flow = flowRef.current;
    const fill = fillRef.current;
    if (!flow || !fill) return;

    const nodes = Array.from(flow.querySelectorAll<HTMLElement>(".flow-step"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-on"));
      fill.style.setProperty("--progress", "1");
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: flow,
      start: "top 78%",
      end: "bottom 55%",
      scrub: 0.5,
      onUpdate: (self) => {
        fill.style.setProperty("--progress", String(self.progress));
        nodes.forEach((node, index) => {
          node.classList.toggle(
            "is-on",
            self.progress >= index / nodes.length + 0.04,
          );
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="insights" ref={sectionRef} className="sec">
      <div className="sec-inner is-narrow">
        <SectionHead
          index="05"
          label="How I Work"
          align="center"
          title="From first idea to launch"
          description="A quick overview of my development journey, and the steps a project goes through with me."
        />

        <div ref={statsRef} className="stats-x is-three">
          {stats.map((item, index) => (
            <div key={item.label} className="stats-x-item" data-reveal>
              <span className="row-line" data-line />
              <span className="stats-x-num">0{index + 1}</span>

              <p className="stats-x-value">
                {startCount ? <CountUp end={item.value} duration={2.4} /> : "0"}
                <i>{item.suffix}</i>
              </p>

              <p className="stats-x-label">{item.label}</p>
            </div>
          ))}
        </div>

        <ol ref={flowRef} className="flow">
          <span className="flow-line" aria-hidden="true">
            <span ref={fillRef} />
          </span>

          {steps.map(({ title, text, icon: Icon }, index) => (
            <li key={title} className="flow-step">
              <span className="flow-node">
                <Icon />
              </span>
              <span className="flow-num">Step 0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

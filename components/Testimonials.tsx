"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Client Name",
        role: "Startup Founder",
        image: "/images/clients/client-1.jpg",
        feedback:
            "Imam created a clean and professional website with smooth animations and responsive design. The final result looked modern and easy to use.",
        rating: 5,
    },
    {
        name: "Client Name",
        role: "Business Owner",
        image: "/images/clients/client-2.jpg",
        feedback:
            "He understood the project requirements clearly and delivered a polished web interface with good attention to detail.",
        rating: 4,
    },
    {
        name: "Client Name",
        role: "Product Manager",
        image: "/images/clients/client-3.jpg",
        feedback:
            "The UI was clean, fast, and well structured. I liked the smooth design flow and professional development approach.",
        rating: 5,
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(0);

    const item = testimonials[active];

    const nextTestimonial = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".testimonial-animate",
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
                    },
                }
            );

            gsap.to(".testimonial-orbit-dot", {
                rotate: 360,
                duration: 8,
                repeat: -1,
                ease: "linear",
                transformOrigin: "center center",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { y: 30, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
        );
    }, [active]);

    return (
        <section
            id="clients"
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
        >
            <div className="mx-auto max-w-7xl">
                <div className="testimonial-animate mb-14 text-center">
                    <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
                        Testimonials
                    </p>

                    <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                        What clients say
                    </h2>

                    <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
                        Client feedback helps show trust, communication quality, and the
                        value behind every project.
                    </p>
                </div>

                <div className="testimonial-animate testimonial-wrapper">
                    <div className="testimonial-visual">
                        <div className="testimonial-client-circle">
                            <div className="testimonial-orbit-dot">
                                <span />
                            </div>

                            <div className="testimonial-client-image">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="testimonial-small-card card-one">
                            <strong>{item.rating}.0/5.0</strong>
                            <span>Project Rating</span>
                        </div>

                        <div className="testimonial-small-card card-two">
                            <strong>Verified</strong>
                            <span>Client Feedback</span>
                        </div>
                    </div>

                    <div ref={cardRef} className="testimonial-card">
                        <div className="mb-6 flex gap-1">
                            {Array.from({ length: item.rating }).map((_, index) => (
                                <Star
                                    key={index}
                                    size={20}
                                    className="fill-[#ff9494] text-[#ff9494]"
                                />
                            ))}
                        </div>

                        <blockquote className="testimonial-feedback">
                            <div className="testimonial-quote-icon">
                                <Quote size={24} strokeWidth={2.4} />
                            </div>

                            <p>{item.feedback}</p>
                        </blockquote>

                        <div className="flex flex-wrap items-center justify-between gap-5">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--foreground)]">
                                    {item.name}
                                </h3>

                                <p className="mt-1 font-semibold text-[#ff7474]">
                                    {item.role}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={prevTestimonial}
                                    className="testimonial-nav-btn"
                                    aria-label="Previous testimonial"
                                >
                                    <ArrowLeft size={19} />
                                </button>

                                <button
                                    onClick={nextTestimonial}
                                    className="testimonial-nav-btn"
                                    aria-label="Next testimonial"
                                >
                                    <ArrowRight size={19} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-7 flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActive(index)}
                                    className={`testimonial-dot ${active === index ? "active" : ""
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
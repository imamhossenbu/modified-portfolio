"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  MessageCircleMore,
  X,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { SiWhatsapp, SiMessenger } from "react-icons/si";

const contactButtons = [
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    href: "https://wa.me/8801624994532",
    color:
      "from-[#25D366] to-[#1ebe5d] shadow-[0_8px_30px_rgba(37,211,102,0.35)]",
  },
  {
    name: "Messenger",
    icon: SiMessenger,
    href: "https://m.me/imamhossainbu",
    color:
      "from-[#0084FF] to-[#005dff] shadow-[0_8px_30px_rgba(0,132,255,0.35)]",
  },
  {
    name: "Call",
    icon: Phone,
    href: "tel:+8801624994532",
    color:
      "from-[#ff7474] to-[#ff4d6d] shadow-[0_8px_30px_rgba(255,116,116,0.35)]",
  },
];

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mainBtnRef = useRef<HTMLButtonElement | null>(null);

  // Floating animation
  useEffect(() => {
    gsap.to(mainBtnRef.current, {
      y: -6,
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: "sine.inOut",
    });
  }, []);

  // Open animation
  useEffect(() => {
    if (open) {
      gsap.fromTo(
        ".social-btn",
        {
          opacity: 0,
          y: 30,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: "back.out(1.8)",
        }
      );
    }
  }, [open]);

  // Outside click close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4"
    >
      {/* Social Buttons */}
      {open && (
        <div className="flex flex-col items-center gap-3">
          {contactButtons.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-btn group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} text-white transition-all duration-500 hover:scale-110 hover:rotate-6`}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Shine */}
                <div className="absolute -left-10 top-0 h-full w-6 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-20" />

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  <Icon size={22} />
                </div>

                {/* Tooltip */}
                <div className="pointer-events-none absolute right-[72px] whitespace-nowrap rounded-xl border border-white/10 bg-neutral-900/90 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 dark:bg-neutral-800/90">
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        ref={mainBtnRef}
        onClick={() => setOpen(!open)}
        className="
          group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full
          transition-all duration-500 hover:scale-110 active:scale-95

          bg-gradient-to-br
          from-white
          via-neutral-50
          to-neutral-200

          border border-neutral-200
          text-neutral-900

          shadow-[0_10px_40px_rgba(0,0,0,0.12)]

          dark:from-neutral-900
          dark:via-neutral-800
          dark:to-neutral-700

          dark:border-neutral-700
          dark:text-white
          dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)]
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-white/20 dark:bg-white/5" />
        </div>

        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full border border-neutral-400/30 dark:border-white/10 animate-ping opacity-20" />

        {/* Inner Circle */}
        <div
          className="
            absolute inset-[6px] rounded-full

            bg-gradient-to-br
            from-neutral-100
            to-white

            dark:from-neutral-800
            dark:to-neutral-900
          "
        />

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
          {open ? (
            <X size={24} className="stroke-[2.5]" />
          ) : (
            <MessageCircleMore size={24} className="stroke-[2.5]" />
          )}
        </div>
      </button>
    </div>
  );
}
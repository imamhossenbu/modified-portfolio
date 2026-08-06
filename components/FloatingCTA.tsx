"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageCircleMore, X, Phone } from "lucide-react";
import { SiWhatsapp, SiMessenger } from "react-icons/si";

const contactButtons = [
  {
    name: "WhatsApp",
    href: "https://wa.me/8801624994532",
    icon: SiWhatsapp,
    bg: "bg-[#25D366]",
  },
  {
    name: "Messenger",
    href: "https://m.me/imamhossainbu",
    icon: SiMessenger,
    bg: "bg-[#0084FF]",
  },
  {
    name: "Call",
    href: "tel:+8801624994532",
    icon: Phone,
    bg: "bg-[var(--accent)]",
  },
];

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const mainBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const floatAnim = gsap.to(mainBtnRef.current, {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 1.7,
      ease: "sine.inOut",
    });

    return () => {
      floatAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        ".floating-contact-item",
        {
          opacity: 0,
          y: 22,
          scale: 0.65,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.42,
          ease: "back.out(1.8)",
        },
      );
    }
  }, [open]);

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
      className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-4 sm:bottom-8 sm:right-8"
    >
      {open && (
        <div className="flex flex-col items-center gap-3">
          {contactButtons.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                target={item.name === "Call" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={item.name}
                className={`
                  floating-contact-item group relative flex h-14 w-14 items-center justify-center
                  rounded-full ${item.bg}
                  text-white transition-all duration-300
                  hover:-translate-y-1 hover:scale-110 active:scale-95
                  shadow-none
                `}
              >
                <span className="absolute inset-0 rounded-full bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <Icon size={22} className="relative z-10" />

                <span
                  className="
                    pointer-events-none absolute right-[68px] top-1/2 -translate-y-1/2
                    whitespace-nowrap rounded-full bg-[var(--panel)] px-3 py-1.5
                    text-xs font-medium text-[var(--foreground)] opacity-0
                    transition-all duration-300 group-hover:right-[74px] group-hover:opacity-100
                    border border-[var(--panel-border)] shadow-none
                  "
                >
                  {item.name}
                </span>
              </a>
            );
          })}
        </div>
      )}

      <button
        ref={mainBtnRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open contact options"
        className="
          group relative flex h-16 w-16 items-center justify-center overflow-hidden
          rounded-full bg-[var(--accent)]
          text-white transition-all duration-300 hover:scale-110 active:scale-95
          shadow-none
        "
      >
        <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {!open && (
          <span className="absolute inset-0 rounded-full border border-[var(--accent)]/40 animate-ping" />
        )}

        <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
          {open ? (
            <X className="h-6 w-6 stroke-[2.5]" />
          ) : (
            <MessageCircleMore className="h-6 w-6 stroke-[2.5]" />
          )}
        </span>
      </button>
    </div>
  );
}

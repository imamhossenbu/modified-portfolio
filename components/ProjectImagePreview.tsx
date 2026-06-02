"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Maximize2, Monitor, Smartphone, X } from "lucide-react";

type ProjectImagePreviewProps = {
    image: string | StaticImageData;
    title: string;
    type?: string;
};

export default function ProjectImagePreview({
    image,
    title,
    type,
}: ProjectImagePreviewProps) {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<"desktop" | "mobile">("desktop");

    const imageSrc = useMemo(() => {
        return typeof image === "string" ? image : image.src;
    }, [image]);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    return (
        <>
            {/* Normal Image Card */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Preview ${title}`}
                className="
          group relative h-full w-full overflow-hidden rounded-[2rem]
          border border-glass-border bg-white/70 text-left
          shadow-[0_24px_70px_rgba(79,110,247,0.12)]
          backdrop-blur-xl transition-all duration-500
          hover:-translate-y-1 hover:border-blue-main/40
          dark:border-white/10 dark:bg-white/5
        "
            >
                <div className="relative h-[280px] overflow-hidden md:h-[500px] lg:h-full lg:min-h-[520px]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-3">
                        {type && (
                            <span className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                                {type}
                            </span>
                        )}

                        <span className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-xl transition-all duration-300 group-hover:bg-blue-main">
                            <Maximize2 size={18} />
                        </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl">
                            <Maximize2 size={14} />
                            Click to view full page
                        </p>
                    </div>
                </div>
            </button>

            {/* Fullscreen Preview Modal */}
            {open && (
                <div
                    className="
            fixed inset-0 z-[999999] flex flex-col
            bg-neutral-950/92 p-4 backdrop-blur-xl md:p-6
          "
                >
                    {/* Header */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-main">
                                Project Preview
                            </p>
                            <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                                {title}
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur-xl">
                                <button
                                    type="button"
                                    onClick={() => setView("desktop")}
                                    className={`
                    flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all
                    ${view === "desktop"
                                            ? "bg-blue-main text-white"
                                            : "text-white/70 hover:text-white"
                                        }
                  `}
                                >
                                    <Monitor size={16} />
                                    Desktop
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setView("mobile")}
                                    className={`
                    flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all
                    ${view === "mobile"
                                            ? "bg-blue-main text-white"
                                            : "text-white/70 hover:text-white"
                                        }
                  `}
                                >
                                    <Smartphone size={16} />
                                    Mobile
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close preview"
                                className="
                  flex h-11 w-11 items-center justify-center rounded-full
                  border border-white/10 bg-white/10 text-white
                  transition-all hover:bg-blue-main
                "
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Preview Body */}
                    <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                        {view === "desktop" ? (
                            <div
                                className="
                  h-full max-h-[82vh] w-full max-w-6xl overflow-y-auto
                  rounded-[1.6rem] border border-white/10 bg-white
                  shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                "
                            >
                                <img
                                    src={imageSrc}
                                    alt={`${title} desktop preview`}
                                    className="block h-auto w-full"
                                />
                            </div>
                        ) : (
                            <div
                                className="
                  h-full max-h-[82vh] w-[390px] max-w-[92vw]
                  rounded-[2.7rem] border border-white/10 bg-neutral-900
                  p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)]
                "
                            >
                                <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-white/25" />

                                <div className="h-[calc(100%-18px)] overflow-y-auto rounded-[2rem] bg-white">
                                    <img
                                        src={imageSrc}
                                        alt={`${title} mobile preview`}
                                        className="block h-auto w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
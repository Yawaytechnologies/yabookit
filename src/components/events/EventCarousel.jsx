// src/components/event/EventCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Poster from "./Poster";

/** Responsive, scroll-snap carousel of Poster slides. */
export default function EventCarousel({ events = [] }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const clamp = (i) => Math.max(0, Math.min(i, events.length - 1));

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const pageW = el.clientWidth;
    el.scrollTo({ left: clamp(i) * pageW, behavior: "smooth" });
  };

  const onPrev = () => goTo(index - 1);
  const onNext = () => goTo(index + 1);

  // Update index on scroll + on resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      const w = el.clientWidth || 1;
      setIndex(Math.round(el.scrollLeft / w));
    };
    const handleResize = () => handleScroll();

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initialize
    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative w-full">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
      >
        {events.map((ev, i) => (
          <div key={ev.id || i} className="w-full shrink-0 snap-start">
            <Poster {...ev} />
          </div>
        ))}
      </div>

      {/* Arrows (desktop) */}
      {events.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={onPrev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 hover:bg-white"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next"
            onClick={onNext}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 hover:bg-white"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dots */}
      {events.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {events.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={
                  "rounded-full transition-all duration-300 " +
                  (active
                    ? "w-6 h-[6px] bg-black/90"
                    : "w-[6px] h-[6px] bg-zinc-300 hover:bg-zinc-400")
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * items: [{
 *   id/slug, title, languages, poster (string URL or imported src),
 *   badge?: { text: "4K AVAILABLE" | "NEW" | "DOLBY", tone?: "amber" | "rose" | "indigo" }
 * }]
 */
export default function NewOnStreamRow({
  title = "New on Stream",
  seeAllHref = "/stream/new",
  items = [],
  onSelect,           // (item) => void
  className = "",
}) {
  const scrollerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [items.length]);

  const scrollByCards = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // one-card step (card width + gap)
    const card = el.querySelector("[data-card]");
    const gap = 16; // Tailwind gap-4
    const step = (card?.clientWidth || 240) + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const toneToClass = (tone) => {
    switch (tone) {
      case "amber":
        return "bg-amber-400 text-black";
      case "indigo":
        return "bg-indigo-500 text-white";
      case "rose":
      default:
        return "bg-rose-500 text-white";
    }
  };

  return (
    <section className={className}>
      <div className="rounded-2xl bg-[#F3F6FB] p-4 md:p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 md:text-2xl">
            {title}
          </h2>
          {seeAllHref && (
            <Link
              to={seeAllHref}
              className="text-sm font-medium text-rose-600 hover:underline"
            >
              See All &rsaquo;
            </Link>
          )}
        </div>

        {/* Row */}
        <div className="relative">
          {/* Left arrow */}
          {canPrev && (
            <button
              aria-label="Previous"
              onClick={() => scrollByCards(-1)}
              className="absolute left-[-10px] top-1/2 z-20 hidden -translate-y-1/2 sm:flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-white ring-1 ring-black/10 hover:bg-zinc-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scroller */}
          <div
            ref={scrollerRef}
            role="list"
            className="
              flex gap-4 overflow-x-auto pb-1
              snap-x snap-mandatory
              [scrollbar-width:none] [-ms-overflow-style:none]
            "
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((it, i) => (
              <button
                key={it.id ?? it.slug ?? i}
                role="listitem"
                aria-label={it.title}
                onClick={() => onSelect?.(it)}
                data-card
                className="
                  group relative shrink-0 snap-start
                  w-[72vw] xs:w-[58vw] sm:w-56 md:w-60 lg:w-64
                  aspect-[2/3] overflow-hidden rounded-xl
                  bg-zinc-200 ring-1 ring-black/5 shadow-sm
                  hover:shadow-md transition-shadow
                "
              >
                <img
                  src={it.poster}
                  alt={it.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />

                {/* Bottom gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Languages (center bottom) */}
                {it.languages && (
                  <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/90 drop-shadow">
                    {it.languages}
                  </p>
                )}

                {/* Optional top-left badge (e.g., 4K AVAILABLE) */}
                {it.badge?.text && (
                  <span
                    className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${toneToClass(
                      it.badge.tone
                    )}`}
                  >
                    {it.badge.text}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          {canNext && (
            <button
              aria-label="Next"
              onClick={() => scrollByCards(1)}
              className="absolute right-[-10px] top-1/2 z-20 hidden -translate-y-1/2 sm:flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-white ring-1 ring-black/10 hover:bg-zinc-900"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

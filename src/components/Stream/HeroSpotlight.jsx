// src/components/Stream/HeroSpotlight.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";

/** mm -> "1h 45m" */
const minsToHM = (m = 0) => `${Math.floor(m / 60)}h ${m % 60}m`;

export default function HeroSpotlight({
  items = [],
  autoRotateMs = 6500,
  onVideoLibrary,
  showVideoLibrary = true,
}) {
  const [index, setIndex] = useState(0);
  const touch = useRef({ x: 0, y: 0 });
  const count = items.length;

  // Stable 'active' (no new object each render)
  const active = useMemo(() => (items?.[index] ?? null), [items, index]);

  const go = (i) => {
    if (!count) return;
    setIndex(((i % count) + count) % count);
  };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // Auto-rotate
  useEffect(() => {
    if (count <= 1 || autoRotateMs <= 0) return;
    const t = setTimeout(() => {
      setIndex((p) => ((p + 1) % count + count) % count);
    }, autoRotateMs);
    return () => clearTimeout(t);
  }, [index, count, autoRotateMs]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        setIndex((p) => ((p - 1) % count + count) % count);
      }
      if (e.key === "ArrowRight") {
        setIndex((p) => ((p + 1) % count + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  // Meta text depends on active (now stable)
  const meta = useMemo(() => {
    if (!active) return "";
    const parts = [];
    if (active.runtimeMins) parts.push(minsToHM(active.runtimeMins));
    if (active.genre) parts.push(active.genre);
    if (active.cert) parts.push(active.cert);
    return parts.join(" • ");
  }, [active]);

  // Touch swipe (mobile)
  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (t) touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touch.current.x;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  if (!count) return null;

  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        {active?.backdrop ? (
          <img
            src={active.backdrop}
            alt=""
            className="h-full w-full object-cover opacity-60"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid h-[460px] md:h-[520px] grid-cols-1 md:grid-cols-[minmax(280px,340px)_1fr]">
        {/* Poster */}
        <div className="flex items-end justify-center p-5 md:p-8">
          <div className="w-52 md:w-64 lg:w-72">
            {active?.poster ? (
              <img
                src={active.poster}
                alt={active.title || "Poster"}
                className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
                loading="lazy"
                draggable={false}
              />
            ) : (
              <div className="aspect-[3/4] w-full rounded-2xl bg-zinc-800 ring-1 ring-white/10" />
            )}
          </div>
        </div>

        {/* Text block */}
        <div className="flex items-center px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl text-white">
            <p className="text-sm/6 text-white/70">Brand new releases every Friday</p>
            <h2 className="mt-1 text-[28px] font-bold tracking-tight md:text-4xl">
              {active?.title}
            </h2>

            {meta && <p className="mt-2 text-sm/6 text-white/80">{meta}</p>}
            {active?.language && (
              <p className="mt-1 text-sm/6 text-white/70">{active.language}</p>
            )}

            {active?.synopsis && (
              <p className="mt-4 line-clamp-4 text-base/7 text-white/80">
                {active.synopsis}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Video Library pill */}
      {showVideoLibrary && (
        <button
          onClick={onVideoLibrary}
          className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur ring-1 ring-white/15 hover:bg-white/15"
        >
          <Film size={16} />
          <span>Video Library</span>
          <ChevronRight size={18} className="opacity-80" />
        </button>
      )}

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="group absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur ring-1 ring-white/20 hover:bg-white/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="group absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur ring-1 ring-white/20 hover:bg-white/20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={[
              "h-2 w-2 rounded-full ring-1 ring-white/30",
              i === index ? "bg-white" : "bg-white/40",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

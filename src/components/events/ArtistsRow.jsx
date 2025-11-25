import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, User2 } from "lucide-react";

/**
 * ArtistsRow
 * props:
 *  - title?: string
 *  - artists: Array<{ name: string, img: string }>
 *  - onArtistClick?: (artist: { name: string, img: string }) => void
 */
export default function ArtistsRow({
  title = "Artists in your District",
  artists = [],
  onArtistClick,
}) {
  const trackRef = useRef(null);
  const dragging = useRef({ active: false, startX: 0, scrollX: 0 });
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const behavior = prefersReducedMotion ? "auto" : "smooth";

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // tiny epsilon to avoid flicker on exact edges
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft < max - 1);
  };

  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: delta, behavior });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    // Convert vertical wheel to horizontal scroll for track
    const onWheel = (e) => {
      // If user is trying to scroll vertically, use that to pan horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Only hijack if content is actually scrollable
        if (el.scrollWidth > el.clientWidth) {
          e.preventDefault();
          el.scrollBy({ left: e.deltaY, behavior: "auto" }); // wheel should be immediate
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    // Observe size changes to keep arrow state in sync
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(updateArrows);
      ro.observe(el);
    } else {
      window.addEventListener("resize", updateArrows);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      ro ? ro.disconnect() : window.removeEventListener("resize", updateArrows);
    };
  }, [artists.length]);

  // Drag-to-scroll (desktop)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      // Only left click / primary pointer
      if (e.button !== 0) return;
      dragging.current = { active: true, startX: e.clientX, scrollX: el.scrollLeft };
      el.setPointerCapture?.(e.pointerId);
      el.classList.add("dragging");
    };
    const onPointerMove = (e) => {
      if (!dragging.current.active) return;
      const dx = e.clientX - dragging.current.startX;
      el.scrollLeft = dragging.current.scrollX - dx;
    };
    const endDrag = (e) => {
      if (!dragging.current.active) return;
      dragging.current.active = false;
      el.releasePointerCapture?.(e.pointerId);
      el.classList.remove("dragging");
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  // Keyboard support on the scroller
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollBy(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollBy(1);
    }
  };

  return (
    <section className="w-full mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>

        {/* header arrows (fallback on small/keyboard users) */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            className="h-9 w-9 rounded-full grid place-items-center shadow ring-1 ring-black/10 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous artists"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            className="h-9 w-9 rounded-full grid place-items-center shadow ring-1 ring-black/10 bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next artists"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* edge fade hints */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/50 to-transparent rounded-l-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent rounded-r-2xl"
        />

        {/* overlay arrows on the track (md+) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            className="pointer-events-auto ml-1 h-10 w-10 rounded-full grid place-items-center shadow bg-white/90 hover:bg-white ring-1 ring-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            className="pointer-events-auto mr-1 h-10 w-10 rounded-full grid place-items-center shadow bg-white/90 hover:bg-white ring-1 ring-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label="Artists"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="
            flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2
            cursor-grab active:cursor-grabbing select-none rounded-2xl px-1
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
          "
        >
          {artists.map((a, i) => (
            <Artist key={a.name + i} {...a} onClick={onArtistClick ? () => onArtistClick(a) : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Single artist circle + name with skeleton + fallback */
function Artist({ name, img, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const initials = useMemo(() => {
    return (name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  }, [name]);

  const Wrapper = onClick ? "button" : "div";

  return (
    <div className="shrink-0 snap-start">
      <Wrapper
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className="
          group relative block h-36 w-36 sm:h-44 sm:w-44 rounded-full overflow-hidden
          ring-1 ring-black/10 shadow bg-zinc-200 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white/40
        "
        aria-label={onClick ? `Open ${name}` : undefined}
      >
        {/* image */}
        {!failed && (
          <img
            src={img}
            alt={name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            referrerPolicy="no-referrer"
          />
        )}

        {/* skeleton shimmer while loading */}
        {!loaded && !failed && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-200"
          />
        )}

        {/* fallback if image fails */}
        {failed && (
          <div className="absolute inset-0 grid place-items-center bg-zinc-800 text-white">
            <div className="flex flex-col items-center">
              <User2 className="opacity-90" size={32} />
              <span className="mt-1 text-xs font-medium opacity-80">{initials || "?"}</span>
            </div>
          </div>
        )}

        {/* subtle focus/hover ring */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-0 group-hover:ring-2 ring-white/40 transition"
        />
      </Wrapper>

      <p className="mt-3 w-36 sm:w-44 text-center text-sm font-semibold text-white leading-snug line-clamp-2">
        {name}
      </p>
    </div>
  );
}

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ArtistsRow
 * props:
 *  - title?: string
 *  - artists: Array<{ name: string, img: string }>
 */
export default function ArtistsRow({
  title = "Artists in your District",
  artists = [],
}) {
  const trackRef = useRef(null);

  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="w-full mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          {title}
        </h2>
        {/* arrows (hidden on small screens) */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="h-9 w-9 rounded-full bg-white/90 grid place-items-center shadow ring-1 ring-black/5 hover:bg-white"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="h-9 w-9 rounded-full bg-white/90 grid place-items-center shadow ring-1 ring-black/5 hover:bg-white"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      >
        {artists.map((a, i) => (
          <Artist key={a.name + i} {...a} />
        ))}
      </div>
    </section>
  );
}

/* single artist circle + name */
function Artist({ name, img }) {
  return (
    <div className="shrink-0 snap-start">
      <div
        className="
          relative h-36 w-36 sm:h-44 sm:w-44
          rounded-full overflow-hidden
          ring-1 ring-black/10 shadow
          bg-zinc-200
        "
      >
        <img
          src={img}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <p className="mt-3 w-36 sm:w-44 text-center text-sm font-semibold text-white leading-snug">
        {name}
      </p>
    </div>
  );
}

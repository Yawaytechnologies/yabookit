import React, { useRef } from "react";

/**
 * YouMightAlsoLike
 * Props:
 *  - items: [{ id, title, poster, ratingText }]  // ratingText like "9.1/10 30.3K+ Votes"
 *  - onOpen: (id) => void   // call when a card is clicked (optional)
 */
export default function YouMightAlsoLike({ items = [], onOpen }) {
  const scroller = useRef(null);
  const scrollBy = (dx) => scroller.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">You might also like</h2>
        <button className="text-rose-300 hover:text-rose-200 text-sm">View All</button>
      </div>

      <div className="relative">
        {/* arrows (desktop) */}
        <button
          className="hidden md:grid absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 place-items-center z-10"
          onClick={() => scrollBy(-360)}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M15 18l-6-6 6-6" strokeWidth="2" />
          </svg>
        </button>
        <button
          className="hidden md:grid absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 place-items-center z-10"
          onClick={() => scrollBy(360)}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M9 6l6 6-6 6" strokeWidth="2" />
          </svg>
        </button>

        <div
          ref={scroller}
          className="flex gap-4 overflow-x-auto pb-2 pr-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/20"
        >
          {items.map((m) => (
            <button
              key={m.id}
              onClick={() => onOpen?.(m.id)}
              className="group relative min-w-[170px] max-w-[170px] text-left rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition snap-start"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>

              {/* rating strip like screenshot */}
              {m.ratingText && (
                <div className="absolute left-0 right-0 bottom-[62px] mx-2 rounded-md bg-black/80 text-[12px] text-white px-2 py-1 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#e11d48">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {m.ratingText}
                </div>
              )}

              <div className="px-2 py-2">
                <div className="line-clamp-2 text-sm font-medium text-white">{m.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from "react";

/**
 * CastList
 * Props:
 *  - title?: string (defaults to "Cast")
 *  - people: [{ name, role?: "Actor", photo }]
 */
export default function CastList({ title = "Cast", people = [] }) {
  const scroller = useRef(null);

  const scrollBy = (dx) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="hidden sm:flex gap-2">
          <button
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 grid place-items-center"
            onClick={() => scrollBy(-320)}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" />
            </svg>
          </button>
          <button
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 grid place-items-center"
            onClick={() => scrollBy(320)}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M9 6l6 6-6 6" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/20"
      >
        {people.map((p, i) => (
          <div key={`${p.name}-${i}`} className="min-w-[120px] snap-start">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border border-white/10 mx-auto">
              <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="text-center mt-2">
              <div className="text-sm font-medium text-white">{p.name}</div>
              <div className="text-xs text-white/70">{p.role || "Actor"}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

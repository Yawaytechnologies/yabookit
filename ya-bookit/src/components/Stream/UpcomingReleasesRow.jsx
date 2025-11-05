import React, { useRef } from "react";

/**
 * items: [{
 *   id/slug, title, languages, poster,
 *   tag?: "PREMIERE" | "EXCLUSIVE",
 *   prebookHref?: string
 * }]
 */
export default function UpcomingReleasesRow({
  title = "Upcoming Releases",
  items = [],
  onSelect,                 // (item) => void
  onPreBook,                // (item) => void
  className = "",
}) {
  const scrollerRef = useRef(null);

  const tagClass = (t = "PREMIERE") =>
    t.toUpperCase() === "EXCLUSIVE"
      ? "bg-amber-400 text-black"
      : "bg-rose-500 text-white"; // default PREMIERE

  return (
    <section className={className}>
      <div className="rounded-2xl bg-[#F3F6FB] p-4 md:p-5">
        <h2 className="mb-4 text-xl md:text-2xl font-semibold text-zinc-900">
          {title}
        </h2>

        {/* Horizontal row (snap scroll, responsive cards) */}
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
            <div key={it.id ?? it.slug ?? i} className="shrink-0 snap-start">
              {/* Card */}
              <button
                role="listitem"
                aria-label={it.title}
                onClick={() => onSelect?.(it)}
                className="
                  group relative
                  w-[72vw] sm:w-56 md:w-60 lg:w-64
                  aspect-[2/3] overflow-hidden rounded-xl
                  bg-zinc-200 ring-1 ring-black/5 shadow-sm
                  hover:shadow-md transition-shadow
                  text-left
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

                {/* Languages */}
                {it.languages && (
                  <p className="absolute left-3 bottom-12 text-xs text-white/90 drop-shadow">
                    {it.languages}
                  </p>
                )}

                {/* Tag ribbon (e.g., PREMIERE) */}
                <span
                  className={`absolute left-3 bottom-3 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${tagClass(
                    it.tag
                  )}`}
                >
                  {it.tag ?? "PREMIERE"}
                </span>
              </button>

              {/* PRE-BOOK label under card */}
              <div className="mt-2">
                {onPreBook ? (
                  <button
                    onClick={() => onPreBook(it)}
                    className="text-[11px] font-semibold uppercase tracking-wide text-rose-600"
                  >
                    PRE-BOOK
                  </button>
                ) : it.prebookHref ? (
                  <a
                    href={it.prebookHref}
                    className="text-[11px] font-semibold uppercase tracking-wide text-rose-600"
                  >
                    PRE-BOOK
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-rose-600">
                    PRE-BOOK
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

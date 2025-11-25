import React from "react";

/**
 * items: [{
 *   id/slug, title, languages, tag: "PREMIERE" | "EXCLUSIVE", poster (string URL or imported src)
 * }]
 */
export default function PremiereRow({
  title = "Premiere of the week",
  items = [],
  onSelect,           // (item) => void
  className = "",
}) {
  const tagStyle = (t = "") => {
    const k = t.toUpperCase();
    return k === "EXCLUSIVE"
      ? "bg-amber-400 text-black"
      : "bg-rose-500 text-white"; // default PREMIERE
  };

  return (
    <section className={className}>
      {/* Heading + panel like screenshot */}
      <div className="rounded-2xl bg-[#F3F6FB] p-4 md:p-5">
        <h2 className="mb-4 text-xl md:text-2xl font-semibold text-zinc-900">
          {title}
        </h2>

        {/* Horizontal, snap-scrolling row */}
        <div
          role="list"
          className="
            flex gap-4 overflow-x-auto pb-1
            snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          // Hide scrollbar in WebKit
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((it, i) => (
            <button
              key={it.id ?? it.slug ?? i}
              role="listitem"
              aria-label={it.title}
              onClick={() => onSelect?.(it)}
              className="
                group relative shrink-0 snap-start
                w-[72vw] sm:w-56 md:w-60 lg:w-64
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

              {/* soft bottom gradient for readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Languages */}
              {it.languages && (
                <p className="absolute left-3 bottom-12 text-xs text-white/90 drop-shadow">
                  {it.languages}
                </p>
              )}

              {/* Tag badge */}
              {it.tag && (
                <span
                  className={`absolute left-3 bottom-3 rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${tagStyle(
                    it.tag
                  )}`}
                >
                  {it.tag}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

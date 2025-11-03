import React from "react";

/**
 * items: [{
 *   id/slug, title, languages, poster,
 *   badge?: { text: "4K AVAILABLE" | "NEW" | "DOLBY", tone?: "indigo" | "amber" | "rose" }
 * }]
 */
export default function DiscountRow({
  title = "Movies On Discount",
  subtitle = "Rent at Half Price, Use Offer Code: Streamsave",
  items = [],
  onSelect,            // (item) => void
  className = "",
}) {
  const badgeTone = (t) => {
    switch ((t || "").toLowerCase()) {
      case "amber": return "bg-amber-400 text-black";
      case "indigo": return "bg-indigo-500 text-white";
      case "rose": return "bg-rose-500 text-white";
      default: return "bg-indigo-500 text-white";
    }
  };

  return (
    <section className={className}>
      <div className="rounded-2xl bg-[#F3F6FB] p-4 md:p-5">
        <h2 className="text-xl md:text-2xl font-semibold text-zinc-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
        )}

        <div
          role="list"
          className="
            mt-4 flex gap-4 overflow-x-auto pb-1
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
              className="
                group relative shrink-0 snap-start
                w-[72vw] xs:w-[58vw] sm:w-56 md:w-60 lg:w-64
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

              {/* optional top-left badge */}
              {it.badge?.text && (
                <span
                  className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${badgeTone(
                    it.badge.tone
                  )}`}
                >
                  {it.badge.text}
                </span>
              )}

              {/* bottom gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

              {/* languages (center bottom) */}
              {it.languages && (
                <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/90 drop-shadow">
                  {it.languages}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

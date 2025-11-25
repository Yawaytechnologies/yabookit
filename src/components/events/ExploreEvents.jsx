import React from "react";

/**
 * ExploreEvents — full-bleed image cards
 * - Each card image fills 100% width & height via object-cover.
 * - Title is an overlay chip at the top (centered).
 *
 * props:
 *  - categories: [{ title, slug, img }]
 *  - onSelect: (slug) => void
 *  - heading?: string
 */
export default function ExploreEvents({
  categories = [],
  onSelect = () => {},
  heading = "Explore Events",
}) {
  return (
    <section className="w-full mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        {heading}
      </h2>

      <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {categories.map((c) => (
          <CategoryCard
            key={c.slug || c.title}
            title={c.title}
            img={c.img}
            onClick={() => onSelect(c.slug)}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------- Single full-bleed card ------------- */
function CategoryCard({ title, img, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className="
        relative overflow-hidden
        h-[180px] sm:h-[200px] w-full
        rounded-[28px]
        shadow-[0_6px_18px_rgba(0,0,0,0.08)]
        transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]
      "
    >
      {/* FULL image — fills the whole card */}
      <img
        src={img}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"  /* <-- key line */
        draggable={false}
      />

      {/* Subtle top gradient & highlight for readability */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_100%,rgba(255,255,255,0.5)_0,rgba(255,255,255,0)_60%)]" />
      </div>

      {/* Title overlay chip (centered at top) */}
      <div className="relative z-10 flex items-start justify-center pt-3 sm:pt-4 px-3">
        <span className="
          inline-block rounded-md px-2.5 py-1
          text-[12px] sm:text-[13px] font-extrabold tracking-[0.12em] uppercase
          text-white bg-black/45 backdrop-blur
        ">
          {title}
        </span>
      </div>

      {/* Soft inner ring to match the style */}
      <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/10" />
    </button>
  );
}

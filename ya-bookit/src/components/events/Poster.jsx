// src/components/event/Poster.jsx
import React from "react";
import { ChevronLeft, MapPin } from "lucide-react";

/**
 * Poster — split hero for an event.
 * Props:
 *  dateLabel, title, subtitle, venue, priceLabel, ctaText, posterImg
 *  onBack?, onBook?, className?
 */
export default function Poster({
  dateLabel = "Sat, 29 Nov, 7:00 PM",
  title = "Event Title",
  subtitle = "Event Subtitle",
  venue = "Venue, City",
  priceLabel = "₹999 onwards",
  ctaText = "Book tickets",
  posterImg,
  onBack,
  onBook,
  className = "",
}) {
  return (
    <section
      className={
        "relative w-full bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900/40 dark:to-zinc-950 " +
        className
      }
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr,420px] items-center">
          {/* LEFT */}
          <div className="min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6"
              aria-label="Go back"
            >
              <ChevronLeft size={22} />
            </button>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              {dateLabel}
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <span>{title}</span>
              <span className="mx-2 text-zinc-400">|</span>
              <span className="text-zinc-900 dark:text-white">{subtitle}</span>
            </h1>

            <div className="mt-4 flex items-center gap-2 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300">
              <MapPin className="shrink-0" size={18} />
              <span className="truncate">{venue}</span>
            </div>

            <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
              {priceLabel}
            </p>

            <div className="mt-5">
              <button
                onClick={onBook}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-900 text-white px-6 text-base font-semibold shadow-sm hover:bg-zinc-800 active:scale-[0.99] transition"
              >
                {ctaText}
              </button>
            </div>
          </div>

          {/* RIGHT */}
         <div className="w-full">
  <div className="mx-auto w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 bg-zinc-900">
    {/* Set the exact shape you want; this matches your poster ratio */}
    <div className="relative w-full aspect-[1360/486] sm:aspect-[16/9] lg:aspect-[1360/486]">
      <img
        src={posterImg}
        alt="Event poster"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }} // tweak framing if needed
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}

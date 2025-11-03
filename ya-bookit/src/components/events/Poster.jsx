// src/components/event/Poster.jsx
import React from "react";
import { ChevronLeft, MapPin } from "lucide-react";

/**
 * Poster — single hero card with on-image overlay content.
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
    <section className={"relative w-full " + className}>
      {/* Local styles: animations + button shine */}
      <style>{`
        @keyframes rise { 
          0% { opacity: 0; transform: translateY(10px) scale(.98) } 
          100% { opacity: 1; transform: none } 
        }
        @keyframes kenburns {
          0%   { transform: scale(1.03) translate3d(0px, 0px, 0) }
          50%  { transform: scale(1.08) translate3d(0px, -6px, 0) }
          100% { transform: scale(1.03) translate3d(0px, 0px, 0) }
        }
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .hero-animate   { animation: rise .55s cubic-bezier(.22,1,.36,1) both; }
        .image-animate  { will-change: transform; animation: kenburns 16s ease-in-out infinite; }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: ""; position: absolute; inset: -1px; pointer-events: none;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.15) 45%, rgba(255,255,255,.35) 50%, rgba(255,255,255,.1) 55%, transparent 100%);
          transform: translateX(-120%);
        }
        .btn-shine:hover::after { animation: shine 1.1s ease-out forwards; }
      `}</style>

      {/* Card */}
      <div className="relative w-full overflow-hidden bg-zinc-900">
        {/* Aspect keeps it cinematic; mobile taller, desktop wider */}
        <div className="relative w-full aspect-[10/14] sm:aspect-[16/9] lg:aspect-[21/9]">
          {/* Poster image */}
          <img
            src={posterImg}
            alt={`${title} poster`}
            className="absolute inset-0 h-full w-full object-cover image-animate"
            loading="eager"
            decoding="async"
            draggable={false}
            style={{ objectPosition: "center 35%" }}
          />

          {/* Readability overlays */}
          {/* Base vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/65" />
          {/* Bottom lift */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

          {/* Back button (top-left) */}
          <div className="absolute left-3 top-3 sm:left-5 sm:top-5 z-10">
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-[2px]"
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline text-sm">Back</span>
            </button>
          </div>

          {/* Text overlay (bottom content) */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {/* Date */}
              <p className="hero-animate text-sm sm:text-base text-white/80">
                {dateLabel}
              </p>

              {/* Title + subtitle */}
              <h1
                className="hero-animate mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ animationDelay: "60ms" }}
              >
                <span className="text-white">{title}</span>
                <span className="mx-2 text-white/50">|</span>
                <span className="text-white">{subtitle}</span>
              </h1>

              {/* Venue */}
              <div
                className="hero-animate mt-3 sm:mt-4 flex items-center gap-2 text-base sm:text-lg text-white/85"
                style={{ animationDelay: "110ms" }}
              >
                <MapPin size={18} className="shrink-0 opacity-90" />
                <span className="truncate">{venue}</span>
              </div>

              {/* Price + CTA */}
              <div
                className="hero-animate mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-3"
                style={{ animationDelay: "160ms" }}
              >
                <p className="text-base sm:text-lg text-white/85">{priceLabel}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onBook}
                    className="btn-shine inline-flex h-11 sm:h-12 items-center justify-center rounded-xl bg-white text-black px-6 sm:px-7 text-sm sm:text-base font-semibold shadow-[0_14px_40px_-16px_rgba(255,255,255,.6)] hover:bg-white/95 active:scale-[0.99] transition"
                  >
                    {ctaText}
                  </button>
                </div>
              </div>

              {/* Optional fine line for refinement */}
              <div className="hero-animate mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animationDelay: "220ms" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

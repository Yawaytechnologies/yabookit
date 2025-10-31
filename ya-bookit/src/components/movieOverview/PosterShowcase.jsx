import React from "react";

/**
 * PosterShowcase
 * Props:
 *  - poster: string (image URL)
 *  - title:  string
 *  - releaseText?: string (e.g., "Releasing on 31 Oct, 2025")
 *  - onPlayTrailer?: () => void
 */
export default function PosterShowcase({
  poster,
  title,
  releaseText,
  onPlayTrailer,
}) {
  return (
    <div className="relative w-[220px] sm:w-[260px] md:w-[300px]">
      {/* local styles (shine + glow) */}
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes softglow {
          0% { box-shadow: 0 15px 50px rgba(0,0,0,.35); }
          100% { box-shadow: 0 25px 70px rgba(255, 76, 64, .18); }
        }
        .poster-outer { position: relative; }
        .poster-outer:hover .poster-img { transform: scale(1.03); }
        .poster-outer:hover .poster-sweep::after { animation: sweep 1.1s ease-out forwards; }
        .poster-outer:hover .poster-frame { animation: softglow .6s ease-out forwards; }
      `}</style>

      <div className="poster-outer rounded-2xl overflow-hidden border border-white/10 bg-black/40 poster-frame">
        {/* Image (2:3) */}
        <div className="relative aspect-[2/3]">
          <img
            src={poster}
            alt={title}
            className="poster-img absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform"
            loading="eager"
          />

          {/* dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />

          {/* shine sweep */}
          <div className="poster-sweep pointer-events-none absolute inset-0">
            <span
              aria-hidden
              className="absolute inset-0 -skew-x-12"
              style={{
                background:
                  "linear-gradient(100deg, transparent 0%, rgba(255,255,255,.08) 45%, rgba(255,255,255,.22) 50%, rgba(255,255,255,.08) 55%, transparent 100%)",
                transform: "translateX(-120%)",
              }}
            />
          </div>

          {/* Trailer pill */}
          <button
            type="button"
            onClick={onPlayTrailer}
            className="absolute left-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-black hover:bg-white"
            title="Play trailer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Trailer
          </button>
        </div>

        {/* Release strip */}
        {releaseText ? (
          <div className="w-full bg-black/65 text-white text-[12px] text-center py-2 border-t border-white/10">
            {releaseText}
          </div>
        ) : null}
      </div>
    </div>
  );
}

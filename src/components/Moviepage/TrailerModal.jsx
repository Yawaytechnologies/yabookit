import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function TrailerModal({ open, onClose, movie }) {
  // ESC to close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const searchUrl = movie
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
        `${movie.title} official trailer`
      )}`
    : "https://www.youtube.com";

  const embedSrc = movie?.trailerId
    ? `https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&rel=0`
    : null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Centered container with safe padding so controls are visible */}
      <div className="relative z-[61] h-full w-full flex items-center justify-center p-4 sm:p-8">
        {/* Close button (screen corner so it never overlaps controls) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full w-10 h-10 border border-white/10 bg-white/10 hover:bg-white/20 flex items-center justify-center"
          aria-label="Close trailer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Player panel — aspect ratio + max height so the bottom controls are always in view */}
        <div className="w-full max-w-5xl aspect-video max-h-[80vh] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          {embedSrc ? (
            <iframe
              title={`${movie.title} Trailer`}
              src={embedSrc}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center flex-col gap-3">
              <div className="text-white/80">Trailer not set for this title.</div>
              <a
                href={searchUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-yellow-400 text-black px-5 py-2 font-semibold hover:bg-yellow-300"
              >
                Open on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

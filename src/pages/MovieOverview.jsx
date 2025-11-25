// src/pages/MovieOverview.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Clock, Star, Share2 } from "lucide-react";

import { getMovieById, MOVIES } from "../data/movies";
import PosterShowcase from "../components/movieOverview/PosterShowcase";
import CastList from "../components/movieOverview/CastList";
import CrewList from "../components/movieOverview/CrewList";
import YouMightAlsoLike from "../components/movieOverview/YouMightAlsoLike";

/* helpers */
const minsToHM = (mins = 0) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

export default function MovieOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const m = id ? getMovieById(id) : null;

  if (!id) {
    return (
      <main className="min-h-[70vh] grid place-items-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No movie id in URL</h2>
          <button
            className="mt-4 rounded-lg bg-white/10 px-4 py-2"
            onClick={() => navigate("/movies")}
          >
            Go to Movies
          </button>
        </div>
      </main>
    );
  }

  if (!m) {
    return (
      <main className="min-h-[70vh] grid place-items-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Movie not found</h2>
          <button
            className="mt-4 rounded-lg bg-white/10 px-4 py-2"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  const {
    title,
    year,
    runtime,
    rating,
    genres = [],
    languages = [],
    formats = [],
    poster,
    backdrop,
    trailerId,
    about,
    cast = [],
    crew = [],
    releaseText,        // optional from your data
    releaseDate,        // optional ISO date
  } = m;

  const releaseLabel =
    releaseText ||
    (releaseDate
      ? `Releasing on ${new Date(releaseDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}`
      : "");

  // build suggestions (exclude current id)
  const suggestions = MOVIES.filter((x) => x.id !== id).slice(0, 10).map((x) => ({
    id: x.id,
    title: x.title,
    poster: x.poster,
    ratingText: x.rating ? `${x.rating}/10` : undefined,
  }));

  const onShare = async () => {
    try {
      const shareData = {
        title: `${title} – YaBookIt`,
        text: `Check out ${title} on YaBookIt`,
        url: window.location.href,
      };
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1524] text-white pt-4">
      {/* ===== HERO ===== */}
      <section className="relative">
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdrop || poster})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0b1524]/70 to-[#0b1524]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-8 md:pt-16 md:pb-12">
          <div className="flex gap-6 md:gap-10">
            {/* LEFT: Poster */}
            <PosterShowcase
              poster={poster}
              title={title}
              releaseText={releaseLabel}
              onPlayTrailer={() =>
                document.getElementById("trailer")?.scrollIntoView({ behavior: "smooth" })
              }
            />

            {/* RIGHT: Title + meta + CTAs */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {title}
                </h1>

                <button
                  onClick={onShare}
                  className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 px-3 py-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              {/* “interest” style pill (optional subtle UI) */}
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3 max-w-md">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
                      </svg>
                      9.5K+ are interested
                    </span>
                    <div className="text-[11px] text-white/70">
                      Are you interested in watching this movie?
                    </div>
                  </div>
                  <button className="rounded-md bg-white text-black text-sm font-semibold px-3 py-1.5 hover:bg-white/90">
                    I’m interested
                  </button>
                </div>
              </div>

              {/* meta chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {formats.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs"
                  >
                    {f}
                  </span>
                ))}
                {languages.slice(0, 2).map((l) => (
                  <span
                    key={l}
                    className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs"
                  >
                    {l}
                  </span>
                ))}
              </div>

              {/* genre + facts */}
              <div className="mt-2 text-white/80 text-sm">
                {genres.join(", ") || "—"}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span>{year}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {minsToHM(runtime)}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-lg px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15"
                >
                  Back
                </button>
                {/* Your booking routes use /movie/:id/... (singular) */}
                <Link
                  to={`/movie/${id}/showtimes`}
                  className="rounded-lg px-6 py-2 bg-rose-500 text-white font-semibold hover:bg-rose-600"
                >
                  Book tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* About */}
        {about && (
          <div>
            <h2 className="text-xl font-semibold">About</h2>
            <p className="mt-3 text-white/80 leading-relaxed">{about}</p>
          </div>
        )}

        {/* Trailer */}
        {trailerId && (
          <div id="trailer">
            <h2 className="text-xl font-semibold">Trailer</h2>
            <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-white/10">
              <iframe
                title={`${title} trailer`}
                src={`https://www.youtube.com/embed/${trailerId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Cast & Crew (split components) */}
        {cast.length > 0 && <CastList people={cast} />}
        {crew.length > 0 && <CrewList people={crew} />}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <YouMightAlsoLike
            items={suggestions}
            onOpen={(mid) => navigate(`/movies/${mid}`)}
          />
        )}
      </section>
    </main>
  );
}

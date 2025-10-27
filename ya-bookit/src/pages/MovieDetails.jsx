import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../components/Homepage/HeaderBar";
import TrailerModal from "../components/Moviepage/TrailerModal";
import {
  Search, SlidersHorizontal, Star, Clock, Heart, Play, ChevronDown, Filter, X,
} from "lucide-react";
import { MOVIES, allGenres, allLangs, allFormats } from "../components/Moviepage/movies";

const QUICK_FILTERS = [
  { type: "genre", label: "Action" },
  { type: "genre", label: "Sci-Fi" },
  { type: "genre", label: "Animation" },
  { type: "genre", label: "Drama" },
  { type: "format", label: "IMAX 2D" },
  { type: "format", label: "3D" },
  { type: "language", label: "English" },
  { type: "language", label: "Hindi" },
];

function classNames(...c) { return c.filter(Boolean).join(" "); }

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("pop");
  const [liked, setLiked] = useState({});
  const [genres, setGenres] = useState(new Set());
  const [langs, setLangs] = useState(new Set());
  const [formats, setFormats] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Trailer modal state
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const toggleSet = (setter, values, v) => {
    const next = new Set(values);
    next.has(v) ? next.delete(v) : next.add(v);
    setter(next);
  };
  const toggleQuick = (f) => {
    if (f.type === "genre") toggleSet(setGenres, genres, f.label);
    if (f.type === "language") toggleSet(setLangs, langs, f.label);
    if (f.type === "format") toggleSet(setFormats, formats, f.label);
  };
  const clearAll = () => {
    setGenres(new Set()); setLangs(new Set()); setFormats(new Set());
    setQuery(""); setSort("pop");
  };

  const filtered = useMemo(() => {
    let out = MOVIES.filter((m) => {
      const q = query.trim().toLowerCase();
      const okQ = !q || m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q));
      const okG = genres.size === 0 || m.genres.some((g) => genres.has(g));
      const okL = langs.size === 0 || m.languages.some((l) => langs.has(l));
      const okF = formats.size === 0 || m.formats.some((f) => formats.has(f));
      return okQ && okG && okL && okF;
    });
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") out.sort((a, b) => b.year - a.year);
    else if (sort === "az") out.sort((a, b) => a.title.localeCompare(b.title));
    else out.sort((a, b) => b.rating - a.rating);
    return out;
  }, [query, genres, langs, formats, sort]);

  const activeChips = [
    ...Array.from(genres).map((v) => ({ type: "genre", label: v })),
    ...Array.from(langs).map((v) => ({ type: "language", label: v })),
    ...Array.from(formats).map((v) => ({ type: "format", label: v })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <HeaderBar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Browse Movies</h1>
            <p className="text-white/60 mt-1">Find your next watch by genre, language, and format.</p>
          </div>

          {/* Toolbar */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F1E]/80 backdrop-blur px-3 sm:px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-yellow-400/60">
                  <Search className="w-4 h-4 text-white/70" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies, genres..."
                    className="w-full bg-transparent placeholder:text-white/50 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-white/60" />
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-8 text-sm outline-none hover:border-white/20"
                  >
                    <option value="pop" className="bg-[#0B0F1E]">Popular</option>
                    <option value="rating" className="bg-[#0B0F1E]">Rating (High → Low)</option>
                    <option value="newest" className="bg-[#0B0F1E]">Newest</option>
                    <option value="az" className="bg-[#0B0F1E]">A → Z</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Quick filters */}
            <div className="mt-3 -mx-1 overflow-x-auto">
              <div className="flex items-center gap-2 px-1 pb-1">
                {QUICK_FILTERS.map((f) => {
                  const active =
                    (f.type === "genre" && genres.has(f.label)) ||
                    (f.type === "language" && langs.has(f.label)) ||
                    (f.type === "format" && formats.has(f.label));
                  return (
                    <button
                      key={`${f.type}-${f.label}`}
                      onClick={() => toggleQuick(f)}
                      className={classNames(
                        "px-3 py-1.5 text-xs rounded-lg border whitespace-nowrap transition",
                        active
                          ? "bg-yellow-500 text-black border-yellow-400 shadow-[0_6px_20px_-10px_rgba(234,179,8,.8)]"
                          : "bg-transparent border-white/10 text-white/80 hover:bg:white/10"
                      )}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active chips */}
            {activeChips.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {activeChips.map((c) => (
                  <button
                    key={`${c.type}-${c.label}`}
                    onClick={() => {
                      if (c.type === "genre") toggleSet(setGenres, genres, c.label);
                      if (c.type === "language") toggleSet(setLangs, langs, c.label);
                      if (c.type === "format") toggleSet(setFormats, formats, c.label);
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/30 px-2 py-1 text-xs"
                  >
                    {c.label}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                <button onClick={clearAll} className="ml-auto text-xs text-white/70 hover:text-white underline underline-offset-2">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Count */}
          <div className="mt-4 text-sm text-white/60">
            Showing <span className="text-white">{filtered.length}</span> {filtered.length === 1 ? "movie" : "movies"}
          </div>

          {/* Grid */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                liked={!!liked[m.id]}
                onToggleLike={() => setLiked((p) => ({ ...p, [m.id]: !p[m.id] }))}
                onWatchTrailer={() => { setTrailerMovie(m); setShowTrailer(true); }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Trailer modal */}
      <TrailerModal
        open={showTrailer}
        onClose={() => setShowTrailer(false)}
        movie={trailerMovie}
      />

      {/* Slide-over filters (optional: keep your previous drawer if you liked it) */}
      {/* You can reuse your previous FilterDrawer here if needed */}
    </div>
  );
}

function MovieCard({ movie, liked, onToggleLike, onWatchTrailer }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40 hover:border-yellow-500/40 transition">
      <div className="aspect-[2/3] overflow-hidden">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800/60 to-gray-900/60" />}
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <button
        onClick={onToggleLike}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/10 hover:border-red-500/60 transition"
        aria-label="Add to favourites"
      >
        <Heart className={liked ? "w-5 h-5 fill-red-500 text-red-500" : "w-5 h-5 text-white"} />
      </button>

      <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs border border-white/10">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        <span className="font-semibold">{movie.rating}</span>
      </div>

      <div className="p-3">
        <h3 className="font-semibold leading-tight">{movie.title}</h3>
        <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
          <span>{movie.year}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {movie.runtime}m
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {movie.genres.slice(0, 3).map((g) => (
            <span key={g} className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 text-[11px]">
              {g}
            </span>
          ))}
        </div>

        <div className="mt-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
           <Link
        to={`/booking/${movie.id}`}
        className="flex-1 text-center rounded-full bg-yellow-400 text-black font-semibold text-sm px-3 py-2 hover:bg-yellow-300 transition"
      >
            Book Now
          </Link>
          <button
            onClick={onWatchTrailer}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition"
          >
            <Play className="w-4 h-4" />
            Trailer
          </button>
        </div>
      </div>
    </div>
  );
}

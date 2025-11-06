import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom"; // ✅ add this

/* =========================
   Tiny inline icons (no deps)
========================= */
const ChevronDown = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" className={className}>
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const XIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" className={className}>
    <path d="M6 6l12 12M6 18L18 6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* =========================
   Sample MOVIES data (use your own)
========================= */
/* =========================
   Sample MOVIES data (use your own)
========================= */
const MOVIES = [
  {
    id: "aaryan",
    title: "AARYAN",
    year: 2024,
    runtime: 148,
    rating: 8.1,
    genres: ["Action", "Thriller"],
    languages: ["Tamil", "Hindi"],
    formats: ["2D"],
      poster:
    "https://images.weserv.nl/?url=media.cinemaexpress.com/cinemaexpress/2024-07/065cb5a4-40a2-4a25-b801-10ba23f200cc/Aaryan.jpg&w=600&h=900&fit=cover",
  },
  {
    id: "bison",
    title: "BISON",
    year: 2024,
    runtime: 142,
    rating: 7.8,
    genres: ["Action", "Drama"],
    languages: ["Tamil", "Telugu"],
    formats: ["2D", "IMAX 2D"],
   poster:
"bison.avif"  },
  {
    id: "dude",
    title: "DUDE",
    year: 2024,
    runtime: 131,
    rating: 7.3,
    genres: ["Drama"],
    languages: ["Tamil", "Malayalam"],
    formats: ["2D"],
    poster:"Dude.avif"  },
  {
    id: "aan-paavam",
    title: "AAN PAAVAM POLLATHATHU",
    year: 2024,
    runtime: 126,
    rating: 7.6,
    genres: ["Romance", "Comedy"],
    languages: ["Tamil"],
    formats: ["2D"],
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop",
  },

  /* ------------ more movies ------------ */
  {
    id: "dune-2",
    title: "DUNE: PART TWO",
    year: 2024,
    runtime: 166,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster:
"dune.avif"  },
  {
    id: "oppenheimer",
    title: "OPPENHEIMER",
    year: 2023,
    runtime: 180,
    rating: 8.9,
    genres: ["Biography", "Drama", "History"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "interstellar",
    title: "INTERSTELLAR",
    year: 2014,
    runtime: 169,
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "black-widow",
    title: "BLACK WIDOW",
    year: 2021,
    runtime: 134,
    rating: 8.4,
    genres: ["Action", "Adventure", "Sci-Fi"],
    languages: ["English", "Hindi"],
    formats: ["2D", "3D"],
    poster:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "kgf-2",
    title: "KGF: CHAPTER 2",
    year: 2022,
    runtime: 168,
    rating: 8.3,
    genres: ["Action", "Crime", "Drama"],
    languages: ["Kannada", "Tamil", "Telugu", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster:
"kgf2.avif"  },
  {
    id: "leo",
    title: "LEO",
    year: 2023,
    runtime: 164,
    rating: 7.5,
    genres: ["Action", "Thriller"],
    languages: ["Tamil", "Telugu", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster:
"leo.avif"  },
  {
    id: "96",
    title: "96",
    year: 2018,
    runtime: 158,
    rating: 8.6,
    genres: ["Romance", "Drama"],
    languages: ["Tamil"],
    formats: ["2D"],
    poster:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "drishyam",
    title: "DRISHYAM",
    year: 2013,
    runtime: 160,
    rating: 8.3,
    genres: ["Crime", "Thriller", "Drama"],
    languages: ["Malayalam"],
    formats: ["2D"],
    poster:
"Drishyam.avif"  },
  {
    id: "bahubali",
    title: "BAAHUBALI: THE BEGINNING",
    year: 2015,
    runtime: 159,
    rating: 8.1,
    genres: ["Action", "Drama", "Fantasy"],
    languages: ["Telugu", "Tamil", "Hindi"],
    formats: ["2D"],
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "chhichhore",
    title: "CHHICHHORE",
    year: 2019,
    runtime: 143,
    rating: 8.0,
    genres: ["Comedy", "Drama"],
    languages: ["Hindi"],
    formats: ["2D"],
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "joker",
    title: "JOKER",
    year: 2019,
    runtime: 122,
    rating: 8.4,
    genres: ["Crime", "Drama", "Thriller"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster:
"joker.avif"  },
];


/* derive filters */
const allLangs = Array.from(new Set(MOVIES.flatMap((m) => m.languages))).sort();
const allGenres = Array.from(new Set(MOVIES.flatMap((m) => m.genres))).sort();
const allFormats = Array.from(new Set(MOVIES.flatMap((m) => m.formats))).sort();

/* =========================
   Small UI bits
========================= */
function Pill({ active, children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-sm transition " +
        (active
          ? "bg-rose-50 text-rose-700 border-rose-200"
          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200") +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

function Accordion({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium"
      >
        <span className="text-gray-800">{title}</span>
        <ChevronDown
          className={
            "h-5 w-5 text-gray-500 transition " + (open ? "rotate-180" : "")
          }
        />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

/* =========================
   MAIN (single-file page component)
========================= */
export default function MoviesExploreStandalone() {
  // filters
  const [langs, setLangs] = useState([]); // multi
  const [genres, setGenres] = useState([]); // multi
  const [format, setFormat] = useState(""); // single

  const toggleLang = (l) =>
    setLangs((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]
    );
  const toggleGenre = (g) =>
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const clearAll = () => {
    setLangs([]);
    setGenres([]);
    setFormat("");
  };

  const filtered = useMemo(() => {
    return MOVIES.filter((m) => {
      const byLang =
        langs.length === 0 || (m.languages || []).some((l) => langs.includes(l));
      const byGenre =
        genres.length === 0 || (m.genres || []).some((g) => genres.includes(g));
      const byFormat = !format || (m.formats || []).includes(format);
      return byLang && byGenre && byFormat;
    });
  }, [langs, genres, format]);

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6 md:py-10">
        {/* Title + quick language chips row */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Movies In Chennai
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {allLangs.map((l) => (
              <Pill key={`chip-${l}`} active={langs.includes(l)} onClick={() => toggleLang(l)}>
                {l}
              </Pill>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 md:gap-8">
          {/* Sidebar */}
          <aside>
            <div className="sticky top-20 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-800 font-semibold text-lg">Filters</h2>
                <button className="text-sm text-rose-600 hover:underline" onClick={clearAll}>
                  Clear
                </button>
              </div>

              <Accordion title="Languages" defaultOpen>
                <div className="flex flex-wrap gap-2">
                  {allLangs.map((l) => (
                    <Pill
                      key={`lang-${l}`}
                      active={langs.includes(l)}
                      onClick={() => toggleLang(l)}
                    >
                      {l}
                    </Pill>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Genres" defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map((g) => (
                    <Pill
                      key={`genre-${g}`}
                      active={genres.includes(g)}
                      onClick={() => toggleGenre(g)}
                    >
                      {g}
                    </Pill>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Format" defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {allFormats.map((f) => (
                    <Pill
                      key={`format-${f}`}
                      active={format === f}
                      onClick={() => setFormat((cur) => (cur === f ? "" : f))}
                    >
                      {f}
                    </Pill>
                  ))}
                </div>
              </Accordion>

              {/* Active filter badges */}
              {(langs.length > 0 || genres.length > 0 || format) && (
                <div className="rounded-xl border border-gray-200 bg-white p-3">
                  <div className="mb-2 text-xs font-semibold text-gray-500">
                    Active filters
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {langs.map((l) => (
                      <span
                        key={`L-${l}`}
                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                      >
                        {l}
                        <button
                          onClick={() =>
                            setLangs((arr) => arr.filter((x) => x !== l))
                          }
                          className="rounded hover:bg-gray-200 p-0.5"
                        >
                          <XIcon />
                        </button>
                      </span>
                    ))}
                    {genres.map((g) => (
                      <span
                        key={`G-${g}`}
                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                      >
                        {g}
                        <button
                          onClick={() =>
                            setGenres((arr) => arr.filter((x) => x !== g))
                          }
                          className="rounded hover:bg-gray-200 p-0.5"
                        >
                          <XIcon />
                        </button>
                      </span>
                    ))}
                    {format && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                        {format}
                        <button
                          onClick={() => setFormat("")}
                          className="rounded hover:bg-amber-200 p-0.5"
                        >
                          <XIcon />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Browse by Cinemas button */}
              <button
                type="button"
                className="w-full rounded-lg border border-rose-300 bg-white text-rose-600 font-medium py-2.5"
              >
                Browse by Cinemas
              </button>
            </div>
          </aside>

          {/* Right content */}
          <section>
            {/* Coming soon strip */}
            <div className="mb-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
              <span className="opacity-80">Coming Soon</span>
              <button className="text-rose-600 hover:underline text-sm flex items-center gap-1">
                Explore Upcoming Movies
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            {/* Movies grid */}
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
                No movies match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
                  >
                    {/* ✅ Use Link so it navigates to /movies/:id without full reload */}
                    <Link
                      to={`/movies/${m.id}`}
                      aria-label={`Open ${m.title}`}
                      className="absolute inset-0 z-10"
                    />
                    <div className="pointer-events-none">
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={m.poster}
                          alt={m.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold leading-tight text-gray-900">
                          {m.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-600">
                          <span>{m.year}</span>
                          <span>{m.runtime}m</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {(m.genres || []).slice(0, 3).map((g) => (
                            <span
                              key={`${m.id}-${g}`}
                              className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px]"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// src/pages/Theatres.jsx
import React, { useMemo, useState } from "react";
import { MapPin, Clock, Ticket, Film, ScreenShare, Accessibility, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- Static demo data ---------- */
const CITIES = ["Chennai", "Coimbatore", "Madurai", "Trichy"];
const FORMATS = ["2D", "3D", "IMAX", "4DX", "Dolby Atmos"];

const THEATRES = [
  {
    id: "ya-cen-velachery",
    name: "YaBookIt Cinemas – Velachery",
    city: "Chennai",
    address: "Phoenix Marketcity, Velachery, Chennai",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&h=700&fit=crop",
    amenities: ["Dolby Atmos", "Recliners", "Snacks", "Wheelchair"],
    formats: ["2D", "3D", "Dolby Atmos"],
    screens: [
      {
        name: "Screen 1",
        note: "Dolby Atmos",
        shows: [
          { movie: "OPPENHEIMER", lang: "English", format: "2D", times: ["10:30 AM", "2:15 PM", "6:00 PM", "9:45 PM"] },
          { movie: "DUNE: PART TWO", lang: "English", format: "3D", times: ["11:15 AM", "3:00 PM", "6:45 PM"] },
        ],
      },
      {
        name: "Screen 2",
        note: "3D Compatible",
        shows: [
          { movie: "BLACK WIDOW", lang: "English", format: "3D", times: ["12:00 PM", "4:00 PM", "8:10 PM"] },
        ],
      },
    ],
  },
  {
    id: "ya-cen-omr",
    name: "YaBookIt Cinemas – OMR",
    city: "Chennai",
    address: "Marina Mall, OMR (ECR Link Road)",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1400&h=700&fit=crop",
    amenities: ["IMAX", "Laser Projection", "Premium Seats", "Snacks"],
    formats: ["2D", "IMAX", "4DX"],
    screens: [
      {
        name: "IMAX",
        note: "Laser Projection",
        shows: [
          { movie: "OPPENHEIMER", lang: "English", format: "IMAX", times: ["10:00 AM", "1:30 PM", "5:10 PM", "9:00 PM"] },
        ],
      },
      {
        name: "4DX",
        note: "Motion Seats",
        shows: [
          { movie: "DUNE: PART TWO", lang: "English", format: "4DX", times: ["11:45 AM", "3:20 PM", "7:05 PM"] },
        ],
      },
    ],
  },
  {
    id: "ya-cen-gandhipuram",
    name: "YaBookIt Cinemas – Gandhipuram",
    city: "Coimbatore",
    address: "Cross Cut Road, Gandhipuram",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=700&fit=crop",
    amenities: ["Dolby Atmos", "Parking", "Snacks"],
    formats: ["2D", "3D", "Dolby Atmos"],
    screens: [
      {
        name: "Screen A",
        note: "Dolby Atmos",
        shows: [
          { movie: "BLACK WIDOW", lang: "English", format: "2D", times: ["9:50 AM", "1:20 PM", "4:50 PM", "8:30 PM"] },
        ],
      },
    ],
  },
];

/* ---------- Small UI helpers ---------- */
const chip = "px-3 py-1 rounded-full text-xs font-semibold border";

function Badge({ children }) {
  return <span className="px-2.5 py-1 rounded-full text-[11px] bg-black/40 border border-white/15">{children}</span>;
}
function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        chip +
        " " +
        (active
          ? "bg-yellow-500 text-black border-yellow-500"
          : "bg-white/5 text-white/90 border-white/10 hover:bg-white/10")
      }
    >
      {children}
    </button>
  );
}

/* ---------- Theatre Card ---------- */
function TheatreCard({ t }) {
  const [open, setOpen] = useState(true);

  return (
    <article className="rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F1E]/70 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]">
      {/* Banner */}
      <div className="relative h-40 sm:h-52">
        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold">{t.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-white/75">
              <MapPin className="w-4 h-4" />
              {t.address}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {t.amenities.slice(0, 3).map((a) => (
              <Badge key={a}>{a}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Formats + Toggle */}
      <div className="px-4 sm:px-6 py-4 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs mr-1 text-white/50">Formats:</span>
            {t.formats.map((f) => (
              <span key={f} className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 border border-white/10">
                {f}
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
            {open ? "Hide Showtimes" : "View Showtimes"}
          </button>
        </div>
      </div>

      {/* Screens & showtimes */}
      {open && (
        <div className="px-4 sm:px-6 pb-5 space-y-5">
          {t.screens.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ScreenShare className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-white/60">{s.note}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Accessibility className="w-4 h-4" />
                  Accessible
                </div>
              </div>

              {s.shows.map((sh, k) => (
                <div key={k} className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Film className="w-4 h-4 text-yellow-400" />
                      <div className="font-medium">
                        {sh.movie} <span className="text-white/60">• {sh.lang} • {sh.format}</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
                      <Clock className="w-4 h-4" /> Today
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sh.times.map((t) => (
                      <Link
                        key={t}
                        to="/MovieDetailsBooking"
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/10 border border-white/15 hover:bg-white/20"
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

/* ---------- Page ---------- */
export default function Theatres() {
  const [city, setCity] = useState("Chennai");
  const [format, setFormat] = useState("All");

  const filtered = useMemo(() => {
    return THEATRES.filter(
      (t) => t.city === city && (format === "All" || t.formats.includes(format))
    );
  }, [city, format]);

  return (
    <main className="pt-20 sm:pt-24">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-3 rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F1E]/90 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]">
            <div className="relative h-[260px] sm:h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?w=1600&h=800&fit=crop"
                alt="Find a theatre"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              <div className="absolute left-6 right-6 bottom-6">
                <div className="max-w-3xl">
                  <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                    FIND A THEATRE
                  </span>
                  <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-tight">Book by Theatre</h1>
                  <p className="mt-2 text-white/80">
                    Pick your city and preferred format. Browse showtimes by screen and book instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="px-4 sm:px-6 py-5 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                {/* City */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent text-sm outline-none"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0B0F1E]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Formats */}
                <div className="flex flex-wrap items-center gap-2">
                  <Pill active={format === "All"} onClick={() => setFormat("All")}>All</Pill>
                  {FORMATS.map((f) => (
                    <Pill key={f} active={format === f} onClick={() => setFormat(f)}>{f}</Pill>
                  ))}
                </div>

                {/* Dummy actions */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden sm:inline text-xs text-white/60">Secure checkout</span>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Listing */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            {filtered.length ? (
              filtered.map((t) => <TheatreCard key={t.id} t={t} />)
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
                No theatres match your filters.
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="my-10 grid place-items-center">
            <Link
              to="/MovieDetails"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-3 font-bold text-black hover:bg-yellow-400"
            >
              <Ticket className="w-4 h-4" /> Browse Movies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

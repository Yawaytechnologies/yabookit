import React, { useState } from "react";
import { Link } from "react-router-dom";

const MOVIES = [
  { id: "dune-2", title: "Dune: Part Two" },
  { id: "oppenheimer", title: "Oppenheimer" },
  { id: "interstellar", title: "Interstellar" },
];

export default function BookingPanelSimple() {
  const [city, setCity] = useState("Chennai");
  const [movie, setMovie] = useState(MOVIES[0].id);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [lang, setLang] = useState("English");
  const [format, setFormat] = useState("2D");

  const quickTimes = ["10:15 AM", "01:30 PM", "04:45 PM", "07:15 PM", "10:30 PM"];
  const cities = ["Chennai", "Bengaluru", "Hyderabad", "Mumbai"];

  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/80 p-6 md:p-7 text-white">
      <h2 className="text-xl font-semibold">Book your show</h2>
      <p className="mt-1 text-sm text-white/70">Clean, minimal booking panel.</p>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">City</label>
            <select
              aria-label="Select city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-gray-900">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Date</label>
            <input
              aria-label="Select date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/60 mb-1">Movie</label>
          <select
            aria-label="Select movie"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
          >
            {MOVIES.map((m) => (
              <option key={m.id} value={m.id} className="bg-gray-900">
                {m.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">Language</label>
            <select
              aria-label="Select language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            >
              {["English", "Tamil", "Hindi"].map((l) => (
                <option key={l} value={l} className="bg-gray-900">{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1">Format</label>
            <select
              aria-label="Select format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
            >
              {["2D", "IMAX 2D", "3D"].map((f) => (
                <option key={f} value={f} className="bg-gray-900">{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
          <div className="text-[11px] text-white/60 mb-2">Quick picks</div>
          <div className="flex flex-wrap gap-2">
            {quickTimes.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="text-xs text-white/60">
            {city} • {lang} • {format}
          </div>
          <Link
            to={`/movie/${movie}`}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-300"
          >
            Find shows
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../data/movies";


const minsToHM = (mins = 0) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

/* ---------- tiny inline icons ---------- */
const IconChevronDown = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
  </svg>
);
const IconDot = ({ className = "bg-emerald-400" }) => (
  <span className={`inline-block w-2 h-2 rounded-full ${className}`} />
);

/* ---------- helpers ---------- */
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function makeNextDays(count = 7) {
  const out = [];
  const now = new Date();
  for (let i = 0; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      key: d.toISOString().slice(0,10),
      week: DAYS[d.getDay()],
      date: pad(d.getDate()),
      mon: MONTHS[d.getMonth()],
      full: d,
    });
  }
  return out;
}
function toMin(s) {
  const [time, ampm] = s.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (ampm?.toUpperCase() === "PM" && h !== 12) h += 12;
  if (ampm?.toUpperCase() === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

/* ---------- sample data (extended) ---------- */
const SAMPLE = [
  {
    id: "kc",
    logoBg: "bg-amber-200",
    name: "KC(KrishnaveniCinemas) RG3 LASER DOLBYATMOS TNAGAR",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Telugu - 2D"],
    shows: [
      { t: "10:00 AM", price: 160, format: "DOLBY ATMOS", fast: false },
      { t: "03:45 PM", price: 230, format: "DOLBY ATMOS", fast: false },
      { t: "10:45 PM", price: 180, format: "DOLBY ATMOS", fast: true },
    ],
    note: "Non-cancellable",
  },
  {
    id: "vpm",
    logoBg: "bg-yellow-300",
    name: "The Vijay Park Multiplex: Injambakkam ECR 4K Atmos",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Hindi - 2D"],
    shows: [
      { t: "11:30 AM", price: 320, format: "4K DOLBY ATMOS", fast: false },
      { t: "03:15 PM", price: 340, format: "4K DOLBY ATMOS", fast: false },
      { t: "07:10 PM", price: 360, format: "4K DOLBY ATMOS", fast: true },
      { t: "10:30 PM", price: 320, format: "4K DOLBY ATMOS", fast: false },
    ],
    note: "Cancellation available",
  },
  {
    id: "rohini",
    logoBg: "bg-pink-300",
    name: "Rohini Silver Screens: Koyambedu",
    badges: ["LAN"],
    languages: ["Tamil - 2D"],
    shows: [
      { t: "11:00 AM", price: 120, format: "2K/DOLBY 7.1", fast: false },
      { t: "11:45 AM", price: 150, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:15 PM", price: 190, format: "RGB ATMOS", fast: true },
      { t: "01:50 PM", price: 210, format: "2K/DOLBY 7.1", fast: false },
      { t: "04:40 PM", price: 280, format: "2K/DOLBY 7.1", fast: false },
      { t: "05:30 PM", price: 340, format: "4K ATMOS", fast: true },
      { t: "08:30 PM", price: 360, format: "4K ATMOS", fast: false },
      { t: "10:30 PM", price: 200, format: "2K/DOLBY 7.1", fast: false },
      { t: "11:45 PM", price: 220, format: "4K ATMOS", fast: false },
    ],
    note: "Non-cancellable",
  },

  /* ---- Added theatres below ---- */

  {
    id: "sathyam",
    logoBg: "bg-blue-300",
    name: "Sathyam Cinemas: Royapettah",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Hindi - 2D"],
    shows: [
      { t: "09:45 AM", price: 280, format: "DOLBY ATMOS", fast: false },
      { t: "12:30 PM", price: 320, format: "4K ATMOS", fast: true },
      { t: "03:45 PM", price: 320, format: "4K ATMOS", fast: false },
      { t: "07:00 PM", price: 360, format: "4K DOLBY ATMOS", fast: true },
      { t: "10:15 PM", price: 300, format: "DOLBY ATMOS", fast: false },
    ],
    note: "Cancellation available",
  },
  {
    id: "luxe",
    logoBg: "bg-purple-300",
    name: "Jazz Cinemas: Luxe, Phoenix Marketcity",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Telugu - 2D"],
    shows: [
      { t: "10:20 AM", price: 300, format: "4K ATMOS", fast: false },
      { t: "01:30 PM", price: 340, format: "4K DOLBY ATMOS", fast: true },
      { t: "04:45 PM", price: 340, format: "4K DOLBY ATMOS", fast: false },
      { t: "08:10 PM", price: 360, format: "4K ATMOS", fast: true },
      { t: "11:20 PM", price: 320, format: "DOLBY ATMOS", fast: false },
    ],
    note: "Mall parking charges apply",
  },
  {
    id: "pvr_ampa",
    logoBg: "bg-green-300",
    name: "PVR: Ampa Skywalk, Aminjikarai",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Hindi - 2D", "Telugu - 2D"],
    shows: [
      { t: "10:05 AM", price: 220, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:00 PM", price: 260, format: "DOLBY ATMOS", fast: false },
      { t: "04:15 PM", price: 280, format: "DOLBY ATMOS", fast: true },
      { t: "07:40 PM", price: 300, format: "4K ATMOS", fast: false },
      { t: "10:45 PM", price: 260, format: "DOLBY ATMOS", fast: false },
    ],
    note: "Food combos available",
  },
  {
    id: "ags_navalur",
    logoBg: "bg-teal-300",
    name: "AGS Cinemas: Navalur",
    badges: ["LAN"],
    languages: ["Tamil - 2D"],
    shows: [
      { t: "09:50 AM", price: 180, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:10 PM", price: 220, format: "DOLBY ATMOS", fast: false },
      { t: "04:30 PM", price: 240, format: "DOLBY ATMOS", fast: true },
      { t: "07:45 PM", price: 260, format: "4K ATMOS", fast: false },
      { t: "11:00 PM", price: 220, format: "2K/DOLBY 7.1", fast: false },
    ],
    note: "Free parking on weekdays",
  },
  {
    id: "ags_villivakkam",
    logoBg: "bg-lime-300",
    name: "AGS Cinemas: Villivakkam",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Telugu - 2D"],
    shows: [
      { t: "10:10 AM", price: 160, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:25 PM", price: 210, format: "DOLBY ATMOS", fast: false },
      { t: "04:35 PM", price: 230, format: "DOLBY ATMOS", fast: true },
      { t: "08:00 PM", price: 250, format: "4K ATMOS", fast: false },
      { t: "11:15 PM", price: 210, format: "2K/DOLBY 7.1", fast: false },
    ],
    note: "Non-cancellable",
  },
  {
    id: "palazzo",
    logoBg: "bg-rose-300",
    name: "SPI Palazzo: Forum Vijaya Mall, Vadapalani",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Hindi - 2D"],
    shows: [
      { t: "09:40 AM", price: 260, format: "DOLBY ATMOS", fast: false },
      { t: "12:55 PM", price: 300, format: "4K ATMOS", fast: true },
      { t: "04:10 PM", price: 300, format: "4K ATMOS", fast: false },
      { t: "07:20 PM", price: 320, format: "4K DOLBY ATMOS", fast: true },
      { t: "10:35 PM", price: 280, format: "DOLBY ATMOS", fast: false },
    ],
    note: "Mall access via Gate 3",
  },
  {
    id: "inox_national",
    logoBg: "bg-cyan-300",
    name: "INOX National: Arcot Road",
    badges: ["LAN"],
    languages: ["Tamil - 2D"],
    shows: [
      { t: "10:25 AM", price: 180, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:20 PM", price: 220, format: "DOLBY ATMOS", fast: false },
      { t: "04:05 PM", price: 240, format: "DOLBY ATMOS", fast: true },
      { t: "06:55 PM", price: 260, format: "4K ATMOS", fast: false },
      { t: "09:45 PM", price: 240, format: "DOLBY ATMOS", fast: false },
    ],
    note: "Cancellation available",
  },
  {
    id: "vettri",
    logoBg: "bg-orange-300",
    name: "Vettri Theatres: Chromepet",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Telugu - 2D"],
    shows: [
      { t: "09:30 AM", price: 140, format: "2K/DOLBY 7.1", fast: false },
      { t: "12:45 PM", price: 170, format: "2K/DOLBY 7.1", fast: false },
      { t: "04:00 PM", price: 200, format: "DOLBY ATMOS", fast: true },
      { t: "07:10 PM", price: 220, format: "DOLBY ATMOS", fast: false },
      { t: "10:20 PM", price: 180, format: "2K/DOLBY 7.1", fast: false },
    ],
    note: "Wheelchair accessible",
  },
  {
    id: "kamala",
    logoBg: "bg-red-300",
    name: "Kamala Cinemas: Vadapalani",
    badges: ["LAN"],
    languages: ["Tamil - 2D"],
    shows: [
      { t: "10:00 AM", price: 150, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:10 PM", price: 190, format: "DOLBY ATMOS", fast: false },
      { t: "04:20 PM", price: 210, format: "DOLBY ATMOS", fast: true },
      { t: "07:35 PM", price: 230, format: "4K ATMOS", fast: false },
      { t: "10:50 PM", price: 200, format: "2K/DOLBY 7.1", fast: false },
    ],
    note: "Non-cancellable",
  },
  {
    id: "pvr_heritage",
    logoBg: "bg-emerald-300",
    name: "PVR: Heritage RSL ECR, Chennai",
    badges: ["LAN"],
    languages: ["Tamil - 2D"],
    shows: [
      { t: "12:10 PM", price: 240, format: "DOLBY ATMOS", fast: false },
      { t: "03:30 PM", price: 260, format: "DOLBY ATMOS", fast: false },
      { t: "06:40 PM", price: 300, format: "4K ATMOS", fast: true },
      { t: "10:30 PM", price: 260, format: "DOLBY ATMOS", fast: false },
      { t: "10:50 PM", price: 260, format: "DOLBY ATMOS", fast: false },
    ],
    note: "Best seller shows highlighted",
  },
  {
    id: "devi",
    logoBg: "bg-indigo-300",
    name: "Devi Cineplex: Anna Salai",
    badges: ["LAN"],
    languages: ["Tamil - 2D", "Hindi - 2D"],
    shows: [
      { t: "10:15 AM", price: 190, format: "2K/DOLBY 7.1", fast: false },
      { t: "01:25 PM", price: 230, format: "DOLBY ATMOS", fast: false },
      { t: "04:35 PM", price: 260, format: "DOLBY ATMOS", fast: true },
      { t: "07:50 PM", price: 290, format: "4K ATMOS", fast: false },
      { t: "11:05 PM", price: 230, format: "2K/DOLBY 7.1", fast: false },
    ],
    note: "Historic single screen",
  },
];


/* ---------- small UI bits (filters) ---------- */
function FilterChip({ active, children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3.5 h-9 rounded-full text-sm border transition " +
        (active
          ? "bg-rose-600/90 text-white border-rose-500 shadow-[0_8px_30px_-10px_rgba(244,63,94,.7)]"
          : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10") +
        " " + className
      }
    >
      {children}
    </button>
  );
}

function DayPill({ d, active, onClick }) {
  return (
    <button
      onClick={() => onClick?.(d)}
      className={
        "min-w-[80px] px-3 py-2 rounded-lg border text-center transition relative overflow-hidden " +
        (active
          ? "bg-rose-600 text-white border-rose-500 shadow-[0_10px_30px_-10px_rgba(244,63,94,.8)]"
          : "bg-white/5 border-white/10 hover:bg-white/10 text-white/90")
      }
    >
      {/* shine on active */}
      {active && <span className="shine absolute inset-0 pointer-events-none" />}
      <div className={`text-xs ${active ? "text-white/90" : "text-white/70"}`}>{d.week}</div>
      <div className={`text-lg font-semibold leading-none ${active ? "text-white" : "text-white"}`}>{d.date}</div>
      <div className={`text-[10px] tracking-wide ${active ? "text-rose-100" : "text-white/60"}`}>{d.mon}</div>
    </button>
  );
}
function TimeBtn({ t, fast, onClick }) {
  const tone = fast
    ? "border-amber-400 text-amber-300 hover:bg-amber-400/10"
    : "border-emerald-400 text-emerald-300 hover:bg-emerald-400/10";
  return (
    <button
      onClick={onClick}
      className={`w-full h-[44px] rounded-md border bg-transparent text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/20 relative overflow-hidden btn-shine ${tone}`}
    >
      {t}
    </button>
  );
}

/* ---------- filters ---------- */
const PRICE_BUCKETS = [
  { key: "any", label: "Any price", range: [0, Infinity] },
  { key: "0-150", label: "₹0–150", range: [0, 150] },
  { key: "151-250", label: "₹151–250", range: [151, 250] },
  { key: "251-400", label: "₹251–400", range: [251, 400] },
  { key: "401+", label: "₹401+", range: [401, Infinity] },
];
const FORMATS = ["Any format","4K DOLBY ATMOS","4K ATMOS","DOLBY ATMOS","2K/DOLBY 7.1","RGB ATMOS"];
const TIME_BUCKETS = [
  { key: "any", label: "Any time", range: [0, 24 * 60] },
  { key: "morning", label: "Morning (6–12)", range: [6 * 60, 12 * 60] },
  { key: "afternoon", label: "Afternoon (12–16)", range: [12 * 60, 16 * 60] },
  { key: "evening", label: "Evening (16–20)", range: [16 * 60, 20 * 60] },
  { key: "night", label: "Night (20–24)", range: [20 * 60, 24 * 60] },
];

/* ---------- page ---------- */
export default function ShowtimesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const days = useMemo(() => makeNextDays(7), []);
  const [selectedDay, setSelectedDay] = useState(days[0].key);
  const [langTab, setLangTab] = useState("Tamil - 2D");

  // working filters
  const [priceKey, setPriceKey] = useState("any");
  const [format, setFormat] = useState("Any format");
  const [timeKey, setTimeKey] = useState("any");
  const [query, setQuery] = useState("");

  const [minP, maxP] = PRICE_BUCKETS.find((b) => b.key === priceKey)?.range || [0, Infinity];
  const [minT, maxT] = TIME_BUCKETS.find((t) => t.key === timeKey)?.range || [0, 24 * 60];

  // filtered theatres + shows (unchanged logic)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE
      .filter((th) => th.languages?.includes(langTab))
      .map((th) => {
        const theatreMatch = q ? th.name.toLowerCase().includes(q) : true;
        const showMatches = th.shows.some(
          (s) => s.t.toLowerCase().includes(q) || (s.format || "").toLowerCase().includes(q)
        );
        const passesSearch = q ? theatreMatch || showMatches : true;

        const shows = th.shows.filter((s) => {
          const m = toMin(s.t);
          const priceOk = s.price >= minP && s.price <= maxP;
          const timeOk = m >= minT && m < maxT;
          const fmtOk = format === "Any format" ? true : (s.format || "").toUpperCase().includes(format.toUpperCase());
          const searchOk = q ? (s.t.toLowerCase().includes(q) || (s.format || "").toLowerCase().includes(q)) : true;
          return priceOk && timeOk && fmtOk && (theatreMatch || searchOk);
        });

        return passesSearch ? { ...th, shows } : { ...th, shows: [] };
      })
      .filter((th) => th.shows.length > 0);
  }, [langTab, query, minP, maxP, minT, maxT, format]);

  const legend = (
    <div className="hidden md:flex items-center gap-4 text-xs text-white/70">
      <span className="inline-flex items-center gap-1">
        <IconDot className="bg-emerald-400" /> AVAILABLE
      </span>
      <span className="inline-flex items-center gap-1">
        <IconDot className="bg-amber-400" /> FAST FILLING
      </span>
    </div>
  );

  return (
    <main className="bg-[#121317] min-h-screen text-white pt-5">
      {/* Local keyframes/styles for shine & fade-in */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .btn-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.15) 45%, rgba(255,255,255,.25) 50%, rgba(255,255,255,.15) 55%, transparent 100%);
          transform: translateX(-120%);
          transition: transform .6s ease;
        }
        .btn-shine:hover::after { animation: shine .9s forwards; }
        .shine {
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.12) 50%, transparent 100%);
          animation: shine 1.2s linear 1;
        }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Page header (dynamic) */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
  {(() => {
    const m = getMovieById(id); // id from useParams()

    if (!m) return <h1 className="text-3xl font-semibold">Movie</h1>;

    const primaryLang = m.languages?.[0];
    const cert = m.certification || "UA16+";

    return (
      <>
        <h1 className="text-3xl font-semibold">
          {m.title}
          {primaryLang ? ` - (${primaryLang})` : ""}
        </h1>

        <div className="flex flex-wrap gap-2 mt-3">
          {/* runtime / certification */}
          <Chip>Movie runtime: {minsToHM(m.runtime || 0)}</Chip>
          <Chip>{cert}</Chip>

          {/* formats (e.g., 2D, IMAX 2D) */}
          {(m.formats || []).map((f) => (
            <Chip key={`fmt-${f}`}>{f}</Chip>
          ))}

          {/* genres */}
          {(m.genres || []).map((g) => (
            <Chip key={`gen-${g}`}>{g}</Chip>
          ))}
        </div>
      </>
    );
  })()}
</div>


      {/* Sticky filters bar (dark glass) */}
      <div className="border-y border-white/10 mt-5 bg-[#0c0f17]/80 backdrop-blur sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          {/* date strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {days.map((d) => (
              <DayPill
                key={d.key}
                d={d}
                active={selectedDay === d.key}
                onClick={(x) => setSelectedDay(x.key)}
              />
            ))}
          </div>

          {/* tabs + filters */}
          <div className="mt-3 grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12 md:col-span-4">
              <div className="inline-flex rounded-lg overflow-hidden border border-rose-600 shadow-[0_8px_30px_-10px_rgba(244,63,94,.5)]">
                {["Tamil - 2D", "Hindi - 2D", "Telugu - 2D"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setLangTab(t)}
                    className={
                      "px-4 py-2 text-sm transition " +
                      (langTab === t
                        ? "bg-rose-600 text-white"
                        : "bg-white/5 text-white/80 hover:bg-white/10")
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-12 md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {/* Price */}
                <label className="relative">
                  <select
                    value={priceKey}
                    onChange={(e) => setPriceKey(e.target.value)}
                    className="w-full appearance-none px-3.5 h-9 rounded-lg bg-white/5 border border-white/10 text-sm text-white/90 hover:bg-white/10 pr-8"
                  >
                    {PRICE_BUCKETS.map((b) => (
                      <option key={b.key} value={b.key} className="bg-[#121317]">
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
                </label>

                {/* Format */}
                <label className="relative">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full appearance-none px-3.5 h-9 rounded-lg bg-white/5 border border-white/10 text-sm text-white/90 hover:bg-white/10 pr-8"
                  >
                    {FORMATS.map((f) => (
                      <option key={f} value={f} className="bg-[#121317]">
                        {f}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
                </label>

                {/* Time */}
                <label className="relative">
                  <select
                    value={timeKey}
                    onChange={(e) => setTimeKey(e.target.value)}
                    className="w-full appearance-none px-3.5 h-9 rounded-lg bg:white/5 bg-white/5 border border-white/10 text-sm text-white/90 hover:bg-white/10 pr-8"
                  >
                    {TIME_BUCKETS.map((t) => (
                      <option key={t.key} value={t.key} className="bg-[#121317]">
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" />
                </label>

                {/* Search */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2">
                  <IconSearch className="text-white/70" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search theatre, time, or format…"
                    className="w-full h-8 outline-none text-sm placeholder:text-white/50 bg-transparent text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* legend */}
          <div className="mt-2">{legend}</div>
        </div>
      </div>

      

      {/* theatre list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-white/70">
            No showtimes match your filters.
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((th, idx) => (
              <div
                key={th.id}
                className="bg-white/5 rounded-xl border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,.8)] overflow-hidden"
                style={{ animation: "fadeup .35s ease-out both" }}
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* logo */}
                  <div className={`h-12 w-12 rounded-full ${th.logoBg} grid place-items-center text-gray-800 font-semibold shrink-0`}>
                    {th.name.split(" ").slice(0,1)[0].slice(0,2).toUpperCase()}
                  </div>

                  {/* theatre + shows */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-medium text-white">{th.name}</h4>
                      {th.badges?.map((b) => (
                        <span key={b} className="px-1.5 py-0.5 border border-white/10 bg-white/5 rounded text-[10px] text-white/80">{b}</span>
                      ))}
                    </div>

                    {/* times */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-6">
                      {th.shows.map((s, i) => (
                        <div key={i} className="w-[124px] flex flex-col items-center">
                          <TimeBtn
                            t={s.t}
                            fast={s.fast}
                            onClick={() => {
                              navigate(`/movie/${id}/seats?th=${th.id}&time=${encodeURIComponent(s.t)}`);
                            }}
                          />
                          <div className="mt-1 text-center leading-tight">
                            <div className="text-[10px] text-white/70">{s.format}</div>
                            <div className="text-[10px] text-white/60">₹{s.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* note */}
                    <div className="text-xs text-white/60 mt-3">{th.note}</div>
                  </div>
                </div>

                {idx < filtered.length - 1 && <div className="h-px bg-white/10" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

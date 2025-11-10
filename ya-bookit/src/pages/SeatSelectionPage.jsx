// src/pages/SeatSelectionPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getMovieById } from "../data/movies";

/* ------------------ tiny inline icons ------------------ */
const IconTicket = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M3 9a3 3 0 1 0 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 1 0 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
    <path d="M13 5v14" />
  </svg>
);
const IconWheel = (p) => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <circle cx="9" cy="19" r="2" />
    <path d="M9 17V9a4 4 0 0 1 8 0v3h2" />
    <path d="M14 19h6" />
  </svg>
);

/* ------------------ helpers ------------------ */
const DATE_FMT = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "2-digit",
  month: "long",
  year: "numeric",
});
function seatKey(row, num) {
  const n = String(num).padStart(2, "0");
  return `${row}-${n}`;
}
function charSeq(startChar, count) {
  const start = startChar.charCodeAt(0);
  return Array.from({ length: count }, (_, i) => String.fromCharCode(start - i)); // L,K,J,...
}

// small helper + chip
const minsToHM = (mins = 0) => `${Math.floor(mins / 60)}h ${mins % 60}m`;
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

/* ------------------ sample theatre/time data ------------------ */
const TIMES = [
  "12:10 PM",
  "03:30 PM",
  "04:00 PM",
  "04:20 PM",
  "06:40 PM",
  "06:50 PM",
  "07:10 PM",
  "10:10 PM",
  "10:30 PM",
  "10:50 PM",
];

const THEATRE_LOOKUP = {
  pvr_heritage: {
    id: "pvr_heritage",
    name: "PVR: Heritage RSL ECR, Chennai",
    sections: [
      { code: "PRIME", price: 183.8, startRow: "L", rows: 8, colsPerSide: 9, aisle: 2 },
      { code: "CLASSIC", price: 54.35, startRow: "D", rows: 4, colsPerSide: 7, aisle: 2 },
    ],
    sold: new Set([
      "L-01",
      "L-02",
      "L-03",
      "L-04",
      "K-05",
      "K-06",
      "J-10",
      "H-18",
      "G-09",
      "E-05",
      "C-03",
      "B-10",
      "A-11",
      "A-12",
    ]),
    bestseller: new Set([
      "L-13",
      "L-14",
      "L-15",
      "L-16",
      "L-17",
      "L-18",
      "K-13",
      "K-14",
      "K-15",
      "K-16",
      "J-13",
      "J-14",
      "H-13",
      "G-13",
      "F-13",
      "E-13",
      "D-10",
      "D-11",
    ]),
    accessible: new Set(["L-06", "L-07"]),
  },
};

/* ------------------ seat map generator ------------------ */
function statusFromSets(id, { sold, bestseller }) {
  if (sold.has(id)) return "sold";
  if (bestseller.has(id)) return "bestseller";
  return "available";
}
function buildSectionRows({ code, price, startRow, rows, colsPerSide, aisle }, statusSets) {
  const letters = charSeq(startRow, rows); // e.g., L..E
  const totalCols = colsPerSide * 2 + aisle;
  const grid = letters.map((row) => {
    const seats = [];
    for (let i = 1; i <= colsPerSide; i++) {
      const id = seatKey(row, i);
      seats.push({
        id,
        row,
        num: i,
        status: statusFromSets(id, statusSets),
        section: code,
        price,
        accessible: statusSets.accessible.has(id),
      });
    }
    for (let a = 0; a < aisle; a++) seats.push(null); // aisle
    for (let i = 1; i <= colsPerSide; i++) {
      const num = colsPerSide + aisle + i; // keep numbers ascending across aisle
      const id = seatKey(row, num);
      seats.push({
        id,
        row,
        num,
        status: statusFromSets(id, statusSets),
        section: code,
        price,
        accessible: statusSets.accessible.has(id),
      });
    }
    return { row, seats, totalCols };
  });
  return { code, price, rows: grid, totalCols };
}

/* ------------------ small UI bits ------------------ */
function Seat({ seat, isSelected, toggle }) {
  if (!seat) return <div className="w-7 h-7 md:w-8 md:h-8" />; // aisle gap

  const base =
    "relative grid place-items-center text-[10px] md:text-xs rounded-[6px] md:rounded-md w-7 h-7 md:w-8 md:h-8 border transition select-none";

  let cls = "";
  if (seat.status === "sold")
    cls = "bg-white/10 border-white/10 text-white/30 cursor-not-allowed";
  else if (isSelected)
    cls = "bg-emerald-500/90 border-emerald-400 text-black shadow-[0_8px_30px_-10px_rgba(16,185,129,.9)]";
  else if (seat.status === "bestseller")
    cls = "bg-amber-300/50 border-amber-400 text-gray-900 hover:bg-amber-300/60";
  else
    cls =
      "bg-transparent border-emerald-400 text-emerald-300 hover:bg-emerald-400/10";

  return (
    <button
      type="button"
      onClick={() => seat.status !== "sold" && toggle(seat)}
      className={`${base} ${cls}`}
      aria-pressed={isSelected}
      aria-label={`${seat.row}${String(seat.num).padStart(2, "0")} ${seat.section} ₹${seat.price}`}
    >
      {seat.accessible && (
        <span className="absolute -left-2 -top-2 bg-[#121317] rounded-full p-[2px] border border-white/20">
          <IconWheel />
        </span>
      )}
      {String(seat.num).padStart(2, "0")}
    </button>
  );
}
function RowLabel({ text }) {
  return (
    <div className="h-7 md:h-8 grid place-items-center text-xs text-white/50">
      {text}
    </div>
  );
}

/* ------------------ SCREEN indicator ------------------ */
/* ------------------ SCREEN indicator (curved, purple) ------------------ */
function ScreenBar() {
  return (
    <div className="my-6 flex justify-center">
      <div className="relative w-[82%] max-w-[820px] drop-shadow-[0_8px_24px_rgba(124,90,255,.25)]">
        {/* label */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-medium tracking-[0.25em] text-violet-300/80">
          SCREEN
        </div>

        {/* responsive SVG */}
        <svg
          viewBox="0 0 600 90"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full h-auto"
        >
          <defs>
            {/* subtle vertical gradient for the body */}
            <linearGradient id="scrBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"  stopColor="#A78BFA" stopOpacity=".65" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity=".55" />
            </linearGradient>

            {/* glossy stroke for the inner highlight curve */}
            <linearGradient id="scrGloss" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="#C4B5FD" stopOpacity=".55" />
              <stop offset="50%"  stopColor="#E9D5FF" stopOpacity=".75" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity=".55" />
            </linearGradient>
          </defs>

          {/* main trapezoid with slightly curved bottom */}
          <path
            d="
              M 80 18
              L 520 18
              L 570 70
              Q 300 84 30 70
              Z
            "
            fill="url(#scrBody)"
            stroke="#A78BFA"
            strokeOpacity=".8"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* inner glossy curve */}
          <path
            d="M 50 66 Q 300 81 550 66"
            fill="none"
            stroke="url(#scrGloss)"
            strokeWidth="6"
            strokeOpacity=".9"
          />

          {/* faint second reflection just above */}
          <path
            d="M 70 58 Q 300 73 530 58"
            fill="none"
            stroke="#C4B5FD"
            strokeOpacity=".35"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
}


/* ------------------ page ------------------ */
export default function SeatSelectionPage() {
  const { id } = useParams();
  const [params, _setParams] = useSearchParams();
  const _navigate = useNavigate();

  const theatreId = params.get("th") || "pvr_heritage";
  const time = params.get("time") || TIMES[0];
  const theatre = THEATRE_LOOKUP[theatreId] || THEATRE_LOOKUP.pvr_heritage;

  const statusSets = useMemo(
    () => ({
      sold: theatre.sold || new Set(),
      bestseller: theatre.bestseller || new Set(),
      accessible: theatre.accessible || new Set(),
    }),
    [theatre]
  );

  const sections = useMemo(
    () => theatre.sections.map((s) => buildSectionRows(s, statusSets)),
    [theatre, statusSets]
  );

  const [selected, setSelected] = useState([]); // seat ids
  const toggle = (seat) => {
    setSelected((prev) =>
      prev.includes(seat.id) ? prev.filter((x) => x !== seat.id) : [...prev, seat.id]
    );
  };
  const selectedCount = selected.length;

 const _subtitle = `${theatre.name} | ${DATE_FMT.format(new Date())} | ${time}`;

  return (
    <main className="min-h-screen bg-[#121317] text-white pt-5">
      {/* local styles for shine/fade */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.15) 45%, rgba(255,255,255,.25) 50%, rgba(255,255,255,.15) 55%, transparent 100%);
          transform: translateX(-120%);
        }
        .btn-shine:hover::after { animation: shine .9s forwards; }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header (dynamic from movie id) */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2">
  {(() => {
    const movie = getMovieById(id); // id from useParams()
    const lang = movie?.languages?.[0];
    const cert = movie?.certification || "UA16+"; // fallback if you don't store certification

    return (
      <>
        <h1 className="text-3xl font-semibold">
          {movie ? movie.title : "Movie"}{lang ? ` - (${lang})` : ""}
        </h1>

        <div className="flex flex-wrap gap-2 mt-3">
          <Chip>Movie runtime: {minsToHM(movie?.runtime || 0)}</Chip>
          <Chip>{cert}</Chip>

          {/* formats (2D, IMAX, etc.) */}
          {(movie?.formats || []).map((f) => (
            <Chip key={`fmt-${f}`}>{f}</Chip>
          ))}

          {/* genres */}
          {(movie?.genres || []).map((g) => (
            <Chip key={`gen-${g}`}>{g}</Chip>
          ))}
        </div>
      </>
    );
  })()}
</div>


      {/* seat map */}
      <div className="border-t border-white/10 bg-[#0b0f1e] ">
        <div className="max-w-7xl mx-auto">
          <div className="relative px-2 sm:px-6 py-6">
            <div className="overflow-auto flex justify-center">
              <div
                className="min-w-[900px] w-fit mx-auto"
                style={{ animation: "fadeup .35s ease-out both" }}
              >

                {sections.map((sec, si) => (
                  <div key={si} className="mb-10">
                    {/* section header */}
                    <div className="text-center text-xs text-white/70 mb-3">
                      ₹{sec.price.toFixed(2)}{" "}
                      <span className="uppercase tracking-wide font-semibold">
                        {sec.code}
                      </span>
                    </div>

                    {/* rows with side labels */}
                    <div className="grid grid-cols-[24px_1fr_24px] gap-x-3">
                      {/* left rail */}
                      <div className="justify-self-end">
                        {sec.rows.map((r) => (
                          <RowLabel key={r.row} text={r.row} />
                        ))}
                      </div>

                      {/* grid */}
                      <div className="space-y-2">
                        {sec.rows.map((r) => (
                          <div
                            key={r.row}
                            className="grid gap-1"
                            style={{
                              gridTemplateColumns: `repeat(${r.totalCols}, minmax(0, 1fr))`,
                              width: "fit-content",
                            }}
                          >
                            {r.seats.map((s, i) =>
                              s === null ? (
                                <div key={i} className="w-6" />
                              ) : (
                                <Seat
                                  key={s.id}
                                  seat={s}
                                  isSelected={selected.includes(s.id)}
                                  toggle={toggle}
                                />
                              )
                            )}
                          </div>
                        ))}
                      </div>

                      {/* right rail */}
                      <div>
                        {sec.rows.map((r) => (
                          <RowLabel key={r.row} text={r.row} />
                        ))}
                      </div>

                      
                    </div>
                    
                  </div>
                  
                ))}

                {/* SCREEN indicator aligned with grid */}
                <ScreenBar />
              </div>
            </div>

            {/* legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-amber-300/60 border border-amber-400 inline-block" />
                Bestseller
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-transparent border-2 border-emerald-400 inline-block" />
                Available
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-emerald-500 border-emerald-400 inline-block" />
                Selected
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-white/10 border-white/10 inline-block" />
                Sold
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* sticky footer */}
      <div className="sticky bottom-0 bg-[#0c0f17]/90 backdrop-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-white/70">
            {selectedCount > 0
              ? `Selected: ${selected.join(", ")}`
              : "Select your seats"}
          </div>
          <button
            disabled={selectedCount === 0}
            className={
              "px-5 h-10 rounded-lg text-white font-semibold btn-shine " +
              (selectedCount === 0
                ? "bg-white/10 text-white/50 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500")
            }
            onClick={() => {
              // navigate(`/movie/${id}/checkout?th=${theatreId}&time=${encodeURIComponent(time)}&seats=${selected.join(",")}`);
              alert(`Proceeding with ${selectedCount} seat(s): ${selected.join(", ")}`);
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </main>
  );
}

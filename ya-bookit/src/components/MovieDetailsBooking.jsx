import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- THEME ---------- */
const T = {
  bg: "#0f1218",
  card: "rgba(255,255,255,0.045)",
  cardSoft: "rgba(255,255,255,0.06)",
  stroke: "rgba(255,255,255,0.08)",
  text: "rgba(255,255,255,0.92)",
  dim: "rgba(255,255,255,0.66)",
  soft: "rgba(255,255,255,0.42)",
  accent: "#ff4d3e",
  accentGlow: "rgba(255,77,62,0.40)",
  seatIdle: "#212632",
  seatIdleStroke: "#2c3342",
  seatTaken: "#1b1f28",
};

/* ---------- GRID ---------- */
const ROWS = "PONMLKJIHGFEDC".split(""); // top to bottom
const COLS = 30;
const AISLES = new Set([8, 21]); // column indexes that are aisles

const prng = (seed) => {
  let t = seed + 0x6d2b79f5;
  return () =>
    ((t = Math.imul(t ^ (t >>> 15), t | 1)),
    (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
    ((t ^ (t >>> 14)) >>> 0) / 4294967296);
};

const buildGrid = (seed = 777) => {
  const r = prng(seed);
  return ROWS.map((R, ri) => {
    const row = [];
    let n = 1;
    for (let c = 0; c < COLS; c++) {
      if (AISLES.has(c)) {
        row.push({ type: "aisle", key: `A-${c}` });
        continue;
      }
      const id = `${R}${n++}`;
      row.push({
        type: "seat",
        id,
        taken: r() < 0.18 || (ri === 6 && (id.endsWith("15") || id.endsWith("16"))),
        sel: false,
      });
    }
    return row;
  });
};

/* ====== PREMIUM BMS-STYLE TIERS, COUPLES, ACCESSIBLE ====== */
const TIER_FOR_ROW = (ri) => (ri <= 2 ? "PLATINUM" : ri <= 7 ? "GOLD" : "SILVER");
const TIER_PRICE = { PLATINUM: 12, GOLD: 9, SILVER: 6 };
const TIER_BADGE = {
  PLATINUM: { bg: "linear-gradient(135deg,#c0c7d4,#eef1f6)", text: "#0c0f14", ring: "rgba(255,255,255,0.35)" },
  GOLD: { bg: "linear-gradient(135deg,#f4c34f,#ffd36d)", text: "#0c0f14", ring: "rgba(255,211,109,0.3)" },
  SILVER: { bg: "linear-gradient(135deg,#9aa3b2,#c6cfda)", text: "#0c0f14", ring: "rgba(198,207,218,0.25)" },
};
const COUPLE_SEATS = new Set(["H9", "H10", "H17", "H18", "G13", "G14"]);
const ACCESSIBLE_ROWS = new Set(["C", "D"]);

/* ---------- ICONS ---------- */
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const SparklesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    <path d="M19 14L20.18 17.82L24 19L20.18 20.18L19 24L17.82 20.18L14 19L17.82 17.82L19 14Z" />
  </svg>
);

/* tiny ripple used on seat select */
const SeatRipple = () => (
  <motion.span
    className="pointer-events-none absolute inset-0 rounded-lg"
    initial={{ scale: 0.4, opacity: 0.35 }}
    animate={{ scale: 1.35, opacity: 0 }}
    transition={{ duration: 0.55, ease: "easeOut" }}
    style={{ boxShadow: "0 0 0 10px rgba(255,255,255,0.08)" }}
  />
);

export default function CinemaBookingNeo() {
  const [grid, setGrid] = useState(buildGrid());
  const [chosen, setChosen] = useState([]);
  const [activeDay, setActiveDay] = useState(2);
  const [activeTime, setActiveTime] = useState("11:15");
  const [showSeatHelper, setShowSeatHelper] = useState(true);

  /* === align sticky with fixed header height (id="site-header") === */
  useEffect(() => {
    const header = document.getElementById("site-header");
    const set = () =>
      document.documentElement.style.setProperty(
        "--app-header-h",
        `${header ? header.offsetHeight : 0}px`
      );
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const movie = useMemo(
    () => ({
      title: "Assassin's Creed",
      location: "Cinestar Zagreb",
      theater: "eXtreme Screen 11",
      rating: "8.4",
      duration: "2h 35m",
      genre: "Action • Adventure • Sci-Fi",
    }),
    []
  );

  /* week + times */
  const week = useMemo(
    () => [
      { day: 1, dow: "MON", month: "JAN" },
      { day: 2, dow: "TUE", month: "JAN" },
      { day: 3, dow: "WED", month: "JAN" },
      { day: 4, dow: "THU", month: "JAN" },
      { day: 5, dow: "FRI", month: "JAN" },
    ],
    []
  );

  const times = [
    { time: "11:15", format: "3D", available: 48 },
    { time: "12:40", format: "2D", available: 32 },
    { time: "14:10", format: "2D", available: 56 },
    { time: "17:35", format: "3D", available: 41 },
    { time: "18:45", format: "2D", available: 29 },
    { time: "20:35", format: "IMAX", available: 15 },
  ];

  /* toggle seat with tier pricing */
  const toggleSeat = (ri, ci) => {
    const tier = TIER_FOR_ROW(ri);
    const price = TIER_PRICE[tier];
    setGrid((prev) => {
      const next = prev.map((r) => r.slice());
      const cell = next[ri][ci];
      if (!cell || cell.type !== "seat" || cell.taken) return prev;
      cell.sel = !cell.sel;
      setChosen((old) => {
        const has = old.find((x) => x.id === cell.id);
        if (has) return old.filter((x) => x.id !== cell.id);
        return [...old, { id: cell.id, price, tier }];
      });
      return next;
    });
  };

  useEffect(() => {
    if (chosen.length > 0) setShowSeatHelper(false);
  }, [chosen.length]);

  const total = chosen.reduce((a, b) => a + b.price, 0);

  return (
    <div className="min-h-screen relative" style={{ background: T.bg, color: T.text }}>
      {/* subtle animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(1400px 800px at 50% 0%, rgba(255,77,62,0.12), transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.7, 0.5], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm" style={{ color: T.dim }}>
              <MapPinIcon />
              <span>{movie.location}</span>
            </div>
            <h1 className="mt-1 text-3xl lg:text-4xl font-bold tracking-tight">{movie.title}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm" style={{ color: T.soft }}>
              <span className="flex items-center gap-1.5"><span className="text-yellow-500">★</span>{movie.rating}</span>
              <span>•</span><span>{movie.duration}</span>
              <span>•</span><span>{movie.genre}</span>
            </div>
          </div>
          <motion.div
            className="hidden lg:flex items-center gap-2 rounded-2xl px-6 py-3 border"
            style={{ background: T.card, borderColor: T.stroke }}
            whileHover={{ scale: 1.02, boxShadow: `0 0 0 4px ${T.accentGlow}` }}
          >
            <SparklesIcon />
            <div>
              <div className="text-xs" style={{ color: T.soft }}>Showtime</div>
              <div className="text-xl font-bold tabular-nums">{activeTime}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Date & Time Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 rounded-3xl border p-6 lg:p-8"
          style={{ background: T.card, borderColor: T.stroke }}
        >
          {/* Date */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest" style={{ color: T.dim }}>
              <CalendarIcon /> SELECT DATE
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {week.map((d, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className="relative flex-shrink-0 rounded-2xl border px-6 py-4 transition-all"
                  style={{
                    background: i === activeDay ? T.accent : T.cardSoft,
                    borderColor: i === activeDay ? T.accent : T.stroke,
                    color: i === activeDay ? "#fff" : T.text,
                  }}
                  whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xs font-medium opacity-80">{d.month}</div>
                  <div className="text-2xl font-bold">{d.day}</div>
                  <div className="text-xs font-medium opacity-80">{d.dow}</div>
                  {i === activeDay && (
                    <motion.div layoutId="active-day-glow" className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: `0 0 0 3px ${T.accentGlow}` }} />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Times */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest" style={{ color: T.dim }}>
              <ClockIcon /> AVAILABLE SHOWTIMES
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {times.map((t) => (
                <motion.button
                  key={t.time}
                  onClick={() => setActiveTime(t.time)}
                  className="relative overflow-hidden rounded-2xl border p-4 text-left transition-all"
                  style={{ background: t.time === activeTime ? T.accent : T.cardSoft, borderColor: t.time === activeTime ? T.accent : T.stroke }}
                  whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{t.time}</div>
                      <div className="mt-1 text-xs opacity-75">{t.available} seats left</div>
                    </div>
                    <div className="rounded-lg px-2.5 py-1 text-xs font-bold"
                         style={{ background: t.time === activeTime ? "rgba(255,255,255,0.2)" : "rgba(255,77,62,0.15)", color: t.time === activeTime ? "#fff" : T.accent }}>
                      {t.format}
                    </div>
                  </div>
                  {t.time === activeTime && <motion.div layoutId="active-time-bg" className="absolute inset-0" style={{ background: T.accent }} />}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid items-start content-start gap-6 lg:grid-cols-[1fr_400px]">
          {/* Seat Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="self-start rounded-3xl border p-4 md:p-6 lg:p-8"
            style={{ background: T.card, borderColor: T.stroke }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <SparklesIcon />
                  <span className="text-xs font-semibold tracking-widest" style={{ color: T.dim }}>
                    {movie.theater}
                  </span>
                </div>
                <div className="mt-1 text-2xl font-bold">Select Your Seats</div>
              </div>
            </div>

            {/* Screen */}
            <div className="mb-6 md:mb-8">
              <div className="relative mx-auto w-full max-w-3xl">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, #ff4d3e, transparent)", boxShadow: "0 0 30px rgba(255,77,62,0.4)" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="mt-2 text-center text-sm font-medium" style={{ color: T.soft }}>SCREEN</div>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="relative">
              {/* Helper toast (doesn't block clicks) */}
              <AnimatePresence>
                {showSeatHelper && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-6 md:px-8 py-5 md:py-6 text-center"
                    style={{ background: "rgba(15,18,24,0.95)", borderColor: T.accent, boxShadow: `0 0 0 4px ${T.accentGlow}` }}
                  >
                    <div className="text-base md:text-lg font-bold">👆 Tap any seat to select</div>
                    <div className="mt-2 text-xs md:text-sm" style={{ color: T.dim }}>Selected seats will appear in your cart</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auditorium frame with its own clip/scroll zone */}
              <div
                className="mx-auto max-w-4xl rounded-[22px] p-3 md:p-4 lg:p-6 overflow-x-auto overflow-y-visible scrollbar-thin"
                style={{
                  background: "#0a0d12",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.35)",
                  scrollSnapType: "x proximity",
                }}
              >
                {/* tier badges */}
                <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                  {["PLATINUM", "GOLD", "SILVER"].map((t) => (
                    <div
                      key={t}
                      className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow"
                      style={{ background: TIER_BADGE[t].bg, color: TIER_BADGE[t].text, boxShadow: `0 0 0 3px ${TIER_BADGE[t].ring} inset` }}
                    >
                      {t} · ${TIER_PRICE[t]}
                    </div>
                  ))}
                </div>

                {/* rows (stabilized height so overlay never shifts layout) */}
                <div className="relative min-h-[420px] sm:min-h-[480px]">
                  {grid.map((row, ri) => {
                    const rowName = row.find((c) => c?.id)?.id?.[0] ?? ROWS[ri] ?? "";
                    const tier = TIER_FOR_ROW(ri);
                    return (
                      <motion.div
                        key={`row-${ri}`}
                        className="mb-1.5 flex items-center justify-center gap-2 md:gap-3"
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 * ri }}
                      >
                        {/* Left row label */}
                        <div className="w-8 md:w-10 text-center select-none">
                          <div
                            className="mx-auto w-7 md:w-8 rounded-md px-1 py-0.5 text-[10px] md:text-[11px] font-bold"
                            style={{ background: TIER_BADGE[tier].bg, color: TIER_BADGE[tier].text, boxShadow: `0 0 0 2px ${TIER_BADGE[tier].ring} inset` }}
                            title={`${rowName} • ${tier}`}
                          >
                            {rowName}
                          </div>
                          {ACCESSIBLE_ROWS.has(rowName) && <div className="mt-0.5 text-[10px]" title="Accessible Row">♿</div>}
                        </div>

                        {/* Left bank (cols 0..7) */}
                        <div className="flex items-center gap-1 md:gap-1.5">
                          {row.slice(0, 8).map((cell, ci) => {
                            if (cell.type === "aisle") return null;
                            const isSel = cell.sel, isTaken = cell.taken, couple = COUPLE_SEATS.has(cell.id);
                            return (
                              <motion.button
                                key={cell.id}
                                onClick={() => toggleSeat(ri, ci)}
                                disabled={isTaken}
                                title={`${cell.id} • ${tier} • $${TIER_PRICE[tier]}`}
                                className="group relative h-6 w-6 md:h-7 md:w-7 rounded-[10px] transition-all"
                                style={{
                                  background: isTaken ? T.seatTaken : isSel ? T.accent : T.seatIdle,
                                  border: `1px solid ${isSel ? T.accent : T.seatIdleStroke}`,
                                  cursor: isTaken ? "not-allowed" : "pointer",
                                  opacity: isTaken ? 0.45 : 1,
                                  boxShadow: isSel ? `0 0 0 3px ${T.accentGlow}` : "none",
                                }}
                                whileHover={!isTaken ? { scale: 1.12, y: -2 } : {}}
                                whileTap={!isTaken ? { scale: 0.96 } : {}}
                              >
                                {couple && !isTaken && (
                                  <span className="absolute -right-1 top-1/2 h-[2px] w-2 -translate-y-1/2 opacity-60"
                                        style={{ background: isSel ? "#fff" : "rgba(255,255,255,0.35)" }} />
                                )}
                                {!isTaken && !isSel && (
                                  <motion.span className="absolute inset-0 rounded-[10px]" initial={{ opacity: 0 }}
                                               whileHover={{ opacity: 0.14 }} transition={{ duration: 0.18 }}
                                               style={{ boxShadow: "0 0 0 8px rgba(255,255,255,0.06)" }} />
                                )}
                                {isSel && <SeatRipple />}
                                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold opacity-0 transition group-hover:opacity-100"
                                      style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${T.stroke}` }}>
                                  {cell.id} · {tier} · ${TIER_PRICE[tier]}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Aisle 1 */}
                        <div className="w-5 md:w-6 lg:w-8 flex-shrink-0">
                          <div className="mx-auto h-8 md:h-9 lg:h-10 w-[2px] rounded-full opacity-30"
                               style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.35), transparent)" }} />
                          <div className="mt-1 text-[9px] text-center uppercase tracking-wider" style={{ color: T.soft }}>Aisle</div>
                        </div>

                        {/* Middle bank (skip index 8 aisle): 9..20 */}
                        <div className="flex items-center gap-1 md:gap-1.5">
                          {row.slice(9, 21).map((cell, ci) => {
                            if (cell.type === "aisle") return null;
                            const isSel = cell.sel, isTaken = cell.taken, couple = COUPLE_SEATS.has(cell.id);
                            return (
                              <motion.button
                                key={cell.id}
                                onClick={() => toggleSeat(ri, ci + 9)}
                                disabled={isTaken}
                                title={`${cell.id} • ${tier} • $${TIER_PRICE[tier]}`}
                                className="group relative h-6 w-6 md:h-7 md:w-7 rounded-[10px] transition-all"
                                style={{
                                  background: isTaken ? T.seatTaken : isSel ? T.accent : T.seatIdle,
                                  border: `1px solid ${isSel ? T.accent : T.seatIdleStroke}`,
                                  cursor: isTaken ? "not-allowed" : "pointer",
                                  opacity: isTaken ? 0.45 : 1,
                                  boxShadow: isSel ? `0 0 0 3px ${T.accentGlow}` : "none",
                                }}
                                whileHover={!isTaken ? { scale: 1.12, y: -2 } : {}}
                                whileTap={!isTaken ? { scale: 0.96 } : {}}
                              >
                                {couple && !isTaken && (
                                  <span className="absolute -right-1 top-1/2 h-[2px] w-2 -translate-y-1/2 opacity-60"
                                        style={{ background: isSel ? "#fff" : "rgba(255,255,255,0.35)" }} />
                                )}
                                {!isTaken && !isSel && (
                                  <motion.span className="absolute inset-0 rounded-[10px]" initial={{ opacity: 0 }}
                                               whileHover={{ opacity: 0.14 }} transition={{ duration: 0.18 }}
                                               style={{ boxShadow: "0 0 0 8px rgba(255,255,255,0.06)" }} />
                                )}
                                {isSel && <SeatRipple />}
                                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold opacity-0 transition group-hover:opacity-100"
                                      style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${T.stroke}` }}>
                                  {cell.id} · {tier} · ${TIER_PRICE[tier]}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Aisle 2 */}
                        <div className="w-5 md:w-6 lg:w-8 flex-shrink-0">
                          <div className="mx-auto h-8 md:h-9 lg:h-10 w-[2px] rounded-full opacity-30"
                               style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.35), transparent)" }} />
                          <div className="mt-1 text-[9px] text-center uppercase tracking-wider" style={{ color: T.soft }}>Aisle</div>
                        </div>

                        {/* Right bank (22..end) */}
                        <div className="flex items-center gap-1 md:gap-1.5">
                          {row.slice(22).map((cell, ci) => {
                            if (cell.type === "aisle") return null;
                            const isSel = cell.sel, isTaken = cell.taken, couple = COUPLE_SEATS.has(cell.id);
                            return (
                              <motion.button
                                key={cell.id}
                                onClick={() => toggleSeat(ri, ci + 22)}
                                disabled={isTaken}
                                title={`${cell.id} • ${tier} • $${TIER_PRICE[tier]}`}
                                className="group relative h-6 w-6 md:h-7 md:w-7 rounded-[10px] transition-all"
                                style={{
                                  background: isTaken ? T.seatTaken : isSel ? T.accent : T.seatIdle,
                                  border: `1px solid ${isSel ? T.accent : T.seatIdleStroke}`,
                                  cursor: isTaken ? "not-allowed" : "pointer",
                                  opacity: isTaken ? 0.45 : 1,
                                  boxShadow: isSel ? `0 0 0 3px ${T.accentGlow}` : "none",
                                }}
                                whileHover={!isTaken ? { scale: 1.12, y: -2 } : {}}
                                whileTap={!isTaken ? { scale: 0.96 } : {}}
                              >
                                {couple && !isTaken && (
                                  <span className="absolute -right-1 top-1/2 h-[2px] w-2 -translate-y-1/2 opacity-60"
                                        style={{ background: isSel ? "#fff" : "rgba(255,255,255,0.35)" }} />
                                )}
                                {!isTaken && !isSel && (
                                  <motion.span className="absolute inset-0 rounded-[10px]" initial={{ opacity: 0 }}
                                               whileHover={{ opacity: 0.14 }} transition={{ duration: 0.18 }}
                                               style={{ boxShadow: "0 0 0 8px rgba(255,255,255,0.06)" }} />
                                )}
                                {isSel && <SeatRipple />}
                                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold opacity-0 transition group-hover:opacity-100"
                                      style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${T.stroke}` }}>
                                  {cell.id} · {tier} · ${TIER_PRICE[tier]}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Right row label */}
                        <div className="w-8 md:w-10 text-center select-none">
                          <div
                            className="mx-auto w-7 md:w-8 rounded-md px-1 py-0.5 text-[10px] md:text-[11px] font-bold"
                            style={{ background: TIER_BADGE[tier].bg, color: TIER_BADGE[tier].text, boxShadow: `0 0 0 2px ${TIER_BADGE[tier].ring} inset` }}
                            title={`${rowName} • ${tier}`}
                          >
                            {rowName}
                          </div>
                          {ACCESSIBLE_ROWS.has(rowName) && <div className="mt-0.5 text-[10px]" title="Accessible Row">♿</div>}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 md:gap-6 text-[12px]" style={{ color: T.dim }}>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border" style={{ background: T.seatIdle, borderColor: T.seatIdleStroke }} />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded" style={{ background: T.accent }} />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded opacity-40" style={{ background: T.seatTaken }} />
                  <span>Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-7 rounded-[10px] relative" style={{ background: T.seatIdle, border: `1px solid ${T.seatIdleStroke}` }}>
                    <span className="absolute right-0 top-1/2 h-[2px] w-2 -translate-y-1/2 opacity-60" style={{ background: "rgba(255,255,255,0.35)" }} />
                  </div>
                  <span>Couple</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">♿</span>
                  <span>Accessible Row</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Summary (sticky, aligned) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="h-fit self-start rounded-3xl border p-4 md:p-6 lg:p-8 lg:sticky"
            style={{
              background: T.card,
              borderColor: T.stroke,
              top: "var(--app-header-h, 0px)", // aligns with fixed header
              zIndex: 10,
              maxWidth: "400px", // Add max width for proper alignment within the grid
            }}
          >
            <div className="mb-4 text-xs font-semibold tracking-widest" style={{ color: T.dim }}>
              BOOKING SUMMARY
            </div>

            {/* Selected Seats */}
            <div className="mb-6">
              <div className="mb-3 text-sm font-medium" style={{ color: T.soft }}>
                Selected Seats ({chosen.length})
              </div>
              <div className="max-h-64 space-y-2 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {chosen.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border p-4 text-center text-sm"
                      style={{ borderColor: T.stroke, color: T.soft }}
                    >
                      No seats selected yet
                    </motion.div>
                  ) : (
                    chosen.map((s, i) => (
                      <motion.div
                        key={s.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center justify-between rounded-xl border p-3"
                        style={{ background: T.cardSoft, borderColor: T.stroke }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="rounded-lg px-2 py-1 text-xs font-bold"
                            style={{ background: "rgba(255,255,255,0.12)" }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {s.tier ?? ""}
                          </motion.div>
                          <div>
                            <div className="font-semibold">{s.id}</div>
                            <div className="text-xs" style={{ color: T.soft }}>${s.price}</div>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => {
                            setChosen((old) => old.filter((x) => x.id !== s.id));
                            setGrid((prev) =>
                              prev.map((row) => row.map((c) => (c.id === s.id ? { ...c, sel: false } : c)))
                            );
                          }}
                          className="rounded-lg p-2 transition-colors hover:bg-white/5"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Remove ${s.id}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.soft} strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-6 space-y-3 rounded-2xl border p-4" style={{ background: T.cardSoft, borderColor: T.stroke }}>
              <div className="flex justify-between text-sm" style={{ color: T.dim }}>
                <span>Subtotal</span>
                <span className="font-semibold text-white">${total}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: T.dim }}>
                <span>Booking Fee</span>
                <span className="font-semibold text-white">$0</span>
              </div>
              <div className="border-t pt-3" style={{ borderColor: T.stroke }}>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              disabled={chosen.length === 0}
              className="group relative w-full overflow-hidden rounded-2xl py-4 text-center font-bold shadow-2xl transition-all disabled:opacity-40"
              style={{ background: T.accent, boxShadow: chosen.length > 0 ? `0 20px 60px -12px ${T.accentGlow}` : "none" }}
              whileHover={chosen.length > 0 ? { scale: 1.02, y: -2 } : {}}
              whileTap={chosen.length > 0 ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10">
                {chosen.length === 0 ? "Select Seats" : `Proceed to Payment • $${total}`}
              </span>
              {chosen.length > 0 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

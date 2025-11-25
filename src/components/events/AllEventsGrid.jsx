// src/components/events/AllEventsGrid.jsx
import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

/** Single poster card (tall, rounded) */
function EventCard({ e, onClick }) {
  return (
    <button
      onClick={() => onClick?.(e)}
      className="group w-full text-left"
      aria-label={e.title}
    >
      <div className="w-full rounded-[22px] overflow-hidden bg-zinc-100 shadow-sm ring-1 ring-black/5">
        {/* Tall poster aspect */}
        <div className="relative w-full aspect-[3/4]">
          <img
            src={e.image}
            alt={e.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
      {/* (optional) caption under poster */}
      {/* <div className="mt-2">
        <p className="text-sm font-medium text-zinc-900 line-clamp-2">{e.title}</p>
        <p className="text-xs text-zinc-500">{e.city}</p>
      </div> */}
    </button>
  );
}

/** Small chip button */
function Chip({ active, children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={
        "h-9 px-3 inline-flex items-center gap-2 rounded-lg border text-sm " +
        (active
          ? "border-zinc-300 bg-zinc-100 text-zinc-900"
          : "border-zinc-300/70 bg-white hover:bg-zinc-50 text-zinc-700")
      }
    >
      {Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}

/** Helpers for date filters */
const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isToday = (d) => isSameDay(d, new Date());
const isTomorrow = (d) => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return isSameDay(d, t);
};
const isThisWeekend = (d) => {
  const _day = d.getDay(); // 0 Sun .. 6 Sat
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay() + 7); // next Sunday boundary
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() - 1);
  const start = new Date(saturday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(sunday);
  end.setHours(23, 59, 59, 999);
  return d >= start && d <= end;
};

/** Main component */
export default function AllEventsGrid({
  events = SAMPLE_EVENTS,      // you can pass your own list
  onCardClick,                 // optional
  title = "All events",
}) {
  const [filters, setFilters] = useState({
    today: false,
    tomorrow: false,
    weekend: false,
    under10: false,
    live: false,
    music: false,
  });

  const toggle = (k) => setFilters((f) => ({ ...f, [k]: !f[k] }));
  const clear = () => setFilters({ today: false, tomorrow: false, weekend: false, under10: false, live: false, music: false });

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const d = new Date(e.datetime);
      if (filters.today && !isToday(d)) return false;
      if (filters.tomorrow && !isTomorrow(d)) return false;
      if (filters.weekend && !isThisWeekend(d)) return false;
      if (filters.under10 && !(e.distanceKm != null && e.distanceKm <= 10)) return false;
      if (filters.live && !e.tags?.includes("live")) return false;
      if (filters.music && !e.tags?.includes("music")) return false;
      return true;
    });
  }, [events, filters]);

  return (
    <section className="w-full mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-10 bg-white">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
        {title}
      </h2>

      {/* Chips row */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Chip icon={SlidersHorizontal} onClick={clear}>Filters</Chip>
        <Chip active={filters.today} onClick={() => toggle("today")}>Today</Chip>
        <Chip active={filters.tomorrow} onClick={() => toggle("tomorrow")}>Tomorrow</Chip>
        <Chip active={filters.weekend} onClick={() => toggle("weekend")}>This Weekend</Chip>
        <Chip active={filters.under10} onClick={() => toggle("under10")}>Under 10 km</Chip>
        <Chip active={filters.live} onClick={() => toggle("live")}>Live Gigs</Chip>
        <Chip active={filters.music} onClick={() => toggle("music")}>Music</Chip>
      </div>

      {/* Grid of posters */}
      <div className="grid gap-6 sm:gap-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((e) => (
          <EventCard key={e.id} e={e} onClick={onCardClick} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-zinc-500">No events match the selected filters.</p>
      )}
    </section>
  );
}

/* ---------- demo data with remote images ---------- */
const SAMPLE_EVENTS = [
  {
    id: "sunidhi",
    title: "Sunidhi | I Am Home Tour",
    datetime: "2025-11-01T19:00:00",
    city: "Mumbai",
    distanceKm: 7,
    tags: ["music", "live"],
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "halloween",
    title: "The Halloween Party",
    datetime: "2025-11-02T21:00:00",
    city: "Pune",
    distanceKm: 18,
    tags: ["live"],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "drift-night",
    title: "Drift Night + Car Meet",
    datetime: "2025-11-03T18:00:00",
    city: "Chennai",
    distanceKm: 9,
    tags: [],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "rahman",
    title: "A.R. Rahman | Harmony by the Ganga",
    datetime: "2025-11-29T19:00:00",
    city: "Varanasi",
    distanceKm: 22,
    tags: ["music", "live"],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "techno",
    title: "Warehouse Techno Night",
    datetime: "2025-11-01T22:00:00",
    city: "Bengaluru",
    distanceKm: 6,
    tags: ["live", "music"],
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "art-fair",
    title: "City Art & Indie Fair",
    datetime: "2025-11-08T11:00:00",
    city: "Hyderabad",
    distanceKm: 12,
    tags: [],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "standup",
    title: "Halloween Stand-Up Special",
    datetime: "2025-11-02T20:00:00",
    city: "Delhi",
    distanceKm: 8,
    tags: ["live"],
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "indie",
    title: "Indie Sunday Sessions",
    datetime: "2025-11-30T17:00:00",
    city: "Kolkata",
    distanceKm: 5,
    tags: ["music", "live"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
  },
];

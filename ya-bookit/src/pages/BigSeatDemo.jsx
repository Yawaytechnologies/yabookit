import React, { useMemo, useState } from "react";
import SeatMap from "../components/cinema/SeatMap";

// helper to build A-1 labels and some aisles
const rowLabel = (i) => String.fromCharCode(65 + i);

function buildSeats(rows, cols) {
  const aisleCols = new Set([5, 12, 19]); // visual aisles after these columns
  const seats = [];
  let id = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      seats.push({
        id: id++,
        row: r,
        col: c,
        label: `${rowLabel(r)}-${c + 1}`,
        type: r >= rows - 4 ? "premium" : "regular",
        price: r >= rows - 4 ? 300 : 220,
        is_aisle: aisleCols.has(c),
        state: Math.random() < 0.08 ? "booked" : "available",
      });
    }
  }
  return seats;
}

export default function BigSeatDemo() {
  const rows = 20;
  const cols = 26;
  const [seats] = useState(() => buildSeats(rows, cols));
  const [selected, setSelected] = useState([]);

  const total = useMemo(
    () => seats.filter((s) => selected.includes(s.id)).reduce((sum, s) => sum + s.price, 0),
    [seats, selected]
  );

  const toggle = (s) => {
    setSelected((p) => (p.includes(s.id) ? p.filter((i) => i !== s.id) : [...p, s.id]));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Select Seats (Large)</h1>
        <div className="rounded bg-white/10 border border-white/15 px-3 py-1 text-sm">
          Selected: {selected.length} • Total: ₹{total}
        </div>
      </div>

      <SeatMap
        seats={seats}
        rows={rows}
        cols={cols}
        selected={selected}
        onToggle={toggle}
        density="tiny"          // <- shows a LOT more seats
        showRowLabels
        maxMobileRows={10}
      />

      <div className="mt-6 flex gap-3">
        <button className="rounded-md bg-slate-800 px-4 py-2 text-white disabled:opacity-50" disabled={!selected.length}>
          Hold 10 min
        </button>
        <button className="rounded-md bg-emerald-600 px-4 py-2 text-white disabled:opacity-50" disabled={!selected.length}>
          Pay & Book
        </button>
      </div>
    </div>
  );
}

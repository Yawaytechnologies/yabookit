import React, { useMemo, useRef, useState, useEffect } from "react";

const stateCls = {
  available: "bg-gray-200 hover:bg-gray-300 cursor-pointer",
  held: "bg-yellow-300 cursor-not-allowed",
  booked: "bg-red-500 text-white cursor-not-allowed",
  selected: "bg-emerald-600 text-white",
};
const typeRing = {
  regular: "",
  premium: "ring-2 ring-amber-400",
  recliner: "ring-2 ring-purple-400",
  wheelchair: "ring-2 ring-sky-400",
};

// size presets (seat square size + gap)
const DENSITIES = {
  cozy:    { seat: 28, gap: 8, aisleGap: 16 },
  compact: { seat: 22, gap: 6, aisleGap: 12 },
  tiny:    { seat: 18, gap: 5, aisleGap: 10 },
};

export default function SeatMap({
  seats = [],
  rows = 0,
  cols = 0,
  selected = [],
  onToggle,
  density = "compact",        // "cozy" | "compact" | "tiny"
  showRowLabels = true,
  maxMobileRows = 12,         // reveal more with "Show more" button
}) {
  const { seat, gap, aisleGap } = DENSITIES[density] || DENSITIES.compact;

  // grid data
  const grid = useMemo(() => {
    const g = Array.from({ length: rows }, () => Array(cols).fill(null));
    seats.forEach((s) => (g[s.row][s.col] = s));
    return g;
  }, [seats, rows, cols]);

  // zoom / pan
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);   // 0.7 .. 1.4 works well
  const [drag, setDrag] = useState(null);  // {x,y}
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // mouse drag to pan
  const onDown = (e) => setDrag({ x: e.clientX, y: e.clientY });
  const onMove = (e) => {
    if (!drag) return;
    setOffset((p) => ({ x: p.x + (e.clientX - drag.x), y: p.y + (e.clientY - drag.y) }));
    setDrag({ x: e.clientX, y: e.clientY });
  };
  const onUp = () => setDrag(null);

  // wheel to zoom (Ctrl+wheel for precise; wheel alone also ok)
  const onWheel = (e) => {
    if (!wrapRef.current) return;
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * (e.ctrlKey ? 0.08 : 0.06);
    setScale((s) => Math.min(1.6, Math.max(0.6, s + delta)));
  };

  // mobile “show more rows”
  const [visibleRows, setVisibleRows] = useState(rows);
  useEffect(() => {
    // on mobile, limit initial rows; on desktop show all
    if (window.innerWidth < 640 && rows > maxMobileRows) setVisibleRows(maxMobileRows);
    else setVisibleRows(rows);
  }, [rows, maxMobileRows]);

  const isSel = (id) => selected.includes(id);

  return (
    <div className="w-full">
      {/* Top controls */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
          <span className="text-xs text-white/60">Density</span>
          {["cozy", "compact", "tiny"].map((d) => (
            <button
              key={d}
              onClick={() => setScale(1) || null}
              className={`px-2 py-0.5 rounded text-xs ${
                density === d ? "bg-yellow-500 text-black" : "bg-white/10"
              }`}
              // allow parent to switch density via prop; here we just show hint
              title={`Use prop density="${d}" on SeatMap to lock this size`}
              disabled
            >
              {d}
            </button>
          ))}
          <span className="text-xs text-white/40">(set via prop)</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
          <span className="text-xs text-white/60">Zoom</span>
          <input
            type="range"
            min="0.6"
            max="1.6"
            step="0.02"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-40 accent-yellow-500"
          />
        </div>
      </div>

      {/* Screen indicator */}
      <div className="mx-auto mb-3 text-center text-[11px] text-gray-500">SCREEN THIS SIDE</div>
      <div className="mx-auto mb-4 h-1 w-80 rounded-full bg-gray-300" />

      {/* Zoom & Pan viewport */}
      <div
        ref={wrapRef}
        className="relative h-[480px] sm:h-[560px] rounded-xl bg-black/20 border border-white/10 overflow-hidden touch-pan-y"
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseLeave={onUp}
        onMouseUp={onUp}
        onWheel={onWheel}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(-50%,-50%) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* the seat grid */}
          <div className="inline-flex flex-col" style={{ gap }}>
            {grid.slice(0, visibleRows).map((row, rIdx) => (
              <div key={rIdx} className="flex items-center" style={{ gap }}>
                {showRowLabels && (
                  <div className="w-6 text-right pr-1 text-[10px] text-white/50">
                    {String.fromCharCode(65 + rIdx)}
                  </div>
                )}
                <div className="flex" style={{ gap }}>
                  {row.map((s, cIdx) => {
                    if (!s) return <div key={cIdx} style={{ width: seat, height: seat }} />;
                    const disabled = s.state !== "available";
                    const base = isSel(s.id) ? stateCls.selected : stateCls[s.state];
                    const ring = typeRing[s.type] || "";
                    const btn = (
                      <button
                        key={s.id}
                        disabled={disabled}
                        onClick={() => onToggle?.(s)}
                        className={`rounded-md text-[10px] flex items-center justify-center transition ${base} ${ring}`}
                        style={{ width: seat, height: seat }}
                        title={`${s.label} • ${s.type} • ₹${s.price}`}
                        aria-label={`${s.label} ${s.type} ₹${s.price}`}
                      >
                        {s.label.split("-")[1]}
                      </button>
                    );
                    // insert aisle gap visually after seats flagged as aisle
                    return s.is_aisle ? (
                      <div key={s.id} className="flex items-center" style={{ gap: aisleGap }}>
                        {btn}
                        <div style={{ width: aisleGap }} />
                      </div>
                    ) : (
                      btn
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile “show more rows” */}
      {visibleRows < rows && (
        <div className="mt-4 text-center">
          <button
            className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm hover:bg-white/20"
            onClick={() => setVisibleRows(rows)}
          >
            Show all rows
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-600">
        <Legend swatch="bg-gray-200" label="Available" />
        <Legend swatch="bg-yellow-300" label="Held" />
        <Legend swatch="bg-red-500" label="Booked" />
        <Legend swatch="bg-emerald-600" label="Selected" />
        <Legend ring="ring-amber-400" label="Premium" />
        <Legend ring="ring-purple-400" label="Recliner" />
        <Legend ring="ring-sky-400" label="Wheelchair" />
      </div>
    </div>
  );
}

function Legend({ swatch, ring, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-4 w-4 rounded ${swatch || "bg-gray-200"} ${ring ? `ring-2 ${ring}` : ""}`} />
      <span>{label}</span>
    </div>
  );
}

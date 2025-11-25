import React from "react";

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
  }, []);
  return prefers;
}

/**
 * SeatMapLoader+
 * - message: caption under the seats
 * - className: bg & text colors
 * - size: base seat size (px) — controls overall scale
 * - rows / cols: grid shape
 * - withAisle: center aisle gap
 * - showLegend: small legend chips
 */
export function SeatMapLoader({
  message = "Finding showtimes & the best seats…",
  className = "bg-neutral-950 text-white",
  size = 72,
  rows = 4,
  cols = 12,
  withAisle = true,
  showLegend = true,
}) {
  const reduce = usePrefersReducedMotion();

  // derive seat box size from "size" for responsive scale
  const seatW = size / 2.5;
  const seatH = size / 2.2;
  const midCol = Math.floor(cols / 2);

  // center cluster to glow (best seats)
  const premiumCols = [midCol - 1, midCol, midCol + (cols % 2 === 0 ? 0 : 1)];
  const premiumRow = Math.ceil(rows / 2);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={message}
    >
      {/* Ambient gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px 240px at 20% -10%, rgba(56,189,248,.18), transparent 60%), radial-gradient(600px 240px at 80% -20%, rgba(236,72,153,.18), transparent 60%), radial-gradient(700px 280px at 50% 120%, rgba(234,179,8,.18), transparent 60%)",
        }}
      />

      {/* Screen with shimmer */}
      <div className="relative mb-8 w-[min(90vw,720px)]">
        <div className="relative h-1 rounded-full overflow-hidden bg-white/15">
          {!reduce && (
            <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[screenShimmer_1800ms_linear_infinite]" />
          )}
        </div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/60">
          SCREEN
        </div>
      </div>

      {/* Seating area with very light perspective */}
      <div
        className="relative"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative grid gap-3 md:gap-4"
          style={{
            transform: "rotateX(8deg) translateZ(0)",
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {/* Scanner sweep overlay */}
          {!reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl mix-blend-screen"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.10) 40%, rgba(255,255,255,.22) 50%, rgba(255,255,255,.10) 60%, transparent 100%)",
                maskImage: "radial-gradient(90% 90% at 50% 30%, black 60%, transparent 100%)",
                animation: "scan 2600ms linear infinite",
              }}
            />
          )}

          {Array.from({ length: rows }).map((_, r) => {
            const _rowYDelay = r * 0.08;
            return (
              <div key={r} className="flex gap-3 md:gap-4 justify-center">
                {Array.from({ length: cols }).map((_, c) => {
                  const isAisle = withAisle && c === midCol && cols % 2 === 0;
                  const delay = (r * 0.1 + c * 0.04).toFixed(2);

                  const isPremium =
                    r === premiumRow - 1 || r === premiumRow
                      ? premiumCols.includes(c) || premiumCols.includes(c - 1)
                      : false;

                  return isAisle ? (
                    <span key={`gap-${c}`} style={{ width: seatW * 0.8 }} />
                  ) : (
                    <span
                      key={c}
                      className="inline-block rounded-md border backdrop-blur-sm"
                      style={{
                        width: seatW,
                        height: seatH,
                        borderColor: "rgba(255,255,255,0.15)",
                        background: isPremium
                          ? "linear-gradient(180deg, rgba(234,179,8,.35), rgba(255,255,255,.06))"
                          : "rgba(255,255,255,.06)",
                        boxShadow: isPremium
                          ? "0 0 16px rgba(234,179,8,.35), 0 2px 14px rgba(0,0,0,.35)"
                          : "0 2px 12px rgba(0,0,0,.35)",
                        animation: reduce
                          ? "none"
                          : `seatPop 1200ms ease-in-out ${delay}s infinite`,
                        transformOrigin: "center",
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-[min(88vw,560px)] h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
        <div
          className="h-full"
          style={{
            width: "44%",
            background:
              "repeating-linear-gradient(45deg, rgba(255,255,255,.85) 0 10px, rgba(255,255,255,.65) 10px 20px)",
            mixBlendMode: "screen",
            animation: reduce ? "none" : "sweep 1800ms linear infinite",
          }}
        />
      </div>

      {/* Caption */}
      <p className="mt-6 text-center text-lg md:text-2xl font-semibold tracking-tight text-white">
        {message}
      </p>

      {/* Optional legend */}
      {showLegend && (
        <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
          <span className="inline-flex items-center gap-2">
            <b className="inline-block h-3 w-5 rounded bg-white/20 border border-white/20" /> Available
          </span>
          <span className="inline-flex items-center gap-2">
            <b className="inline-block h-3 w-5 rounded" style={{ background: "linear-gradient(180deg, rgba(234,179,8,.35), rgba(255,255,255,.06))", border: "1px solid rgba(255,255,255,.2)" }} /> Best seats
          </span>
          <span className="inline-flex items-center gap-2">
            <b className="inline-block h-3 w-5 rounded bg-white/5 border border-white/10 opacity-60" /> Reserved
          </span>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes seatPop {
          0%, 100% { transform: translateY(0) scale(1); opacity: .85; }
          50%      { transform: translateY(-6%) scale(1.05); opacity: 1; }
        }
        @keyframes sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(260%); }
        }
        @keyframes scan {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes screenShimmer {
          0%   { left: -35%; }
          100% { left: 135%; }
        }
      `}</style>
    </div>
  );
}

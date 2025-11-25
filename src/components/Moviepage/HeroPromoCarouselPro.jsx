import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------- tiny inline icons ---------- */
const Arrow = ({ dir = "left", ...p }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

/* ---------- keyframes (injected once) ---------- */
let injected = false;
function injectKeyframes() {
  if (injected) return;
  injected = true;
  const css = `
  @keyframes kenburns {
    0%   { transform: scale(1) translate3d(0,0,0); }
    100% { transform: scale(1.08) translate3d(0,0,0); }
  }
  @keyframes rise {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow {
    0% { box-shadow: 0 12px 40px rgba(255, 76, 64, 0.0); }
    100% { box-shadow: 0 12px 40px rgba(255, 76, 64, 0.45); }
  }`;
  const el = document.createElement("style");
  el.setAttribute("data-hero-promo-kf", "1");
  el.innerHTML = css;
  document.head.appendChild(el);
}

/* ---------- single slide ---------- */
function Slide({ s, onParallaxMove, onParallaxLeave }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src={s.bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ animation: "kenburns 12s ease-in-out forwards" }}
          loading="eager"
        />
        {/* soft gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_50%,transparent_40%,rgba(0,0,0,0.55)_70%)]" />
      </div>

      {/* CONTENT GRID */}
      <div className="relative h-full grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-10">
        {/* LEFT: text */}
        <div className="col-span-12 lg:col-span-7 flex items-center">
          <div className="max-w-[560px]">
            <div
              className="text-white text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold leading-[1.1] tracking-tight"
              style={{ animation: "rise .6s ease-out both" }}
            >
              <div className="opacity-95">{s.topLine}</div>
              <div className="mt-1">
                <span className="text-rose-300">{s.highlight}</span>
                <span className="opacity-95"> {s.afterHighlight}</span>
              </div>
              {s.bottomLine ? <div className="opacity-95">{s.bottomLine}</div> : null}
            </div>

            {s.badge ? (
              <div
                className="mt-3 inline-flex items-center rounded-md bg-white/15 px-2 py-[2px] text-xs text-white/90 ring-1 ring-white/20"
                style={{ animation: "rise .6s .1s ease-out both" }}
              >
                {s.badge}
              </div>
            ) : null}

            <div className="mt-5" style={{ animation: "rise .6s .15s ease-out both" }}>
              <a
                href={s.ctaHref || "#"}
                className="inline-flex items-center justify-center rounded-md bg-rose-500 px-5 py-2.5 text-white font-semibold hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
                style={{ animation: "glow 1.2s .3s ease-in-out both" }}
              >
                {s.ctaText || "Apply Now"}
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: card artwork with parallax */}
        {s.card ? (
          <div className="col-span-12 lg:col-span-5 relative">
            <div
              className="pointer-events-auto relative h-full"
              onMouseMove={onParallaxMove}
              onMouseLeave={onParallaxLeave}
              onTouchMove={onParallaxMove}
              onTouchEnd={onParallaxLeave}
            >
              <img
                src={s.card}
                alt=""
                className="absolute left-1/2 lg:left-10 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[340px] lg:w-[420px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] rotate-[-6deg] will-change-transform transition-transform duration-200"
                data-parallax-card
                loading="lazy"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- main carousel ---------- */
export default function HeroPromoCarouselPro({
  slides,
  auto = true,
  interval = 5500,
  className = "",
  heightClass = "h-[210px] sm:h-[270px] lg:h-[340px]",
}) {
  useEffect(injectKeyframes, []);
  const DEFAULTS = useMemo(
    () => [
      {
        topLine: "Unlock",
        highlight: "₹500 off*",
        afterHighlight: "",
        bottomLine: "on LIVE gigs",
        badge: "T&C Apply",
        ctaText: "Apply Now",
        ctaHref: "#",
        bg: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1600&auto=format&fit=crop",
        card:
          "https://images.unsplash.com/photo-1616077168079-7e09a84a5b8d?q=80&w=1200&auto=format&fit=crop",
      },
      {
        topLine: "Exclusive",
        highlight: "Pre-sales",
        afterHighlight: " for top concerts",
        bottomLine: "Book before everyone else",
        badge: "Limited",
        ctaText: "Get Access",
        ctaHref: "#",
        bg: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop",
        card:
          "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200&auto=format&fit=crop",
      },
      {
        topLine: "Cashback",
        highlight: "₹150",
        afterHighlight: " on first booking",
        bottomLine: "with partner cards",
        ctaText: "Know More",
        ctaHref: "#",
        bg: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1600&auto=format&fit=crop",
        card:
          "https://images.unsplash.com/photo-1556741533-f6acd6472c68?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    []
  );
  const data = slides?.length ? slides : DEFAULTS;

  const [idx, setIdx] = useState(0);
  const wrap = (n) => (n + data.length) % data.length;
  const go = (n) => setIdx(wrap(n));
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // autoplay
  const timerRef = useRef(null);
  const stop = () => timerRef.current && clearInterval(timerRef.current);
  const start = () => {
    if (!auto) return;
    stop();
    timerRef.current = setInterval(next, interval);
  };
  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, auto, interval, data.length]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // swipe
  const touch = useRef({ x: 0, y: 0, t: 0 });
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e) => {
    const dx = (e.changedTouches?.[0]?.clientX || 0) - touch.current.x;
    const dt = Date.now() - touch.current.t;
    if (Math.abs(dx) > 40 && dt < 600) (dx > 0 ? prev() : next());
  };

  // parallax tilt for card
  const containerRef = useRef(null);
  const onParallaxMove = (e) => {
    const card = containerRef.current?.querySelector("[data-parallax-card]");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (("touches" in e ? e.touches[0].clientX : e.clientX) - cx) / rect.width;
    const y = (("touches" in e ? e.touches[0].clientY : e.clientY) - cy) / rect.height;
    const rotateX = y * -8; // tilt up/down
    const rotateY = x * 12; // tilt left/right
    card.style.transform = `translate(-50%,-50%) rotate(-6deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const onParallaxLeave = () => {
    const card = containerRef.current?.querySelector("[data-parallax-card]");
    if (!card) return;
    card.style.transform = `translate(-50%,-50%) rotate(-6deg)`;
  };

  return (
    <section
      className={`relative w-full overflow-hidden rounded-2xl bg-black/60 ${heightClass} ${className}`}
      aria-roledescription="carousel"
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      ref={containerRef}
    >
      {/* slides (translate container) */}
      <div
        className="h-full w-full relative will-change-transform"
        style={{
          transform: `translateX(-${idx * 100}%)`,
          transition: "transform .7s cubic-bezier(.22,.68,.26,1.02)",
        }}
      >
        <div className="flex h-full" style={{ width: `${data.length * 100}%` }}>
          {data.map((s, i) => (
            <div key={i} className="w-full shrink-0">
              <Slide s={s} onParallaxMove={onParallaxMove} onParallaxLeave={onParallaxLeave} />
            </div>
          ))}
        </div>
      </div>

      {/* arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="hidden md:grid absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 place-items-center rounded-full bg-white/85 text-gray-800 hover:bg-white shadow"
      >
        <Arrow dir="left" />
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="hidden md:grid absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 place-items-center rounded-full bg-white/85 text-gray-800 hover:bg-white shadow"
      >
        <Arrow dir="right" />
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

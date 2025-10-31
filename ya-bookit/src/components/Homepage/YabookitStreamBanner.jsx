// YabookitStreamBanner.jsx — React + Tailwind (JS only)
import React, { useEffect, useRef, useState } from "react";

export default function YabookitStreamBanner({
  headline = "Endless Entertainment Anytime. Anywhere!",
  bg = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1600&auto=format&fit=crop",
}) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  const [confetti, setConfetti] = useState([]);

  // reveal on scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // mouse for background parallax only
  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const nx = (x / r.width) * 2 - 1;
    const ny = (y / r.height) * 2 - 1;
    setPos({ x, y, nx, ny });
  };
  const onLeave = () => setPos({ x: 0, y: 0, nx: 0, ny: 0 });

  // click: ticket confetti (simple + performant)
  const onClick = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const colors = ["#facc15", "#ffffff", "#ef4444"];
    const pieces = Array.from({ length: 14 }, (_, i) => {
      const ang = (i / 14) * Math.PI * 2;
      const dist = 80 + Math.random() * 60; // px
      const rot = (Math.random() * 140 - 70).toFixed(1) + "deg";
      return {
        id: `${Date.now()}_${i}`,
        x,
        y,
        tx: Math.cos(ang) * dist,
        ty: Math.sin(ang) * dist,
        size: 5 + Math.random() * 4,
        color: colors[i % colors.length],
        dur: 700 + Math.random() * 500,
        rot,
      };
    });

    // spawn
    setConfetti((prev) => [...prev, ...pieces]);
    // clean up each piece after its duration
    pieces.forEach((p) => setTimeout(() => {
      setConfetti((prev) => prev.filter((q) => q.id !== p.id));
    }, p.dur + 16));
  };

  // parallax transforms
  const transBg = `translate3d(${pos.nx * -10}px, ${pos.ny * -8}px, 0) scale(1.06)`;
  const transGrid = `translate3d(${pos.nx * 14}px, ${pos.ny * 12}px, 0)`;

  return (
    <section className="w-full">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        className={[
          "relative overflow-hidden rounded-none",
          "bg-[#0b1324]/90 backdrop-blur supports-[backdrop-filter]:backdrop-saturate-150",
          "border-y border-white/10",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
          "transition-all duration-200 ease-out motion-reduce:transition-none",
        ].join(" ")}
      >
        {/* Background (parallax) */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: transBg,
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)",
            opacity: 0.92,
          }}
          aria-hidden
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0b1324]/82" aria-hidden />

        {/* Subtle grid texture (parallax) */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-soft-light will-change-transform"
          style={{
            transform: transGrid,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 64px), repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 64px)",
          }}
          aria-hidden
        />

        {/* gentle floating particles */}
        <Particles />

        {/* CENTERED HEADLINE + projector-glow pulse */}
        <div className="relative z-10 w-full h-[120px] sm:h-[140px] md:h-[150px] flex items-center justify-center px-4 sm:px-8">
          <span className="relative inline-block">
            {/* soft animated glow behind text */}
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[70%] rounded-full bg-yellow-400/20 blur-2xl animate-glow" />
            <h2 className="relative text-center font-extrabold text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,.25)] text-xl sm:text-2xl md:text-3xl">
              {headline}
            </h2>
          </span>
        </div>

        {/* confetti pieces */}
        {confetti.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute rounded-sm"
            style={{
              left: p.x,
              top: p.y,
              width: p.size * 1.2,
              height: p.size,
              backgroundColor: p.color,
              transform: "translate(-50%, -50%)",
              animation: `confetti ${p.dur}ms ease-out forwards`,
              // pass vectors/rotation as CSS vars
              ["--tx"]: `${p.tx}px`,
              ["--ty"]: `${p.ty}px`,
              ["--rot"]: p.rot,
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* local styles */}
      <style>{`
        @keyframes glow {
          0%   { opacity: .18; transform: translate(-50%, -50%) scale(.98); }
          50%  { opacity: .34; transform: translate(-50%, -50%) scale(1.03); }
          100% { opacity: .18; transform: translate(-50%, -50%) scale(.98); }
        }
        .animate-glow { animation: glow 2.6s ease-in-out infinite; }

        @keyframes confetti {
          0%   { transform: translate(-50%, -50%) translate(0,0) rotate(0deg); opacity: .9; }
          100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* floating particles */
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30 blur-[1px]"
          style={{
            left: `${10 + i * 14}%`,
            top: `${20 + (i % 3) * 18}%`,
            animation: `float${(i % 3) + 1} ${5 + i}s ease-in-out ${i * 0.25}s infinite`,
          }}
          aria-hidden
        />
      ))}
      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(18px,-10px) } }
        @keyframes float2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-14px,12px) } }
        @keyframes float3 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(10px,16px) } }
      `}</style>
    </div>
  );
}

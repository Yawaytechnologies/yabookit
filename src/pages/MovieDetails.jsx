// src/pages/MoviesDetails.jsx
import React from "react";

// keep your paths as-is
import HeroPromoCarouselPro from "../components/Moviepage/HeroPromoCarouselPro";
import MoviesExploreStandalone from "../components/Moviepage/MoviesExploreStandalone";

export default function MoviesDetails() {
  // TIP: Put images in /public/assets/... and reference with a leading slash.
  const slides = [
    {
      topLine: "Unlock",
      highlight: "₹500 off*",
      afterHighlight: "",
      bottomLine: "on LIVE gigs",
      badge: "T&C Apply",
      ctaText: "Apply Now",
      ctaHref: "#",
      bg: "banner1.png",          // <- ensure this exists in /public/assets
      card: "/assets/banner1.png",
    },
    {
      topLine: "Exclusive",
      highlight: "Pre-sales",
      afterHighlight: " for top concerts",
      bottomLine: "Book before everyone else",
      badge: "Limited",
      ctaText: "Get Access",
      ctaHref: "#",
      bg: "/assets/banners/concert-presale.jpg",
      card: "/assets/cards/presale-card.png",
    },
  ];

  return (
    <main
      className="
        min-h-dvh bg-[#0b1524] text-white
        supports-[overflow:clip]:overflow-clip overflow-x-hidden
      "
    >
      {/* micro-animations + accessibility */}
      <style>{`
        @keyframes fadeup { from {opacity:0; transform: translateY(14px)} to {opacity:1; transform:none} }
        @keyframes floaty { 0%{ transform:translateY(0)} 50%{ transform:translateY(-8px)} 100%{ transform:translateY(0)} }
        @keyframes shine { 0% { transform: translateX(-120%);} 100% { transform: translateX(120%);} }
        @keyframes rise { 0%{opacity:0; transform:translateY(10px) scale(.98)} 100%{opacity:1; transform:none} }

        .card-anim { animation: fadeup .45s ease both; }
        .wrapper-shine { position:relative; overflow:hidden; }
        .wrapper-shine::after{
          content:"";
          position:absolute; inset:-1px;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.10) 45%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.10) 55%, transparent 100%);
          transform: translateX(-120%); pointer-events:none;
        }
        .wrapper-shine:hover::after{ animation: shine 1.2s ease-out forwards; }
        .hero-lift { animation: rise .5s cubic-bezier(.22,.61,.36,1) both; }
        .beam { filter: blur(22px); opacity:.35; pointer-events:none; }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .card-anim, .hero-lift, .wrapper-shine::after { animation: none !important; }
        }
      `}</style>

      {/* soft gradient beams (hidden on xs to avoid overflow) */}
      <div className="pointer-events-none relative">
        <div className="hidden sm:block absolute -top-16 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/30 beam animate-[floaty_8s_ease-in-out_infinite]" />
        <div className="hidden sm:block absolute top-14 -right-20 h-72 w-72 rounded-full bg-cyan-400/30 beam animate-[floaty_9s_ease-in-out_infinite]" />
      </div>

      {/* page container */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* HERO / BANNER */}
        <div
          className="
            wrapper-shine hero-lift
            rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03]
            shadow-[0_16px_60px_-24px_rgba(0,0,0,.6)]
            ring-1 ring-white/5
            backdrop-blur-[2px]
            mb-5 sm:mb-6 md:mb-8
          "
          style={{ willChange: "transform" }}
        >
          <HeroPromoCarouselPro
            slides={slides}
            auto
            interval={5200}
            heightClass="h-[200px] xs:h-[240px] sm:h-[300px] lg:h-[380px]"
            className="rounded-xl sm:rounded-2xl overflow-hidden"
          />
        </div>

        {/* EXPLORE / LISTS (make sure inner components are responsive too) */}
        <div className="card-anim" style={{ animationDelay: ".06s" }}>
          <MoviesExploreStandalone />
        </div>
      </div>
    </main>
  );
}

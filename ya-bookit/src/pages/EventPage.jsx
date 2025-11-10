// src/pages/Events.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCarousel from "../components/events/EventCarousel";
import ExploreEvents from "../components/events/ExploreEvents";
import ArtistsRow from "../components/events/ArtistsRow";
import AllEventsGrid from "../components/events/AllEventsGrid";

/* ---------- tiny reveal wrapper (no deps) ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.16 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={
        className +
        " transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] " +
        (show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
      }
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export default function Events() {
  const navigate = useNavigate();

  const EVENTS = [
    {
      id: "rahman",
      dateLabel: "Sat, 29 Nov, 7:00 PM",
      title: "A.R. Rahman",
      subtitle: "Harmony by the Ganga",
      venue: "Namo ghat, Varanasi",
      priceLabel: "₹4999 onwards",
      ctaText: "Book tickets",
      posterImg: "Ar.jpg",
      onBook: () => navigate("/events/rahman"),
      onBack: () => navigate(-1),
    },
    {
      id: "karan",
      dateLabel: "Sun, 23 Nov, 6:00 PM",
      title: "Karan Aujla",
      subtitle: "Central Cee",
      venue: "Loud Park, Kharghar, Mumbai",
      priceLabel: "₹8000 onwards",
      ctaText: "Book tickets",
      posterImg: "sid.jpg",
      onBook: () => navigate("/events/karan"),
      onBack: () => navigate(-1),
    },
    {
      id: "divine",
      dateLabel: "Fri, 05 Dec, 8:00 PM",
      title: "DIVINE",
      subtitle: "Live in concert",
      venue: "RG Arena, Bengaluru",
      priceLabel: "₹1499 onwards",
      ctaText: "Book tickets",
      posterImg: "ash.png",
      onBook: () => navigate("/events/divine"),
      onBack: () => navigate(-1),
    },
  ];

  const CATEGORIES = [
    { title: "Music", slug: "music", img: "music.jpeg" },
    { title: "Nightlife", slug: "nightlife", img: "nightlife.jpeg" },
    { title: "Comedy", slug: "comedy", img: "comedy.jpeg" },
    { title: "Sports", slug: "sports", img: "sports.jpeg" },
    { title: "Performances", slug: "performances", img: "performances.jpeg" },
    { title: "Food & Drinks", slug: "food-drinks", img: "fooddrinks.jpeg" },
    { title: "Screenings", slug: "screenings", img: "screenings.jpeg" },
  ];

  const ARTISTS = [
    { name: "Arivu", img: "arivu.webp" },
    { name: "Robb Bank$", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80" },
    { name: "Meba Ofilia", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" },
    { name: "Ski Mask the Slump God", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
    { name: "The Yellow Diary", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" },
    { name: "Karsh Kale", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <main
      className="relative min-h-screen text-white overflow-x-hidden"
    >
      {/* ===== THEME (pure CSS, no images) ===== */}
      <style>{`
        /* Base starseed background using layered gradients */
        .bg-space {
          background:
            radial-gradient(1200px 600px at 20% 20%, rgba(244, 114, 182, 0.22), transparent 60%),
            radial-gradient(1300px 650px at 80% 30%, rgba(34, 211, 238, 0.20), transparent 62%),
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.9), transparent 45%),
            radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.7), transparent 45%),
            radial-gradient(1px 1px at 50% 40%, rgba(255,255,255,0.8), transparent 45%),
            radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.85), transparent 45%),
            radial-gradient(1px 1px at 90% 30%, rgba(255,255,255,0.75), transparent 45%),
            linear-gradient(180deg, #0b1524 0%, #0a1120 60%, #0b1524 100%);
          background-attachment: fixed, fixed, fixed, fixed, fixed, fixed, fixed, fixed;
        }
        /* Subtle twinkle */
        @keyframes twinkle { 
          0%, 100% { opacity: .35; } 
          50% { opacity: .55; } 
        }
        .stars { animation: twinkle 5s ease-in-out infinite; }

        /* Floating neon beams (blurred circles) */
        @keyframes floaty { 
          0% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
          100% { transform: translateY(0); } 
        }

        /* Glass card wrapper */
        .glass {
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: 0 20px 60px -24px rgba(0,0,0,.6);
          backdrop-filter: blur(2px);
          border-radius: 1rem;
        }
      `}</style>

      {/* Space gradient + stars */}
      <div className="absolute inset-0 -z-10 bg-space stars"></div>

      {/* Two big animated neon glows (pure CSS) */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 -z-10 hidden sm:block w-[42vw] h-[42vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.30), transparent 60%)", filter: "blur(70px)", animation: "floaty 9s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute top-10 -right-16 -z-10 hidden sm:block w-[46vw] h-[46vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.28), transparent 62%)", filter: "blur(70px)", animation: "floaty 10s ease-in-out infinite" }}
      />

      {/* content container */}
      <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-6 md:py-10 space-y-8 md:space-y-12">
        <Reveal className="glass overflow-hidden">
          <EventCarousel events={EVENTS} />
        </Reveal>

        <Reveal className="glass p-2 sm:p-4" delay={80}>
          <ExploreEvents
            categories={CATEGORIES}
            onSelect={(slug) => navigate(`/events/category/${slug}`)}
          />
        </Reveal>

        <Reveal className="glass" delay={120}>
          <ArtistsRow artists={ARTISTS} />
        </Reveal>

        <Reveal className="glass" delay={160}>
          <AllEventsGrid
            onCardClick={(e) => navigate(`/events/${e.id}`)}
          />
        </Reveal>
      </div>
    </main>
  );
}

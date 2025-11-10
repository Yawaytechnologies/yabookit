// ShowcaseSectionsHybrid.jsx
import React, { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Star,
  Award,
  Film,
  ArrowRight,
} from "lucide-react";

/* -------------------- Data -------------------- */
const NOW_SHOWING = [
  { id: 1, title: "Joker: Folie à Deux", poster: "https://upload.wikimedia.org/wikipedia/en/e/e8/Joker_-_Folie_%C3%A0_Deux_poster.jpg", rating: 8.2, genre: "Drama" },
  { id: 2, title: "Furiosa", poster: "https://upload.wikimedia.org/wikipedia/en/3/34/Furiosa_A_Mad_Max_Saga.jpg", rating: 8.5, genre: "Action" },
  { id: 3, title: "Kingdom of the Planet", poster: "https://upload.wikimedia.org/wikipedia/en/c/cf/Kingdom_of_the_Planet_of_the_Apes_poster.jpg", rating: 7.8, genre: "Sci-Fi" },
  { id: 4, title: "Migration", poster: "https://upload.wikimedia.org/wikipedia/en/c/cb/Migration_%282023_film%29.jpg", rating: 7.2, genre: "Animation" },
{ id: 5, title: "The Creator", poster: "https://upload.wikimedia.org/wikipedia/en/9/94/The_Creator_2023_poster.jpg", rating: 8.1, genre: "Sci-Fi" },
{ id: 6, title: "Rebel Moon", poster: "https://upload.wikimedia.org/wikipedia/en/1/19/Rebel_moon_part1_poster.jpg", rating: 7.6, genre: "Adventure" },
];

const UPCOMING = [
 { id: 1, title: "Deadpool 3", poster: "https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg", release: "May 2024" },
{ id: 2, title: "Inside Out 2", poster: "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg", release: "June 2024" },
{ id: 3, title: "Bad Boys 4", poster: "https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg", release: "June 2024" },
{ id: 4, title: "A Quiet Place", poster: "https://upload.wikimedia.org/wikipedia/en/e/e7/A_Quiet_Place_Day_One_%282024%29_poster.jpg", release: "June 2024" },
];

const EXPERIENCES = [
  { icon: Film, title: "IMAX", desc: "Floor-to-ceiling screen with laser projection.", color: "from-blue-600 via-sky-500 to-cyan-400" },
  { icon: Award, title: "4DX", desc: "Motion seats, wind, water & scent effects.", color: "from-fuchsia-500 via-pink-500 to-rose-500" },
  { icon: Star, title: "Dolby Atmos", desc: "Immersive sound that moves around you.", color: "from-amber-500 via-orange-500 to-red-500" },
];

/* -------------------- Helpers -------------------- */
const cn = (...c) => c.filter(Boolean).join(" ");


/* -------------------- Exported Hybrid -------------------- */
export default function ShowcaseSectionsHybrid() {
  return (
    <>
      {/* Restore OLD: Now Showing grid */}
      <NowShowingGrid items={NOW_SHOWING} />

      {/* Restore OLD: Coming Soon grid */}
      <ComingSoonGrid items={UPCOMING} />

      {/* Keep NEW: Experiences (tilt rail) */}
      <ExperiencesRail items={EXPERIENCES} />

      {/* Keep NEW: Newsletter */}
      <NewsletterSplit />
    </>
  );
}

/* ======================= OLD Now Showing (Grid) ======================= */
function NowShowingGrid({ items }) {
  const [liked, setLiked] = useState({});
  const toggleLike = (id) => setLiked((p) => ({ ...p, [id]: !p[id] }));

  return (
    <section className="py-12 sm:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold">Now Showing</h2>
          <button className="text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-2">
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {items.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-white/5 hover:border-yellow-500/50 transition cursor-pointer"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              <button
                onClick={() => toggleLike(movie.id)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/10 hover:border-red-500/50 transition"
              >
                <Heart
                  className={cn("w-5 h-5", liked[movie.id] ? "fill-red-500 text-red-500" : "text-white")}
                />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300">
                <h3 className="font-bold mb-1 text-sm">{movie.title}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{movie.genre}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 rounded-full bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= Experiences (Tilt Rail - from V2) ======================= */
function ExperiencesRail({ items }) {
  const railRef = useRef(null);
  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-b from-black via-[#0A0E1E] to-gray-950">
      {/* background decorations */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_50%_10%,black,transparent)]">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.25em] text-white/60 mb-2">EXPERIENCES</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Choose your format</h2>
            <p className="mt-2 text-white/60 max-w-xl">
              From seat-shaking thrills to precision audio, pick how you want to feel the movie.
            </p>
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-8 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((exp, i) => (
            <TiltCard key={i} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ exp }) {
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const [lx, setLx] = useState(50);
  const [ly, setLy] = useState(50);
  const cardRef = useRef(null);

  const onMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - y) * 8, ry: (x - 0.5) * 8 });
    setLx(x * 100);
    setLy(y * 100);
  };
  const onLeave = () => setT({ rx: 0, ry: 0 });

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px] mx-auto"
    >
      <div className="absolute inset-0 rounded-3xl p-[1px] [background:conic-gradient(from_180deg,rgba(234,179,8,.35),rgba(56,189,248,.35),rgba(236,72,153,.35),rgba(234,179,8,.35))]" />
      <div
        className="relative h-[230px] sm:h-[260px] md:h-[280px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
        style={{
          transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
          transition: "transform .15s ease",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(180px circle at ${lx}% ${ly}%, rgba(255,255,255,.18), transparent 50%)`,
            mixBlendMode: "screen",
          }}
        />
        <div className={cn("absolute inset-0 opacity-30 mix-blend-screen bg-gradient-to-br", exp.color)} />
        <div className="relative z-10 h-full p-6 sm:p-8 flex items-center justify-between gap-6">
          <div>
            <exp.icon className="w-12 h-12 mb-3 text-white drop-shadow" />
            <h3 className="text-2xl sm:text-3xl font-extrabold">{exp.title}</h3>
            <p className="mt-2 text-white/85 max-w-md">{exp.desc}</p>
            <div className="mt-4 hidden sm:flex gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-black/40 border border-white/15">Laser</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-black/40 border border-white/15">Premium seats</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-black/40 border border-white/15">HDR</span>
            </div>
          </div>
          <a href="#" className="self-end mb-1 flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
            Learn more <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ======================= OLD Coming Soon (Grid) ======================= */
function ComingSoonGrid({ items }) {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold">Coming Soon</h2>
          <button className="text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-2">
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {items.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-white/5 hover:border-yellow-500/50 transition cursor-pointer"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                  {movie.release}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-sm sm:text-base">{movie.title}</h3>
                <button className="mt-3 w-full py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium hover:bg-white/20 transition">
                  Notify Me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================= Newsletter (Split - from V2) ======================= */
function NewsletterSplit() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto my-10 sm:my-16 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600">
        <div className="grid md:grid-cols-2">
          <div className="p-8 sm:p-12 text-black/90">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">Get Exclusive Offers</h2>
            <p className="text-black/80 text-lg">
              Subscribe and we’ll alert you for premieres, special screenings and discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/80 placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-black/40"
                required
              />
              <button className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900">
                Subscribe
              </button>
            </form>
          </div>
          <div className="relative min-h-[220px] md:min-h-full bg-black/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop')] bg-cover bg-center opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white/90 text-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
              Real-time premiere alerts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

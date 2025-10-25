// src/components/HeroSection.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import TrailerModal from "../Moviepage/TrailerModal";
import blackwidowHero from "../../assets/blackwidowHero.jpg";

/* --- Slides (3 movies) with YouTube trailerId --- */
const HERO_MOVIES = [
 {
    id: "black-widow",
    title: "BLACK WIDOW",
    backdrop: blackwidowHero, // <-- updated to local asset
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.4,
    premiere: "PREMIERING ON 6TH NOVEMBER",
    description:
      "At birth the Black Widow (aka Natasha Romanova) is given to the KGB, which grooms her to become its ultimate operative. When the U.S.S.R. breaks up, the government tries to kill her as the action moves to present-day New York, where she is a freelance operative.",
    trailerId: "Fp9pNPdNwjI",
  },


  {
    id: "dune-2",
    title: "DUNE: PART TWO",
    backdrop:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&h=900&fit=crop",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.7,
    premiere: "NOW SHOWING",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.",
    trailerId: "Way9Dexny3w",
  },
  {
    id: "oppenheimer",
    title: "OPPENHEIMER",
    backdrop:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&h=900&fit=crop",
    genres: ["Biography", "Drama", "History"],
    rating: 8.9,
    premiere: "CRITICALLY ACCLAIMED",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. A thrilling paradox of the enigmatic man who must risk destroying the world in order to save it.",
    trailerId: "uYPbbksJxIg",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // trailer modal state
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState(null);

  useEffect(() => {
    const t = setInterval(
      () => setCurrentSlide((p) => (p + 1) % HERO_MOVIES.length),
      6000
    );
    return () => clearInterval(t);
  }, []);

  const currentMovie = HERO_MOVIES[currentSlide];

  return (
    <section className="relative h-[85vh] sm:h-[88vh] lg:h-screen min-h-[620px] mt-16 sm:mt-20">
      {/* Background + overlays */}
      <div className="absolute inset-0">
        <img
          src={currentMovie.backdrop}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 overflow-visible">
        <div className="pt-10 md:pt-14 lg:pt-16 pb-10 md:pb-12 lg:pb-16 max-w-3xl md:max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
              {currentMovie.premiere}
            </span>
          </div>

          {/* Title — force one line on md+ for alignment */}
          <h1
            className="
              mt-4 font-extrabold tracking-tight leading-[0.95]
              text-[clamp(2.5rem,7.5vw,6.5rem)]
              md:whitespace-nowrap
            "
          >
            {currentMovie.title}
          </h1>

          {/* Genres */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {currentMovie.genres.map((g) => (
              <span
                key={g}
                className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Row: IMDb (left) + CTAs (right, nudged) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4">
            {/* IMDb */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">IMDb</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{currentMovie.rating}</div>
                <div className="text-xs text-white/60">/10</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 md:justify-end md:-mr-16 lg:-mr-28 xl:-mr-36 2xl:-mr-48">
              <button
                onClick={() => {
                  setTrailerMovie(currentMovie);
                  setShowTrailer(true);
                }}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition font-bold shadow-2xl shadow-yellow-500/30"
              >
                <span>WATCH TRAILER</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </button>

              <Link
                to={`/movie/${currentMovie.id}`}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition font-bold"
              >
                <span>BOOK NOW</span>
              </Link>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
            {currentMovie.description}
          </p>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {HERO_MOVIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all ${
              idx === currentSlide ? "w-12 bg-yellow-500" : "w-8 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Trailer Modal (same sizing fix as Movies/Details) */}
      <TrailerModal
        open={showTrailer}
        onClose={() => setShowTrailer(false)}
        movie={trailerMovie}
      />
    </section>
  );
}

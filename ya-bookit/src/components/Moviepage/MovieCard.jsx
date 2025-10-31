import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-xs text-white/60 mt-1">{movie.year} • {movie.genres.slice(0,2).join(", ")}</p>
      </div>
    </Link>
  );
}

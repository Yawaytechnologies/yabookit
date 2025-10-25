import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MovieDetailsBooking() {
  const { movieId } = useParams(); // Extract movieId from the URL
  
  // Sample movie data (replace this with actual data fetched from API)
  const movie = {
    id: movieId,
    title: "Black Panther: Wakanda Forever",
    poster: "https://image.tmdb.org/t/p/w500/7n8J7k9YoUyfM13Z0HMG79hF72g.jpg",
    genre: "Action, Adventure, Sci-Fi",
    description: "The Avengers struggle to keep the world safe, while a new threat rises.",
    runtime: "160 min",
    rating: "8.3",
  };

  // State to track selected seats
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prev) => {
      const next = new Set(prev);
      if (next.has(seat)) next.delete(seat); // Deselect if already selected
      else next.add(seat); // Select if not selected
      return next;
    });
  };

  return (
    <div className="bg-[#0B0F1E] text-white min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Movie Details Section */}
        <div className="flex flex-col sm:flex-row sm:gap-8 mb-8">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full sm:w-48 h-auto object-cover rounded-lg shadow-xl"
          />
          <div className="flex-1 mt-4 sm:mt-0">
            <h1 className="text-3xl font-semibold">{movie.title}</h1>
            <p className="text-sm text-white/80 mt-1">{movie.genre}</p>
            <p className="text-sm text-white/60 mt-2">{movie.description}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-yellow-400 font-semibold">Rating: {movie.rating}</span>
              <span className="text-sm text-white/60">• {movie.runtime}</span>
            </div>
          </div>
        </div>

        {/* Seat Selection Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>
          
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 30 }).map((_, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded-lg ${
                  selectedSeats.has(index + 1)
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-black transition-all duration-300"
                }`}
                onClick={() => toggleSeatSelection(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Proceed Button */}
          <div className="mt-6 text-right">
            <Link
              to={`/movie/${movie.id}/payment`}
              className="inline-flex items-center gap-2 text-lg bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-500 transition"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

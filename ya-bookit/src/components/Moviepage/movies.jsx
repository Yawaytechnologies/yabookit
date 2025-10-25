// Central movie data with YouTube trailer IDs.
// Replace trailerId values if you have different trailer links.

export const MOVIES = [
  {
    id: "dune-2",
    title: "DUNE: PART TWO",
    year: 2024,
    runtime: 166,
    rating: 8.7,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=900&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&h=900&fit=crop",
    trailerId: "Way9Dexny3w", // Official WB trailer ID (adjust if needed)
  },
  {
    id: "oppenheimer",
    title: "OPPENHEIMER",
    year: 2023,
    runtime: 180,
    rating: 8.9,
    genres: ["Biography", "Drama", "History"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=900&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&h=900&fit=crop",
    trailerId: "uYPbbksJxIg", // Official trailer ID
  },
  {
    id: "black-widow",
    title: "BLACK WIDOW",
    year: 2021,
    runtime: 134,
    rating: 8.4,
    genres: ["Action", "Adventure", "Sci-Fi"],
    languages: ["English", "Hindi"],
    formats: ["2D", "3D"],
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=900&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1600&h=900&fit=crop",
    trailerId: "Fp9pNPdNwjI", // Official trailer ID
  },
  {
    id: "interstellar",
    title: "INTERSTELLAR",
    year: 2014,
    runtime: 169,
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    languages: ["English", "Hindi"],
    formats: ["2D", "IMAX 2D"],
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=900&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&h=900&fit=crop",
    trailerId: "zSWdZVtXT7E",
  },
  // Add the rest you use on the grid if you want per‑movie trailer IDs
];

export const getMovieById = (id) => MOVIES.find((m) => m.id === id);
export const allGenres  = Array.from(new Set(MOVIES.flatMap((m) => m.genres)));
export const allLangs   = Array.from(new Set(MOVIES.flatMap((m) => m.languages)));
export const allFormats = Array.from(new Set(MOVIES.flatMap((m) => m.formats)));

// import React from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/Header";

// const demoMovies = [
//   { id: 1, title: "Dune: Part Two", rating: 8.6, poster: "https://image.tmdb.org/t/p/w342/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" },
//   { id: 2, title: "Oppenheimer", rating: 8.4, poster: "https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
//   { id: 3, title: "Interstellar", rating: 8.7, poster: "https://image.tmdb.org/t/p/w342/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
//   { id: 4, title: "John Wick 4", rating: 7.7, poster: "https://image.tmdb.org/t/p/w342/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
// ];

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#22d3ee22_0%,transparent_60%),radial-gradient(1000px_500px_at_90%_0%,#db277722_0%,transparent_55%),#0A0E17] text-white">
//       <Header />
//       <main className="mx-auto w-[min(1200px,92vw)] py-10">
//         {/* hero search */}
//         <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//           <h1 className="text-2xl font-semibold">Book movies the slick way.</h1>
//           <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
//             <input className="h-11 rounded-xl bg-white/5 px-3 text-sm placeholder:text-slate-400 border border-white/10" placeholder="Search movie" />
//             <input className="h-11 rounded-xl bg-white/5 px-3 text-sm placeholder:text-slate-400 border border-white/10" placeholder="City" />
//             <input type="date" className="h-11 rounded-xl bg-white/5 px-3 text-sm border border-white/10" />
//             <button className="h-11 rounded-xl bg-cyan-400/90 text-black font-medium hover:bg-cyan-300">Find Shows</button>
//           </div>
//         </section>

//         {/* trending */}
//         <section className="mt-10">
//           <h2 className="mb-4 text-lg text-slate-300">Trending</h2>
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//             {demoMovies.map((m) => (
//               <Link key={m.id} to={`/movie/${m.id}`} className="group">
//                 <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//                   <img src={m.poster} alt={m.title} className="aspect-[2/3] w-full object-cover transition group-hover:scale-105" />
//                 </div>
//                 <div className="mt-2 flex items-center justify-between">
//                   <p className="truncate text-sm">{m.title}</p>
//                   <span className="rounded-md bg-yellow-400/20 px-2 py-0.5 text-xs text-yellow-300">{m.rating}</span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

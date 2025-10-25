// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Header from "../components/Header";
// import SeatGrid from "../components/SeatGrid";

// export default function SeatSelect() {
//   const { showId } = useParams();
//   const [selected, setSelected] = useState([]);
//   const [total, setTotal] = useState(0);

//   return (
//     <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#22d3ee22_0%,transparent_60%),radial-gradient(1000px_500px_at_90%_0%,#db277722_0%,transparent_55%),#0A0E17] text-white">
//       <Header />
//       <main className="mx-auto w-[min(1200px,92vw)] py-8">
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//           <h1 className="text-lg font-semibold">Select Seats</h1>
//           <p className="text-sm text-slate-300">Show: {showId}</p>

//           <div className="mt-6 overflow-x-auto">
//             <div className="min-w-[680px]">
//               <SeatGrid
//                 rows={10}
//                 cols={12}
//                 aisleAfter={[6]}
//                 premiumRows={["A","B","C"]}
//                 onChange={(ids, sum) => { setSelected(ids); setTotal(sum); }}
//               />
//             </div>
//           </div>

//           {/* sticky footer style CTA */}
//           <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0E1423]/70 p-4">
//             <div className="text-sm text-slate-300">
//               {selected.length ? (
//                 <>
//                   Selected: <span className="text-white">{selected.join(", ")}</span>
//                 </>
//               ) : "Choose your seats"}
//             </div>
//             <button
//               disabled={!selected.length}
//               className={`h-10 rounded-xl px-5 font-medium transition
//                 ${selected.length ? "bg-cyan-400 text-black hover:bg-cyan-300" : "bg-white/10 text-slate-400 cursor-not-allowed"}`}>
//               Pay ₹{total || 0}
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

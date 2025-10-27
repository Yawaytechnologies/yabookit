import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { LottieLoader } from "./components/loaders/LottieLoader";

/* Lazy pages (must have default exports) */
const Landing = lazy(() => import("./pages/Landing"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const MovieDetailsBooking = lazy(() => import("./components/MovieDetailsBooking")); // <-- fixed

/* Smooth scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* Polished popcorn fallback */
function Fallback() {
  return (
    <LottieLoader
      src="https://lottie.host/5ef439ac-e5e3-4146-a6b2-baf556464c28/CFaaH3yoiE.lottie"
      size={600} // big
      message="Finding showtimes & the best seats…"
      className="min-h-screen bg-neutral-950 text-white" // full screen, readable text
    />
  );
}

/* Friendly 404 page */
function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-semibold">404</h1>
        <p className="mt-2 text-slate-300">We couldn’t find that page.</p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-xl bg-cyan-400 px-5 py-2.5 font-medium text-black hover:bg-cyan-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter /* add basename="/subpath" if deploying under a subpath */>
      <ScrollToTop />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/MovieDetails" element={<MovieDetails />} />
          <Route path="/booking/:movieId" element={<MovieDetailsBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

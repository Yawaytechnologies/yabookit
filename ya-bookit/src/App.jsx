import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";

/* Lazy pages (faster initial load) */
const Landing = lazy(() => import("./pages/Landing"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const MovieDetailsBooking = lazy(() => import("../src/components/MovieDetailsBooking"));

/* Smooth scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* Cute fallback while pages load */
function Fallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-transparent text-white">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-xl">
        <div className="h-4 w-40 animate-pulse rounded bg-white/10 mb-3" />
        <div className="h-3 w-64 animate-pulse rounded bg-white/10 mb-2" />
        <div className="h-3 w-56 animate-pulse rounded bg-white/10" />
      </div>
    </div>
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
    <BrowserRouter /* if deploying to a subpath, add basename="/subpath" */>
      <ScrollToTop />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/MovieDetails" element={<MovieDetails />} />
          <Route path="/MovieDetailsBooking" element={<MovieDetailsBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

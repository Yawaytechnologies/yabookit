// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link, Outlet } from "react-router-dom";
import { SeatMapLoader } from "./components/loaders/SeatMapLoader";
import ShowtimesPage from "./pages/ShowtimesPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import HeaderBar from "./components/Homepage/HeaderBar";
import Footer from "./components/Homepage/Footer";
import Footer from "./components/Homepage/Footer";
import AuthPage from "./pages/AuthPage";


/* Lazy pages (must have default exports) */
const Landing = lazy(() => import("./pages/Landing"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
// const MovieDetailsBooking = lazy(() => import("./components/MovieDetailsBooking"));
// ⬇️ match your real file name
const MovieOverviewPage = lazy(() => import("./pages/MovieOverview"));
const EventPage = lazy(() => import("./pages/EventPage"));
const StreamPage = lazy(() => import("./pages/StreamPage"));

/* Smooth scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

/* Polished popcorn fallback */

function BodyFallback() {
  return (
    <SeatMapLoader
      message="Finding showtimes & the best seats…"
      className="bg-neutral-950 text-white"
      size={72}          // bigger/smaller overall
      rows={4}
      cols={12}
      withAisle
      showLegend
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

function Layout() {
  // keep this in one place so you can reuse
  const HEADER_H = 72; // px (adjust to your header height)

  return (
    <div className="min-h-screen bg-[#0b0f1e] text-white">
      {/* Fixed header on top */}
      <div className="fixed inset-x-0 top-0 z-[1000]">
        {/* optional subtle backdrop & border to ensure readability */}
        <div className="backdrop-blur supports-[backdrop-filter]:bg-black/35 bg-black/60 border-b border-white/10">
          <HeaderBar />
        </div>
      </div>

      {/* App body with top padding = header height so content never goes under header */}
      <div style={{ paddingTop: HEADER_H }} className="min-h-screen flex flex-col">
        <Suspense fallback={<BodyFallback />}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/MovieDetails" element={<MovieDetails />} />
          {/* <Route path="/booking/:movieId" element={<MovieDetailsBooking />} /> */}
          <Route path="/movies/:id" element={<MovieOverviewPage />} />
          <Route path="/movie/:id/showtimes" element={<ShowtimesPage />} />
          <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
          <Route path="/events" element={<EventPage/>} />
          <Route path="/stream" element={<StreamPage/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

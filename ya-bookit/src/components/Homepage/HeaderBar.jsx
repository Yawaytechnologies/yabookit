import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function HeaderBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-0"> {/* no outer padding */}
        {/* rounded dark container */}
        <div className="mt-3 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0F1E]/90 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)]">
          <div className="h-14 sm:h-16 px-3 sm:px-6 lg:px-8 flex items-center justify-between">
             {/* logo (image) */}
            <Link
              to="/"
              className="flex items-center gap-2"
              aria-label="CINE MOVIES – Home"
            >
              <img
                src={Logo}
                alt="CINE MOVIES"
                className="h-22 sm:h-28 w-auto object-contain select-none pointer-events-none"
                draggable="false"
              />
              {/* For accessibility, you can add a hidden text label: */}
              <span className="sr-only">CINE MOVIES</span>
            </Link>

            {/* nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link to="/" className="text-white">
                <span className="text-yellow-400 mr-1">[</span>
                <span>HOME</span>
                <span className="text-yellow-400 ml-1">]</span>
              </Link>
              <Link to="/MovieDetails" className="text-white/70 hover:text-white transition">MOVIES</Link>
              <Link to="/theatres" className="text-white/70 hover:text-white transition">THEATRES</Link>
              <Link to="/offers" className="text-white/70 hover:text-white transition">OFFERS</Link>
            </nav>

            {/* actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/buy"
                className="hidden sm:inline-flex items-center rounded-full bg-yellow-400 text-black px-4 py-2 text-sm font-semibold shadow hover:bg-yellow-300 transition"
              >
                BUY TICKETS
              </Link>
              <Link to="/login" className="text-white/90 hover:text-yellow-400 text-sm font-semibold">
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

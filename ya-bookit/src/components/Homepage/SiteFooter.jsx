// src/components/Homepage/SiteFooter.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-white/10 bg-[#0a0e1a] text-white/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-white font-semibold">Yabookit</h4>
            <p className="mt-2 text-sm text-white/60">
              Book movies, events and more with a polished, fast experience.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold">Browse</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/movie/1/showtimes" className="hover:text-white">Showtimes</Link></li>
              <li><Link to="/MovieDetails" className="hover:text-white">Movie Details</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold">Company</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold">Legal</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/50">
          <p>© {year} Yabookit. All rights reserved.</p>
          <p className="text-white/40">Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}


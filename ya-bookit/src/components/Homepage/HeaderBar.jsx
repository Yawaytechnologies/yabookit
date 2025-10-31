import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";

function NavItem({ to, label, end = false, onClick }) {
  return (
    <NavLink to={to} end={end} onClick={onClick}>
      {({ isActive }) => (
        <span
          className={
            "group relative inline-flex items-baseline text-sm font-medium transition-colors duration-150 " +
            (isActive ? "text-white" : "text-white/70 hover:text-white")
          }
          aria-current={isActive ? "page" : undefined}
        >
          {isActive && <span className="text-yellow-400 mr-1">[</span>}
          <span className="relative">
            <span>{label}</span>
            <span
              className={
                "pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left " +
                "transition-transform duration-150 ease-out " +
                (isActive
                  ? "bg-yellow-400 scale-x-100"
                  : "bg-white/60 scale-x-0 group-hover:scale-x-100")
              }
            />
          </span>
          {isActive && <span className="text-yellow-400 ml-1">]</span>}
        </span>
      )}
    </NavLink>
  );
}

export default function HeaderBar() {
  const [merged, setMerged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setMerged((window.scrollY || 0) > 8);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-0">
        <div
          className={[
            "border bg-[#0B0F1E]/90 backdrop-blur supports-[backdrop-filter]:backdrop-saturate-150",
            "transition-all duration-200 ease-out motion-reduce:transition-none",
            merged
              ? "mt-0 rounded-none border-white/5 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.7)] bg-[#0B0F1E]/95"
              : "mt-3 rounded-2xl sm:rounded-3xl border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]",
          ].join(" ")}
          style={{ willChange: "margin, border-radius, background-color, box-shadow" }}
        >
          <div
            className={[
              "flex items-center justify-between",
              // SAME height/padding in both states -> no size jump
              "h-14 sm:h-16 px-3 sm:px-6 lg:px-8",
            ].join(" ")}
          >
            {/* logo (no size change on merge) */}
            <Link to="/" className="flex items-center gap-2" aria-label="yabookit">
              <img
                src={Logo}
                alt="yabookit logo"
                className="h-11 sm:h-30 w-auto object-contain select-none pointer-events-none"
                draggable="false"
              />
            
            </Link>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavItem to="/" label="HOME" end />
              <NavItem to="/MovieDetails" label="MOVIES" />
              <NavItem to="/theatres" label="THEATRES" />
              <NavItem to="/offers" label="OFFERS" />
            </nav>

            {/* actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/buy"
                className="hidden sm:inline-flex items-center rounded-full bg-yellow-400 text-black text-sm font-semibold shadow px-4 py-2 transition-colors duration-150 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
              >
                BUY TICKETS
              </Link>

              {/* mobile menu button */}
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:text-white border border-white/10 bg-white/5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <span className="sr-only">Toggle navigation</span>
                <svg
                  className={"h-5 w-5 transition-transform duration-150 " + (menuOpen ? "rotate-90" : "rotate-0")}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {menuOpen ? (
                    <path d="M6 6 L18 18 M6 18 L18 6" />
                  ) : (
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  )}
                </svg>
              </button>

              <Link
                to="/login"
                className="hidden sm:inline text-white/90 hover:text-yellow-400 text-sm font-semibold"
              >
                LOGIN
              </Link>
            </div>
          </div>

          {/* mobile nav panel */}
          <div
            id="mobile-nav"
            className={[
              "md:hidden overflow-hidden origin-top transition-transform duration-150 ease-out motion-reduce:transition-none",
              menuOpen ? "scale-y-100" : "scale-y-0",
            ].join(" ")}
          >
            <div className="px-3 sm:px-6 pb-3">
              <div className="grid gap-2 text-sm">
                <NavItem to="/" label="HOME" end onClick={handleNavClick} />
                <NavItem to="/MovieDetails" label="MOVIES" onClick={handleNavClick} />
                <NavItem to="/theatres" label="THEATRES" onClick={handleNavClick} />
                <NavItem to="/offers" label="OFFERS" onClick={handleNavClick} />
                <div className="flex gap-3 pt-2">
                  <Link
                    to="/buy"
                    onClick={handleNavClick}
                    className="inline-flex items-center rounded-full bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-300 transition-colors duration-150"
                  >
                    BUY TICKETS
                  </Link>
                  <Link
                    to="/login"
                    onClick={handleNavClick}
                    className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-white/90 hover:text-white hover:bg-white/5 transition-colors duration-150"
                  >
                    LOGIN
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* end mobile nav */}
        </div>
      </div>
    </header>
  );
}

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
  const menuBtnRef = useRef(null); // <-- JS-safe ref (no generics)

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

  const handleNavClick = () => {
    setMenuOpen(false);
    if (menuBtnRef.current) menuBtnRef.current.focus();
  };

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
          style={{ willChange: "margin, border-radius" }}
        >
          <div
            className={[
              "flex items-center justify-between",
              // tighter bar height & padding on mobile
              "h-12 sm:h-14 px-2 sm:px-4 lg:px-6",
            ].join(" ")}
          >
            {/* Logo: bigger on mobile, fits compact bar */}
            <img
  src={Logo}
  alt="yabookit logo"
  className="h-25 sm:h-[3rem] md:h-[3.5rem] lg:h-[6rem] w-auto object-contain select-none pointer-events-none"
  draggable="false"
/>


            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              <NavItem to="/" label="HOME" end />
              <NavItem to="/MovieDetails" label="MOVIES" />
              <NavItem to="/events" label="EVENTS" />
              <NavItem to="/stream" label="STREAM" />
            </nav>

            {/* actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/MovieDetails"
                className="hidden sm:inline-flex items-center rounded-full bg-yellow-400 text-black px-4 py-2 text-sm font-semibold shadow hover:bg-yellow-300 transition"
              >
                BUY TICKETS
              </Link>

              {/* mobile menu button */}
              <button
                ref={menuBtnRef}
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
                to="/auth"
                className="hidden sm:inline text-white/90 hover:text-yellow-400 text-sm font-semibold"
              >
                LOGIN
              </Link>
            </div>
          </div>

          {/* mobile nav panel — collapses in layout when closed */}
          <div
            id="mobile-nav"
            aria-hidden={!menuOpen}
            className={[
              "md:hidden overflow-hidden transition-[max-height] duration-200 ease-out",
              menuOpen ? "max-h-[70vh]" : "max-h-0 pointer-events-none",
            ].join(" ")}
          >
            <div className={["px-3 sm:px-6", menuOpen ? "py-3" : "py-0"].join(" ")}>
              <div className="grid gap-2 text-sm">
                <NavItem to="/" label="HOME" end onClick={handleNavClick} />
                <NavItem to="/MovieDetails" label="MOVIES" onClick={handleNavClick} />
                <NavItem to="/events" label="EVENTS" onClick={handleNavClick} />
                <NavItem to="/stream" label="STREAM" onClick={handleNavClick} />
                <div className="flex gap-2 pt-2">
                  <Link
                    to="/MovieDetails"
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

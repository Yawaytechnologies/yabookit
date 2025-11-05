import React from "react";
import { motion } from "framer-motion";

/* ========= Helpers ========= */
const _cn = (...c) => c.filter(Boolean).join(" ");

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 }
};

const hoverLift = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.98 }
};

const LinkItem = ({ href = "#", children }) => (
  <li>
    <motion.a
      {...hoverLift}
      href={href}
      className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
    >
      {children}
    </motion.a>
  </li>
);

const Section = ({ title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, delay }}
  >
    <h4 className="font-semibold text-white tracking-wide mb-4 flex items-center gap-2">
      <span className="inline-block w-1.5 h-4 bg-yellow-400 rounded" />
      {title}
    </h4>
    <ul className="space-y-2 text-sm">{children}</ul>
  </motion.div>
);

function SocialIcon({ label, children, href = "#" }) {
  return (
    <motion.a
      {...hoverLift}
      href={href}
      aria-label={label}
      className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
    >
      {/* ring pulse */}
      <span className="absolute inset-0 rounded-full shadow-[0_0_40px_2px_rgba(250,204,21,0.05)]" />
      {children}
    </motion.a>
  );
}

/* ========= Inline Icons ========= */
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.92h-2.34V22C18.34 21.2 22 17.06 22 12.06Z" fill="currentColor" />
  </svg>
);

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.75-.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor" />
  </svg>
);

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 3h3.6l5.04 6.9 5.52-6.9H21l-7.26 9.18L21 21h-3.6l-5.22-7.17L6.24 21H3l7.44-9.45L3 3Z" fill="currentColor" />
  </svg>
);

const IconYoutube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M23 7.5s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17.6 4 12 4 12 4s-5.6 0-8.1.2c-.4.1-1.3.1-2.1 1C1.2 5.9 1 7.5 1 7.5S.8 9.5.8 11.4v1.3c0 1.9.2 3.9.2 3.9s.2 1.6.8 2.3c.8.9 1.9.8 2.4.9C6.3 19.9 12 20 12 20s5.6 0 8.1-.2c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-2 .2-3.9v-1.3c0-1.9-.2-3.9-.2-3.9ZM9.8 15.2v-6l6 3-6 3Z" fill="currentColor" />
  </svg>
);

/* ========= Select ========= */
const Select = ({ label, children, id }) => (
  <label className="relative inline-flex items-center" htmlFor={id}>
    <span className="sr-only">{label}</span>
    <select
      id={id}
      className="appearance-none bg-white/5 text-white/80 text-sm rounded-md px-3 py-2 pr-8 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20"
    >
      {children}
    </select>
    <svg
      className="pointer-events-none absolute right-2 h-4 w-4 text-white/60"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 0 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  </label>
);

/* ========= Ticket CTA (movie-booking themed) ========= */
function TicketCTA() {
  return (
    <motion.div
      {...fadeUp}
     
    >
      {/* perforation dots */}
    
      <div className="pointer-events-none absolute left-28 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border border-white/15" />
      <div className="pointer-events-none absolute left-28 bottom-0 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-black border border-white/15" />

     
    </motion.div>
  );
}

/* ========= Cinemas Marquee ========= */
function CinemasMarquee() {
  const items = ["IMAX", "4DX", "PVR", "INOX", "Cinepolis", "Dolby Atmos", "ScreenX", "Luxe"];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap text-white/50 text-xs sm:text-sm"
        animate={{ x: [0, -400] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((it, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/30" />{it}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ========= Footer ========= */
export default function Footer() {
  return (
    <footer className="relative bg-black text-white/80 border-t border-white/10 overflow-hidden">
      {/* Ambient spotlights (subtle) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Ticket CTA */}
        <TicketCTA />

        {/* Top grid */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Section title="Company" delay={0.05}>
            <LinkItem href="#">About Us</LinkItem>
            <LinkItem href="#">Careers</LinkItem>
            <LinkItem href="#">Press</LinkItem>
            <LinkItem href="#">Investor Relations</LinkItem>
            <LinkItem href="#">Corporate</LinkItem>
          </Section>

          <Section title="Theatres" delay={0.1}>
            <LinkItem href="#">Partner with Us</LinkItem>
            <LinkItem href="#">Theatre Owners</LinkItem>
            <LinkItem href="#">Advertise</LinkItem>
            <LinkItem href="#">Corporate Bookings</LinkItem>
          </Section>

          <Section title="Movies" delay={0.15}>
            <LinkItem href="#">Now Showing</LinkItem>
            <LinkItem href="#">Coming Soon</LinkItem>
            <LinkItem href="#">Movie Reviews</LinkItem>
            <LinkItem href="#">Trailers</LinkItem>
          </Section>

          <Section title="Support" delay={0.2}>
            <LinkItem href="#">Help Center</LinkItem>
            <LinkItem href="#">Contact Us</LinkItem>
            <LinkItem href="#">Feedback</LinkItem>
            <LinkItem href="#">Report Issue</LinkItem>
          </Section>

          <Section title="Legal" delay={0.25}>
            <LinkItem href="#">Terms of Service</LinkItem>
            <LinkItem href="#">Privacy Policy</LinkItem>
            <LinkItem href="#">Cookie Policy</LinkItem>
            <LinkItem href="#">Refund Policy</LinkItem>
          </Section>
        </motion.div>

        {/* Divider with animated gradient */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Utility row */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Country/Language */}
          <div className="flex items-center gap-4">
            <Select label="Select country" id="country">
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </Select>
            <Select label="Select language" id="language">
              <option>English</option>
              <option>हिन्दी</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
            </Select>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <SocialIcon label="Facebook"><IconFacebook /></SocialIcon>
            <SocialIcon label="X / Twitter"><IconX /></SocialIcon>
            <SocialIcon label="Instagram"><IconInstagram /></SocialIcon>
            <SocialIcon label="YouTube"><IconYoutube /></SocialIcon>
          </div>
        </div>

        {/* Cinemas marquee */}
        <div className="mt-6">
          <CinemasMarquee />
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs sm:text-sm text-white/50">
          © 2024 ya-bookit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

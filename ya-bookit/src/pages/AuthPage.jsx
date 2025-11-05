import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  User as UserIcon,
  Film,
  Ticket,
  Loader2,
  ChevronLeft,
  CheckCircle2,
  Apple, // using lucide Apple icon for reliability
} from "lucide-react";

/* ========================= Helpers ========================= */
const cx = (...c) => c.filter(Boolean).join(" ");

function StrengthBar({ value = 0 }) {
  const color =
    value > 75
      ? "bg-emerald-400"
      : value > 45
      ? "bg-yellow-400"
      : value > 25
      ? "bg-orange-400"
      : "bg-rose-400";
  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className={cx("h-full rounded-full transition-all", color)}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

function estimateStrength(pw = "") {
  let score = 0;
  if (pw.length >= 8) score += 30;
  if (/[A-Z]/.test(pw)) score += 20;
  if (/[0-9]/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;
  if (pw.length >= 12) score += 10;
  return Math.min(100, score);
}

/* ========================= Layout ========================= */
export default function AuthPage() {
  const [params] = useSearchParams();
  const initialMode = params.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState(initialMode);

  return (
    <main className="relative min-h-screen bg-[#070B14] text-white overflow-hidden">
      {/* Ambient background */}
      <BackgroundStage />

      {/* pulled up & tighter vertical padding */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 -mt-4 sm:-mt-6">
        <nav className="flex items-center justify-between">
          {/* Add back/home, logo, or leave blank */}
        </nav>

        {/* more compact gaps */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left: Brand + pitch */}
          <LeftPitch />

          {/* Right: Card */}
          <AuthCard mode={mode} onModeChange={setMode} />
        </div>
      </div>
    </main>
  );
}

/* ========================= Decorative Background ========================= */
function BackgroundStage() {
  return (
    <>
      {/* glow blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl"
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* light sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* diagonal beams */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute -left-20 top-0 h-[140%] w-1 rotate-45 bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute left-16 top-0 h-[140%] w-1 rotate-45 bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute left-52 top-0 h-[140%] w-1 rotate-45 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </>
  );
}

/* ========================= Left Pitch ========================= */
function LeftPitch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="order-2 lg:order-1"
    >
      <div className="max-w-lg">
        <div className="flex items-center gap-3 text-white/70">
          <Film className="h-5 w-5" />
          <span className="text-sm tracking-wide">Welcome to YaBookIt</span>
        </div>
        {/* smaller on mobile, same punch on large */}
        <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
          Book movies faster than ever
        </h1>
        <p className="mt-2 text-white/70 text-sm sm:text-base">
          Sign in to sync favorites, unlock offers, and pick seats in seconds.
          New here? Create an account in under a minute.
        </p>

        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-white/80">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Wallet &
            instant refunds
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Saved seats &
            theatres
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Multi-language
            support
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Exclusive
            member offers
          </li>
        </ul>
      </div>

      {/* decorative ticket — hidden on small for compactness */}
      <motion.div
        className="mt-6 hidden md:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="absolute inset-y-0 left-28 w-px bg-white/10" />
          <div className="absolute left-28 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#070B14] border border-white/15" />
          <div className="absolute left-28 bottom-0 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#070B14] border border-white/15" />

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/20 border border-yellow-400/30">
              <Ticket className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="font-semibold">Skip the queue</p>
              <p className="text-white/60 text-sm">
                Seat selection • Food combos • 1-click checkout
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ========================= Auth Card ========================= */
function AuthCard({ mode, onModeChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="order-1 lg:order-2"
    >
      {/* tighter card padding */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-5 sm:px-6 sm:py-6 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
        {/* Tabs */}
        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
          <TabButton
            active={mode === "signin"}
            onClick={() => onModeChange("signin")}
          >
            Sign In
          </TabButton>
          <TabButton
            active={mode === "signup"}
            onClick={() => onModeChange("signup")}
          >
            Create Account
          </TabButton>
        </div>

        <div className="mt-5">
          {mode === "signin" ? (
            <SigninForm />
          ) : (
            <SignupForm switchToSignin={() => onModeChange("signin")} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        // slightly smaller tabs
        "relative flex-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition",
        active ? "bg-black text-white shadow-inner" : "text-white/70 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

/* ========================= Sign In ========================= */
function SigninForm() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Hook up to your auth API here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Email" icon={<Mail className="h-4 w-4" />}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-transparent outline-none"
        />
      </Field>

      <Field label="Password" icon={<Lock className="h-4 w-4" />}>
        <input
          type={show ? "text" : "password"}
          required
          placeholder="••••••••"
          className="w-full bg-transparent outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-white/60 hover:text-white"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex items-center gap-2 select-none">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-black/20"
          />
          Remember me
        </label>
        <Link
          to="/forgot-password"
          className="text-white/80 hover:text-white underline/30 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-300 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        <span>Sign In</span>
      </button>

      <Divider label="or continue with" />
      <SocialButtons />

      <p className="text-center text-sm text-white/70">
        New to YaBookIt?{" "}
        <button
          type="button"
          className="underline hover:text-white"
          onClick={() => (window.location.search = "?mode=signup")}
        >
          Create an account
        </button>
      </p>

      <GuestHint />
    </form>
  );
}

/* ========================= Sign Up ========================= */
function SignupForm({ switchToSignin }) {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const strength = useMemo(() => estimateStrength(pw), [pw]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" icon={<UserIcon className="h-4 w-4" />}>
          <input
            type="text"
            required
            placeholder="Natasha"
            className="w-full bg-transparent outline-none"
          />
        </Field>
        <Field label="Last name" icon={<UserIcon className="h-4 w-4" />}>
          <input
            type="text"
            required
            placeholder="Romanoff"
            className="w-full bg-transparent outline-none"
          />
        </Field>
      </div>

      <Field label="Email" icon={<Mail className="h-4 w-4" />}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="w-full bg-transparent outline-none"
        />
      </Field>

      <Field label="Mobile (optional)" icon={<Phone className="h-4 w-4" />}>
        <input
          type="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          className="w-full bg-transparent outline-none"
        />
      </Field>

      <Field label="Password" icon={<Lock className="h-4 w-4" />}>
        <input
          type={show ? "text" : "password"}
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="At least 8 characters"
          className="w-full bg-transparent outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-white/60 hover:text-white"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </Field>
      <StrengthBar value={strength} />
      <p className="text-[11px] text-white/60">
        Use 8+ characters with a mix of letters, numbers & symbols.
      </p>

      <label className="mt-1 inline-flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-black/20"
        />
        <span>
          I agree to the{" "}
          <Link to="/terms" className="underline hover:text-white">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-300 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        <span>Create Account</span>
      </button>

      <Divider label="or sign up with" />
      <SocialButtons />

      <p className="text-center text-sm text-white/70">
        Already have an account?{" "}
        <button
          type="button"
          className="underline hover:text-white"
          onClick={switchToSignin}
        >
          Sign in
        </button>
      </p>

      <GuestHint />
    </form>
  );
}

/* ========================= Reusable Bits ========================= */
function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/70">
        {label}
      </span>
      {/* slightly shorter inputs */}
      <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-3 py-2 focus-within:border-white/30">
        <div className="text-white/60">{icon}</div>
        <div className="flex-1 flex items-center gap-2">{children}</div>
      </div>
    </label>
  );
}

function Divider({ label }) {
  return (
    <div className="relative my-4 text-center">
      <div className="absolute inset-0 flex items-center">
        <div className="h-px w-full bg-white/10" />
      </div>
      <span className="relative bg-[#070B14] px-3 text-xs text-white/50">
        {label}
      </span>
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm hover:bg-white/10">
        {/* Google G */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#EA4335"
            d="M12 10.2v3.9h5.5c-.2 1.3-1.7 3.9-5.5 3.9-3.3 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c6.9 0 9.2-4.8 8.5-9.2H12z"
          />
        </svg>
        Continue with Google
      </button>
      <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm hover:bg-white/10">
        <Apple className="h-4 w-4" />
        Continue with Apple
      </button>
    </div>
  );
}

function GuestHint() {
  return (
    <div className="mt-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
      >
        <Ticket className="h-4 w-4" /> Continue as guest (browse movies)
      </Link>
    </div>
  );
}

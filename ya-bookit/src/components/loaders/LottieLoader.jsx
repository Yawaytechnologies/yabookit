// src/components/loaders/LottieLoader.jsx
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
  }, []);
  return prefers;
}

export function LottieLoader({
  src = "/animations/popcorn.lottie",
  size = 420,
  message,
  className = "",
}) {
  const reduceMotion = usePrefersReducedMotion();
  const text =
    typeof message === "string" && message.trim() !== ""
      ? message
      : "Finding showtimes & the best seats…";

  return (
    <div
      // ✅ switch to flex so items never overlap; keep full control via className
      className={`relative flex min-h-[60vh] flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      {reduceMotion ? (
        <div style={{ width: size, height: size }} className="grid place-items-center">
          <span className="text-7xl">🍿</span>
        </div>
      ) : (
        // Optional: pointer-events-none so it can’t block clicks/selection over the text
        <DotLottieReact
          src={src}
          loop
          autoplay
          style={{ width: size, height: size, pointerEvents: "none" }}
        />
      )}
      {/* ✅ force visible text color + z-index in case the player establishes a stacking context */}
      <p className="z-10 text-base font-medium text-white">{text}</p>
    </div>
  );
}

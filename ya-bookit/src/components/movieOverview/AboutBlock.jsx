import React from "react";

export default function AboutBlock({ text }) {
  if (!text) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-3">About the movie</h2>
      <p className="text-[15px] leading-7 text-white/80">
        {text}
      </p>
      <div className="mt-6 h-px bg-white/10" />
    </section>
  );
}

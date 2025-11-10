import React from "react";

/**
 * CrewList
 * Props:
 *  - title?: string (defaults to "Crew")
 *  - people: [{ name, role, photo }]
 */
export default function CrewList({ title = "Crew", people = [] }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {people.map((p, i) => (
          <div key={`${p.name}-${i}`} className="text-center">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border border-white/10 mx-auto">
              <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-2 text-sm font-medium text-white">{p.name}</div>
            <div className="text-xs text-white/70">{p.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

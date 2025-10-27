export function ProgressBar({ label = "Loading…" }) {
  return <div className="progress" role="status" aria-live="polite" aria-label={label} />;
}

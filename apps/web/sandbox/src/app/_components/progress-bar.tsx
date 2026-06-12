export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track" aria-label={`${value}% complete`}>
      <span style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  );
}

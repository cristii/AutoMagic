export function TinyBars({ values }: { values: number[] }) {
  const max = Math.max(...values);

  return (
    <div className="tiny-bars" aria-label="Mini bar chart">
      {values.map((value, index) => (
        <span key={`${value}-${index}`} style={{ height: `${(value / max) * 100}%` }} />
      ))}
    </div>
  );
}

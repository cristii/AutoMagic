export function Sparkline({ values, tone = "gold" }: { values: number[]; tone?: string }) {
  const points = values
    .map((value, index) => `${(index / (values.length - 1)) * 100},${80 - value}`)
    .join(" ");

  return (
    <svg className={`sparkline ${tone}`} viewBox="0 0 100 84" role="img" aria-label="Trend line">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

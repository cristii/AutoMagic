import { StudioIcon } from "../icons";
import { Sparkline } from "./sparkline";
import { TinyBars } from "./tiny-bars";

export function MetricCard({
  label,
  value,
  detail,
  icon,
  tone = "gold",
  series,
  bars,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone?: string;
  series?: number[];
  bars?: number[];
}) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-label">
        <StudioIcon name={icon} />
        <span>{label}</span>
      </div>
      <div className="metric-body">
        <div>
          <strong>{value}</strong>
          <small>{detail}</small>
        </div>
        {series ? <Sparkline values={series} tone={tone} /> : null}
        {bars ? <TinyBars values={bars} /> : null}
      </div>
    </article>
  );
}

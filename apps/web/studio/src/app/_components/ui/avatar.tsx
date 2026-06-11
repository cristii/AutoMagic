export function Avatar({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) {
  return <span className={`avatar ${size}`}>{label}</span>;
}

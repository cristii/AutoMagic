export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="am-loading-state" role="status" aria-live="polite">
      <span className="am-loading-dot" />
      <span>{label}</span>
    </div>
  );
}

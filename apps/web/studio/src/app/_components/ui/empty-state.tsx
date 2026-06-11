import { StudioIcon } from "../icons";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="empty-state">
      <StudioIcon name="spark" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

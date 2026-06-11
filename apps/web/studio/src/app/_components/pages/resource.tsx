import { resourcePages } from "../../_data/studio";
import { EmptyState, PageHeader, Panel } from "../ui";
import { SummaryCard } from "./shared";

export function ResourcePage({ type }: { type: keyof typeof resourcePages }) {
  const page = resourcePages[type];

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <div className="resource-grid">
        {page.stats.map(([label, value]) => (
          <SummaryCard key={label} title={value} label={label} />
        ))}
      </div>
      <Panel title={`${page.title} queue`}>
        <EmptyState
          title={`${page.title} workspace`}
          description="This route is wired into the Studio shell and ready for connected product data."
        />
      </Panel>
    </>
  );
}

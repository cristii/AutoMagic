import { ClientsPage } from "../../../_components/pages";

export default async function ClientRoute({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  return <ClientsPage clientId={clientId} />;
}

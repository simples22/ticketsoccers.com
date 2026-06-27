import { protectRoute } from "@/lib/auth/guards";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await protectRoute();
  const { id } = await params;
  // TODO: fetch the order from your DB by id and render items + e-tickets.
  return (
    <main className="tsln-container">
      <h1 className="tsln-title">Order #{id}</h1>
      <p className="tsln-subtitle">Order details and e-tickets render here.</p>
    </main>
  );
}
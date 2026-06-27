import { protectRoute } from "@/lib/auth/guards";

export default async function TicketsPage() {
  const session = await protectRoute();
  // TODO: list the user's orders/e-tickets from your DB using session.userId.
  return (
    <main className="tsln-container">
      <h1 className="tsln-title">My tickets</h1>
      <p className="tsln-subtitle">Signed in as {session.email}. Your tickets will appear here.</p>
    </main>
  );
}
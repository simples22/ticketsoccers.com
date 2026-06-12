import SuggestedEvents from "@/components/public/events/SuggestedEvents";

export default function SuggestedEventsPage() {
  return (
    <main className="tslnSuggestedPage">
      <div className="tslnSuggestedContainer">
        <h1>
          Suggested Soccer Events
        </h1>
        <p>
          Discover recommended soccer matches, tournaments, and live events.
        </p>
        <SuggestedEvents />
      </div>
    </main>
  );
}
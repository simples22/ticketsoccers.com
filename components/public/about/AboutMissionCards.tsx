import UiTitle from "@/components/ui/UiTitle";

const cards = [
  {
    title: "Our Mission",
    content:
      "Our mission is to help people discover events that match their interests while providing clear access to sports, concerts, festivals, family events, theatre performances, comedy shows, and live entertainment opportunities.",
  },
  {
    title: "Innovation & Growth",
    content:
      "Ticketsoccers, ticketsoccers.com continuously invests in platform improvements, search experiences, category organization, event accessibility, and audience engagement tools. Growth remains a core objective as the company expands its reach and develops new opportunities for visitors and partners.",
  },

];

export default function AboutMissionCards() {
  return (
    <div className="aboutMissionCards">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`aboutMissionCard ${index === 0 ? "aboutMissionCardFeatured" : ""}`}
        >
          <UiTitle>{card.title}</UiTitle>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
}
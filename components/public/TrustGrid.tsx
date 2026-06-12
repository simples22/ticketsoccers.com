const trustItems = [
  {
    title: "100% Guarantee Seller",
    subtitle: "Designed for fans by fans and players.",
  },
  {
    title: "Safe and Secured Transactions",
    subtitle: "We help protect private information during the process.",
  },
  {
    title: "Customer Service Assistance",
    subtitle: "We provide assistance throughout the process.",
  },
];

export default function TrustGrid() {
  return (
    <section className="tslnTrustGridSection">
      <div className="tslnTrustGrid">
        {trustItems.map((item) => (
          <article className="tslnTrustCard" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
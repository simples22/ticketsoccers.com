type OrderCardProps = {
  id: string;
  title: string;
  status?: string;
};

export default function OrderCard({
  id,
  title,
  status = "Processing",
}: OrderCardProps) {
  return (
    <article className="tslnOrderCard">
      <h3>{title}</h3>
      <p>Order #{id}</p>
      <span>{status}</span>
    </article>
  );
}

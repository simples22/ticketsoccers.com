type EmptyStateProps = {
  title?: string;
  text?: string;
};

export default function EmptyState({
  title = "No events found",
  text = "Try another date, city, category, or search term.",
}: EmptyStateProps) {
  return (
    <div className="tslnEmptyState">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

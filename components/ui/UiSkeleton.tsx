type UiSkeletonProps = {
  type?:
    | "page"
    | "header"
    | "section"
    | "title"
    | "text"
    | "button"
    | "footer"
    | "accordion";
  count?: number;
  className?: string;
};

export default function UiSkeleton({
  type = "text",
  count = 1,
  className = "",
}: UiSkeletonProps) {
  if (type === "page") {
    return (
      <div className={`uiSkeletonPage ${className}`}>
        <UiSkeleton type="header" />
        <UiSkeleton type="section" />
        <UiSkeleton type="section" />
        <UiSkeleton type="accordion" count={4} />
        <UiSkeleton type="footer" />
      </div>
    );
  }

  if (type === "header") {
    return (
      <div className={`uiSkeletonHeader ${className}`}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (type === "section") {
    return (
      <section className={`uiSkeletonSection ${className}`}>
        <UiSkeleton type="title" />
        <UiSkeleton type="text" count={3} />
        <UiSkeleton type="button" />
      </section>
    );
  }

  if (type === "accordion") {
    return (
      <div className={`uiSkeletonAccordion ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    );
  }

  if (type === "footer") {
    return (
      <div className={`uiSkeletonFooter ${className}`}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className={`uiSkeletonLines ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className={`uiSkeletonLine ${type}`} />
      ))}
    </div>
  );
}
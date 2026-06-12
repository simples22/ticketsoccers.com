type UiTitleProps = {
  children: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
};

export default function UiTitle({
  children,
  center = false,
  light = false,
  className = "",
}: UiTitleProps) {
  return (
    <h2
      className={[
        "uiTitle",
        center ? "uiTitleCenter" : "",
        light ? "uiTitleLight" : "",
        className,
      ].join(" ")}
    >
      {children}
    </h2>
  );
}
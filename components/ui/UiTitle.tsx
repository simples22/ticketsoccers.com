import type { ReactNode, ElementType } from "react";

type UiTitleProps = {
  children: ReactNode;
  as?: ElementType;
  center?: boolean;
  light?: boolean;
  className?: string;
};

export default function UiTitle({
  children,
  as: Tag = "h2",
  center = false,
  light = false,
  className = "",
}: UiTitleProps) {
  return (
    <Tag
      className={[
        "uiTitle",
        center ? "uiTitleCenter" : "",
        light ? "uiTitleLight" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

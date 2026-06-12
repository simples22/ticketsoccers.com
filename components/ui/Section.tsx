import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function Section({
  children,
  className = "",
  size = "md",
}: SectionProps) {
  return (
    <section className={`tslnSection tslnSection-${size} ${className}`}>
      <div className="tslnSectionInner">
        {children}
      </div>
    </section>
  );
}

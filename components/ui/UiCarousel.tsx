import type { ReactNode } from "react";
import UiSkeleton from "@/components/ui/UiSkeleton";

type UiCarouselProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
};

export default function UiCarousel({
  title,
  description,
  children,
  loading = false,
  skeletonCount = 6,
  className = "",
}: UiCarouselProps) {
  return (
    <section className={`uiCarousel ${className}`}>
      {(title || description) ? (
        <div className="uiCarouselHead">
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </div>
      ) : null}

      <div className="uiCarouselTrack">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <div className="uiCarouselSkeletonCard" key={index}>
                <UiSkeleton type="section" />
              </div>
            ))
          : children}
      </div>
    </section>
  );
}
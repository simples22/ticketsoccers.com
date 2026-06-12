"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderScrollSeparator from "@/components/public/HeaderScrollSeparator";
import PBImage from "@/components/ui/PBImage";
import UiHeroMark from "@/components/ui/UiHeroMark";

type UiHeroProps = {
  badge?: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
  showBreadcrumbs?: boolean;
};

function formatSegment(segment: string) {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    return {
      label: formatSegment(segment),
      href,
      current: index === segments.length - 1,
    };
  });
}

export default function UiHero({
  badge,
  title,
  text,
  image,
  imageAlt,
  align = "center",
  className = "",
  children,
  showBreadcrumbs = true,
}: UiHeroProps) {
  const pathname = usePathname();
  const hasImage = Boolean(image);
  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <>
    <section
      className={[
        "uiHero",
        hasImage ? "uiHeroWithImage" : "uiHeroPlain",
        `uiHero-${align}`,
        className,
      ].join(" ")}
    >
      {hasImage && image ? (
        <>
          <div className="uiHeroBg">
            <PBImage
              src={image}
              alt={imageAlt ?? title}
              fill
              priority
              className="uiHeroImg"
              sizes="100vw"
            />
          </div>

          <div className="uiHeroOverlay" />
        </>
      ) : null}

      <UiHeroMark />

      <div className="uiHeroInner">
        {showBreadcrumbs ? (
          <nav className="uiBreadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>

            {breadcrumbs.map((item) => (
              <span className="uiBreadcrumbItem" key={item.href}>
                <span className="uiBreadcrumbSep">/</span>

                {item.current ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        {badge ? <span className="uiHeroBadge">{badge}</span> : null}

        <div className="uiHeroTitleRow">
            <span className="uiHeroMark" aria-hidden="true">
                ts
            </span>
            <span className="uiHeroSlash" aria-hidden="true" />
            <h1>{title}</h1>
            </div>

        {text ? <p>{text}</p> : null}

        {children ? <div className="uiHeroActions">{children}</div> : null}
      </div>
    </section>
<HeaderScrollSeparator />
    </>
  );
}
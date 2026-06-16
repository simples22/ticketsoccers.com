import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
};

export default function BrandLogo({
  href = "/",
  className = "",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={`tslnBrand ${className}`}
      aria-label="Ticketsoccers Home"
    >
      <span className="tslnBrandText">
        Ticketsoccers
      </span>

      <sup className="tslnBrandTm">
        ™
      </sup>
    </Link>
  );
}
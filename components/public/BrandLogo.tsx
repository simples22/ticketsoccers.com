import Link from "next/link";
import PBImage from "@/components/ui/PBImage";

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
      <span className="tslnBrandIcon">
        <PBImage
          src="/logo/icon.png"
          alt=""
          fill
          className="tslnBrandIconImg"
          sizes="40px"
        />
      </span>

      <span className="tslnBrandText">
        Ticketsoccers
      </span>

      <sup className="tslnBrandTm">
        ™
      </sup>
    </Link>
  );
}
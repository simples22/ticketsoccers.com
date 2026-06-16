import Link from "next/link";
import PBImage from "@/components/ui/PBImage";

type ChronoPageBtnProps = {
  image?: string;
  alt?: string;
};

export default function ChronoPageBtn({
  image = "/hero/launch-countdownn.jpg",
  alt = "Ticketsoccers launch countdown",
}: ChronoPageBtnProps) {
  return (
    <section className="tslnChronoWrapper">
      <div className="tslnChronoPageBtn">
        <div className="tslnChronoPageBtnBg">
          <PBImage
            src={image}
            alt={alt}
            fill
            className="tslnChronoPageBtnImg"
            sizes="(max-width:768px) 100vw, 84rem"
            priority={false}
          />
        </div>

        <div className="tslnChronoPageBtnOverlay" />

        <div className="tslnChronoPageBtnContent">
          <div className="tslnChronoActions">
            <Link
              href="/contact"
              className="tslnBtn"
            >
              Contact Us
            </Link>

            <Link
              href="/launch-countdown"
              className="tslnBtn ghost"
            >
              Launching Soon
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
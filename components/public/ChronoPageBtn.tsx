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
          />
        </div>

        <div className="tslnChronoPageBtnOverlay" />

        <div className="tslnChronoPageBtnContent">
          <div className="tslnChronoText">

            <h2>
             Get Ready for your next Experience.
            </h2>

            <p>
              Get ready for faster event Discovery, and live platform updates.
            </p>
          </div>

          <div className="tslnChronoActions">
            <Link href="/launch-countdown" className="tslnBtn">
              Launching Soon
            </Link>

            <Link href="/contact" className="tslnBtn ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
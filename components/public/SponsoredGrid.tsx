import Link from "next/link";

import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";

const sponsoredItems = [
  {
    id: "gameon",
    title: "GameOn MLT",
    text: "Experience online gaming, rewards and entertainment through GameOn MLT.",
    image: "/sponsored/gameon.jpg",
    href: "https://gameonmlt.com/",
    buttonLabel: "Play Now",
    theme: "gameon",
  },
  {
    id: "piyayboutik",
    title: "Mary Kay",
    text: "Explore beauty, skincare and personal care products through our Mary Kay affiliate store.",
    image: "/sponsored/piyayboutik.jpg",
    href: "https://marykay.com/piyayboutik.com",
    buttonLabel: "View More",
    theme: "marykay",
  },
];

export default function SponsoredGrid() {
  return (
    <section className="tslnSponsored" aria-label="Sponsored Partners">
      <div className="tslnSponsoredHead">
        <UiTitle>Featured Partners</UiTitle>
      </div>

      <div className="tslnSponsoredGrid">
    
    { sponsoredItems.map((item) => (
            <article
                key={item.id}
                className={`tslnSponsoredCard tslnSponsoredCard--${item.theme}`}
            >
                <div className="tslnSponsoredMedia">
                <PBImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="tslnSponsoredImg"
                    sizes="(max-width:768px) 100vw, 50vw"
                />

                <div className="tslnSponsoredShade" />

                <div className="tslnSponsoredOverlay">
                    <h3 className="tslnSponsoredOverlayTitle">
                    {item.title}
                    </h3>

                    <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`tslnSponsoredBtn tslnSponsoredBtn--${item.theme}`}
                    >
                    {item.buttonLabel}
                    </Link>
                </div>
                </div>

                <div className="tslnSponsoredInfo">
                <h3>{item.title}</h3>

                <p>
                    {item.text}
                </p>
                </div>
            </article>
            ))}
      </div>
      
    </section>
  );
}
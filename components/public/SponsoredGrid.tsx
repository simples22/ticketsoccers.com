import Link from "next/link";

import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";

const sponsoredItems = [
  {
    id: "gameon",
    title: "GameOn MLT",
    text: "Online gaming, rewards and entertainment.",
    image: "/sponsored/gameon.jpg",
    href: "https://gameonmlt.com/",
    buttonLabel: "Play Now",
    theme: "gameon",
  },
  {
    id: "piyayboutik",
    title: "Mary Kay",
    text: "Beauty, skincare and personal care.",
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
        {sponsoredItems.map((item) => (
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
                sizes="4.5rem"
              />
            </div>

            <div className="tslnSponsoredInfo">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>

            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`tslnSponsoredBtn tslnSponsoredBtn--${item.theme}`}
            >
              {item.buttonLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
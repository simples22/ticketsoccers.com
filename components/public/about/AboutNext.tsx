import Link from "next/link";

import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";

const aboutNextItems = [

  {
    title: "Contact Support",
    image: "/images/about/contact-support.jpg",
    href: "/contact",
  },

];

export default function AboutNext() {
  return (
    <section className="tslnAboutNext">
      <div className="tslnAboutNextInner">
        <div className="tslnSectionHeader">
          <UiTitle className="uiTitleLight">
            Continue Exploring
          </UiTitle>
        </div>

        <div className="tslnAboutNextGrid">
          {aboutNextItems.map((item) => (
            <Link
              href={item.href}
              className="tslnAboutNextCard"
              key={item.title}
            >
              <div className="tslnAboutNextMedia">
                <PBImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="tslnAboutNextImg"
                  sizes="(max-width:768px) 5rem, 14rem"
                />
              </div>

              <h3>
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
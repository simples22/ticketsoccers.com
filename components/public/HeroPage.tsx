import PBImage from "@/components/ui/PBImage";
import SearchOverlay from "@/components/public/search/SearchOverlay";

type HeroPageProps = {
  title?: string;
  subtitle?: string;
  image?: string;
};

export default function HeroPage({
  title = "Live Events, Sports and Entertainment Tickets",
  subtitle = "",
  image = "/hero/coming-hero.jpg",
}: HeroPageProps) {
  return (
    <>
      <div className="tslnHeroSearchTop">
        <SearchOverlay />
      </div>

      <section className="tslnHeroPage">
        <div className="tslnHeroBg">
          <PBImage
            src={image}
            alt=""
            fill
            priority
            className="tslnHeroImg"
            sizes="100vw"
          />
        </div>

        <div className="tslnHeroOverlay" />

        <div className="tslnHeroInner">
          <h1>{title}</h1>

          {subtitle ? (
            <p>{subtitle}</p>
          ) : null}

          <div className="tslnActions">
            <a href="#categories" className="tslnBtn">
              View All Categories
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
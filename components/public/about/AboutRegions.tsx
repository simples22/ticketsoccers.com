import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";

const regions = [
  {
    name: "United State of America",
    image: "/flags/us-america.jpg",
  },
  {
    name: "Haiti",
    image: "/flags/haiti-caribbean.jpg",
  },
  {
    name: "Latin Area",
    image: "/flags/latin-area.jpg",
  },
  {
    name: "South America",
    image: "/flags/south-america.jpg",
  },
  {
    name: "European Area",
    image: "/flags/european-area.jpg",
  },
];

export default function AboutRegions() {
  return (
    <section className="tslnAboutRegions">
      <div className="tslnAboutRegionsInner">
        <div className="tslnSectionHeader">
          <UiTitle>
            Regions We Support
          </UiTitle>

          <p>
            Ticketsoccers supports visitors and inquiries across key regions
            connected to our platform communication channels.
          </p>
        </div>

        <div className="tslnAboutRegionsGrid">
          {regions.map((region) => (
            <article className="tslnAboutRegionCard" key={region.name}>
              <div className="tslnAboutRegionFlag">
                <PBImage
                  src={region.image}
                  alt={region.name}
                  fill
                  className="tslnAboutRegionImg"
                  sizes="(max-width:768px) 5rem, 10rem"
                />
              </div>

              <h3>{region.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
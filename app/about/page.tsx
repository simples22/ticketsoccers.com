import AboutOverview from "@/components/public/about/AboutOverview";
import UiHero from "@/components/ui/UiHero";
import AboutMissionCards from "@/components/public/about/AboutMissionCards";
import AboutRegions from "@/components/public/about/AboutRegions";
import AboutNext from "@/components/public/about/AboutNext";
import UiSectionBackground from "@/components/background/UiSectionBackground";
import TrustGrid from "@/components/public/TrustGrid";
import UiImageGrid from "@/components/ui/UiImageMasonryGrid";


export default function AboutPage() {
  return (
    <main>
      <UiHero
        title="What's About Us"
        image="/images/about/about-hero.jpg"
        imageAlt="About Ticketsoccers"
      />
      <AboutOverview />
        <AboutMissionCards />

        <AboutRegions />

          <div className="viewback">
          
          </div>
            <UiSectionBackground
                image="/images/backgrounds/aboutsite-bg.jpg"
                className="afterOverview"
              />
              <TrustGrid />
              <UiImageGrid />
      {/*<AboutNext />*/}
    </main>
  );
}
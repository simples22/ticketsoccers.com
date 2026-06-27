import AboutOverview from "@/components/public/about/AboutOverview";
import UiHero from "@/components/ui/UiHero";
import AboutMissionCards from "@/components/public/about/AboutMissionCards";
import AboutRegions from "@/components/public/about/AboutRegions";
import AboutNext from "@/components/public/about/AboutNext";
import UiSectionBackground from "@/components/background/UiSectionBackground";
import TrustGrid from "@/components/public/TrustGrid";
import UiImageGrid from "@/components/ui/UiImageMasonryGrid";
import AboutHeroSpecial from "@/components/public/about/AboutHeroSpecial";


export default function AboutPage() {
  return (
    <main>
      <AboutHeroSpecial
        title=""
        image="/images/about/about-hero.jpg"
        video="/videos/about-hero.mp4"
      />
       <AboutMissionCards />
        <AboutOverview />
          <UiImageGrid />
            <AboutRegions />

              <div className="viewback">
                </div>
                  <UiSectionBackground
                    image="/images/backgrounds/aboutsite-bg.jpg"
                    className="afterOverview"
                  />
            <TrustGrid />
              
      {/*<AboutNext />*/}
    </main>
  );
}
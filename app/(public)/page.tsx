import HeroPage from "@/components/public/home/HeroPage";
import PopularEvents from "@/components/public/home/PopularEvents";
import GeoEventsSection from "@/components/public/home/GeoEventsSection";
import ChronoPageBtn from "@/components/public/ChronoPageBtn";
import SponsoredGrid from "@/components/public/SponsoredGrid";
import CategorySection from "@/components/public/categories/CategorySection";
import TrustGrid from "@/components/public/TrustGrid";
import Publicity from "@/components/public/Publicity";
import UiImageMasonryGrid from "@/components/ui/UiImageMasonryGrid";
import UiSectionLoader from "@/components/ui/UiSectionLoader";
import EventFilterBar from "@/components/public/search/EventFilterBar";

export default function Home() {
  return (
    <>
      <UiSectionLoader delay={500}>
        <HeroPage />
      </UiSectionLoader>

      <UiSectionLoader delay={500}>
        <PopularEvents />
      </UiSectionLoader>

      <UiSectionLoader delay={600}>
        <GeoEventsSection />
      </UiSectionLoader>

      <main className="tslnComingPage">
        <UiSectionLoader delay={900}>
          <Publicity />
        </UiSectionLoader>

      <UiSectionLoader delay={700}>
        <CategorySection />
      </UiSectionLoader>

        <UiSectionLoader delay={1100}>
          <SponsoredGrid />
        </UiSectionLoader>

        <UiSectionLoader delay={1300}>
          <TrustGrid />
        </UiSectionLoader>

{/*
        <UiSectionLoader delay={1500}>
          <UiImageMasonryGrid />
        </UiSectionLoader>
*/}

        <UiSectionLoader delay={1700}>
          <ChronoPageBtn />
        </UiSectionLoader>
      </main>
    </>
  );
}

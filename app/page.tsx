
import HeroPage from "@/components/public/HeroPage";
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

      <UiSectionLoader delay={700}>
        <CategorySection />
      </UiSectionLoader>

      <main className="tslnComingPage">
        <UiSectionLoader delay={900}>
          <Publicity />
        </UiSectionLoader>

        <UiSectionLoader delay={1100}>
          <SponsoredGrid />
        </UiSectionLoader>

        <UiSectionLoader delay={1300}>
          <TrustGrid />
        </UiSectionLoader>

        <UiSectionLoader delay={1500}>
          <UiImageMasonryGrid />
        </UiSectionLoader>

        <UiSectionLoader delay={1700}>
          <ChronoPageBtn />
        </UiSectionLoader>
      </main>
    </>
  );
}
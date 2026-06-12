import AboutOverview from "@/components/public/about/AboutOverview";
import UiHero from "@/components/ui/UiHero";
import AboutRegions from "@/components/public/about/AboutRegions";
import AboutNext from "@/components/public/about/AboutNext";


export default function AboutPage() {
  return (
    <main>
      <UiHero
          title="Why to know About Us"
         />
      <AboutOverview />
      <AboutRegions />
      <AboutNext />
    </main>
  );
}
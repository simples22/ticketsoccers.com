import CountdownLaunch from "@/components/public/CountdownLaunch";
import HomeFaqs from "@/components/public/faqs/HomeFaqs";
import Publicity from "@/components/public/Publicity";
import UiHero from "@/components/ui/UiHero";

export default function LaunchCountdownPage() {
  return (
    <section>
      <UiHero
              title="We Build for the next Events"
             />
    <main className="tslnComingPage">
      <CountdownLaunch />
      <Publicity />
      <HomeFaqs />
    </main>
    </section>
  );
}

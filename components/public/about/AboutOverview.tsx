import AboutCompany from "@/components/public/about/AboutCompany";
import FounderCard from "@/components/public/about/FounderCard";

export default function AboutOverview() {
  return (
    <section className="tslnAboutOverview">
      <div className="tslnAboutOverviewInner">
        <FounderCard />
        <AboutCompany />
      </div>
    </section>
  );
}
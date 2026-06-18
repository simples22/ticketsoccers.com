import PBImage from "@/components/ui/PBImage";

export default function HelpHeroPage() {
  return (
    <section className="tslnHelpHeroPage">
      <div className="tslnHelpHeroBg">
        <PBImage
          src="/images/help/help-heropage.jpg"
          alt="Ticketsoccers help center"
          fill
          priority
          className="tslnHelpHeroImg"
          sizes="100vw"
        />
      </div>

      <div className="tslnHelpHeroOverlay" />

      <div className="tslnHelpHeroInner">
        <div className="tslnHelpHeroLeft">
          
          <h1>Begin by exploring the matters that are important to you.</h1>
          <p>Welcome to the Help Page</p>
        </div>

        <div className="tslnHelpHeroRight">
          <h2>Ticketsoccers Web</h2>
          <p>
            Find guidance about searching events, ticket access,
            provider checkout, policies, and support.
          </p>
        </div>
      </div>
    </section>
  );
}
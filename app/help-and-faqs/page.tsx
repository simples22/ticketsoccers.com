import { faqs } from "@/lib/faqs";
import FaqAccordion from "@/components/public/faqs/FaqAccordion";
import UiTitle from "@/components/ui/UiTitle";
import UiHero from "@/components/ui/UiHero";
import FaqHelpGuide from "@/components/public/faqs/help/FaqHelpGuide";

export default function FaqsPage() {
  return (
    <>
        <UiHero 
        title=" Help Center"
        />
        <FaqHelpGuide />
        
    <main className="tslnFaqPage">
      <div className="tslnFaqInner">
        
        <div className="tslnSectionHeader">
          <UiTitle>Frequently Asked Questions</UiTitle>
          <p>
            Learn more about Ticketsoccers, event discovery, contact,
            partnerships, privacy, and platform access.
          </p>
        </div>

        <FaqAccordion items={faqs} grid />
      </div>
    </main>
    </>
  );
}
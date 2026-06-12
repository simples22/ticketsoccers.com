import Link from "next/link";
import { faqs } from "@/lib/faqs";
import FaqAccordion from "@/components/public/faqs/FaqAccordion";
import UiTitle from "@/components/ui/UiTitle";


export default function HomeFaqs() {
  return (
    <section className="tslnFaqSection">

        <div className="tslnFaqInner">
        <div className="tslnSectionHeader">
          <UiTitle>
            Frequently Asked Questions
          </UiTitle>
        </div>

        <FaqAccordion
          items={faqs.slice(0, 6)}
          grid
        />
      </div>
    </section>
  );
}
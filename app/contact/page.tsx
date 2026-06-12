import Section from "@/components/ui/Section";
import ContactForm from "@/components/public/contact/ContactForm";
import UiHero from "@/components/ui/UiHero";
import ContactSupportGrid from "@/components/public/contact/ContactSupportGrid";
import UiTitle from "@/components/ui/UiTitle";
import HomeFaqs from "@/components/public/faqs/HomeFaqs";

export default function ContactPage() {
  return (
    
    <Section>
        <UiHero
            title="Contact Ticketsoccers"
        />
            <ContactSupportGrid />

      <main className="tslnContactPage">
        <div className="tslnContactContainer">
          <header className="tslnContactHeader">
            <UiTitle>
              Contact Ticketsoccers
            </UiTitle>

            <p>
              Send us a message regarding ticketsoccers.com, partnerships,
              launch updates, advertising opportunities, business inquiries,
              technical support, or general questions.
            </p>
          </header>

          <ContactForm />

        </div>
      </main>
      <HomeFaqs />
    </Section>

  );
}
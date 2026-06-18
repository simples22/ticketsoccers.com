import UiTitle from "@/components/ui/UiTitle"

export default function AboutCompany() {
  return (
    <article className="tslnAboutCompany">
            <UiTitle>
                Our Company
            </UiTitle>
                <p>
                    Ticketsoccers is an event discovery platform focused on helping visitors
                    explore sports, concerts, festivals, comedy shows, theatre productions,
                    family entertainment, and other live experiences across multiple markets.
                </p>

            <section className="tslnAboutSection">
            <UiTitle>Our History</UiTitle>

            <p>
                Ticketsoccers was established in September 2025 with the vision of creating
                a dedicated destination for event discovery and audience engagement. The
                project began as an initiative focused on connecting visitors with sports,
                entertainment, festivals, theatre productions, comedy performances, and
                other live experiences through a single platform.
            </p>

            <p>
                Since its creation, Ticketsoccers has continued to expand its categories,
                content structure, and platform capabilities while preparing future
                services designed to support visitors searching for events and experiences
                around the world.
            </p>
            </section>

             <div className="tslnNoticeFounder">
            <h2>
                <strong>Founder & CEO</strong>
                Build by Fans, Inspired by the Live Experience
                </h2>

                <p>
                    At Ticketsoccers, we believe sports are more than games.
                    They are moments that unite people, communities, and generations.
                    No television broadcast or digital experience can fully replace
                    the emotion of being there in person.
                </p>
            </div>
    </article>
  );
}
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

            <section className="tslnAboutSection">
            <UiTitle>Company Creation</UiTitle>

            <p>
                Founded by Clervens Pierre, Ticketsoccers was launched in September 2025 as
                a long-term digital project centered on event discovery, audience access,
                entertainment visibility, and category-based exploration. The company was
                built around the belief that finding events should be organized, accessible,
                and informative for every visitor.
            </p>

            <p>
                From its earliest stages, the platform was designed with growth in mind,
                allowing new event categories, partnerships, resources, and visitor-focused
                services to be added over time.
            </p>
            </section>

    </article>
  );
}
import Section from "@/components/ui/Section";
import UiHeroMark from "@/components/ui/UiHeroMark";

export default function LegalPolicyPages() {
  return (
    <Section className="tslnLegalSection">
      <main className="tslnLegalSectionPage">
        <div className="tslnLegalSectionContent">

        <header className="tslnLegalSectionContentheader">
                <div className="tslnPageMark">
                    <UiHeroMark />
                </div>
            <div className="termsDate">
                    <strong>Effective Date:</strong>
                    <p>December 20, 2025</p> 
            </div>
        </header>

          <h3 className="tslnLegalSectionTitle">1. Corporate Purpose</h3>
          <p>
            Ticketsoccers Entertainment Inc. (hereafter “Ticketsoccers” or “the Corporation”) is a corporation incorporated under the laws of the State of Florida, USA.
            The purpose of the Corporation is to develop, operate and license software-as-a-service (SaaS) platforms for event ticketing, reservations, digital access control,
            customer management, and payment facilitation; to provide event promotion, digital marketing, advertising, branding, affiliate marketing, and audience engagement services;
            and to engage in any other lawful business activity permitted under the laws of the State of Florida, the United States of America, Haiti, and Canada.
          </p>

          <h3 className="tslnLegalSectionTitle">2. Applicable NAICS Codes</h3>
          <p>
            The operations of TicketSoccers fall under the following North American Industry Classification System (NAICS) codes:
          </p>
          <ul>
            <li><strong>518210:</strong> Data Processing, Hosting, and Related Services – covering SaaS and cloud-based ticketing platforms.</li>
            <li><strong>541810:</strong> Advertising Agencies – covering event promotion, marketing, digital campaigns, branding, and affiliate marketing.</li>
            <li><strong>561599:</strong> All Other Travel Arrangement and Reservation Services – covering reservations, ticket management, and event access facilitation.</li>
          </ul>

          <h3 className="tslnLegalSectionTitle">3. User Eligibility and Compliance</h3>
          <p>
            By accessing or using the Ticketsoccers platform, users represent that they are of legal age to enter into binding contracts in their jurisdiction of residence,
            including the United States (Florida), Haiti, or Canada. Users agree to comply with all applicable local, state, provincial, and national laws
            governing the use of online ticketing services, reservations, digital access, and payment processing.
          </p>

          <h3 className="tslnLegalSectionTitle">4. Ticketing and Event Access</h3>
          <p>
            All tickets purchased through Ticketsoccers are subject to the terms and conditions set by the event organizer.
            The Corporation acts as a facilitator of ticket sales and event access, providing a secure digital platform for purchases and entry management.
            Ticketsoccers reserves the right to cancel, suspend, or restrict access to any ticket, account, or service in accordance with applicable laws and event policies.
          </p>

          <h3 className="tslnLegalSectionTitle">5. Payment Processing</h3>
          <p>
            Ticketsoccers uses secure third-party payment gateways to process payments for ticket purchases and related services.
            Users acknowledge that payments are processed in accordance with financial regulations applicable in the United States, Haiti, and Canada.
            The Corporation is not responsible for delays, errors, or disputes arising from payment processors.
          </p>

          <h3 className="tslnLegalSectionTitle">6. Data Privacy and Security</h3>
          <p>
            Ticketsoccers collects personal information, including names, emails, payment details, and event participation data.
            The Corporation is committed to protecting user data in compliance with applicable privacy laws in the USA, Haiti, and Canada,
            including the Florida Information Protection Act (FIPA), Canadian PIPEDA, and Haitian data protection requirements.
            Users consent to the collection, storage, and use of personal data for purposes including ticketing, event access, marketing, and customer support.
          </p>

          <h3 className="tslnLegalSectionTitle">7. Intellectual Property</h3>
          <p>
            All content, software, graphics, trademarks, logos, and designs on the Ticketsoccers platform are the property of the Corporation or its licensors.
            Users may not reproduce, distribute, modify, or create derivative works without explicit written permission.
            Unauthorized use of intellectual property may result in civil or criminal penalties under applicable law.
          </p>

          <h3 className="tslnLegalSectionTitle">8. Limitation of Liability</h3>
          <p>
            Ticketsoccers provides services on an “as-is” basis and does not guarantee uninterrupted access, accuracy of information, or the outcome of events.
            The Corporation is not liable for indirect, incidental, or consequential damages arising from use of the platform, ticket purchase errors, or event cancellations,
            except as required by law in the jurisdictions of operation.
          </p>

          <h3 className="tslnLegalSectionTitle">9. Governing Law</h3>
          <p>
            These terms are governed by the laws of the State of Florida, USA, and are subject to applicable federal laws.
            Users from Haiti or Canada acknowledge that local regulations apply and agree to comply with all relevant provisions.
            Any disputes arising from the use of TicketSoccers services shall be resolved according to Florida law unless otherwise required by applicable jurisdictional law.
          </p>

          <h3 className="tslnLegalSectionTitle">10. Amendments</h3>
          <p>
            Ticketsoccers reserves the right to modify, amend, or update this legal notice and terms of use at any time.
            Users are encouraged to review this page regularly. Continued use of the platform constitutes acceptance of the updated terms.
          </p>

          <h3 className="tslnLegalSectionTitle">11. Contact Information</h3>
          <p>
            For any legal inquiries, questions, or concerns regarding Ticketsoccers services, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:legalservices@ticketsoccers.com">legalservices@ticketsoccers.com</a></li>
            <li>Address: Ticketsoccers Limited Network, FL, USA</li>
          </ul>

          <h3 className="tslnLegalSectionTitle">12. Miscellaneous</h3>
          <p>
            If any provision of this legal notice is found invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            The failure of Ticketsoccers to enforce any right or provision does not constitute a waiver of such right or provision.
          </p>

          <p className="tslnLegalSectionnote">
            Ticketsoccers Limited Network. All rights reserved. www.ticketsoccers™, TSLN.
          </p>
        </div>
      </main>
    </Section>
  );
}
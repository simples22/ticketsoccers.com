import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrandLogo from "./BrandLogo";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: faFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: faInstagram },
  { label: "TikTok", href: "https://tiktok.com", icon: faTiktok },
  { label: "X", href: "https://x.com", icon: faXTwitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: faLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="tslnFooter">
      <div className="tslnFooterInner">

        {/* Company */}
        <div className="tslnFooterBrand">

          <BrandLogo 
          className="tslnFooterLogo" 
          />

          <p>
            The Global platform of ticketing discovery for sports, concerts, festivals, shows, theatres,
            and live events.
          </p>
        </div>

        {/* Legal */}
        <div className="tslnFooterLinks">
          <div className="tslnFooterHeading">
            Legal
          </div>

          <Link href="/">
            Home
          </Link>

          <Link href="/about">
            About Us
          </Link>

          <Link href="/help-and-faqs">
            Help Center
          </Link>

          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/terms-of-use">
            Terms of Use
          </Link>

          <Link href="/terms-of-use">
            Terms of Use
          </Link>
        </div>

        {/* Connect */}
        <div>
          <div className="tslnFooterHeading">
            Let's Connect
          </div>

          <div
            className="tslnFooterSocials"
            aria-label="Social media links"
          >
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                className="tslnSocialIcon"
              >
                <FontAwesomeIcon icon={item.icon} />
              </Link>
            ))}
          </div>

          <div className="tslnFooterContact">
            <Link href="/contact">
              CUSTOMERS-SERVICES
            </Link>
          </div>
        </div>

      </div>

      <div className="tslnFooterBottom">
        
        <div className="tslnFooterBottomLinks">
          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/privacy-choices">
            Your Privacy Choices
          </Link>
        </div>

        <div className="tslnFooterBottomLeft">
          © {new Date().getFullYear()} Ticketsoccers LN.
          All rights reserved.
        </div>

      </div>
    </footer>
  );
}
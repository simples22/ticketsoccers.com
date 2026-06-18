"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import BrandLogo from "@/components/public/BrandLogo";
import SearchOverlay from "@/components/public/search/SearchOverlay";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scrollYRef = useRef(0);

  const showHeaderSearch = pathname !== "/";

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("tslnMenuOpen");
      document.documentElement.classList.remove("tslnMenuOpen");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      return;
    }

    scrollYRef.current = window.scrollY;

    document.body.classList.add("tslnMenuOpen");
    document.documentElement.classList.add("tslnMenuOpen");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.classList.remove("tslnMenuOpen");
      document.documentElement.classList.remove("tslnMenuOpen");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="tslnHeader">
      <div className="tslnHeaderInner">
        <div onClick={closeMenu}>
          <BrandLogo />
        </div>

      <div className="tslnHeaderDesktopGroup">
            {showHeaderSearch ? (
                <SearchOverlay
                variant="icon"
                className="tslnHeaderSearch"
                />
            ) : null}

            <nav className="tslnHeaderNav" aria-label="Primary navigation">
                <Link href="/about" className="tslnHeaderLink">
                About
                </Link>

                <Link href="/help-and-faqs" className="tslnHeaderLink">
                Help Center
                </Link>

                <Link href="/contact" className="tslnHeaderLink">
                Contact
                </Link>

                <Link href="/launch-countdown" className="tslnHeaderLinkbtn">
                Next Launch
                </Link>
            </nav>
        </div>

      <div className="tslnHeaderRight">
          <button
            type="button"
            className={`tslnMobileBtn ${open ? "open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="tslnMobilePanel"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="tslnMobilePanel"
        className={`tslnMobilePanel ${open ? "open" : ""}`}
      >
        <div className="tslnMobilePanelHead">
          <BrandLogo />

          <button
            type="button"
            className="tslnMobilePanelClose"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>

        {showHeaderSearch ? (
          <div className="tslnMobileSearch">
            <SearchOverlay
              className="tslnMobileSearchBtn"
              onOpen={closeMenu}
            />
          </div>
        ) : null}

        <nav className="tslnMobileNav" aria-label="Mobile navigation">
          <Link href="/" className="tslnMobileLink" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/about" className="tslnMobileLink" onClick={closeMenu}>
            About
          </Link>

        <Link href="/help-and-faqs" className="tslnMobileLink" onClick={closeMenu}>
            Help Center
          </Link>
          
          <Link
            href="/launch-countdown"
            className="tslnMobileLink"
            onClick={closeMenu}
          >
            Launch Countdown
          </Link>


          <Link
            href="/privacy-policy"
            className="tslnMobileLink"
            onClick={closeMenu}
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms-of-use"
            className="tslnMobileLink"
            onClick={closeMenu}
          >
            Terms of Use
          </Link>

          <Link href="/contact" className="tslnMobileLink" onClick={closeMenu}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
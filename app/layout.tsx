import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/contact.css";
import "@/styles/footer.css";
import "@/styles/heroUi-page.css";
import "@/styles/not-found.css";
import "@/styles/terms-of-use.css";
import "@/styles/header.css";
import "@/styles/UiTitle.css";
import "@/styles/about.css";
import "@/styles/faqs.css";
import "@/styles/HeaderScroll.css";
import "@/styles/categories.css";
import "@/styles/TrustGrid.css";
import "@/styles/publicity.css";
import "@/styles/cookiesnotice.css";

import ServiceWorkerRegister from "@/components/public/ServiceWorkerRegister";
import SiteNetworkStatus from "@/components/public/SiteNetworkStatus";
import ScrollTopBtn from "@/components/public/ScrollTopBtn";
import CookiesNotes from "@/components/public/search/CookiesNotes";
import TopNoticeBar from "@/components/public/TopNoticeBar";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ticketsoccers.com"),

  title: {
    default: "Ticketsoccers : Coming Soon Platform",
    template: "%s | Ticketsoccers",
  },

  description:
    "Ticketsoccers is an event access and ticket discovery platform focused on sports, concerts, festivals, theatre performances, comedy shows, and live entertainment.",

  applicationName: "Ticketsoccers",

  keywords: [
    "Ticketsoccers",
    "ticketsoccers.com",
    "event tickets",
    "sports tickets",
    "concert tickets",
    "festival tickets",
    "theatre tickets",
    "comedy shows",
    "live entertainment",
  ],

  authors: [{ name: "Ticketsoccers Limited Network" }],
  creator: "Ticketsoccers Limited Network",
  publisher: "Ticketsoccers Limited Network",

  openGraph: {
    title: "Ticketsoccers | Coming Soon",
    description:
      "Explore sports, concerts, festivals, theatre performances, comedy shows, and live entertainment on ticketsoccers.com.",
    url: "https://ticketsoccers.com",
    siteName: "Ticketsoccers",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ticketsoccers | Coming Soon",
    description:
      "Explore sports, concerts, festivals, theatre performances, comedy shows, and live entertainment on ticketsoccers.com.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0045c5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-scroll-behavior="smooth"
    >
      
      <body>
        <div className="tslnSite">
            <SiteNetworkStatus />
              <ServiceWorkerRegister />
                <TopNoticeBar />
                  <Header />

                  <main className="tslnMain">{children}</main>

                  <Footer />
              <CookiesNotes />
            <ScrollTopBtn />
        </div>
      </body>
    </html>
  );
}
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import ServiceWorkerRegister from "@/components/public/ServiceWorkerRegister";
import SiteNetworkStatus from "@/components/public/SiteNetworkStatus";
import ScrollTopBtn from "@/components/public/ScrollTopBtn";
import CookiesNotes from "@/components/public/search/CookiesNotes";
import TopNoticeBar from "@/components/public/TopNoticeBar";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
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
    </CartProvider>
  );
}

import Link from "next/link";

import PBImage from "@/components/ui/PBImage";
import HeroPage from "@/components/public/HeroPage";
import ChronoPageBtn from "@/components/public/ChronoPageBtn";
import SponsoredGrid from "@/components/public/SponsoredGrid";
import UiTitle from "@/components/ui/UiTitle";
import HomeFaqs from "@/components/public/faqs/HomeFaqs";
import HeaderScrollSeparator from "@/components/public/HeaderScrollSeparator";
import CategorySection from "@/components/public/categories/CategorySection";
import TrustGrid from "@/components/public/TrustGrid";
import Publicity from "@/components/public/Publicity";
import UiImageMasonryGrid from "@/components/ui/UiImageMasonryGrid";



export default function Home() {
  return (
    <>
      <HeroPage />
       <CategorySection />
        
        {/*<HeaderScrollSeparator />*/}

          <main className="tslnComingPage">
            

                    
                    
                    {/*<section className="tslnSuggestedAction">
                        <div className="tslnSuggestedActionInner">
                          <div className="tslnSectionHeader">
                            <UiTitle>
                              Find More Events
                            </UiTitle>
                            
                            <p>
                              Access thousands of sports, concerts, festivals, theatre shows,
                              comedy performances, and live events across multiple destinations.
                            </p>
                          </div>
                          <div className="tslnSuggestedActionBtn">
                            <Link
                              href="/not-found"
                              className="tslnBtn tslnBtnSuggested"
                            >
                              Explore Suggested Events
                            </Link>
                          </div>
                        </div>
                      </section> 


                      <UiImageMasonryGrid />
                          */}
                     <Publicity />

                   <SponsoredGrid />
                 <TrustGrid />
                 {/*
              <HomeFaqs />
              */}
            
    </main>
    </>
  );
}
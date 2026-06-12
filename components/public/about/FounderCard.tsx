import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";

export default function FounderCard() {
  return (
    <>
    <aside className="tslnFounderCard">
         <UiTitle>
             Founder
        </UiTitle>

      <div className="tslnFounderPhotoWrap">
        <div className="tslnFounderPhoto">

          <PBImage
            src="/founder/ticketsoccers-founder-clervens-p.jpg"
            alt="Clervens Pierre"
            fill
            className="tslnFounderImg"
            sizes="(max-width:768px) 100vw, 420px"
          />
        </div>
      </div>

      <div className="tslnFounderBody">
        <h3>Clervens Pierre</h3>
        <span className="tslnFounderLabel">Founder, Chief Executive Officer</span>
        <p>
          Founder of Ticketsoccers, focused on event discovery,
          audience access, and live entertainment opportunities.
        </p>
      </div>
    </aside>
    </>
  );
}
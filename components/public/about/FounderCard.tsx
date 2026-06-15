import PBImage from "@/components/ui/PBImage";
import UiTitle from "@/components/ui/UiTitle";

export default function FounderCard() {
  return (
    

<div className="tslnFounderBlock">
  <div className="tslnFounderHeader">
    <UiTitle>
      Founder
    </UiTitle>
  </div>
  <aside className="tslnFounderCard">

      <div className="tslnFounderPhotoWrap">
        <div className="tslnFounderPhoto">
          <PBImage
            src="/founder/ticketsoccers-founder-clervens-p.jpg"
            alt="Clervens Pierre, Founder and CEO of Ticketsoccers"
            fill
            priority
            className="tslnFounderImg"
            sizes="(max-width:768px) 100vw, 420px"
          />
        </div>
      </div>

      <div className="tslnFounderBody">
        <h3>Clervens Pierre</h3>

        <span className="tslnFounderLabel">
          Founder & Chief Executive Officer
        </span>

        <p>
          Clervens Pierre founded Ticketsoccers with the vision of helping
          fans discover live events, sports, concerts, festivals, and
          entertainment experiences through a modern and accessible platform.
        </p>
      </div>

    </aside>
    </div>
  );
}
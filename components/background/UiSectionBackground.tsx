import PBImage from "@/components/ui/PBImage";

type UiSectionBackgroundProps = {
  image: string;
  alt?: string;
  className?: string;
};

export default function UiSectionBackground({
  image,
  alt = "",
  className = "",
}: UiSectionBackgroundProps) {
  return (
    <>
      {/* Bloc fixe — image seulement */}
      <section
        className={`uiSectionBackgroundBlock ${className}`}
        style={{ "--bg-image": `url(${image})` } as React.CSSProperties}
      >
        <PBImage
          src={image}
          alt={alt}
          fill
          className="uiSectionBackgroundBlockImg"
          sizes="100vw"
        />
        <div className="uiSectionBackgroundBlockOverlay" />
      </section>

      {/* Spacer scrollable avec le contenu texte */}
      <div className="uiSectionBackgroundBlockSpacer">
        <div className="uiSectionBackgroundBlockContent">
          <h2 className="uiSectionBackgroundBlockTitle">
            We build for fans, by fans & players
          </h2>
          <p className="uiSectionBackgroundBlockText">
            At Ticketsoccers, we believe sports are more than games. They bring
            communities together. Built by passionate fans and players, our
            mission is to make discovering and accessing live sporting events
            simple, reliable, and enjoyable for everyone.
          </p>
        </div>
      </div>
    </>
  );
}
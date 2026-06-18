"use client";

import { useRef, useState } from "react";
import PBImage from "@/components/ui/PBImage";

type AboutHeroSpecialProps = {
  title: string;
  text?: string;
  image?: string;
  video?: string;
  alt?: string;
};

export default function AboutHeroSpecial({
  title,
  text,
  image = "/images/about/about-hero.jpg",
  video,
  alt = "About Ticketsoccers",
}: AboutHeroSpecialProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  async function togglePlay() {
    const videoEl = videoRef.current;

    if (!videoEl || loadingVideo) return;

    try {
      setLoadingVideo(true);

      if (videoEl.paused) {
        await videoEl.play();
      } else {
        videoEl.pause();
      }
    } catch (error) {
      console.error("Video playback error:", error);
    } finally {
      setLoadingVideo(false);
    }
  }

  return (
    <section className="tslnAboutHeroSpecial">
      <div className="tslnAboutHeroSpecialHeader">
        <h1>For Fans By Fans</h1>

        <p>
          Get for unforgettable event experiences.
        </p>
      </div>

      <div className="tslnAboutHeroMedia">
        {video ? (
          <>
            <video
              ref={videoRef}
              className="tslnAboutHeroVideo"
              poster={image}
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            >
              <source src={video} type="video/mp4" />
            </video>

            <button
              type="button"
              className="tslnAboutHeroPlay"
              onClick={togglePlay}
              disabled={loadingVideo}
              aria-label={
                playing ? "Pause video" : "Play video"
              }
            >
              {loadingVideo
                ? "Loading..."
                : playing
                ? "Pause"
                : "Play"}
            </button>
          </>
        ) : (
          <PBImage
            src={image}
            alt={alt}
            fill
            priority
            className="tslnAboutHeroImg"
            sizes="100vw"
          />
        )}

        <div className="tslnAboutHeroOverlay" />
      </div>

        <div className="tslnAboutHeroContent">
            <h2>{title}</h2>

            {text ? (
            <p>{text}</p>
            ) : (
            <p>
            
          </p>
        )}
      </div>
    </section>
  );
}
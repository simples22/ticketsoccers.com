import PBImage from "@/components/ui/PBImage";


const images = [
  "/gallery/image-1.jpg",
  "/gallery/images-2.jpg",
  "/gallery/images-3.jpg",
  "/gallery/image-4.jpg",
    "/gallery/image-5.jpg",
  "/gallery/image-6.jpg",
  "/gallery/image-7.jpg",
  "/gallery/image-8.jpg",
];

export default function UiImageGrid() {
  return (
    <section className="uiImageGridblock">
        <div className="uiImageGrid">
        {images.map((src, index) => (
            <div
            key={src}
            className={`uiImageGridItem ${
                index === images.length - 1
                ? "uiImageGridItemFeatured"
                : ""
            }`}
            >
            <PBImage
                src={src}
                alt=""
                fill
                className="uiImageGridImg"
                sizes="(max-width:768px) 100vw, 33vw"
            />
            </div>
        ))}
        </div>
    </section>
  );
}
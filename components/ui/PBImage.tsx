import Image, { ImageProps } from "next/image";

export default function PBImage({
  alt,
  ...props
}: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt || ""}
      quality={90}
      unoptimized={false}
      sizes={props.sizes ?? "100vw"}
    />
  );
}

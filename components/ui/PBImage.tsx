"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK = "/events/placeholder.jpg";

export default function PBImage({ alt, src, ...props }: ImageProps) {
  const [errored, setErrored] = useState(false);
  const finalSrc = errored ? FALLBACK : src;

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt || ""}
      quality={90}
      sizes={props.sizes ?? "100vw"}
      onError={() => setErrored(true)}
    />
  );
}

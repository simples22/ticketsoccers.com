"use client";

import { useEffect, useState } from "react";
import UiSkeleton from "@/components/ui/UiSkeleton";

type UiSectionLoaderProps = {
  children: React.ReactNode;
  type?: "page" | "header" | "section" | "accordion" | "footer";
  delay?: number;
};

export default function UiSectionLoader({
  children,
  type = "section",
  delay = 700,
}: UiSectionLoaderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setReady(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  if (!ready) {
    return <UiSkeleton type={type} />;
  }

  return <>{children}</>;
}
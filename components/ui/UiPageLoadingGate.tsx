"use client";

import { useEffect, useState } from "react";
import UiSkeleton from "@/components/ui/UiSkeleton";

type UiPageLoadingGateProps = {
  children: React.ReactNode;
  delay?: number;
};

export default function UiPageLoadingGate({
  children,
  delay = 7000,
}: UiPageLoadingGateProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setReady(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  if (!ready) {
    return <UiSkeleton type="page" />;
  }

  return <>{children}</>;
}
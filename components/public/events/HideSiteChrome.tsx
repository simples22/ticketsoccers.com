"use client";
import { useEffect } from "react";
export default function HideSiteChrome() {
  useEffect(() => {
    document.documentElement.classList.add("tslnSeatModeOn");
    return () => document.documentElement.classList.remove("tslnSeatModeOn");
  }, []);
  return null;
}

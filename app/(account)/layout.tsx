import type { ReactNode } from "react";
// Account section owns its own chrome here (separate from the public Header/Footer).
// e.g. import AccountHeader from "@/components/account/AccountHeader";
export default function AccountLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
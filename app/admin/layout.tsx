import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "Staff Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages use useSession() — provide the SessionProvider here.
  return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
}

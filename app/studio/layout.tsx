import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Studio · TBR Staff",
  description: "Staff photo intake for the To Be Read shelf.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

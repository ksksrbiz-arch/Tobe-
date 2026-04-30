import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://tobereadbooks.com"),
  title: "To Be Read (TBR) | Clackamas Book Exchange – Milwaukie, OR",
  description:
    "Your neighborhood used bookstore in Milwaukie, Oregon. Trade books, browse thousands of titles, shop online on PangoBooks and Bookshop.org. Under new ownership since 2024, rebranding to TBR in 2026!",
  keywords: [
    "used bookstore", "Milwaukie Oregon", "Clackamas Book Exchange",
    "To Be Read", "TBR", "trade books", "PangoBooks", "Bookshop.org",
    "used books Portland", "book exchange"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tobereadbooks.com",
    title: "To Be Read (TBR) | Clackamas Book Exchange",
    description:
      "45-year-old beloved used bookstore in Milwaukie, OR. Trade books for store credit, shop online, visit us!",
    siteName: "To Be Read – Clackamas Book Exchange",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "To Be Read – Clackamas Book Exchange",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "To Be Read (TBR) | Clackamas Book Exchange",
    description: "Your neighborhood used bookstore in Milwaukie, Oregon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BookStore",
  name: "Clackamas Book Exchange (To Be Read)",
  alternateName: "TBR – To Be Read",
  url: "https://tobereadbooks.com",
  telephone: "+1-503-659-2559",
  email: "TBR@tcpbusiness8.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7931 SE King Rd",
    addressLocality: "Milwaukie",
    addressRegion: "OR",
    postalCode: "97222",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://instagram.com/ToBeRead_clackamas",
    "https://tiktok.com/@clackamas.book.ex",
    "https://facebook.com/ClackamasBookExchange",
    "https://www.pangobooks.com/seller/cltoberread2024",
  ],
  description:
    "A beloved neighborhood used bookstore in Milwaukie, Oregon, serving the community for over 45 years. Trade books for store credit, browse thousands of titles in-store and online.",
  foundingDate: "1979",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}

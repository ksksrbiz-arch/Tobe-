import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import CozyAmbience from "@/components/CozyAmbience";
import PageTransition from "@/components/PageTransition";
import BookishEasterEgg from "@/components/BookishEasterEgg";

export const metadata: Metadata = {
  metadataBase: new URL("https://to-be-read-clackamas.netlify.app"),
  title: {
    default: "To Be Read (TBR) | Clackamas Book Exchange – Milwaukie, OR",
    template: "%s · To Be Read",
  },
  description:
    "Your neighborhood used bookstore in Milwaukie, Oregon. Trade books, browse thousands of titles, shop online on PangoBooks and Bookshop.org. Under new ownership since 2024, rebranding to TBR in 2026!",
  applicationName: "To Be Read",
  category: "shopping",
  keywords: [
    "used bookstore",
    "Milwaukie Oregon",
    "Clackamas Book Exchange",
    "To Be Read",
    "TBR",
    "trade books",
    "book trade-in",
    "store credit for books",
    "PangoBooks",
    "Bookshop.org",
    "used books Portland",
    "book exchange",
    "independent bookstore Oregon",
    "rare books Milwaukie",
  ],
  authors: [{ name: "To Be Read" }],
  creator: "To Be Read – Clackamas Book Exchange",
  publisher: "To Be Read – Clackamas Book Exchange",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://to-be-read-clackamas.netlify.app",
    title: "To Be Read (TBR) | Clackamas Book Exchange",
    description:
      "45-year-old beloved used bookstore in Milwaukie, OR. Trade books for store credit, shop online, visit us!",
    siteName: "To Be Read – Clackamas Book Exchange",
    // Open Graph image is supplied by app/opengraph-image.tsx (file-based
    // metadata convention) so it is always in sync with the brand.
  },
  twitter: {
    card: "summary_large_image",
    title: "To Be Read (TBR) | Clackamas Book Exchange",
    description: "Your neighborhood used bookstore in Milwaukie, Oregon.",
    // twitter:image is supplied by app/twitter-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF9" },
    { media: "(prefers-color-scheme: dark)", color: "#4A1350" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BookStore",
  "@id": "https://to-be-read-clackamas.netlify.app/#bookstore",
  name: "Clackamas Book Exchange (To Be Read)",
  alternateName: "TBR – To Be Read",
  url: "https://to-be-read-clackamas.netlify.app",
  image: "https://to-be-read-clackamas.netlify.app/opengraph-image",
  logo: "https://to-be-read-clackamas.netlify.app/icon",
  telephone: "+1-503-659-2559",
  email: "TBR@tcpbusiness.com",
  priceRange: "$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Store Credit",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7931 SE King Rd",
    addressLocality: "Milwaukie",
    addressRegion: "OR",
    postalCode: "97222",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4445,
    longitude: -122.5829,
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Clackamas+Book+Exchange+Milwaukie+OR",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "112",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://instagram.com/toberead_clackamas",
    "https://www.tiktok.com/@clackamas.book.ex",
    "https://www.facebook.com/ClackamasBooksExchange/",
    "https://www.yelp.com/biz/clackamas-book-exchange-milwaukie",
    "https://bookshop.org/shop/ClackamasBookExchange",
    "https://www.pangobooks.com/seller/cltoberread2024",
  ],
  description:
    "A beloved neighborhood used bookstore in Milwaukie, Oregon, serving the community for over 45 years. Trade books for store credit, browse thousands of titles in-store and online.",
  foundingDate: "1981",
};

// WebSite entity ties the brand name to the domain so Google can resolve a
// canonical site name in results and link the brand to the storefront entity.
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://to-be-read-clackamas.netlify.app/#website",
  url: "https://to-be-read-clackamas.netlify.app",
  name: "To Be Read – Clackamas Book Exchange",
  alternateName: ["To Be Read", "TBR", "Clackamas Book Exchange"],
  inLanguage: "en-US",
  publisher: { "@id": "https://to-be-read-clackamas.netlify.app/#bookstore" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-br-xl bg-[#6B1C6F] px-4 py-3 text-sm font-semibold text-white shadow-lg focus:not-sr-only focus:fixed focus:left-0 focus:top-0"
        >
          Skip to content
        </a>
        <CozyAmbience />
        <BookishEasterEgg />
        <div className="relative z-[2]">
          <PageTransition>{children}</PageTransition>
        </div>
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

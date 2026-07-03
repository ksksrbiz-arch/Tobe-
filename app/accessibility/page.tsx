import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageLayout from "@/components/LegalPageLayout";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const UPDATED = "2026-06-22";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "To Be Read (Clackamas Book Exchange) is committed to making our website and store accessible to everyone, meeting WCAG 2.1 AA, and hearing about barriers.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement · To Be Read",
    description:
      "Our commitment to making the To Be Read website and store accessible to everyone.",
    url: "/accessibility",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image"] },
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/accessibility`,
  name: "Accessibility Statement",
  url: `${SITE_URL}/accessibility`,
  dateModified: UPDATED,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#bookstore` },
};

export default function AccessibilityStatementPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Accessibility Statement", path: "/accessibility" }])} />
      <JsonLd data={policyJsonLd} />
      <LegalPageLayout
        title="Accessibility Statement"
        subtitle="Everyone should be able to find their next great read. Here's our commitment to an accessible website — and store — and how to reach us if something gets in your way."
        badge="Accessibility"
        updated={UPDATED}
      >
        <div className="legal-callout">
          <p>
            <strong>Need help or hit a barrier?</strong> Email{" "}
            <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a> or call{" "}
            <a href="tel:+15036592559">503-659-2559</a> and we&apos;ll help you
            get what you need and work to fix the problem. We aim to respond
            within a few business days.
          </p>
        </div>

        <h2>Our commitment</h2>
        <p>
          To Be Read (Clackamas Book Exchange) is committed to ensuring that our
          website and our store are accessible to people with disabilities. We
          believe everyone deserves equal access to books and to the information
          on this site, and we work to provide a website that is usable by the
          widest possible audience, regardless of technology or ability.
        </p>

        <h2>Conformance target</h2>
        <p>
          We aim to conform to the{" "}
          <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
            Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
          </a>
          , the internationally recognized standard for web accessibility and the
          benchmark commonly applied under the Americans with Disabilities Act
          (ADA). Accessibility is an ongoing effort, and we review and improve the
          site over time.
        </p>

        <h2>What we&apos;ve done</h2>
        <p>Measures we take to keep the site accessible include:</p>
        <ul>
          <li>Semantic, structured HTML with logical heading order and landmark regions.</li>
          <li>A &ldquo;Skip to content&rdquo; link and full keyboard navigability, with visible focus indicators.</li>
          <li>Descriptive text alternatives (alt text) for meaningful images, and decorative images hidden from assistive technology.</li>
          <li>Labels and accessible names for form fields, buttons, and links.</li>
          <li>Respect for the operating-system &ldquo;reduce motion&rdquo; setting, which minimizes animation.</li>
          <li>Attention to color contrast and to designs that do not rely on color alone to convey meaning.</li>
          <li>Responsive layouts that support zoom and a range of screen sizes and devices.</li>
        </ul>

        <h2>Known limitations</h2>
        <p>
          Despite our efforts, some content may not yet be fully accessible. In
          particular, certain third-party content embedded on the site — such as
          the Google Maps location map and embedded TikTok videos — is provided
          by external services whose accessibility we do not control. Where such
          content is essential, we aim to provide an accessible alternative (for
          example, our full address, hours, and directions are available as plain
          text on the <Link href="/visit">Visit</Link> page). If you encounter a
          barrier, please tell us — see below.
        </p>

        <h2>In-store accessibility</h2>
        <p>
          Our Milwaukie shop has a step-free entrance, wide aisles between the
          shelves, free on-site parking, and accessible (ADA) parking out front.
          If you need assistance finding or reaching a book during your visit, our
          staff are happy to help — just ask.
        </p>

        <h2>Feedback &amp; how to reach us</h2>
        <p>
          We welcome your feedback on the accessibility of this site. If you
          encounter an accessibility barrier, need information in a different
          format, or have a suggestion, please contact us — and let us know the
          page and what happened so we can help and fix it:
        </p>
        <address>
          <strong>To Be Read · Clackamas Book Exchange</strong>
          <br />
          7931 SE King Rd, Unit 1
          <br />
          Portland, OR 97222, USA
          <br />
          Email: <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a>
          <br />
          Phone: <a href="tel:+15036592559">503-659-2559</a>
        </address>
        <p>
          We treat accessibility feedback as a priority and will make reasonable
          efforts to provide the information, service, or accommodation you need.
        </p>

        <h2>Ongoing effort</h2>
        <p>
          This statement reflects our current accessibility efforts and will be
          updated as we continue to improve. The &ldquo;Last updated&rdquo; date
          above shows when it was last revised.
        </p>
      </LegalPageLayout>
    </>
  );
}

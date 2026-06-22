import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageLayout from "@/components/LegalPageLayout";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const UPDATED = "2026-06-22";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the To Be Read (Clackamas Book Exchange) website, including reviews, the trade-credit estimator, and links to third-party shops.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service · To Be Read",
    description:
      "The terms that govern your use of the To Be Read website.",
    url: "/terms",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image"] },
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "TermsOfService",
  "@id": `${SITE_URL}/terms`,
  name: "Terms of Service",
  url: `${SITE_URL}/terms`,
  dateModified: UPDATED,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#bookstore` },
};

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Terms of Service", path: "/terms" }])} />
      <JsonLd data={policyJsonLd} />
      <LegalPageLayout
        title="Terms of Service"
        subtitle="The ground rules for using our website. Please read them — using the Site means you agree to them."
        updated={UPDATED}
      >
        <div className="legal-callout">
          <p>
            <strong>Plain-language summary:</strong> This is the website for a
            local used bookstore. Be respectful when you post reviews, understand
            that book info and trade-credit estimates are best-effort and not
            guarantees, and know that purchases happen in-store or on third-party
            shops with their own terms. This summary isn&apos;t a substitute for
            the full terms below.
          </p>
        </div>

        <h2>1. Agreement to these terms</h2>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are a binding agreement
          between you and <strong>To Be Read · Clackamas Book Exchange</strong>{" "}
          (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your
          use of <a href={SITE_URL}>tobereadshop.com</a> (the &ldquo;Site&rdquo;).
          By accessing or using the Site, you agree to these Terms and to our{" "}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please
          do not use the Site.
        </p>

        <h2>2. Who can use the Site</h2>
        <p>
          You may use the Site if you can form a binding contract with us and are
          not barred from doing so under applicable law. Features that involve
          submitting information (such as the newsletter, wishlists, and reviews)
          are intended for users 13 and older.
        </p>

        <h2>3. Using the Site</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for any unlawful purpose or in violation of these Terms.</li>
          <li>Submit false, misleading, defamatory, harassing, hateful, or infringing content.</li>
          <li>Attempt to gain unauthorized access to the Site, its accounts, or its systems.</li>
          <li>Interfere with the Site&apos;s operation, including through scraping, spamming, or automated abuse, or circumventing rate limits and security measures.</li>
          <li>Impersonate any person or misrepresent your affiliation with anyone.</li>
        </ul>

        <h2>4. Trade-in &amp; store credit</h2>
        <p>
          The Site may show trade-in information and a trade-credit estimator.
          Any credit value, swap fee, or rate shown online is an{" "}
          <strong>estimate for convenience only</strong> and is not an offer or a
          guarantee. Actual trade-in credit is determined in-store at our
          discretion based on condition, demand, and current policy, and may
          differ from any estimate. We do not buy books for cash. Trade and credit
          policies may change at any time without notice.
        </p>

        <h2>5. Online purchases &amp; third-party shops</h2>
        <p>
          We do not process online sales directly on this Site. Online purchases
          are completed on third-party marketplaces such as{" "}
          <a href="https://bookshop.org/shop/ClackamasBookExchange" target="_blank" rel="noopener noreferrer">Bookshop.org</a>{" "}
          and{" "}
          <a href="https://www.pangobooks.com/seller/cltoberread2024" target="_blank" rel="noopener noreferrer">PangoBooks</a>
          . Those purchases are governed by the terms, privacy policies, payment
          processing, shipping, and return policies of those platforms — not by
          these Terms. We are not responsible for third-party platforms.
        </p>

        <h2>6. Book details, availability &amp; pricing</h2>
        <p>
          Book information shown on the Site (titles, covers, prices, and
          availability) is provided for general reference and may come from
          third-party sources such as Google Books. It may be inaccurate,
          incomplete, or out of date, and inventory in a used bookstore changes
          constantly. We do not warrant that any listing is accurate or that a
          given title is in stock.
        </p>

        <h2>7. Newsletter &amp; communications</h2>
        <p>
          If you subscribe to our newsletter, you consent to receive periodic
          emails from us. You can unsubscribe at any time using the link or reply
          instructions in any email. See our{" "}
          <Link href="/privacy">Privacy Policy</Link> for how we handle your email
          address.
        </p>

        <h2>8. Reviews &amp; user content</h2>
        <p>
          When you submit a review or other content, you confirm it is your own,
          truthful, and lawful. By submitting it, you grant us a non-exclusive,
          royalty-free, worldwide license to use, display, reproduce, and adapt
          that content in connection with the Site and our business. Reviews are{" "}
          <strong>moderated</strong> before they appear, and we may decline,
          edit, or remove any submission at our discretion — for example, content
          that is spam, off-topic, abusive, or that violates these Terms. You are
          responsible for the content you submit.
        </p>

        <h2>9. Intellectual property</h2>
        <p>
          The Site and its content — including text, design, logos, graphics, and
          the &ldquo;To Be Read&rdquo; and &ldquo;Clackamas Book Exchange&rdquo;
          names — are owned by us or our licensors and protected by intellectual
          property laws. You may use the Site for your personal, non-commercial
          use. You may not copy, reproduce, or create derivative works from the
          Site&apos;s content without our permission, except as allowed by law.
        </p>

        <h2>10. Third-party links &amp; services</h2>
        <p>
          The Site links to and integrates third-party services (such as social
          media, maps, and marketplaces). We do not control and are not
          responsible for third-party sites, content, or practices. Your use of
          them is at your own risk and subject to their terms.
        </p>

        <h2>11. Disclaimers</h2>
        <p>
          The Site is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
          <strong>&ldquo;as available,&rdquo;</strong> without warranties of any
          kind, whether express or implied, including warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the Site will be
          uninterrupted, secure, or error-free, or that information on it is
          accurate or current.
        </p>

        <h2>12. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, To Be Read and its owners,
          staff, and suppliers will not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of data,
          profits, or goodwill, arising from your use of (or inability to use) the
          Site. Our total liability for any claim relating to the Site will not
          exceed one hundred U.S. dollars (US$100). Some jurisdictions do not
          allow certain limitations, so some of these may not apply to you.
        </p>

        <h2>13. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless To Be Read and its owners and
          staff from any claims, losses, or expenses (including reasonable legal
          fees) arising out of your misuse of the Site, your content, or your
          violation of these Terms or of any law or third-party right.
        </p>

        <h2>14. Governing law &amp; disputes</h2>
        <p>
          These Terms are governed by the laws of the State of Oregon, USA,
          without regard to its conflict-of-laws rules. You agree that the state
          and federal courts located in Clackamas County, Oregon will have
          exclusive jurisdiction over any dispute that is not otherwise resolved,
          and you consent to venue there. Nothing in these Terms limits any rights
          you may have under mandatory consumer-protection laws of your place of
          residence.
        </p>

        <h2>15. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. Changes take effect when we
          post them, and we will update the &ldquo;Last updated&rdquo; date above.
          Your continued use of the Site after changes means you accept the
          updated Terms.
        </p>

        <h2>16. Severability &amp; entire agreement</h2>
        <p>
          If any provision of these Terms is found unenforceable, the rest remain
          in effect. These Terms, together with our Privacy Policy and Cookie
          Policy, are the entire agreement between you and us regarding the Site.
        </p>

        <h2>17. Contact us</h2>
        <address>
          <strong>To Be Read · Clackamas Book Exchange</strong>
          <br />
          7931 SE King Rd, Ste 1
          <br />
          Milwaukie, OR 97222, USA
          <br />
          Email: <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a>
          <br />
          Phone: <a href="tel:+15036592559">503-659-2559</a>
        </address>
      </LegalPageLayout>
    </>
  );
}

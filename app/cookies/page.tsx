import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageLayout from "@/components/LegalPageLayout";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const UPDATED = "2026-06-22";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies and similar technologies To Be Read uses, what each one does, and how to accept, decline, or change your cookie preferences at any time.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookie Policy · To Be Read",
    description:
      "The cookies To Be Read uses, what each one does, and how to manage your preferences.",
    url: "/cookies",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image"] },
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "@id": `${SITE_URL}/cookies`,
  name: "Cookie Policy",
  url: `${SITE_URL}/cookies`,
  dateModified: UPDATED,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#bookstore` },
};

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Cookie Policy", path: "/cookies" }])} />
      <JsonLd data={policyJsonLd} />
      <LegalPageLayout
        title="Cookie Policy"
        subtitle="The cookies and similar technologies we use, what they do, and how to change your choices."
        updated={UPDATED}
      >
        <div className="legal-callout">
          <p>
            <strong>In short:</strong> The Site works with only a couple of
            cookies. Strictly necessary ones keep it running and remember your
            cookie choice. Optional analytics tags load{" "}
            <strong>only after you opt in</strong>. Our page-view counter is
            cookieless. You can change your choice anytime below.
          </p>
        </div>

        <h2>1. What are cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a
          website. They are widely used to make sites work, to remember your
          preferences, and to provide usage information. We also use the term to
          cover similar technologies such as local storage and tracking pixels.
        </p>

        <h2>2. How we use cookies</h2>
        <p>
          We group the technologies we use into two categories. Strictly
          necessary cookies are always active because the Site cannot function
          properly without them. Optional analytics cookies are{" "}
          <strong>off by default</strong> and load only if you accept them
          through our cookie banner (we use{" "}
          <a href="https://support.google.com/tagmanager/answer/13802165" target="_blank" rel="noopener noreferrer">
            Google Consent Mode
          </a>{" "}
          so tags respect your choice).
        </p>

        <h2>3. Cookies we use</h2>
        <h3>Strictly necessary</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tbr_consent</code></td>
              <td>To Be Read (first party)</td>
              <td>Remembers your cookie choice so we don&apos;t ask again.</td>
              <td>1 year</td>
            </tr>
            <tr>
              <td>Session / sign-in</td>
              <td>To Be Read (first party)</td>
              <td>Keeps you signed in to your wishlist when you use the magic-link login.</td>
              <td>Session / up to 30 days</td>
            </tr>
          </tbody>
        </table>

        <h3>Analytics (optional — load only with consent)</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>_ga</code>, <code>_ga_*</code> (if enabled via GTM)</td>
              <td>Google</td>
              <td>Aggregate analytics tags managed through Google Tag Manager. Set only after you opt in.</td>
              <td>Up to 2 years</td>
            </tr>
          </tbody>
        </table>

        <h3>Cookieless analytics (no consent needed)</h3>
        <p>
          We use{" "}
          <a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer">
            Plausible Analytics
          </a>
          , which does <strong>not</strong> use cookies and does not collect
          personal data. It counts page views in aggregate and cannot identify or
          track you across sites, so it runs without a consent prompt.
        </p>

        <h3>Third-party embeds</h3>
        <p>
          Some pages embed content from third parties — for example{" "}
          <strong>TikTok</strong> videos and <strong>Google Maps</strong>. When
          that content loads, those providers may set their own cookies, governed
          by their privacy and cookie policies. We load embeds only where they
          provide a feature you can see on the page.
        </p>

        <h2>4. Managing your preferences</h2>
        <p>
          You can change your cookie choice at any time. Reopen the banner with
          the button below or the &ldquo;Cookie settings&rdquo; link in the
          footer of any page.
        </p>
        <p>
          <CookieSettingsButton />
        </p>
        <p>
          You can also control cookies through your browser settings — including
          blocking or deleting them. Note that blocking strictly necessary
          cookies may stop parts of the Site from working. We also honor the{" "}
          <a href="https://globalprivacycontrol.org/" target="_blank" rel="noopener noreferrer">
            Global Privacy Control (GPC)
          </a>{" "}
          signal where applicable.
        </p>

        <h2>5. More information</h2>
        <p>
          For how we handle personal information generally, see our{" "}
          <Link href="/privacy">Privacy Policy</Link>. Questions? Email{" "}
          <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a>.
        </p>

        <h2>6. Changes to this policy</h2>
        <p>
          We may update this Cookie Policy as our practices or the technologies we
          use change. The &ldquo;Last updated&rdquo; date at the top reflects the
          latest version.
        </p>
      </LegalPageLayout>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageLayout from "@/components/LegalPageLayout";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const UPDATED = "2026-06-22";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How To Be Read (Clackamas Book Exchange) collects, uses, and protects your personal information — and the privacy rights you have under Oregon, California, and EU/UK law.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · To Be Read",
    description:
      "How To Be Read collects, uses, and protects your personal information, and the privacy rights you have.",
    url: "/privacy",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/twitter-image"] },
};

const policyJsonLd = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  "@id": `${SITE_URL}/privacy`,
  name: "Privacy Policy",
  url: `${SITE_URL}/privacy`,
  dateModified: UPDATED,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#bookstore` },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbList([{ name: "Privacy Policy", path: "/privacy" }])} />
      <JsonLd data={policyJsonLd} />
      <LegalPageLayout
        title="Privacy Policy"
        subtitle="What we collect, why we collect it, who we share it with, and the choices and rights you have."
        updated={UPDATED}
      >
        <div className="legal-callout">
          <p>
            <strong>The short version:</strong> We&apos;re a neighborhood used
            bookstore, not an ad company. We only collect the information we need
            to run the shop and stay in touch — mostly an email address if you
            ask us to. <strong>We never sell your personal information</strong>,
            and you can ask us to access or delete your data at any time.
          </p>
        </div>

        <h2>1. Who we are</h2>
        <p>
          This Privacy Policy explains how <strong>To Be Read</strong> (also
          known as the <strong>Clackamas Book Exchange</strong>, &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) handles personal information
          collected through our website at{" "}
          <a href={SITE_URL}>tobereadshop.com</a> (the &ldquo;Site&rdquo;). We are
          a used bookstore located in Milwaukie, Oregon, USA, and we are the
          controller responsible for your personal information.
        </p>
        <p>
          If you have any questions about this policy or how we handle your data,
          contact us using the details in{" "}
          <a href="#contact">Section 14 (Contact us)</a>.
        </p>

        <h2>2. Information we collect</h2>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Newsletter sign-ups.</strong> When you subscribe, we collect
            your email address so we can send you store news and confirm your
            subscription.
          </li>
          <li>
            <strong>Accounts &amp; wishlists.</strong> If you create a wishlist,
            we use a passwordless &ldquo;magic link&rdquo; sign-in, which collects
            your email address. We store the books you save and send you an email
            if a title on your wishlist arrives in the shop.
          </li>
          <li>
            <strong>Reviews.</strong> If you submit a review, we collect the name
            you provide, your star rating, and your review text. The name and
            review you submit are displayed publicly on the Site once approved.
          </li>
          <li>
            <strong>Messages.</strong> If you email or call us, we receive
            whatever information you choose to share.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Privacy-friendly analytics.</strong> We use{" "}
            <a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer">
              Plausible Analytics
            </a>
            , which is <strong>cookieless</strong> and collects only aggregate,
            anonymized usage data (such as page views and referring sites). It
            does not track you across sites or build a profile of you, and does
            not collect personal data.
          </li>
          <li>
            <strong>Google Tag Manager.</strong> We use Google Tag Manager to
            manage measurement tags. These run only after you opt in through our
            cookie banner (see our <Link href="/cookies">Cookie Policy</Link>).
          </li>
          <li>
            <strong>Server logs &amp; abuse prevention.</strong> Like most
            websites, our hosting provider records technical request data such as
            IP address and browser type. We also use your IP address transiently
            to rate-limit forms and prevent abuse. For reviews, we store only a{" "}
            <strong>salted, one-way hash</strong> of your IP address — never the
            raw address.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> knowingly collect payment card details on
          this Site. In-store purchases are handled at our point of sale, and
          online sales happen on third-party marketplaces (see Section 5).
        </p>

        <h2>3. How we use your information</h2>
        <ul>
          <li>To operate the Site and provide features you request (wishlists, reviews, the trade-credit estimator, and the reading recommendation tool).</li>
          <li>To send you the newsletter and wishlist notifications you signed up for.</li>
          <li>To respond to your questions and provide customer service.</li>
          <li>To understand, in aggregate, how the Site is used so we can improve it.</li>
          <li>To protect the Site against spam, fraud, and abuse.</li>
          <li>To comply with our legal obligations.</li>
        </ul>

        <h2>4. Legal bases for processing (EU/UK visitors)</h2>
        <p>
          If you are in the European Economic Area or the United Kingdom, we rely
          on the following legal bases under the GDPR / UK GDPR:
        </p>
        <ul>
          <li><strong>Consent</strong> — for the newsletter, wishlist notifications, and optional analytics cookies. You can withdraw consent at any time.</li>
          <li><strong>Legitimate interests</strong> — for running and securing the Site and understanding aggregate usage, balanced against your rights.</li>
          <li><strong>Legal obligation</strong> — where we must retain or disclose information to comply with the law.</li>
        </ul>

        <h2>5. When we share information</h2>
        <p>
          <strong>We do not sell your personal information, and we do not share
          it for cross-context behavioral advertising.</strong> We share
          information only with service providers who process it on our behalf,
          and only as needed to run the Site:
        </p>
        <ul>
          <li><strong>Netlify</strong> — website hosting.</li>
          <li><strong>Neon</strong> — managed database that stores wishlists, accounts, and reviews.</li>
          <li><strong>Resend</strong> — sends our transactional and newsletter emails.</li>
          <li><strong>Plausible</strong> — cookieless, aggregate analytics.</li>
          <li><strong>Google</strong> — Tag Manager (consent-gated), plus Maps, Books, and Places used to show our location, look up book details, and display reviews.</li>
          <li><strong>Groq</strong> — powers the &ldquo;Next Read&rdquo; recommendation tool; the reading preferences you type are sent to generate a suggestion and are not stored by us.</li>
          <li><strong>TikTok</strong> — embedded videos on some pages may load content from TikTok.</li>
        </ul>
        <p>
          We may also disclose information if required by law, to protect our
          rights or the safety of others, or in connection with a sale or
          transfer of the business (with notice to you where required).
        </p>

        <h2>6. Cookies &amp; tracking technologies</h2>
        <p>
          We use a small number of cookies and similar technologies. Optional
          analytics tags load only after you consent. For full details and to
          change your choice at any time, see our{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>

        <h2>7. How long we keep your information</h2>
        <p>
          We keep personal information only as long as needed for the purposes
          above. Newsletter and wishlist data is kept until you unsubscribe or
          ask us to delete it. Reviews are kept while published. Aggregate
          analytics data contains no personal information. We delete or anonymize
          data when it is no longer needed.
        </p>

        <h2>8. How we protect your information</h2>
        <p>
          We use reasonable administrative and technical safeguards, including
          encryption in transit (HTTPS), access controls, salted hashing for IP
          data, and reputable service providers. We also practice data
          minimization — we limit what we collect in the first place.
        </p>
        <p>
          However, <strong>no method of transmission over the internet or
          electronic storage is completely secure</strong>, and we cannot and do
          not guarantee absolute security. You provide information to us at your
          own risk, and you are responsible for keeping any sign-in link or
          credentials confidential. To the fullest extent permitted by law, and
          except for obligations we cannot disclaim under applicable data-protection
          law, we are not liable for any unauthorized access to, alteration of, or
          loss of data that occurs despite reasonable safeguards, including events
          beyond our reasonable control or acts of third parties.
        </p>

        <h2>9. Your privacy rights</h2>
        <h3>Oregon residents (Oregon Consumer Privacy Act)</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Confirm whether we process your personal data and access it.</li>
          <li>Obtain a list of the categories of third parties to which we have disclosed personal data.</li>
          <li>Correct inaccuracies and request deletion of your personal data.</li>
          <li>Obtain a portable copy of data you provided to us.</li>
          <li>Opt out of the sale of personal data, targeted advertising, and certain profiling. (We do not sell data or use it for targeted advertising.)</li>
        </ul>

        <h3>California residents (CCPA/CPRA)</h3>
        <ul>
          <li>The right to know what personal information we collect, use, and disclose.</li>
          <li>The right to delete and to correct your personal information.</li>
          <li>The right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. (We do not sell or share it.)</li>
          <li>The right to limit the use of sensitive personal information. (We do not use sensitive personal information for these purposes.)</li>
          <li>The right not to receive discriminatory treatment for exercising your rights.</li>
        </ul>

        <h3>EU/UK residents (GDPR / UK GDPR)</h3>
        <ul>
          <li>The rights of access, rectification, erasure, restriction, data portability, and to object to processing.</li>
          <li>The right to withdraw consent at any time, without affecting prior processing.</li>
          <li>The right to lodge a complaint with your local supervisory authority.</li>
        </ul>

        <h3>How to exercise your rights</h3>
        <p>
          Email us at{" "}
          <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a> or use the
          contact details below. We will verify your request (and that of any
          authorized agent) and respond within the timeframes required by
          applicable law. You may appeal a decision by replying to our response;
          if we deny your appeal, you may contact the{" "}
          <a href="https://justice.oregon.gov/consumer/" target="_blank" rel="noopener noreferrer">
            Oregon Department of Justice
          </a>
          .
        </p>

        <h2>10. Your choices &amp; the Global Privacy Control</h2>
        <ul>
          <li><strong>Email:</strong> unsubscribe from the newsletter at any time using the link or reply in any email we send you.</li>
          <li><strong>Cookies:</strong> accept or decline optional cookies through our banner, and reopen &ldquo;Cookie settings&rdquo; from the footer to change your choice.</li>
          <li><strong>Global Privacy Control (GPC):</strong> we honor recognized opt-out preference signals, such as GPC, as a valid request to opt out where applicable.</li>
        </ul>

        <h2>11. Children&apos;s privacy</h2>
        <p>
          Our Site is intended for a general audience and is not directed to
          children under 13. We do not knowingly collect personal information
          from children under 13. If you believe a child has provided us
          information, contact us and we will delete it.
        </p>

        <h2>12. International visitors</h2>
        <p>
          We are based in the United States, and our service providers may
          process data in the U.S. and other countries. If you access the Site
          from outside the U.S., you understand your information will be
          transferred to and processed in the U.S., which may have different data
          protection laws than your country.
        </p>

        <h2>13. Third parties, limitations &amp; your acknowledgment</h2>
        <p>
          We share information with the service providers described in Section 5
          so they can perform services for us, and we require them to protect it.
          However, those providers and any other third party operate
          independently, and — except as required by applicable data-protection
          law — we are not responsible or liable for the independent acts,
          omissions, security practices, or privacy practices of any third party,
          including third-party sites or embeds you reach from the Site.
        </p>
        <p>
          This Privacy Policy is provided for transparency and does not create any
          contractual right or warranty beyond what applicable law requires.
          Except for rights that cannot be waived or limited under applicable
          data-protection law, your use of the Site is also subject to the
          disclaimers, limitation of liability, indemnification, and dispute-resolution
          provisions in our <Link href="/terms">Terms of Service</Link>, which are
          incorporated here by reference. By using the Site and providing
          information to us, you acknowledge and consent to the collection, use,
          and disclosure of information as described in this Policy.
        </p>

        <h2 id="contact">14. Contact us</h2>
        <p>To exercise your rights or ask a privacy question, reach us at:</p>
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

        <h2>15. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          revise the &ldquo;Last updated&rdquo; date at the top of this page.
          Material changes will be highlighted on the Site. Please review it
          periodically.
        </p>
      </LegalPageLayout>
    </>
  );
}

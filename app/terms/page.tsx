import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LegalPageLayout from "@/components/LegalPageLayout";
import { breadcrumbList, SITE_URL } from "@/lib/seo";

const UPDATED = "2026-06-22";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the To Be Read (Clackamas Book Exchange) website, including disclaimers, limitation of liability, indemnification, and a binding arbitration and class-action waiver.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service · To Be Read",
    description: "The terms that govern your use of the To Be Read website.",
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
        subtitle="The ground rules for using our website. Please read them carefully — using the Site means you agree to all of them."
        updated={UPDATED}
      >
        <div className="legal-callout">
          <p>
            <strong>Please read carefully.</strong> This is the website for a
            local used bookstore. These Terms include important provisions that
            affect your legal rights — in particular a{" "}
            <strong>
              disclaimer of warranties (Section 13), a limitation of liability
              (Section 14), an indemnification obligation (Section 16), and a
              binding individual-arbitration agreement and class-action waiver
              (Section 17)
            </strong>{" "}
            that, except where prohibited by law, require disputes to be resolved
            individually rather than in court or in a class action. You may opt
            out of arbitration within 30 days (see Section 17). This summary is
            not a substitute for the full Terms below.
          </p>
        </div>

        <h2>1. Agreement to these Terms</h2>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are a binding legal
          agreement between you (&ldquo;you&rdquo; or &ldquo;user&rdquo;) and{" "}
          <strong>To Be Read · Clackamas Book Exchange</strong>, together with its
          owner, officers, employees, agents, independent contractors,
          volunteers, affiliates, successors, and suppliers (collectively,
          &ldquo;To Be Read,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our,&rdquo; and together the &ldquo;Protected Parties&rdquo;),
          governing your access to and use of{" "}
          <a href={SITE_URL}>tobereadshop.com</a> and any related content,
          features, and services (collectively, the &ldquo;Site&rdquo;). By
          accessing or using the Site, clicking to accept, or otherwise
          indicating assent, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and by our{" "}
          <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/cookies">Cookie Policy</Link>, which are incorporated by
          reference. <strong>If you do not agree, do not use the Site.</strong>{" "}
          If you use the Site on behalf of an organization, you represent that you
          are authorized to bind that organization to these Terms.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You may use the Site only if you can form a binding contract with us and
          are not barred from doing so under applicable law. Features that involve
          submitting information (such as the newsletter, wishlists, and reviews)
          are intended for users 13 and older; users under the age of majority
          must use the Site under the supervision of a parent or legal guardian
          who agrees to these Terms. You are responsible for all activity that
          occurs through your use of the Site.
        </p>

        <h2>3. Changes to the Site</h2>
        <p>
          The Site is offered as a courtesy and informational resource. We may
          add, change, suspend, limit, or discontinue any part of the Site — or
          the entire Site — at any time, with or without notice, and we are not
          liable to you or anyone else for doing so. We do not guarantee that the
          Site, or any feature of it, will always be available.
        </p>

        <h2>4. Acceptable use</h2>
        <p>You agree not to, and not to permit or assist anyone else to:</p>
        <ul>
          <li>Use the Site for any unlawful, fraudulent, or harmful purpose, or in violation of these Terms.</li>
          <li>Submit or transmit content that is false, misleading, defamatory, obscene, harassing, threatening, hateful, discriminatory, or that infringes or misappropriates any intellectual-property, privacy, or other right.</li>
          <li>Attempt to gain unauthorized access to the Site, other users&apos; accounts or data, or any systems or networks connected to the Site.</li>
          <li>Interfere with or disrupt the Site, including through scraping, harvesting, spamming, denial-of-service activity, automated access, or circumventing rate limits, security, or access controls.</li>
          <li>Introduce any virus, malware, or other harmful code, or use the Site to develop or train any competing product or dataset.</li>
          <li>Impersonate any person or entity or misrepresent your identity or affiliation.</li>
        </ul>
        <p>
          We may investigate and take any action we deem appropriate for any
          actual or suspected violation, including removing content, suspending or
          terminating access, and cooperating with law enforcement, without
          liability to you.
        </p>

        <h2>5. Trade-in &amp; store credit</h2>
        <p>
          The Site may show trade-in information and a trade-credit estimator. Any
          credit value, swap fee, rate, or other figure shown online is an{" "}
          <strong>
            illustrative estimate provided for convenience only — not an offer, a
            quote, a promise, or a guarantee
          </strong>
          . Actual trade-in eligibility and credit are determined solely in-store,
          in our sole and absolute discretion, based on factors such as condition,
          demand, and current policy, and may differ materially from any estimate.
          We do not buy books for cash. We may accept, decline, or limit any
          trade, and may change or discontinue trade and credit policies, rates,
          and store-credit terms at any time without notice. Store credit has no
          cash value, is non-transferable, and does not expire — it rolls over
          year to year, subject to the $200 cap and applicable law.
        </p>

        <h2>6. Online purchases &amp; third-party shops</h2>
        <p>
          We do not process online sales, payments, or shipping directly on this
          Site. Online purchases are completed on independent third-party
          marketplaces such as{" "}
          <a href="https://bookshop.org/shop/ClackamasBookExchange" target="_blank" rel="noopener noreferrer">Bookshop.org</a>{" "}
          and{" "}
          <a href="https://www.pangobooks.com/seller/cltoberread2024" target="_blank" rel="noopener noreferrer">PangoBooks</a>
          . Those transactions are governed entirely by the terms, privacy
          policies, payment processing, fulfillment, shipping, and return policies
          of those platforms — not by these Terms. We make no representations about
          and accept no responsibility or liability for third-party platforms,
          their content, or any transaction you enter into with them.
        </p>

        <h2>7. Book details, availability &amp; pricing errors</h2>
        <p>
          Book information shown on the Site (titles, descriptions, covers,
          prices, and availability) is provided for general reference and may be
          drawn from third-party sources such as Google Books. It may be
          inaccurate, incomplete, or out of date, and inventory in a used
          bookstore changes constantly. We do not warrant that any listing is
          accurate, current, or that a given title is in stock. Prices and
          availability are subject to change without notice, and we reserve the
          right to correct any error, inaccuracy, or omission, and to refuse,
          cancel, or limit any order or trade arising from such an error, at any
          time — even after it has been submitted.
        </p>

        <h2>8. Newsletter &amp; electronic communications</h2>
        <p>
          If you subscribe to our newsletter, you consent to receive periodic
          emails from us, and you may unsubscribe at any time using the link or
          reply instructions in any email. By using the Site, you also consent to
          receive communications and disclosures from us electronically, and you
          agree that electronic communications satisfy any legal requirement that
          such communications be in writing. See our{" "}
          <Link href="/privacy">Privacy Policy</Link> for how we handle your
          information.
        </p>

        <h2>9. Reviews &amp; user content</h2>
        <p>
          You are solely responsible for any review, comment, or other content you
          submit (&ldquo;User Content&rdquo;). By submitting User Content, you
          represent and warrant that it is your own original work (or that you have
          all necessary rights to it), is truthful and accurate, and does not
          violate any law or any third party&apos;s rights. You grant us a
          perpetual, irrevocable, worldwide, royalty-free, fully paid-up,
          sublicensable, and transferable license to use, host, store, reproduce,
          modify, adapt, publish, translate, create derivative works from,
          distribute, and display the User Content in any media, in connection
          with the Site and our business, including marketing — without
          attribution or compensation to you.
        </p>
        <p>
          We are under no obligation to monitor, display, or retain User Content,
          and we may decline, moderate, edit, refuse, or remove any submission at
          any time, in our sole discretion and without notice — for example,
          content that is spam, off-topic, abusive, unlawful, or that violates
          these Terms. We do not endorse and are not responsible for any User
          Content, and any reliance on it is at your own risk. If you believe
          content on the Site infringes your copyright, contact us at the address
          in Section 23.
        </p>

        <h2>10. Intellectual property</h2>
        <p>
          The Site and all of its content — including text, design, layout,
          graphics, logos, images, and the &ldquo;To Be Read&rdquo; and
          &ldquo;Clackamas Book Exchange&rdquo; names and marks — are owned by us
          or our licensors and are protected by intellectual-property and other
          laws. Subject to these Terms, we grant you a limited, revocable,
          non-exclusive, non-transferable license to access and use the Site for
          your personal, non-commercial use only. All rights not expressly granted
          are reserved. You may not copy, reproduce, modify, distribute, sell,
          publicly display, frame, or create derivative works from any part of the
          Site without our prior written permission, except as expressly allowed
          by law.
        </p>

        <h2>11. Third-party links &amp; services</h2>
        <p>
          The Site links to and integrates third-party sites and services (such as
          social media, maps, marketplaces, and analytics). We provide these for
          convenience only; we do not control, endorse, or assume any
          responsibility or liability for any third-party site, content, product,
          service, or practice. Your access to and use of them is at your own risk
          and subject to their terms and policies.
        </p>

        <h2>12. Assumption of risk</h2>
        <p>
          You access and use the Site, and rely on any information on it
          (including book details and trade-credit estimates), entirely at your
          own risk and on your own judgment. You assume all risks associated with
          your use of the Site and any in-person or online interaction or
          transaction arising from it.
        </p>

        <h2>13. Disclaimer of warranties</h2>
        <p>
          <strong>
            The Site and all content, features, and services are provided
            &ldquo;as is,&rdquo; &ldquo;as available,&rdquo; and &ldquo;with all
            faults,&rdquo; without warranties of any kind, whether express,
            implied, or statutory.
          </strong>{" "}
          To the fullest extent permitted by law, the Protected Parties disclaim
          all warranties, including implied warranties of merchantability, fitness
          for a particular purpose, title, accuracy, and non-infringement, and any
          warranties arising from course of dealing or usage of trade. The
          Protected Parties do not warrant that the Site will be uninterrupted,
          timely, secure, accurate, complete, current, or error-free, that defects
          will be corrected, or that the Site is free of viruses or other harmful
          components. No advice or information, whether oral or written, obtained
          from the Site creates any warranty not expressly stated here. Nothing on
          the Site constitutes professional advice. Some jurisdictions do not allow
          the exclusion of certain warranties, so some exclusions may not apply to
          you.
        </p>

        <h2>14. Limitation of liability</h2>
        <p>
          <strong>
            To the fullest extent permitted by law, in no event will the Protected
            Parties be liable
          </strong>{" "}
          for any indirect, incidental, special, consequential, exemplary, or
          punitive damages, or for any loss of profits, revenue, data, goodwill,
          or other intangible losses, arising out of or relating to your access
          to, use of, or inability to use the Site — whether based in contract,
          tort (including negligence), strict liability, or any other theory, and
          whether or not the Protected Parties have been advised of the
          possibility of such damages.
        </p>
        <p>
          <strong>
            The Protected Parties&apos; total aggregate liability for all claims
            relating to the Site will not exceed the greater of (a) the total
            amount you paid us, if any, for access to the Site in the six (6)
            months preceding the event giving rise to the claim, or (b) one hundred
            U.S. dollars (US$100.00).
          </strong>{" "}
          These limitations apply even if a remedy fails of its essential purpose.
          Because some jurisdictions do not allow the exclusion or limitation of
          certain damages, some of the above may not apply to you; in such cases
          the Protected Parties&apos; liability is limited to the smallest amount
          permitted by law.
        </p>

        <h2>15. Release</h2>
        <p>
          To the fullest extent permitted by law, you release and forever
          discharge the Protected Parties from any and all claims, demands,
          damages, and liabilities of every kind arising out of or connected with
          any dispute between you and any third party (including other users or
          third-party platforms) relating to the Site or any User Content. If you
          are a California resident, you waive California Civil Code §1542, and any
          similar law of any jurisdiction, which says: &ldquo;A general release
          does not extend to claims that the creditor or releasing party does not
          know or suspect to exist in his or her favor at the time of executing the
          release, and that, if known by him or her, would have materially affected
          his or her settlement with the debtor or released party.&rdquo;
        </p>

        <h2>16. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless the Protected Parties
          from and against any and all claims, demands, actions, losses,
          liabilities, damages, costs, and expenses (including reasonable
          attorneys&apos; fees and court costs) arising out of or relating to: (a)
          your access to or use of the Site; (b) your User Content; (c) your
          violation of these Terms; (d) your violation of any law or any
          third-party right; or (e) your negligence or willful misconduct. We
          reserve the right, at our own expense, to assume the exclusive defense
          and control of any matter otherwise subject to indemnification by you,
          and you agree to cooperate with our defense. You will not settle any
          matter affecting the Protected Parties without our prior written consent.
        </p>

        <h2>17. Dispute resolution — binding arbitration &amp; class-action waiver</h2>
        <div className="legal-callout">
          <p>
            <strong>Please read this Section carefully — it affects your legal
            rights.</strong> Except as set out below, you and To Be Read agree to
            resolve disputes by binding individual arbitration, and to waive trial
            by jury and the right to participate in a class action. You may opt out
            within 30 days.
          </p>
        </div>
        <p>
          <strong>Informal resolution first.</strong> Before starting any
          arbitration, you agree to first contact us at{" "}
          <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a> with a
          written description of the dispute and to allow 60 days to resolve it
          informally and in good faith.
        </p>
        <p>
          <strong>Agreement to arbitrate.</strong> If we cannot resolve a dispute
          informally, you and To Be Read agree that any dispute, claim, or
          controversy arising out of or relating to the Site or these Terms will be
          settled by final and binding arbitration administered by a recognized
          arbitration provider (such as the American Arbitration Association) under
          its applicable consumer rules, before a single arbitrator, with the
          arbitration taking place in or near Clackamas County, Oregon, or by phone
          or video, or — at your election — in your home county. The Federal
          Arbitration Act governs the interpretation and enforcement of this
          Section.
        </p>
        <p>
          <strong>Class-action and jury-trial waiver.</strong> You and To Be Read
          agree that each may bring claims against the other only in an individual
          capacity, and not as a plaintiff or class member in any purported class,
          collective, consolidated, or representative proceeding. The arbitrator
          may not consolidate more than one person&apos;s claims or preside over
          any form of representative or class proceeding.{" "}
          <strong>
            You and To Be Read waive any right to a jury trial.
          </strong>
        </p>
        <p>
          <strong>Exceptions.</strong> Notwithstanding the above, either party may
          (a) bring an individual claim in small-claims court if it qualifies, and
          (b) seek injunctive or other equitable relief in court to protect its
          intellectual property or stop unauthorized access or misuse of the Site.
        </p>
        <p>
          <strong>30-day opt-out.</strong> You may opt out of this arbitration and
          class-waiver agreement by emailing{" "}
          <a href="mailto:TBR@tcpbusiness.com">TBR@tcpbusiness.com</a> with your
          name and a clear statement that you opt out, within 30 days of first
          accepting these Terms. Opting out will not affect any other part of these
          Terms. If this Section is found unenforceable in whole or in part, the
          remainder of these Terms still applies, and any claim that cannot be
          arbitrated will be resolved in the courts identified in Section 19.
        </p>

        <h2>18. Time limit on claims</h2>
        <p>
          To the fullest extent permitted by law, any claim or cause of action
          arising out of or relating to the Site or these Terms must be filed
          within <strong>one (1) year</strong> after the claim arose; otherwise it
          is permanently barred.
        </p>

        <h2>19. Governing law &amp; venue</h2>
        <p>
          These Terms and any dispute are governed by the laws of the State of
          Oregon, USA, without regard to its conflict-of-laws rules. Subject to the
          arbitration agreement in Section 17, you agree that the exclusive venue
          for any dispute not subject to arbitration is the state and federal
          courts located in Clackamas County, Oregon, and you consent to personal
          jurisdiction and venue there. Nothing in these Terms removes any
          non-waivable right or protection you may have under the mandatory
          consumer-protection laws of your place of residence.
        </p>

        <h2>20. Force majeure</h2>
        <p>
          The Protected Parties are not liable for any failure or delay in
          performance, or for any unavailability of the Site, caused by events
          beyond their reasonable control, including acts of God, natural
          disasters, fire, flood, power or internet outages, labor disputes, acts
          of government, war, terrorism, civil unrest, pandemics, or the failure of
          third-party services or suppliers.
        </p>

        <h2>21. Termination</h2>
        <p>
          We may suspend or terminate your access to the Site at any time, for any
          reason or no reason, with or without notice, and without liability.
          Provisions that by their nature should survive termination — including
          Sections 9 through 19 and 22 — will survive.
        </p>

        <h2>22. Changes to these Terms &amp; miscellaneous</h2>
        <p>
          We may update these Terms from time to time. Changes take effect when
          posted, and we will update the &ldquo;Last updated&rdquo; date above.
          Your continued use of the Site after changes means you accept the updated
          Terms. If any provision is held invalid or unenforceable, it will be
          modified to the minimum extent necessary or severed, and the remaining
          provisions will remain in full force. Our failure to enforce any
          provision is not a waiver of it. You may not assign or transfer these
          Terms without our prior written consent; we may freely assign them.
          Section headings are for convenience only. These Terms, together with our
          Privacy Policy and Cookie Policy, are the entire agreement between you and
          us regarding the Site and supersede all prior understandings.
        </p>

        <h2>23. Contact us</h2>
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
      </LegalPageLayout>
    </>
  );
}

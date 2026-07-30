import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Respiratory Equips",
  description: "Terms and conditions for using the Respiratory Equips website and services.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-6">Terms & Conditions</h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <p>
          By using this website, you agree to the following terms. Please read them carefully.
        </p>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Use of This Website</h2>
          <p>
            This website is provided to showcase our respiratory care products and allow you to
            request consultations. All content, including product descriptions, images, and
            pricing, is provided for informational purposes and may be updated without notice.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Product Information</h2>
          <p>
            While we make every effort to keep product details, specifications, and pricing
            accurate and up to date, errors may occasionally occur. We reserve the right to
            correct any errors and to update pricing or availability at any time.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Ordering Process</h2>
          <p>
            This website does not process online payments or checkouts. All orders are finalized
            through direct communication with our team via WhatsApp, phone, or in person at one
            of our offices.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Limitation of Liability</h2>
          <p>
            Respiratory Equips is not liable for any indirect or consequential damages arising
            from the use of this website. Product warranties are governed by the respective
            manufacturer's terms.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the website after
            changes are posted constitutes acceptance of the updated terms.
          </p>
        </div>
      </div>
    </section>
  );
}
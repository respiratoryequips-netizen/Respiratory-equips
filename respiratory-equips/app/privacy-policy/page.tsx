import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Respiratory Equips",
  description: "How Respiratory Equips collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <p>
          Respiratory Equips ("we", "us", "our") respects your privacy. This policy explains
          what information we collect through our website and how we use it.
        </p>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Information We Collect</h2>
          <p>
            When you submit our consultation form, we collect your full name, email address,
            phone number, city, the equipment you're interested in, an optional prescription
            file, and any message you provide. We do not collect or store any payment or
            financial information through this website, as we do not process online payments.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">How We Use Your Information</h2>
          <p>
            Information submitted through our consultation form is used solely to respond to
            your inquiry, recommend suitable equipment, and arrange delivery or an office visit.
            We do not sell or share your personal information with third parties for marketing
            purposes.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Newsletter</h2>
          <p>
            If you subscribe to our newsletter, we use your email address only to send you
            offers, health tips, and new product updates. You can unsubscribe at any time.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Data Security</h2>
          <p>
            We take reasonable technical measures to protect the information you share with us.
            However, no method of electronic transmission or storage is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Contact Us</h2>
          <p>
            If you have questions about this policy or your data, contact us at
            respiratoryequips@gmail.com.
          </p>
        </div>
      </div>
    </section>
  );
}
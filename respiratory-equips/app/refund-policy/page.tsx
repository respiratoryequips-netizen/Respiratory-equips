import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Respiratory Equips",
  description: "Refund eligibility and timelines for purchases made through Respiratory Equips.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-6">Refund Policy</h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <p>
          This policy explains when and how a refund may be issued for purchases made through
          Respiratory Equips, whether at one of our offices or arranged via consultation and
          delivery.
        </p>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Refund Eligibility</h2>
          <p>
            Refunds are issued if a product is confirmed defective on arrival, if the wrong item
            was delivered, or if an approved return is completed per our Returns & Refunds
            policy. Refunds are not issued for used, opened, or hygiene-sensitive items unless
            they are defective.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Refund Method & Timeline</h2>
          <p>
            Approved refunds are processed back to the original payment method used at purchase
            (cash, bank transfer, or card at our office) within 7-10 business days of approval.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Advance Payments</h2>
          <p>
            If an advance payment was made to reserve a product that is later found to be
            unavailable, the full advance amount will be refunded promptly.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Requesting a Refund</h2>
          <p>
            Contact us at respiratoryequips@gmail.com or WhatsApp 03162568654 with your purchase
            details and reason for the refund request.
          </p>
        </div>
      </div>
    </section>
  );
}
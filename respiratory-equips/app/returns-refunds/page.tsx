import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds | Respiratory Equips",
  description: "Our returns and exchange policy for CPAP, BiPAP and respiratory care equipment.",
  alternates: { canonical: "/returns-refunds" },
};

export default function ReturnsRefundsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-6">Returns & Refunds</h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <p>
          Because respiratory equipment is a medical product, our returns and exchange policy is
          designed to protect both hygiene standards and your safety, while remaining fair if a
          genuine issue arises with your order.
        </p>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Eligible Returns</h2>
          <p>
            Unopened, unused products in their original packaging may be returned or exchanged
            within 7 days of delivery. Please contact our team via WhatsApp or phone before
            sending anything back, so we can guide you through the process.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Non-Returnable Items</h2>
          <p>
            For hygiene and safety reasons, used masks, cushions, tubing, filters, and any
            product that has been opened or used cannot be returned or exchanged, unless the
            item is defective or was not what you ordered.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Defective or Incorrect Items</h2>
          <p>
            If you receive a defective machine or the wrong item, contact us within 48 hours of
            delivery with photos/videos of the issue. We will arrange a replacement or repair
            under the manufacturer's warranty at no extra cost to you.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">How to Start a Return</h2>
          <p>
            Message us on WhatsApp at 03162568654 or email respiratoryequips@gmail.com with your
            order details and reason for return. Our team will respond with the next steps
            within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Respiratory Equips",
  description: "Frequently asked questions about CPAP, BiPAP, oxygen concentrators, warranty, delivery and support.",
  alternates: { canonical: "/faqs" },
};

const faqs = [
  {
    q: "Are your CPAP, BiPAP, and Oxygen Concentrator machines genuine?",
    a: "Yes. We are an authorized dealer and every product we sell is 100% genuine, sourced directly from authorized distributors of ResMed, Philips Respironics, Yuwell, and other trusted brands, and comes with the manufacturer's official warranty.",
  },
  {
    q: "How do I place an order?",
    a: "We don't currently process orders directly through the website. Instead, browse our products, then contact us via WhatsApp or the consultation form with the item you're interested in, and one of our specialists will guide you through availability, pricing, and delivery.",
  },
  {
    q: "Do I need a doctor's prescription to buy a CPAP or BiPAP machine?",
    a: "We recommend having a prescription or sleep study report from your doctor so we can help recommend the right pressure settings and mask type for your condition. You can upload your prescription directly through our consultation form.",
  },
  {
    q: "Do you deliver nationwide?",
    a: "Yes, we deliver across Pakistan. Delivery typically takes 24-72 hours depending on your city. You can also visit one of our offices in Karachi, Lahore, Rawalpindi, Faisalabad, or Peshawar.",
  },
  {
    q: "What warranty do your products come with?",
    a: "All products come with the official manufacturer warranty. Warranty duration varies by brand and product type — our team will confirm the exact warranty period for your specific machine before purchase.",
  },
  {
    q: "Can I get after-sales support and maintenance?",
    a: "Yes, our team provides ongoing after-sales support, including guidance on machine setup, mask fitting, filter replacement, and general troubleshooting. Contact us anytime via WhatsApp or phone.",
  },
  {
    q: "How do I know which machine or mask is right for me?",
    a: "Every patient's needs are different. Use our free consultation form or WhatsApp us directly with your prescription or symptoms, and our specialists will recommend the right equipment for you.",
  },
];

export default function FaqsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-10">
        Answers to common questions about our products, ordering process, and support.
      </p>

      <div className="space-y-6">
        {faqs.map((item) => (
          <div key={item.q} className="bg-white rounded-xl shadow-sm p-6">
            <p className="font-semibold text-primary mb-2">{item.q}</p>
            <p className="text-gray-600 text-sm">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
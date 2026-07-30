import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Respiratory Equips",
  description: "Important medical disclaimer regarding the use of respiratory care equipment sold by Respiratory Equips.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-primary mb-6">Medical Disclaimer</h1>

      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <p>
          The information provided on this website, including product descriptions and
          specifications, is for general informational purposes only and does not constitute
          medical advice, diagnosis, or treatment.
        </p>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Consult Your Doctor</h2>
          <p>
            CPAP, BiPAP, and oxygen therapy equipment should only be used under the guidance and
            prescription of a qualified physician. Always consult your doctor or sleep
            specialist before starting, changing, or stopping any respiratory therapy.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Not a Substitute for Medical Care</h2>
          <p>
            Nothing on this website should be interpreted as a substitute for professional
            medical advice. If you experience a medical emergency, contact your doctor or
            emergency services immediately — do not rely on this website for urgent medical
            guidance.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-primary text-base mb-2">Product Suitability</h2>
          <p>
            Our team can help recommend equipment based on your prescription or stated needs,
            but the final decision on suitability of any device for your specific medical
            condition rests with your treating physician.
          </p>
        </div>
      </div>
    </section>
  );
}
export default function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Respiratory Equips",
    url: siteUrl,
    description:
      "Pakistan's trusted supplier of genuine CPAP, BiPAP, Oxygen Concentrators and respiratory care accessories.",
    telephone: "+92-309-7892590",
    email: "info@respiratoryequips.pk",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "164-A, PIA Main Boulevard, Gulberg III",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Shop # 7, Main Rashid Minhas Road, Gulshan-e-Iqbal",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Office # 12, 3rd Floor, F-10 Markaz",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
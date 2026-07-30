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
    email: "respiratoryequips@gmail.com",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Purana Sabzi Mandi, near Askari Park",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "6th Road, City Light Town, D Block, D-472, Global Boys Hostel",
        addressLocality: "Rawalpindi",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Multan Road, Mansoora Bazar, near Ittefaq Town Park",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Main Sargodha Road, Shop # 2, near PSO Petrol Pump",
        addressLocality: "Faisalabad",
        addressCountry: "PK",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "1st Floor, Azam Tower, Arbab Road",
        addressLocality: "Peshawar",
        addressCountry: "PK",
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
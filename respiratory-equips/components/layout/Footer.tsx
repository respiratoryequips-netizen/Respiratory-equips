import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaClock, FaArrowUp } from "react-icons/fa";
import { getCategories } from "@/lib/api";

const offices = [
  { city: "Karachi Office", address: "Purana Sabzi Mandi, near Askari Park, Karachi" },
  { city: "Rawalpindi Office", address: "6th Road, City Light Town, D Block, D-472, Global Boys Hostel, Rawalpindi" },
  { city: "Lahore Office", address: "Multan Road, Mansoora Bazar, near Ittefaq Town Park, Lahore" },
  { city: "Faisalabad Office", address: "Main Sargodha Road, Shop # 2, near PSO Petrol Pump, Faisalabad" },
  { city: "Peshawar Office", address: "1st Floor, Azam Tower, Arbab Road, Peshawar" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/#brands" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact Us", href: "/#contact" },
];

const supportLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Returns & Refunds", href: "/returns-refunds" },
  { label: "Blog", href: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
];

export default async function Footer() {
  const categories = await getCategories();
  const productLinks = [
    ...categories.map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
    { label: "All Products", href: "/products" },
  ];

  return (
    <>
      {/* Light info bar: offices + contact + hours */}
      <div className="bg-[#edf7f6] border-t border-gray-100 mx-4.5 my-4.5 rounded-xl">
        <p className="font-semibold text-accent text-xs tracking-wide px-6 lg:px-8 pt-5">
          VISIT OUR OFFICES
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 px-6 lg:px-8 py-5 text-sm">
          {offices.map((office) => (
            <div key={office.city} className="flex items-start gap-2 lg:pl-4 lg:first:pl-0 pt-4 lg:pt-0 first:pt-0">
              <FaMapMarkerAlt className="text-accent mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-primary">{office.city}</p>
                <p className="text-gray-500 text-xs mt-0.5">{office.address}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 border-t border-gray-200 px-6 lg:px-8 py-5 text-sm">
          <div className="sm:pr-6">
            <p className="font-semibold text-accent text-xs tracking-wide mb-2">GET IN TOUCH</p>
            <div className="space-y-1.5 text-gray-600 text-xs">
              <p className="flex items-center gap-2"><FaPhoneAlt className="text-accent" /> 03162568654</p>
              <p className="flex items-center gap-2"><FaEnvelope className="text-accent" /> respiratoryequips@gmail.com</p>
              <p className="flex items-center gap-2"><FaGlobe className="text-accent" /> www.respiratoryequips.com</p>
            </div>
          </div>

          <div className="sm:pl-6 pt-4 sm:pt-0">
            <p className="font-semibold text-accent text-xs tracking-wide mb-2">WORKING HOURS</p>
            <div className="space-y-1.5 text-gray-600 text-xs">
              <p className="flex items-center gap-2"><FaClock className="text-accent" /> Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p className="flex items-center gap-2"><FaClock className="text-accent" /> Sunday: 11:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dark footer */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-6 gap-8 px-6 lg:px-8 py-10 text-sm">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo-placeholder.png" alt="Respiratory Equips" width={36} height={36} />
              <div className="leading-tight">
                <p className="font-bold text-sm">
                  RESPIRATORY <span className="text-accent">EQUIPS</span>
                </p>
                <p className="text-[9px] text-white/50 tracking-wide">BREATHE BETTER. LIVE BETTER.</p>
              </div>
            </div>
            <p className="text-white/70 text-xs">
              Your trusted partner in respiratory care. We provide premium quality
              medical equipment to help you breathe better and live a healthier life.
            </p>
          </div>

          <FooterColumn title="Quick Links" items={quickLinks} />
          <FooterColumn title="Products" items={productLinks} />
          <FooterColumn title="Customer Support" items={supportLinks} />

          <div className="col-span-2 lg:col-span-2">
            <p className="font-semibold text-accent mb-3 uppercase text-xs tracking-wide">Newsletter</p>
            <p className="text-white/70 text-xs mb-3">
              Subscribe to get the latest offers, health tips and new arrivals.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 rounded-l-full px-4 py-2 text-white border text-xs"
              />
              <button className="bg-accent hover:bg-accent-dark rounded-r-full px-4 py-2 text-xs font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/70 gap-2">
          <p>© 2026 Respiratory Equips. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <a
          href="#top"
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 bg-white text-primary p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-colors"
        >
          <FaArrowUp />
        </a>
      </footer>
    </>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-semibold text-accent mb-3 uppercase text-xs tracking-wide">{title}</p>
      <ul className="space-y-2 text-white/70 text-xs">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import {
  FaShoppingCart,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserCheck,
  FaTruck,
  FaClock,
} from "react-icons/fa";

const trustBadges = [
  { icon: FaShieldAlt, title: "100% Genuine", subtitle: "Products" },
  { icon: FaUserCheck, title: "Authorized", subtitle: "Dealer" },
  { icon: FaTruck, title: "Nationwide", subtitle: "Delivery" },
  { icon: FaClock, title: "24/7", subtitle: "Expert Support" },
];

export default function Hero() {
  return (
    <section id="top" className="bg-hero-gradient relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 lg:px-8 py-16">
        <div>
          <span className="inline-block bg-white text-accent text-xs font-semibold px-4 py-2 rounded-full mb-4 shadow-sm">
            YOUR TRUSTED PARTNER IN RESPIRATORY CARE
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            Better Sleep
            <br />
            <span className="text-accent">Starts Here.</span>
          </h1>
          <p className="mt-5 text-gray-700 text-lg font-semibold">
            Premium CPAP, BiPAP & Respiratory Solutions from Trusted Global
            Brands.
          </p>
          <p className="mt-3 text-gray-500">
            We help thousands of patients breathe easier and live healthier with
            genuine medical equipment.
          </p>

          <div className="flex flex-wrap gap-4 mt-7">
            <Link
              href="/products"
              className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FaShoppingCart /> Shop Products
            </Link>
            <Link
              href="/#contact"
              className="flex items-center gap-2 bg-white border border-accent text-accent hover:bg-accent-light px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FaCalendarAlt /> Book Consultation
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <badge.icon className="text-accent text-3xl shrink-0" />
                <div className="text-sm leading-tight">
                  <p className="font-semibold text-primary">{badge.title}</p>
                  <p className="text-gray-500">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full h-100 md:h-[520px]">
          <Image
            src="/hero/hero-devices.png"
            alt="CPAP, BiPAP and Oxygen Concentrator equipment"
            fill
            className="object-contain hero-image-blend"
            priority
          />
        </div>
      </div>
    </section>
  );
}

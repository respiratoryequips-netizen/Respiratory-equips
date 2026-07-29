import Image from "next/image";
import { FaBullseye, FaEye, FaUsers } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-5 relative w-full h-84 md:h-80 rounded-xl overflow-hidden">
        <Image
          src="/about/doctor-patient.png"
          alt="Doctor consulting a patient about respiratory care"
          fill
          className="object-cover"
        />
      </div>

      <div className="lg:col-span-7">
        <span className="text-accent font-semibold text-sm tracking-wide">ABOUT US</span>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4 max-w-md leading-tight">
          We Care About Your Health
        </h2>
        <p className="text-gray-600 mb-3">
          Respiratory Equips is one of Pakistan&apos;s leading suppliers of CPAP,
          BiPAP, Oxygen Concentrators and respiratory care accessories.
        </p>
        <p className="text-gray-600 mb-6">
          We provide genuine products, manufacturer warranties and expert
          guidance to help you breathe better and sleep peacefully.
        </p>
        <button className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
          Learn More About Us
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <InfoCard icon={FaBullseye} title="Our Mission" text="To improve the quality of life by providing advanced respiratory care solutions." />
          <InfoCard icon={FaEye} title="Our Vision" text="To become Pakistan's most trusted respiratory care equipment provider." />
          <div className="sm:col-span-2">
            <InfoCard icon={FaUsers} title="Our Values" text="Quality, Trust, Care, Integrity and Customer Satisfaction." />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <Icon className="text-accent text-2xl mb-2" />
      <p className="font-semibold text-primary text-sm">{title}</p>
      <p className="text-gray-500 text-sm mt-1">{text}</p>
    </div>
  );
}
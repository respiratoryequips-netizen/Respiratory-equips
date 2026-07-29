import { IconType } from "react-icons";
import { FaUserShield, FaUserMd, FaTruck, FaCertificate, FaHeadset, FaLock } from "react-icons/fa";

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export const features: Feature[] = [
  { icon: FaUserShield, title: "100% Genuine", description: "Original products with official warranty." },
  { icon: FaUserMd, title: "Expert Consultation", description: "Professional guidance before & after purchase." },
  { icon: FaTruck, title: "Fast Delivery", description: "Nationwide delivery within 24-72 hours." },
  { icon: FaCertificate, title: "Manufacturer Warranty", description: "Official warranty on all products." },
  { icon: FaHeadset, title: "After Sales Support", description: "24/7 support for all your needs." },
  { icon: FaLock, title: "Secure Payments", description: "Safe & secure payment options." },
];
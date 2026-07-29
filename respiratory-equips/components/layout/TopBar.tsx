import { FaCheckCircle, FaTruck, FaClock, FaUserCircle, FaFacebookF, FaInstagram, FaVideo, FaYoutube } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="hidden lg:flex items-center justify-between bg-primary text-white text-xs px-8 py-2">
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <FaCheckCircle className="text-white" /> Authorized Medical Equipment Supplier
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <FaTruck className="text-white" /> Free Nationwide Delivery
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <FaClock className="text-white" /> 24/7 Customer Support
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <FaUserCircle className="text-white" /> Lahore | Karachi | Islamabad
      </span>
      <div className="flex items-center gap-3">
        <a href="#" aria-label="Facebook" className="text-white hover:text-accent-light"><FaFacebookF /></a>
        <a href="#" aria-label="Instagram" className="text-white hover:text-accent-light"><FaInstagram /></a>
        <a href="#" aria-label="Video" className="text-white hover:text-accent-light"><FaVideo /></a>
        <a href="#" aria-label="YouTube" className="text-white hover:text-accent-light"><FaYoutube /></a>
      </div>
    </div>
  );
}
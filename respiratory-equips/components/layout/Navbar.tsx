"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaPhoneAlt, FaWhatsapp, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Brands", href: "/#brands" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-6 px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo-placeholder.png"
            alt="Respiratory Equips Logo"
            width={40}
            height={40}
            className="shrink-0"
          />
          <div className="leading-none">
            <p className="font-bold text-primary text-sm leading-tight">
              RESPIRATORY
            </p>
            <p className="font-bold text-accent text-sm leading-tight">
              EQUIPS
            </p>
            <p className="text-[9px] tracking-wide text-gray-400 mt-0.5 whitespace-nowrap">
              BREATHE BETTER. LIVE BETTER.
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 whitespace-nowrap hover:text-accent transition-colors"
            >
              {link.label}
              {/* {link.dropdown && <FaChevronDown className="text-xs" />} */}
            </Link>
          ))}
        </nav>

        {/* Search
        <div className="hidden lg:flex items-center border border-gray-200 rounded-full px-4 py-2 w-48 shrink-0">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 text-sm outline-none bg-transparent min-w-0"
          />
          <FaSearch className="text-gray-400 shrink-0" />
        </div> */}

        {/* Call + WhatsApp */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="tel:03162568654"
            className="flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2 whitespace-nowrap"
          >
            <FaPhoneAlt />
            <span className="text-xs leading-tight">
              03162568654
              <br />
              <span className="font-semibold">Call Us Now</span>
            </span>
          </a>
          <a
            href="https://wa.me/03162568654"
            aria-label="WhatsApp"
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 shrink-0"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-primary text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col gap-4 px-6 pb-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
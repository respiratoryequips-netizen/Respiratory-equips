export interface Category {
  title: string;
  description: string;
  image: string;
  href: string;
}

export const categories: Category[] = [
  {
    title: "CPAP Machines",
    description: "Advanced sleep therapy for better rest.",
    image: "/products/cpap.png",
    href: "/products/cpap-machines",
  },
  {
    title: "BiPAP Machines",
    description: "Support for better breathing & comfort.",
    image: "/products/bipap.png",
    href: "/products/bipap-machines",
  },
  {
    title: "Oxygen Concentrators",
    description: "Continuous oxygen for a healthier life.",
    image: "/products/oxygen-concentrator.png",
    href: "/products/oxygen-concentrators",
  },
  {
    title: "Masks",
    description: "Comfortable masks for better therapy.",
    image: "/products/mask.png",
    href: "/products/masks",
  },
  {
    title: "Accessories",
    description: "Tubing, filters, humidifiers and more.",
    image: "/products/accessories.png",
    href: "/products/accessories",
  },
];
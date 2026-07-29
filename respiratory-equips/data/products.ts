export interface Product {
  id: string;
  brand: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
}

export const products: Product[] = [
  {
    id: "airsense-11",
    brand: "ResMed",
    name: "AirSense 11 AutoSet",
    tagline: "Premium CPAP Machine",
    price: 165000,
    rating: 4.5,
    reviews: 128,
    inStock: true,
    image: "/products/airsense-11.png",
  },
  {
    id: "dreamstation-auto",
    brand: "Philips Respironics",
    name: "DreamStation Auto CPAP",
    tagline: "Advanced Sleep Therapy",
    price: 142000,
    rating: 4.4,
    reviews: 96,
    inStock: true,
    image: "/products/dreamstation.png",
  },
  {
    id: "yuwell-8f-sa",
    brand: "Yuwell",
    name: "8F-SA Oxygen Concentrator",
    tagline: "5 Liter Oxygen Concentrator",
    price: 85000,
    rating: 4.3,
    reviews: 78,
    inStock: true,
    image: "/products/yuwell-8fsa.png",
  },
  {
    id: "dreamwear-nasal",
    brand: "Philips",
    name: "DreamWear Nasal Pillow Mask",
    tagline: "Comfortable & Light Mask",
    price: 18500,
    rating: 4.2,
    reviews: 54,
    inStock: true,
    image: "/products/dreamwear.png",
  },
  {
    id: "airfit-f20",
    brand: "ResMed",
    name: "AirFit F20 Full Face Mask",
    tagline: "Full Face Comfort Mask",
    price: 21000,
    rating: 4.3,
    reviews: 63,
    inStock: true,
    image: "/products/airfit-f20.png",
  },
];
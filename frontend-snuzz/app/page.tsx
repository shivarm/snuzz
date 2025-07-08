"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import {
  Star,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

// Product data with 50+ items
const allProducts = [
  // Nicotine Pouches
  {
    id: 1,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },

  {
    id: 2,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 3,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 4,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 5,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 6,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 7,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 8,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 9,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 10,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 11,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 12,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 13,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 14,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 15,
    name: "Klint Arctic Mint",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.6,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
];

export default function Component() {
  const [visibleProducts, setVisibleProducts] = useState(15);
  const { addToCart } = useCart();

  const getDiscountPercentage = (price: number, salePrice: number) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-[18px]">
      {/* Enhanced Hero Section with Better Mobile Responsiveness */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
        {/* Centered, smaller background circle for glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/10 to-transparent z-0 pointer-events-none"></div>
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] w-full">
            {/* Left Content */}
            <div className="flex flex-col justify-center items-start space-y-6 md:space-y-8 w-full max-w-xl mx-auto lg:mx-0 pt-12 lg:pt-0">
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-black fill-black" />
                <span className="text-gray-700 font-medium text-sm">4.47 | 537 Reviews</span>
              </div>
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Never run out of snus again
              </h1>
              <p className="text-xl md:text-2xl text-gray-900 leading-relaxed max-w-2xl">
                Choose from huge sortiment of exclusive brands, flavors and strength for best price
                on market with free shipping.
              </p>
              {/* CTA Button */}
              <Link href="/categories">
                <Button className="bg-[#3AF0F7] hover:bg-[#2de0e7] text-black font-medium px-7 py-6 rounded-2xl text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  Buy now
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* Stats with vertical dividers */}
              <div className="flex gap-16 pt-10 border-t border-gray-200 w-full mt-6">
                <div className="flex flex-col items-center pr-12 border-r border-gray-300 last:border-none">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">47</div>
                  <div className="text-base text-gray-600">Orders today</div>
                </div>
                <div className="flex flex-col items-center px-12 border-r border-gray-300 last:border-none">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">7000+</div>
                  <div className="text-base text-gray-600">Orders</div>
                </div>
                <div className="flex flex-col items-center pl-12">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">4000+</div>
                  <div className="text-base text-gray-600">Customers</div>
                </div>
              </div>
            </div>
            {/* Right Hero SVG Image - much larger, fills hero section */}
            <div className="flex items-center justify-end w-full h-full min-h-[600px] lg:min-h-[900px]">
              <Image
                src="/group-32.svg"
                alt="Hero visual"
                className="object-contain drop-shadow-xl pointer-events-none relative top-[108px] left-0"
                width={676.39}
                height={676.39}
                style={{ borderRadius: "692.17px" }}
              />
            </div>
          </div>
        </div>
      </section>
      <FeatureCard />
      
{/* TODO: Product Card */}
 
      <ReviewCard />

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 6px;
        }

        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        @keyframes heroLineMove1 {
          0% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(60deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.6;
          }
        }
        @keyframes heroLineMove2 {
          0% {
            transform: translateX(0) rotate(12deg);
            opacity: 0.4;
          }
          50% {
            transform: translateX(30px) rotate(30deg);
            opacity: 0.7;
          }
          100% {
            transform: translateX(0) rotate(12deg);
            opacity: 0.4;
          }
        }
        @keyframes heroLineMove3 {
          0% {
            transform: translateY(0) rotate(-12deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(30px) rotate(-24deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) rotate(-12deg);
            opacity: 0.5;
          }
        }
        @keyframes heroLineMove4 {
          0% {
            transform: translateX(0) rotate(45deg);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-20px) rotate(60deg);
            opacity: 0.6;
          }
          100% {
            transform: translateX(0) rotate(45deg);
            opacity: 0.3;
          }
        }
        @keyframes heroLineMove5 {
          0% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px) rotate(60deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.6;
          }
        }
        @keyframes heroLineMove6 {
          0% {
            transform: translateY(0) rotate(-12deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(20px) rotate(-24deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0) rotate(-12deg);
            opacity: 0.4;
          }
        }
        @keyframes heroLineMove7 {
          0% {
            transform: translateX(0) rotate(12deg);
            opacity: 0.5;
          }
          50% {
            transform: translateX(-15px) rotate(24deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(0) rotate(12deg);
            opacity: 0.5;
          }
        }
        @keyframes heroLineMove8 {
          0% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) rotate(60deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0) rotate(45deg);
            opacity: 0.3;
          }
        }
        @keyframes heroLineMove9 {
          0% {
            transform: translateY(0) rotate(-12deg);
            opacity: 0.25;
          }
          50% {
            transform: translateY(10px) rotate(-24deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) rotate(-12deg);
            opacity: 0.25;
          }
        }
        .hero-line.hero-line-1 {
          animation: heroLineMove1 4s ease-in-out infinite;
        }
        .hero-line.hero-line-2 {
          animation: heroLineMove2 5s ease-in-out infinite;
        }
        .hero-line.hero-line-3 {
          animation: heroLineMove3 4.5s ease-in-out infinite;
        }
        .hero-line.hero-line-4 {
          animation: heroLineMove4 6s ease-in-out infinite;
        }
        .hero-line.hero-line-5 {
          animation: heroLineMove5 4.2s ease-in-out infinite;
        }
        .hero-line.hero-line-6 {
          animation: heroLineMove6 5.2s ease-in-out infinite;
        }
        .hero-line.hero-line-7 {
          animation: heroLineMove7 4.8s ease-in-out infinite;
        }
        .hero-line.hero-line-8 {
          animation: heroLineMove8 6.2s ease-in-out infinite;
        }
        .hero-line.hero-line-9 {
          animation: heroLineMove9 5.8s ease-in-out infinite;
        }
        @keyframes hero-float {
          0% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-18px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
        }
        .animate-hero-float {
          animation: hero-float 4.5s ease-in-out infinite;
        }
        @keyframes hero-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .animate-hero-rotate {
          animation: hero-rotate 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
function shadow(arg0: number, arg1: number, px: any, arg3: number, px1: any, arg5: any) {
  throw new Error("Function not implemented.");
}

function rgba(arg0: number, arg1: number, arg2: number, arg3: number): any {
  throw new Error("Function not implemented.");
}

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Enhanced Hero Section with Better Mobile Responsiveness */}
      <section className="relative flex items-start justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden pb-0 mb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          {/* Background circle contained within the max-width container */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] md:w-[800px] lg:w-[900px] h-[600px] md:h-[800px] lg:h-[900px] rounded-full bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/10 to-transparent -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0 w-full relative">
            {/* Left Content */}
            <div className="flex flex-col items-start space-y-4 md:space-y-6 w-full max-w-xl mx-auto lg:mx-0 pt-4 lg:pt-16 relative z-10">
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
                <Button className="bg-[#3AF0F7] hover:bg-[#2de0e7] text-black font-medium px-5 py-5 rounded-2xl text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
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
            {/* Right Hero SVG Image - adjusted positioning with controlled height */}
            <div className="relative flex items-center lg:items-start justify-center lg:justify-start w-full h-full">
              <div className="lg:-left-52 flex items-center justify-center lg:mt-16">
                <Image
                  src="/group-32.svg"
                  alt="Hero visual"
                  className="object-contain drop-shadow-xl pointer-events-none w-[600px] h-[600px] lg:w-[1400px] lg:h-[1000px] transform hover:scale-105 transition-transform duration-500"
                  width={1400}
                  height={1000}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

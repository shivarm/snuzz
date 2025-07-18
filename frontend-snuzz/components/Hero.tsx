"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Define proper interface for AnimatedCounter props
interface AnimatedCounterProps {
  end: number | string;
  duration?: number;
  label: string;
}

// Counter component for stats animation
const AnimatedCounter = ({ end, duration = 2000, label }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const startTime = Date.now();
          const endValue =
            typeof end === "string" && end.includes("+")
              ? parseInt(end)
              : end as number;

          const timer = setInterval(() => {
            const timePassed = Date.now() - startTime;
            const progress = Math.min(timePassed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = progress * (2 - progress);
            const currentCount = Math.floor(easeOutQuad * endValue);

            setCount(currentCount);

            if (progress === 1) {
              clearInterval(timer);
            }
          }, 16); // ~60fps

          if (observer.current) {
            observer.current.disconnect();
          }
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.current.observe(countRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [end, duration]);

  return (
    <div ref={countRef} className="flex flex-col items-center">
      <div className="text-3xl md:text-4xl font-bold text-gray-900">
        {typeof end === "string" && end.includes("+") ? `${count}+` : count}
      </div>
      <div className="text-base text-gray-600">{label}</div>
    </div>
  );
};

export default function Hero() {
  return (
    <>
      {/* Enhanced Hero Section with Better Mobile Responsiveness */}
      <section className="relative flex items-start justify-center bg-white overflow-hidden pb-0 mb-0">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          {/* Background circle contained within the max-width container */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] md:w-[800px] lg:w-[900px] h-[600px] md:h-[800px] lg:h-[900px] rounded-full bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/10 to-transparent -z-10"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0 w-full relative">
            {/* Left Content */}
            <div className="flex flex-col items-start space-y-4 md:space-y-6 w-full max-w-xl mx-auto lg:mx-0 pt-4 lg:pt-16 relative z-10">
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-black fill-black" />
                <span className="text-gray-700 font-medium text-sm">
                  4.47 | 537 Reviews
                </span>
              </div>
              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Never run out of snus again
              </h1>
              <p className="text-xl md:text-2xl text-gray-900 leading-relaxed max-w-2xl">
                Choose from huge sortiment of exclusive brands, flavors and
                strength for best price on market with free shipping.
              </p>
              {/* CTA Button */}
              <Link href="/categories">
                <Button className="bg-[#3AF0F7] hover:bg-[#2de0e7] text-black font-medium px-5 py-5 rounded-2xl text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  Buy now
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* Stats with vertical dividers - now with animation */}
              <div className="flex gap-16 pt-10 border-t border-gray-200 w-full mt-6">
                <div className="flex flex-col items-center pr-12 border-r border-gray-300 last:border-none">
                  <AnimatedCounter end={47} label="Orders today" />
                </div>
                <div className="flex flex-col items-center px-12 border-r border-gray-300 last:border-none">
                  <AnimatedCounter end="7000+" label="Orders" />
                </div>
                <div className="flex flex-col items-center pl-12">
                  <AnimatedCounter end="4000+" label="Customers" />
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

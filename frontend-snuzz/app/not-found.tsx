"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { Home } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="hero-line hero-line-1 absolute top-1/4 left-1/4 w-64 h-1 bg-gradient-to-r from-[#3AF0F7]/20 to-transparent transform rotate-45"></div>
        <div className="hero-line hero-line-3 absolute bottom-1/3 right-1/4 w-96 h-1 bg-gradient-to-r from-[#3AF0F7]/10 to-transparent transform -rotate-12"></div>
        <div className="hero-line hero-line-5 absolute top-1/3 right-1/3 w-64 h-1 bg-gradient-to-r from-[#3AF0F7]/15 to-transparent transform rotate-45"></div>
        <div className="hero-line hero-line-7 absolute bottom-1/4 left-1/3 w-80 h-1 bg-gradient-to-r from-[#3AF0F7]/20 to-transparent transform rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center animate-slide-up">
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-xl bg-[#3AF0F7]/20 rounded-full transform animate-pulse"></div>
          <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] bg-clip-text text-transparent relative">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/">
          <Button className="bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-bold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

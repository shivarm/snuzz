"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { allProducts } from "@/lib/utils";

// Product data with 50+ items
 

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

export default function Component() {
  const [visibleProducts, setVisibleProducts] = useState(16);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getDiscountPercentage = (price: number, salePrice: number) => {
    return Math.round(((price - salePrice) / price) * 100);
  };

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.salePrice,
            quantity: 1,
            image: product.image,
            brand: product.brand,
          },
        ];
      }
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-[18px]">
      {/* Header */}
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        allProducts={allProducts}
      />
      {/* Shopping Cart Sidebar */}
      {/* Enhanced Shopping Cart Sidebar with Smooth Animations */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with smooth fade */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              cartOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setCartOpen(false)}
          ></div>

          {/* Cart Sidebar with smooth slide animation */}
          <div
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
              cartOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Cart Header with enhanced styling */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shopping Cart ({getTotalItems()})
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCartOpen(false)}
                  className="hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Cart Items with staggered animations */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#3AF0F7]/20 to-[#8ef7fb]/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <ShoppingBag className="w-12 h-1 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-lg font-semibold mb-2">Your cart is empty</p>
                    <p className="text-gray-400 text-sm">Add some products to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-slide-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="text-gray-800 font-bold text-xs md:text-sm">
                            {item.image}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-gray-500 text-xs">{item.brand}</p>
                          <p className="text-[#3AF0F7] font-bold">€{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-8 h-8 hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold bg-gray-50 rounded px-2 py-1">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-8 h-8 hover:bg-green-50 hover:border-green-200 transition-all duration-200"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm animate-slide-up">
                  <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-[#3AF0F7] animate-pulse">
                      €{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                    {/* Button shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative flex items-center justify-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Secure Checkout
                    </span>
                  </Button>
                  <div className="flex items-center justify-center mt-3 text-xs text-gray-500 animate-fade-in">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Secure payment with SSL encryption
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
      <div className="mt-[-12rem] md:mt-[-15rem] lg:mt-[-20rem] relative z-0">
        <FeatureCard />
      </div>
      
{/*Product Card */}
<section id="products-section" className="px-5 py-20 bg-white">
  <div className="max-w-[1440px] mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-gray-900 ">Best selling</h2>
    </div>
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols- 2xl:grid-cols-5 gap-x-0 gap-y-5 mb-10 md:mb-12 justify-items-center">
      {allProducts.slice(0, visibleProducts).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  </div>
</section>


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
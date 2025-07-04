"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ArrowRight,
  X,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Lock,
} from "lucide-react";
import { useState, useEffect } from "react";

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
    name: "Velo Ice Cool",
    category: "NICOTINE POUCHES",
    price: 5.49,
    salePrice: 4.2,
    rating: 4.7,
    brand: "Velo",
    image: "VELO",
  },
  {
    id: 3,
    name: "ZYN Citrus",
    category: "NICOTINE POUCHES",
    price: 4.79,
    salePrice: 3.99,
    rating: 4.9,
    brand: "ZYN",
    image: "ZYN",
  },
  {
    id: 4,
    name: "Nordic Spirit Berry",
    category: "NICOTINE POUCHES",
    price: 5.29,
    salePrice: 4.1,
    rating: 4.6,
    brand: "Nordic",
    image: "NORDIC",
  },
  {
    id: 5,
    name: "Klint Breeze",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.75,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 6,
    name: "Velo Freeze",
    category: "NICOTINE POUCHES",
    price: 5.49,
    salePrice: 4.3,
    rating: 4.7,
    brand: "Velo",
    image: "VELO",
  },
  {
    id: 7,
    name: "ZYN Spearmint",
    category: "NICOTINE POUCHES",
    price: 4.79,
    salePrice: 3.85,
    rating: 4.9,
    brand: "ZYN",
    image: "ZYN",
  },
  {
    id: 8,
    name: "Nordic Spirit Mint",
    category: "NICOTINE POUCHES",
    price: 5.29,
    salePrice: 4.15,
    rating: 4.6,
    brand: "Nordic",
    image: "NORDIC",
  },
  {
    id: 9,
    name: "Klint Passion Fruit",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.7,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 10,
    name: "Velo Tropical",
    category: "NICOTINE POUCHES",
    price: 5.49,
    salePrice: 4.25,
    rating: 4.7,
    brand: "Velo",
    image: "VELO",
  },
  {
    id: 11,
    name: "ZYN Coffee",
    category: "NICOTINE POUCHES",
    price: 4.79,
    salePrice: 3.95,
    rating: 4.9,
    brand: "ZYN",
    image: "ZYN",
  },
  {
    id: 12,
    name: "Nordic Spirit Elderflower",
    category: "NICOTINE POUCHES",
    price: 5.29,
    salePrice: 4.05,
    rating: 4.6,
    brand: "Nordic",
    image: "NORDIC",
  },

  // Vapes
  {
    id: 13,
    name: "JUUL Classic Tobacco",
    category: "Vapes",
    price: 29.99,
    salePrice: 24.99,
    rating: 4.5,
    brand: "JUUL",
    image: "JUUL",
  },
  {
    id: 14,
    name: "Vuse Alto Menthol",
    category: "Vapes",
    price: 19.99,
    salePrice: 16.99,
    rating: 4.4,
    brand: "Vuse",
    image: "VUSE",
  },
  {
    id: 15,
    name: "SMOK Nord 4",
    category: "Vapes",
    price: 34.99,
    salePrice: 28.99,
    rating: 4.7,
    brand: "SMOK",
    image: "SMOK",
  },
  {
    id: 16,
    name: "GeekVape Aegis",
    category: "Vapes",
    price: 45.99,
    salePrice: 39.99,
    rating: 4.8,
    brand: "GeekVape",
    image: "GEEK",
  },
  {
    id: 17,
    name: "Voopoo Drag X",
    category: "Vapes",
    price: 39.99,
    salePrice: 32.99,
    rating: 4.6,
    brand: "Voopoo",
    image: "VOOP",
  },
  {
    id: 18,
    name: "Lost Vape Orion",
    category: "Vapes",
    price: 49.99,
    salePrice: 42.99,
    rating: 4.9,
    brand: "Lost Vape",
    image: "LOST",
  },
  {
    id: 19,
    name: "Uwell Caliburn",
    category: "Vapes",
    price: 24.99,
    salePrice: 19.99,
    rating: 4.7,
    brand: "Uwell",
    image: "UWELL",
  },
  {
    id: 20,
    name: "Innokin Zlide",
    category: "Vapes",
    price: 27.99,
    salePrice: 22.99,
    rating: 4.5,
    brand: "Innokin",
    image: "INNO",
  },

  // Snuff
  {
    id: 21,
    name: "Copenhagen Original",
    category: "Snuff",
    price: 6.99,
    salePrice: 5.99,
    rating: 4.3,
    brand: "Copenhagen",
    image: "COPE",
  },
  {
    id: 22,
    name: "Skoal Mint",
    category: "Snuff",
    price: 6.49,
    salePrice: 5.49,
    rating: 4.2,
    brand: "Skoal",
    image: "SKOAL",
  },
  {
    id: 23,
    name: "Grizzly Wintergreen",
    category: "Snuff",
    price: 5.99,
    salePrice: 4.99,
    rating: 4.4,
    brand: "Grizzly",
    image: "GRIZZ",
  },
  {
    id: 24,
    name: "Kodiak Ice",
    category: "Snuff",
    price: 7.49,
    salePrice: 6.49,
    rating: 4.5,
    brand: "Kodiak",
    image: "KODIAK",
  },
  {
    id: 25,
    name: "Red Seal Natural",
    category: "Snuff",
    price: 5.49,
    salePrice: 4.79,
    rating: 4.1,
    brand: "Red Seal",
    image: "RED",
  },
  {
    id: 26,
    name: "Timber Wolf Peach",
    category: "Snuff",
    price: 4.99,
    salePrice: 4.29,
    rating: 4.0,
    brand: "Timber Wolf",
    image: "TIMBER",
  },

  // Energy
  {
    id: 27,
    name: "Monster Energy Original",
    category: "Energy",
    price: 2.99,
    salePrice: 2.49,
    rating: 4.6,
    brand: "Monster",
    image: "MONSTER",
  },
  {
    id: 28,
    name: "Red Bull Classic",
    category: "Energy",
    price: 3.49,
    salePrice: 2.99,
    rating: 4.7,
    brand: "Red Bull",
    image: "REDBULL",
  },
  {
    id: 29,
    name: "Bang Rainbow Unicorn",
    category: "Energy",
    price: 2.79,
    salePrice: 2.29,
    rating: 4.5,
    brand: "Bang",
    image: "BANG",
  },
  {
    id: 30,
    name: "Reign Orange Dreamsicle",
    category: "Energy",
    price: 2.89,
    salePrice: 2.39,
    rating: 4.4,
    brand: "Reign",
    image: "REIGN",
  },
  {
    id: 31,
    name: "C4 Icy Blue Razz",
    category: "Energy",
    price: 2.99,
    salePrice: 2.59,
    rating: 4.3,
    brand: "C4",
    image: "C4",
  },
  {
    id: 32,
    name: "Ghost Swedish Fish",
    category: "Energy",
    price: 3.29,
    salePrice: 2.79,
    rating: 4.8,
    brand: "Ghost",
    image: "GHOST",
  },

  // Chewing Tobacco
  {
    id: 33,
    name: "Red Man Golden Blend",
    category: "Chewing Tobacco",
    price: 8.99,
    salePrice: 7.49,
    rating: 4.2,
    brand: "Red Man",
    image: "REDMAN",
  },
  {
    id: 34,
    name: "Levi Garrett",
    category: "Chewing Tobacco",
    price: 9.49,
    salePrice: 7.99,
    rating: 4.3,
    brand: "Levi Garrett",
    image: "LEVI",
  },
  {
    id: 35,
    name: "Mail Pouch",
    category: "Chewing Tobacco",
    price: 7.99,
    salePrice: 6.79,
    rating: 4.1,
    brand: "Mail Pouch",
    image: "MAIL",
  },
  {
    id: 36,
    name: "Beech Nut",
    category: "Chewing Tobacco",
    price: 8.49,
    salePrice: 7.19,
    rating: 4.0,
    brand: "Beech Nut",
    image: "BEECH",
  },

  // More Nicotine Pouches
  {
    id: 37,
    name: "Klint Honey Lemon",
    category: "NICOTINE POUCHES",
    price: 4.99,
    salePrice: 3.65,
    rating: 4.8,
    brand: "Klint",
    image: "KLINT",
  },
  {
    id: 38,
    name: "Velo Ruby Berry",
    category: "NICOTINE POUCHES",
    price: 5.49,
    salePrice: 4.35,
    rating: 4.7,
    brand: "Velo",
    image: "VELO",
  },
  {
    id: 39,
    name: "ZYN Smooth",
    category: "NICOTINE POUCHES",
    price: 4.79,
    salePrice: 3.89,
    rating: 4.9,
    brand: "ZYN",
    image: "ZYN",
  },
  {
    id: 40,
    name: "Nordic Spirit Storm",
    category: "NICOTINE POUCHES",
    price: 5.29,
    salePrice: 4.2,
    rating: 4.6,
    brand: "Nordic",
    image: "NORDIC",
  },

  // More Vapes
  {
    id: 41,
    name: "Puff Bar Plus",
    category: "Vapes",
    price: 12.99,
    salePrice: 9.99,
    rating: 4.3,
    brand: "Puff Bar",
    image: "PUFF",
  },
  {
    id: 42,
    name: "Hyde Edge",
    category: "Vapes",
    price: 15.99,
    salePrice: 12.99,
    rating: 4.4,
    brand: "Hyde",
    image: "HYDE",
  },
  {
    id: 43,
    name: "Elf Bar BC5000",
    category: "Vapes",
    price: 18.99,
    salePrice: 15.99,
    rating: 4.6,
    brand: "Elf Bar",
    image: "ELF",
  },
  {
    id: 44,
    name: "Breeze Pro",
    category: "Vapes",
    price: 16.99,
    salePrice: 13.99,
    rating: 4.5,
    brand: "Breeze",
    image: "BREEZE",
  },

  // More Energy
  {
    id: 45,
    name: "Rockstar Punched",
    category: "Energy",
    price: 2.89,
    salePrice: 2.49,
    rating: 4.2,
    brand: "Rockstar",
    image: "ROCK",
  },
  {
    id: 46,
    name: "NOS High Performance",
    category: "Energy",
    price: 2.99,
    salePrice: 2.59,
    rating: 4.3,
    brand: "NOS",
    image: "NOS",
  },
  {
    id: 47,
    name: "Full Throttle",
    category: "Energy",
    price: 2.79,
    salePrice: 2.39,
    rating: 4.1,
    brand: "Full Throttle",
    image: "FULL",
  },

  // More Snuff
  {
    id: 48,
    name: "Longhorn Mint",
    category: "Snuff",
    price: 4.49,
    salePrice: 3.99,
    rating: 3.9,
    brand: "Longhorn",
    image: "LONG",
  },
  {
    id: 49,
    name: "Stoker's Straight",
    category: "Snuff",
    price: 5.29,
    salePrice: 4.59,
    rating: 4.2,
    brand: "Stoker's",
    image: "STOKER",
  },
  {
    id: 50,
    name: "Hawken Wintergreen",
    category: "Snuff",
    price: 4.79,
    salePrice: 4.19,
    rating: 4.0,
    brand: "Hawken",
    image: "HAWKEN",
  },
];

const categories = ["ALL", "NICOTINE POUCHES", "Vapes", "Snuff", "Energy", "Chewing Tobacco"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter((product) => product.category === selectedCategory));
    }
    setVisibleProducts(12);
  }, [selectedCategory]);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => Math.min(prev + 12, filteredProducts.length));
  };

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
              <img
                src="/group-32.svg"
                alt="Hero visual"
                className="object-contain drop-shadow-xl pointer-events-none relative top-[108px] left-0"
                style={{
                  filter: "drop-shadow(0 8px 32px rgba(58,240,247,0.25))",
                  width: "676.39px",
                  height: "676.39px",
                  borderRadius: "692.17px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
              Why Choose SNUZZ?
            </h2>
            <p className="text-gray-600 text-2xl font-medium">
              Experience the best in quality, service, and satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                icon: "/dollor.png",
                title: "Best Prices Guaranteed",
                description:
                  "Unbeatable prices on all your favorite nicotine products with price match guarantee.",
              },
              {
                icon: "/icon2.svg",
                title: "Premium Quality",
                description:
                  "Only the finest products from trusted brands, ensuring quality and satisfaction every time.",
              },
              {
                icon: "/icon3.svg",
                title: "Fast & Discreet Delivery",
                description:
                  "Get your products delivered quickly and discreetly with our express shipping options.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-28 h-28 mx-auto mb-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3AF0F7]/30 to-[#8ef7fb]/10 blur-lg opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
                  <img
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-20 h-20 z-10 relative drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-extrabold text-2xl text-gray-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Shop Bestsellers */}
      <section id="products-section" className="px-4 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Shop Bestsellers</h2>
            <p className="text-gray-600 text-2xl">
              Discover our most popular products across all categories
            </p>
          </div>

          {/* Enhanced Category Selector */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 flex flex-wrap gap-4 shadow-xl border border-gray-200">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] text-black shadow-lg scale-105"
                      : "bg-transparent text-gray-600 hover:text-[#3AF0F7] hover:bg-gray-100"
                  } rounded-2xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105`}
                >
                  {category === "ALL" ? "All Products" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Improved the product grid responsiveness: */}
          {/* Enhanced Product Grid - Better Mobile Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="relative aspect-[2/3] bg-gradient-to-br from-[#e0f7fa] to-[#f8fdff] rounded-3xl shadow-lg p-6 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-dotted border-[#3AF0F7]"
                style={{ minWidth: "0", width: "100%" }}
              >
                {/* Top: Badges and Image */}
                <div className="flex flex-col items-center w-full">
                  <div className="flex flex-row gap-2 justify-center w-full mb-2 mt-1 z-10">
                    {product.salePrice < product.price && (
                      <span
                        className="bg-white text-[13px] font-bold text-red-500 px-2.5 py-1 rounded-full shadow border border-red-100"
                        style={{ fontStyle: "normal" }}
                      >
                        Sale {getDiscountPercentage(product.price, product.salePrice)}%
                      </span>
                    )}
                    <span
                      className="bg-white text-[13px] font-bold italic text-black px-3 py-1 rounded-full shadow border border-gray-200"
                      style={{ fontStyle: "italic" }}
                    >
                      Free shipping
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center w-full"
                    style={{ minHeight: "8rem" }}
                  >
                    <img
                      src={
                        product.image === "KLINT"
                          ? "/klint-product.png"
                          : product.image === "VELO"
                          ? "/velo.png"
                          : product.image === "ZYN"
                          ? "/zyn.png"
                          : product.image === "NORDIC"
                          ? "/nordic.png"
                          : product.image === "JUUL"
                          ? "/juul.png"
                          : product.image === "VUSE"
                          ? "/vuse.png"
                          : product.image === "SMOK"
                          ? "/smok.png"
                          : product.image === "GEEK"
                          ? "/geek.png"
                          : product.image === "VOOP"
                          ? "/voop.png"
                          : product.image === "LOST"
                          ? "/lost.png"
                          : product.image === "UWELL"
                          ? "/uwell.png"
                          : product.image === "INNO"
                          ? "/inno.png"
                          : product.image === "COPE"
                          ? "/cope.png"
                          : product.image === "SKOAL"
                          ? "/skoal.png"
                          : product.image === "GRIZZ"
                          ? "/grizz.png"
                          : product.image === "KODIAK"
                          ? "/kodiak.png"
                          : product.image === "RED"
                          ? "/red.png"
                          : product.image === "TIMBER"
                          ? "/timber.png"
                          : product.image === "MONSTER"
                          ? "/monster.png"
                          : product.image === "REDBULL"
                          ? "/redbull.png"
                          : product.image === "BANG"
                          ? "/bang.png"
                          : product.image === "REIGN"
                          ? "/reign.png"
                          : product.image === "C4"
                          ? "/c4.png"
                          : product.image === "GHOST"
                          ? "/ghost.png"
                          : product.image === "REDMAN"
                          ? "/redman.png"
                          : product.image === "LEVI"
                          ? "/levi.png"
                          : product.image === "MAIL"
                          ? "/mail.png"
                          : product.image === "BEECH"
                          ? "/beech.png"
                          : product.image === "PUFF"
                          ? "/puff.png"
                          : product.image === "HYDE"
                          ? "/hyde.png"
                          : product.image === "ELF"
                          ? "/elf.png"
                          : product.image === "BREEZE"
                          ? "/breeze.png"
                          : product.image === "ROCK"
                          ? "/rock.png"
                          : product.image === "NOS"
                          ? "/nos.png"
                          : product.image === "FULL"
                          ? "/full.png"
                          : product.image === "LONG"
                          ? "/long.png"
                          : product.image === "STOKER"
                          ? "/stoker.png"
                          : product.image === "HAWKEN"
                          ? "/hawken.png"
                          : "/placeholder-logo.svg"
                      }
                      alt={product.name}
                      className="w-28 h-28 object-contain drop-shadow-xl"
                      style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.10))" }}
                    />
                  </div>
                </div>
                {/* Bottom: Product Info and Cart Button */}
                <div className="flex w-full items-end justify-between mt-auto pt-2">
                  <div className="text-left">
                    <h3 className="font-normal text-[16px] text-black mb-1 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#e74c3c] font-bold text-[17px]">
                        € {product.salePrice.toFixed(2)}
                      </span>
                      {product.salePrice < product.price && (
                        <span className="text-gray-500 line-through text-[15px]">
                          € {product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-11 h-11 rounded-full flex items-center justify-center bg-[#e0f7fa]/80 hover:bg-[#3AF0F7]/30 transition shadow mb-1"
                    style={{ boxShadow: "0 2px 8px 0 rgba(58,240,247,0.10)" }}
                  >
                    <img src="/basket.png" alt="Add to cart" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Load More Button */}
          {visibleProducts < filteredProducts.length && (
            <div className="text-center">
              <Button
                onClick={() => (window.location.href = "/categories")}
                className="px-6 py-2 border border-teal-400 rounded-md text-black font-bold bg-transparent text-lg "
              >
                Show all
              </Button>
            </div>
          )}
        </div>
      </section>
      <ReviewCard />
      <Footer />

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

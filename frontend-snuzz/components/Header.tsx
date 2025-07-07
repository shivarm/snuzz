"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Menu, X, Plus, Star, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

// Product data - move this to a separate file if needed
const allProducts = [
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
  // Add more products as needed
];

export default function Header() {
  const { cartItems, setCartItems, cartOpen, setCartOpen, addToCart, getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Add search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 8);

    setSearchResults(filtered);
    setShowSearchResults(true);
  }, [searchQuery, allProducts]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (!searchFocused) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchFocused]);

  return (
    <header className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-[1.1rem]">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <a href="/">
              <img src="/logo.svg" alt="SNUZZ" className="h-12 w-auto" />
            </a>
            
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Shop", href: "/categories" },
              { label: "Brands", href: "#" },
              { label: "Flavor", href: "#" },
              { label: "Strength", href: "#" },
              { label: "snuzzPRO", href: "/pro" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative font-semibold hover:text-[#3AF0F7] transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="pl-8 pr-3 py-1.5 w-48 h-8 border border-gray-300 rounded-md bg-white transition-all duration-300 text-sm focus:outline-none focus:ring-0 focus:border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl z-50 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-3 font-semibold">
                        Found {searchResults.length} product{searchResults.length !== 1 ? "s" : ""}
                      </div>
                      <div className="space-y-2">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-4 p-3 hover:bg-[#3AF0F7]/10 rounded-xl cursor-pointer transition-all duration-200 group"
                            onClick={() => {
                              addToCart(product);
                              setSearchQuery("");
                              setShowSearchResults(false);
                            }}
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                              <div className="text-gray-800 font-bold text-xs">{product.image}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#3AF0F7] transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {product.brand} • {product.category}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                  <div className="text-[#3AF0F7] font-bold text-sm">
                                    €{product.salePrice.toFixed(2)}
                                  </div>
                                  {product.salePrice < product.price && (
                                    <div className="text-gray-400 line-through text-xs">
                                      €{product.price.toFixed(2)}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`w-3 h-3 ${
                                      j < Math.floor(product.rating)
                                        ? "fill-[#3AF0F7] text-[#3AF0F7]"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                  ({product.rating})
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-[#3AF0F7] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110">
                                <Plus className="w-4 h-4 text-black" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="w-full text-center text-[#3AF0F7] hover:text-[#2de0e7] font-semibold text-sm py-2 hover:bg-[#3AF0F7]/5 rounded-lg transition-colors"
                        >
                          View All Results →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No products found</p>
                      <p className="text-gray-400 text-sm">Try searching for different keywords</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setCartOpen(true)}
              className="relative bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black transition-all duration-300 transform hover:scale-110 rounded-md h-8 px-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-b border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {[
              { label: "Shop", href: "/categories" },
              { label: "Brands", href: "#" },
              { label: "Flavor", href: "#" },
              { label: "SnuzzPro", href: "/pro" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-gray-700 hover:text-[#3AF0F7] font-medium py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 relative">
              <Search className="absolute left-3 top-[calc(50%+0.5rem)] transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200"
              />
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl z-50 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-3">
                      {searchResults.slice(0, 5).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => {
                            addToCart(product);
                            setSearchQuery("");
                            setShowSearchResults(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center">
                            <div className="text-gray-800 font-bold text-xs">{product.image}</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900">{product.name}</h4>
                            <p className="text-xs text-gray-500">{product.brand}</p>
                          </div>
                          <div className="text-[#3AF0F7] font-bold text-sm">
                            €{product.salePrice.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

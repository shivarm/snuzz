"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Menu, X, Plus, Star } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

interface HeaderProps {
  cartItems: CartItem[]
  setCartItems: (items: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  allProducts?: any[]
}

export default function Header({ cartItems, setCartItems, cartOpen, setCartOpen, allProducts = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  // Add search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const filtered = allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 8)

    setSearchResults(filtered)
    setShowSearchResults(true)
  }, [searchQuery, allProducts])

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (!searchFocused) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [searchFocused])

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
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
        ]
      }
    })
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <header className="w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-3 md:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <a href="/">
              <Image
                src="/logo.svg"
                alt="Snuzz"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto drop-shadow-sm"
              />
            </a>
            <div
              className="hidden lg:block w-px h-6 md:h-8"
              style={{
                background: "linear-gradient(to bottom, transparent, #d1d5db, transparent)",
              }}
            ></div>
            <span className="text-xs md:text-sm text-gray-600 hidden lg:block font-medium">
              Premium Nicotine Products
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-4 md:space-x-8">
            {[
              { label: "Shop", href: "#" },
              { label: "Brands", href: "#" },
              { label: "Flavors", href: "#" },
              { label: "Strength", href: "#" },
              { label: "snuzz PRO", href: "#" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative text-gray-800 font-medium text-sm md:text-base group transition-all duration-300"
                style={{
                  color: "#374151",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0891b2"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#374151"
                }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full w-0"
                  style={{
                    background: "linear-gradient(to right, #22d3ee, #67e8f9)",
                  }}
                ></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5 z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 w-64 md:w-80 border-2 border-gray-200/50 focus:border-[#3AF0F7] focus:ring-2 focus:ring-[#3AF0F7]/20 rounded-xl md:rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300 shadow-sm text-sm md:text-base"
                placeholder="Search for products, brands..."
              />
              {showSearchResults && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {searchResults.length > 0 ? (
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-3 font-semibold">
                        Found {searchResults.length} product{searchResults.length !== 1 ? "s" : ""}
                      </div>
                      <div className="space-y-2">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group"
                            style={{
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(34, 211, 238, 0.1)"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent"
                            }}
                            onClick={() => {
                              addToCart(product)
                              setSearchQuery("")
                              setShowSearchResults(false)
                            }}
                          >
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                              style={{
                                background: "linear-gradient(to bottom right, #cffafe, #a5f3fc)",
                              }}
                            >
                              <div className="text-gray-800 font-bold text-xs">{product.image}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm truncate transition-colors group-hover:text-cyan-600">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {product.brand} • {product.category}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                  <div className="font-bold text-sm" style={{ color: "#0891b2" }}>
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
                                      j < Math.floor(product.rating) ? "text-cyan-400" : "text-gray-300"
                                    }`}
                                    style={{
                                      fill: j < Math.floor(product.rating) ? "#22d3ee" : "currentColor",
                                    }}
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110"
                                style={{
                                  backgroundColor: "#22d3ee",
                                }}
                              >
                                <Plus className="w-4 h-4 text-black" />
                              </div>
                            </div>
                          </div>
                        ))}
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
              size="icon"
              onClick={() => setCartOpen(true)}
              className="relative bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black transition-all duration-300 transform hover:scale-110 rounded-xl md:rounded-2xl w-10 md:w-12 h-10 md:h-12 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 md:w-6 h-5 md:h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 md:-top-2 -right-1 md:-right-2 bg-red-500 text-white text-xs rounded-full w-5 md:w-6 h-5 md:h-6 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-10 h-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full border-b border-gray-200 shadow-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="px-4 py-6 space-y-4">
            {[
              { label: "Shop", href: "#" },
              { label: "Brands", href: "#" },
              { label: "Flavors", href: "#" },
              { label: "Strength", href: "#" },
              { label: "snuzz PRO", href: "#" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-gray-700 font-medium py-2 text-base transition-colors duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0891b2"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#374151"
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#3AF0F7] text-base bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </header>
  )
}

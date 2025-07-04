"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartSidebar from "@/components/cart-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronDown, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  salePrice: number
  rating: number
  reviews: number
  image: string
  isHotSelling: boolean
  strength: string
  flavor: string
}

const mockProducts: Product[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: "KLIN Artic Mint",
  brand: "KLIN",
  category: "Nicotine",
  price: 6.99,
  salePrice: 5.49,
  rating: 4.5,
  reviews: 128,
  image: "KLIN",
  isHotSelling: i % 3 === 0,
  strength: i % 3 === 0 ? "Strong" : i % 3 === 1 ? "Medium" : "Light",
  flavor: i % 4 === 0 ? "Mint" : i % 4 === 1 ? "Berry" : i % 4 === 2 ? "Citrus" : "Original",
}))

const mockReviews = [
  {
    id: 1,
    rating: 5,
    text: "Very good, I always buy from here. Very long lasting and good quality.",
    author: "Anonymous",
  },
  {
    id: 2,
    rating: 4,
    text: "Good product, fast delivery. Recommended!",
    author: "Anonymous",
  },
  {
    id: 3,
    rating: 5,
    text: "Excellent quality and great customer service.",
    author: "Anonymous",
  },
  {
    id: 4,
    rating: 4,
    text: "Fast shipping and good packaging. Will order again.",
    author: "Anonymous",
  },
]

export default function CategoryPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([])
  
  const productsPerPage = 20
  const brands = ["KLIN", "VELO", "ZYN", "SKRUF"]
  const flavors = ["Mint", "Berry", "Citrus", "Original"]
  const strengths = ["Light", "Medium", "Strong"]

  const filteredProducts = mockProducts.filter(product => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
    const flavorMatch = selectedFlavors.length === 0 || selectedFlavors.includes(product.flavor)
    const strengthMatch = selectedStrengths.length === 0 || selectedStrengths.includes(product.strength)
    return brandMatch && flavorMatch && strengthMatch
  })

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.salePrice,
          quantity: 1,
          image: product.image,
          brand: product.brand,
        }]
      }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        allProducts={mockProducts}
      />
      
      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Best selling</h1>
            <p className="text-gray-600 text-lg">Discover our most popular nicotine products</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white border-2 border-gray-200 hover:border-[#3AF0F7] transition-colors">
                    <span className="mr-2">🏷️</span>
                    Brands
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {brands.map(brand => (
                    <DropdownMenuCheckboxItem
                      key={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand])
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand))
                        }
                      }}
                    >
                      {brand}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white border-2 border-gray-200 hover:border-[#3AF0F7] transition-colors">
                    <span className="mr-2">🍃</span>
                    Flavors
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {flavors.map(flavor => (
                    <DropdownMenuCheckboxItem
                      key={flavor}
                      checked={selectedFlavors.includes(flavor)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFlavors([...selectedFlavors, flavor])
                        } else {
                          setSelectedFlavors(selectedFlavors.filter(f => f !== flavor))
                        }
                      }}
                    >
                      {flavor}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white border-2 border-gray-200 hover:border-[#3AF0F7] transition-colors">
                    <span className="mr-2">💪</span>
                    Strength
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {strengths.map(strength => (
                    <DropdownMenuCheckboxItem
                      key={strength}
                      checked={selectedStrengths.includes(strength)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStrengths([...selectedStrengths, strength])
                        } else {
                          setSelectedStrengths(selectedStrengths.filter(s => s !== strength))
                        }
                      }}
                    >
                      {strength}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {currentProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-[#8cedf8]/20 to-[#3AF0F7]/10 border-0">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      {product.isHotSelling && (
                        <Badge className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 z-10">
                          Hot selling
                        </Badge>
                      )}
                      <div className="w-full h-24 md:h-32 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                        <div className="text-gray-800 font-bold text-lg">{product.image}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#3AF0F7] transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) 
                                ? "fill-[#3AF0F7] text-[#3AF0F7]" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[#3AF0F7] font-bold text-sm">
                            €{product.salePrice.toFixed(2)}
                          </div>
                          {product.salePrice < product.price && (
                            <div className="text-gray-400 line-through text-xs">
                              €{product.price.toFixed(2)}
                            </div>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-bold transition-all duration-300 transform hover:scale-110 w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(pageNum)
                          }}
                          isActive={currentPage === pageNum}
                          className={currentPage === pageNum ? "bg-[#3AF0F7] text-black" : ""}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Reviews</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockReviews.map((review) => (
                <Card key={review.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating 
                              ? "fill-[#3AF0F7] text-[#3AF0F7]" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {review.text}
                    </p>
                    <p className="text-gray-500 text-xs font-medium">
                      - {review.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

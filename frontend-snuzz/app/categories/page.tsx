"use client"

import ProductCard from "@/components/ProductCard"
import { useState } from "react"
import Header from "@/components/Header"
import CartSidebar from "@/components/cart-sidebar"
import { Button } from "@/components/ui/button"
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
  image: "/mint.png", // Updated to use actual image path
  isHotSelling: i % 3 === 0,
  strength: i % 3 === 0 ? "Strong" : i % 3 === 1 ? "Medium" : "Light",
  flavor: i % 4 === 0 ? "Mint" : i % 4 === 1 ? "Berry" : i % 4 === 2 ? "Citrus" : "Original",
}))


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

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 py-8 md:py-10">
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
          <div className="max-w-[1440px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-x-0 gap-y-5 justify-items-center">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
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
      </main>   
    </div>
  )
}
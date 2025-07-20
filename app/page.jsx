"use client"

import { useState, useEffect } from "react"
import { fetchProperties } from "@/lib/api"
import PropertyCard from "@/components/PropertyCard"
import SearchBar from "@/components/SearchBar"

export default function HomePage() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [featuredProperties, setFeaturedProperties] = useState([])

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setIsLoading(true)
    try {
      const data = await fetchProperties()
      setProperties(data)
      setFeaturedProperties(data.slice(0, 3)) // First 3 as featured
    } catch (error) {
      console.error("Error loading properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (searchTerm, type) => {
    setIsLoading(true)
    try {
      const data = await fetchProperties(searchTerm, type)
      setProperties(data)
    } catch (error) {
      console.error("Error searching properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Dream Property</h1>
        <p className="text-xl text-gray-600 mb-8">Compare properties, read reviews, and make informed decisions</p>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Featured Properties */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* All Properties */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Properties ({properties.length})</h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { fetchProperties } from "@/lib/api"
import PropertyCard from "@/components/PropertyCard"
import SearchBar from "@/components/SearchBar"

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setIsLoading(true)
    try {
      const data = await fetchProperties()
      setProperties(data)
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Properties</h1>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

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
    </div>
  )
}

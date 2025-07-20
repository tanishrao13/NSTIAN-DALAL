"use client"

import { useApp } from "@/context/AppContext"
import Image from "next/image"

export default function ComparisonPage() {
  const { state, dispatch } = useApp()

  const removeFromCompare = (id) => {
    dispatch({ type: "REMOVE_FROM_COMPARE", payload: id })
  }

  const clearAll = () => {
    dispatch({ type: "CLEAR_COMPARE" })
  }

  if (state.compareList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Property Comparison</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties to compare.</p>
          <p className="text-gray-400 mt-2">Add properties from the listings to compare them here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Property Comparison</h1>
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                {state.compareList.map((property) => (
                  <th key={property.id} className="px-6 py-4 text-center min-w-64">
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <button
                        onClick={() => removeFromCompare(property.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                      <h3 className="font-semibold text-sm">{property.title}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-lg font-bold text-blue-600">${property.price.toLocaleString()}</span>
                  </td>
                ))}
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Location</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {property.location}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Type</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {property.type}
                  </td>
                ))}
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bedrooms</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {property.bedrooms}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bathrooms</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {property.bathrooms}
                  </td>
                ))}
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Area (sqft)</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {property.area.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rating</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <div className="flex items-center justify-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{property.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Features</td>
                {state.compareList.map((property) => (
                  <td key={property.id} className="px-6 py-4 text-center text-sm">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

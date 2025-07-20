"use client"

import { useState, useEffect } from "react"
import { fetchProperties, addReview } from "@/lib/api"
import { useApp } from "@/context/AppContext"

export default function ReviewsPage() {
  const { state } = useApp()
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [allReviews, setAllReviews] = useState([])

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const data = await fetchProperties()
      setProperties(data)

      // Collect all reviews
      const reviews = []
      data.forEach((property) => {
        reviews.push(...property.reviews)
      })
      setAllReviews(reviews)
    } catch (error) {
      console.error("Error loading properties:", error)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!state.user) {
      alert("Please login to submit a review")
      return
    }

    if (!selectedProperty) {
      alert("Please select a property")
      return
    }

    setIsSubmitting(true)
    try {
      const newReview = await addReview({
        propertyId: selectedProperty,
        userName: state.user.name,
        rating,
        comment,
        date: new Date().toISOString().split("T")[0],
      })

      // Update local state
      setAllReviews((prev) => [newReview, ...prev])

      // Reset form
      setSelectedProperty("")
      setRating(5)
      setComment("")

      alert("Review submitted successfully!")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Error submitting review")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPropertyTitle = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId)
    return property ? property.title : "Unknown Property"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Property Reviews</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submit Review Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Write a Review</h2>

          {state.user ? (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Property</label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a property...</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-500" : "text-gray-300"
                      } hover:text-yellow-500 transition-colors`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience with this property..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Please login to write a review</p>
              <a
                href="/auth"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </a>
            </div>
          )}
        </div>

        {/* All Reviews */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">All Reviews ({allReviews.length})</h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {allReviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
            ) : (
              allReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{getPropertyTitle(review.propertyId)}</p>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

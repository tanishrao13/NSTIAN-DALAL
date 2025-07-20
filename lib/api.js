// Mock property data
const mockProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: 450000,
    location: "Downtown, New York",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    image: "/placeholder.svg?height=300&width=400",
    description: "Beautiful modern apartment in the heart of downtown with stunning city views.",
    features: ["City View", "Gym", "Parking", "Balcony"],
    rating: 4.5,
    reviews: [
      {
        id: "1",
        propertyId: "1",
        userName: "John Doe",
        rating: 5,
        comment: "Amazing location and great amenities!",
        date: "2024-01-15",
      },
    ],
  },
  {
    id: "2",
    title: "Suburban Family House",
    price: 650000,
    location: "Suburbs, California",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: "House",
    image: "/placeholder.svg?height=300&width=400",
    description: "Spacious family home with large backyard and modern kitchen.",
    features: ["Garden", "Garage", "Modern Kitchen", "Fireplace"],
    rating: 4.8,
    reviews: [
      {
        id: "2",
        propertyId: "2",
        userName: "Jane Smith",
        rating: 5,
        comment: "Perfect for families with kids!",
        date: "2024-01-10",
      },
    ],
  },
  {
    id: "3",
    title: "Luxury Penthouse",
    price: 1200000,
    location: "Manhattan, New York",
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "Penthouse",
    image: "/placeholder.svg?height=300&width=400",
    description: "Exclusive penthouse with panoramic city views and premium finishes.",
    features: ["Panoramic View", "Concierge", "Rooftop Access", "Premium Finishes"],
    rating: 4.9,
    reviews: [],
  },
  {
    id: "4",
    title: "Cozy Studio Apartment",
    price: 280000,
    location: "Brooklyn, New York",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    type: "Studio",
    image: "/placeholder.svg?height=300&width=400",
    description: "Charming studio apartment perfect for young professionals.",
    features: ["Exposed Brick", "High Ceilings", "Near Subway", "Pet Friendly"],
    rating: 4.2,
    reviews: [],
  },
  {
    id: "5",
    title: "Beachfront Condo",
    price: 850000,
    location: "Miami Beach, Florida",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    type: "Condo",
    image: "/placeholder.svg?height=300&width=400",
    description: "Stunning beachfront condominium with direct ocean access.",
    features: ["Ocean View", "Beach Access", "Pool", "Spa"],
    rating: 4.7,
    reviews: [],
  },
  {
    id: "6",
    title: "Mountain Cabin",
    price: 380000,
    location: "Aspen, Colorado",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    type: "Cabin",
    image: "/placeholder.svg?height=300&width=400",
    description: "Rustic mountain cabin with breathtaking mountain views.",
    features: ["Mountain View", "Fireplace", "Deck", "Ski Access"],
    rating: 4.6,
    reviews: [],
  },
]

// API functions
export const fetchProperties = async (searchTerm, type) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filtered = mockProperties

  if (searchTerm) {
    filtered = filtered.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (type && type !== "all") {
    filtered = filtered.filter((property) => property.type.toLowerCase() === type.toLowerCase())
  }

  return filtered
}

export const fetchPropertyById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockProperties.find((property) => property.id === id) || null
}

export const addReview = async (review) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const newReview = {
    ...review,
    id: Date.now().toString(),
  }

  const property = mockProperties.find((p) => p.id === review.propertyId)
  if (property) {
    property.reviews.push(newReview)
  }

  return newReview
}

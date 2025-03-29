"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Info, Clock, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample travel packages data
const allPackages = [
  {
    id: 1,
    title: "Paris Explorer",
    description: "Experience the magic of Paris with this 5-day tour package",
    price: 1299,
    currency: "USD",
    image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 15,
    rating: 4.8,
    duration: "5 days",
    category: ["trending", "recommended"],
    details: {
      overview:
        "Discover the City of Light with our comprehensive Paris Explorer package. From iconic landmarks to hidden gems, this carefully curated experience offers the perfect balance of guided tours and free time to explore on your own.",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Welcome Dinner",
          description:
            "Arrive in Paris, check into your hotel, and join us for a welcome dinner at a local restaurant.",
        },
        {
          day: 2,
          title: "Iconic Landmarks Tour",
          description: "Visit the Eiffel Tower, Arc de Triomphe, and enjoy a Seine River cruise.",
        },
        {
          day: 3,
          title: "Museums & Culture",
          description: "Explore the Louvre Museum and Montmartre district with a local guide.",
        },
        {
          day: 4,
          title: "Versailles Day Trip",
          description: "Full-day excursion to the Palace of Versailles and its gardens.",
        },
        {
          day: 5,
          title: "Free Day & Farewell",
          description: "Free time for shopping or personal exploration, followed by a farewell dinner.",
        },
      ],
      includes: [
        "4-star hotel accommodation",
        "Daily breakfast",
        "Welcome and farewell dinners",
        "Guided tours",
        "Skip-the-line museum passes",
        "Seine River cruise",
        "Versailles day trip",
        "Airport transfers",
      ],
      excludes: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Meals not mentioned",
      ],
    },
  },
  {
    id: 2,
    title: "Tokyo Adventure",
    description: "Discover the vibrant culture and cuisine of Tokyo",
    price: 1899,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRva3lvfGVufDB8MHwwfHx8MA%3D%3D",
    discount: 0,
    rating: 4.9,
    duration: "7 days",
    category: ["trending", "recommended"],
    details: {
      overview:
        "Immerse yourself in the fascinating blend of traditional and ultra-modern that defines Tokyo. This 7-day adventure takes you through the city's most iconic districts, cultural sites, and culinary experiences.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Tokyo",
          description: "Airport pickup and transfer to your hotel in central Tokyo.",
        },
        {
          day: 2,
          title: "Tokyo Highlights",
          description: "Visit Senso-ji Temple, Tokyo Skytree, and explore the Asakusa district.",
        },
        {
          day: 3,
          title: "Modern Tokyo",
          description: "Discover Shibuya, Harajuku, and Shinjuku districts with a local guide.",
        },
        {
          day: 4,
          title: "Cultural Immersion",
          description: "Participate in a tea ceremony and visit the Meiji Shrine.",
        },
        { day: 5, title: "Mt. Fuji Day Trip", description: "Full-day excursion to Mt. Fuji and Hakone region." },
        { day: 6, title: "Culinary Experience", description: "Tsukiji Outer Market tour and Japanese cooking class." },
        {
          day: 7,
          title: "Departure Day",
          description: "Free morning for last-minute shopping before airport transfer.",
        },
      ],
      includes: [
        "Boutique hotel accommodation",
        "Daily breakfast",
        "Welcome dinner",
        "Guided city tours",
        "Mt. Fuji excursion",
        "Cooking class",
        "Public transportation pass",
        "Airport transfers",
      ],
      excludes: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Meals not mentioned",
      ],
    },
  },
  {
    id: 3,
    title: "Bali Retreat",
    description: "Relax and rejuvenate in the beautiful island of Bali",
    price: 999,
    currency: "USD",
    image: "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 20,
    rating: 4.7,
    duration: "6 days",
    category: ["deals", "recommended"],
    details: {
      overview:
        "Escape to the tropical paradise of Bali for a perfect blend of relaxation, culture, and adventure. This retreat offers the ideal balance of structured activities and free time to enjoy Bali's beaches and natural beauty.",
      itinerary: [
        {
          day: 1,
          title: "Welcome to Bali",
          description: "Airport pickup and transfer to your beachfront resort in Seminyak.",
        },
        {
          day: 2,
          title: "Temples & Culture",
          description: "Visit Uluwatu Temple and enjoy a traditional Kecak dance performance.",
        },
        {
          day: 3,
          title: "Ubud Exploration",
          description: "Explore Ubud's Monkey Forest, art markets, and rice terraces.",
        },
        { day: 4, title: "Wellness Day", description: "Traditional Balinese spa treatment and yoga session." },
        {
          day: 5,
          title: "Adventure Day",
          description: "White water rafting on the Ayung River or volcano trekking (your choice).",
        },
        { day: 6, title: "Departure", description: "Free time before airport transfer for your departure flight." },
      ],
      includes: [
        "Beachfront resort accommodation",
        "Daily breakfast",
        "Welcome dinner",
        "Cultural tours",
        "Spa treatment",
        "Adventure activity",
        "Airport transfers",
      ],
      excludes: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Meals not mentioned",
      ],
    },
  },
  {
    id: 4,
    title: "New York City Tour",
    description: "Explore the Big Apple with our comprehensive city tour",
    price: 1499,
    currency: "USD",
    image: "https://plus.unsplash.com/premium_photo-1661882283038-a3af3337783e?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 10,
    rating: 4.6,
    duration: "4 days",
    category: ["deals"],
    details: {
      overview:
        "Experience the energy and diversity of New York City with our action-packed 4-day tour. From iconic landmarks to neighborhood explorations, this tour gives you a comprehensive introduction to the Big Apple.",
      itinerary: [
        {
          day: 1,
          title: "Arrival & Manhattan Overview",
          description: "Check into your Midtown hotel and enjoy an evening walking tour of Times Square.",
        },
        {
          day: 2,
          title: "Downtown Exploration",
          description: "Visit the Statue of Liberty, Ellis Island, and explore the Financial District.",
        },
        { day: 3, title: "Arts & Culture", description: "Tour the Metropolitan Museum of Art and Central Park." },
        {
          day: 4,
          title: "Brooklyn & Departure",
          description: "Morning Brooklyn Bridge walk and DUMBO neighborhood tour before departure.",
        },
      ],
      includes: [
        "Midtown hotel accommodation",
        "Daily breakfast",
        "Statue of Liberty ferry",
        "Museum admissions",
        "Subway passes",
        "Local guide",
        "Airport transfers",
      ],
      excludes: [
        "Flights to/from NYC",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Meals not mentioned",
      ],
    },
  },
  {
    id: 5,
    title: "Rome Historical Tour",
    description: "Walk through history in the ancient city of Rome",
    price: 1199,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1618496389029-14b4bdb12192?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 0,
    rating: 4.8,
    duration: "5 days",
    category: ["trending"],
    details: {
      overview:
        "Journey through time in the Eternal City with our Rome Historical Tour. This carefully crafted itinerary takes you from ancient Roman ruins to Renaissance masterpieces and everything in between.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Rome",
          description: "Check into your centrally located hotel and enjoy a welcome dinner.",
        },
        {
          day: 2,
          title: "Ancient Rome",
          description: "Full-day tour of the Colosseum, Roman Forum, and Palatine Hill.",
        },
        {
          day: 3,
          title: "Vatican City",
          description: "Explore Vatican Museums, Sistine Chapel, and St. Peter's Basilica.",
        },
        {
          day: 4,
          title: "Renaissance Rome",
          description: "Walking tour including the Trevi Fountain, Spanish Steps, and Pantheon.",
        },
        {
          day: 5,
          title: "Departure",
          description: "Free morning for last-minute shopping or exploration before departure.",
        },
      ],
      includes: [
        "Boutique hotel accommodation",
        "Daily breakfast",
        "Welcome dinner",
        "Skip-the-line tickets",
        "Expert local guides",
        "Airport transfers",
      ],
      excludes: [
        "International flights",
        "Travel insurance",
        "City tourist tax",
        "Personal expenses",
        "Meals not mentioned",
      ],
    },
  },
  {
    id: 6,
    title: "Bangkok Explorer",
    description: "Experience the vibrant culture and cuisine of Bangkok",
    price: 899,
    currency: "USD",
    image: "https://plus.unsplash.com/premium_photo-1661882283038-a3af3337783e?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    discount: 15,
    rating: 4.5,
    duration: "5 days",
    category: ["deals"],
    details: {
      overview:
        "Dive into the sensory feast that is Bangkok with our 5-day explorer package. From ornate temples to bustling markets and world-class street food, this tour offers an authentic Thai experience in the heart of the capital.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Bangkok",
          description: "Airport pickup and transfer to your hotel in central Bangkok.",
        },
        { day: 2, title: "Temple Tour", description: "Visit the Grand Palace, Wat Pho, and Wat Arun temples." },
        {
          day: 3,
          title: "Markets & Canals",
          description: "Explore floating markets and take a longtail boat through the canals.",
        },
        { day: 4, title: "Culinary Adventure", description: "Street food tour and Thai cooking class." },
        {
          day: 5,
          title: "Departure",
          description: "Free time for shopping at Chatuchak Weekend Market before departure.",
        },
      ],
      includes: [
        "4-star hotel accommodation",
        "Daily breakfast",
        "Temple entrance fees",
        "Floating market excursion",
        "Cooking class",
        "Street food tour",
        "Airport transfers",
      ],
      excludes: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Optional activities",
        "Meals not mentioned",
      ],
    },
  },
]

export function TravelPackages({
  category = "all",
  onBookmark,
}: { category?: string; onBookmark?: (packageId: number, isBookmarked: boolean) => void }) {
  const [bookmarkedPackages, setBookmarkedPackages] = useState<number[]>([])
  const [openPackageId, setOpenPackageId] = useState<number | null>(null)

  // Filter packages based on category
  const packages = category === "all" ? allPackages : allPackages.filter((pkg) => pkg.category.includes(category))

  const handleBookmark = (packageId: number) => {
    setBookmarkedPackages((prev) => {
      const isCurrentlyBookmarked = prev.includes(packageId)
      const newBookmarks = isCurrentlyBookmarked ? prev.filter((id) => id !== packageId) : [...prev, packageId]

      // Call the parent component's onBookmark function if provided
      if (onBookmark) {
        onBookmark(packageId, !isCurrentlyBookmarked)
      }

      // Store in localStorage for persistence
      localStorage.setItem("bookmarkedPackages", JSON.stringify(newBookmarks))

      return newBookmarks
    })
  }

  // Load bookmarked packages from localStorage on component mount
  useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedPackages")
    if (savedBookmarks) {
      setBookmarkedPackages(JSON.parse(savedBookmarks))
    }
  })

  const getPackageById = (id: number) => {
    return allPackages.find((pkg) => pkg.id === id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden">
          <div className="relative">
            <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-background/80 hover:bg-background/90 rounded-full ${
                bookmarkedPackages.includes(pkg.id) ? "text-red-500" : ""
              }`}
              onClick={() => handleBookmark(pkg.id)}
            >
              <Heart className={`h-5 w-5 ${bookmarkedPackages.includes(pkg.id) ? "fill-current" : ""}`} />
              <span className="sr-only">
                {bookmarkedPackages.includes(pkg.id) ? "Remove from favorites" : "Add to favorites"}
              </span>
            </Button>
            {pkg.discount > 0 && <Badge className="absolute top-2 left-2">{pkg.discount}% OFF</Badge>}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{pkg.title}</h3>
              <div className="flex items-center text-sm">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{pkg.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                <p className="font-bold text-lg">
                  {pkg.currency} {pkg.price}
                  {pkg.discount > 0 && (
                    <span className="text-sm line-through text-muted-foreground ml-2">
                      {pkg.currency} {Math.round(pkg.price * (1 + pkg.discount / 100))}
                    </span>
                  )}
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1" onClick={() => setOpenPackageId(pkg.id)}>
                    <Info className="h-4 w-4" />
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>{pkg.title}</DialogTitle>
                    <DialogDescription>{pkg.description}</DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="md:w-1/2">
                      <img
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.title}
                        className="w-full h-64 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:w-1/2 space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {pkg.duration}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3" /> {pkg.rating} Rating
                        </Badge>
                        {pkg.discount > 0 && <Badge className="bg-red-500">{pkg.discount}% OFF</Badge>}
                      </div>

                      <div>
                        <h4 className="font-medium text-lg">Price</h4>
                        <p className="text-2xl font-bold">
                          {pkg.currency} {pkg.price}
                          {pkg.discount > 0 && (
                            <span className="text-sm line-through text-muted-foreground ml-2">
                              {pkg.currency} {Math.round(pkg.price * (1 + pkg.discount / 100))}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>

                      <div>
                        <h4 className="font-medium">Overview</h4>
                        <p className="text-sm text-muted-foreground">{pkg.details.overview}</p>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="itinerary" className="mt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                      <TabsTrigger value="includes">What's Included</TabsTrigger>
                      <TabsTrigger value="excludes">Not Included</TabsTrigger>
                    </TabsList>
                    <TabsContent value="itinerary" className="h-64 overflow-auto">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-4 py-2">
                          {pkg.details.itinerary.map((day) => (
                            <div key={day.day} className="border-l-2 border-primary pl-4 relative">
                              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                              <h4 className="font-medium">
                                Day {day.day}: {day.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">{day.description}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="includes" className="h-64 overflow-auto">
                      <ScrollArea className="h-full pr-4">
                        <ul className="list-disc pl-5 space-y-1">
                          {pkg.details.includes.map((item, index) => (
                            <li key={index} className="text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="excludes" className="h-64 overflow-auto">
                      <ScrollArea className="h-full pr-4">
                        <ul className="list-disc pl-5 space-y-1">
                          {pkg.details.excludes.map((item, index) => (
                            <li key={index} className="text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>

                  <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button variant="outline" className="sm:flex-1" onClick={() => handleBookmark(pkg.id)}>
                      <Heart
                        className={`mr-2 h-4 w-4 ${bookmarkedPackages.includes(pkg.id) ? "fill-current text-red-500" : ""}`}
                      />
                      {bookmarkedPackages.includes(pkg.id) ? "Bookmarked" : "Bookmark"}
                    </Button>
                    <Button className="sm:flex-1">Book Now</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


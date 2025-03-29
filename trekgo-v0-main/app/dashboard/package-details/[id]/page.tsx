"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, ArrowLeft, Calendar, MapPin, Users, Clock, Star, Share2 } from "lucide-react"

// This would typically come from an API or database
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
  // Additional packages would be here
]

export default function PackageDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [packageData, setPackageData] = useState<any>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const packageId = Number(params.id)
    const foundPackage = allPackages.find((p) => p.id === packageId)

    if (foundPackage) {
      setPackageData(foundPackage)

      // Check if this package is bookmarked
      const savedBookmarks = localStorage.getItem("bookmarkedPackages")
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks)
        setIsBookmarked(bookmarks.includes(packageId))
      }
    } else {
      // Handle package not found
      router.push("/dashboard/packages")
    }

    setLoading(false)
  }, [params.id, router])

  const handleBookmark = () => {
    const packageId = Number(params.id)
    const savedBookmarks = localStorage.getItem("bookmarkedPackages")
    let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : []

    if (isBookmarked) {
      // Remove from bookmarks
      bookmarks = bookmarks.filter((id: number) => id !== packageId)
    } else {
      // Add to bookmarks
      bookmarks.push(packageId)
    }

    localStorage.setItem("bookmarkedPackages", JSON.stringify(bookmarks))
    setIsBookmarked(!isBookmarked)
  }

  if (loading) {
    return (
      <div className="container py-6 flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight">Package Not Found</h1>
        <p className="text-muted-foreground mt-2">The package you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-4" onClick={() => router.push("/dashboard/packages")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Packages
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/packages")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{packageData.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="relative">
              <img
                src={packageData.image || "/placeholder.svg"}
                alt={packageData.title}
                className="w-full h-[300px] object-cover"
              />
              {packageData.discount > 0 && (
                <Badge className="absolute top-4 left-4 text-sm px-3 py-1">{packageData.discount}% OFF</Badge>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {packageData.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> {packageData.rating} Rating
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Destination
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> Group Tour
                </Badge>
              </div>

              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground mb-6">{packageData.details.overview}</p>

              <Tabs defaultValue="itinerary" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="includes">What's Included</TabsTrigger>
                  <TabsTrigger value="excludes">Not Included</TabsTrigger>
                </TabsList>
                <TabsContent value="itinerary" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {packageData.details.itinerary.map((day: any) => (
                        <div key={day.day} className="border-l-2 border-primary pl-4 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                          <h4 className="font-medium text-lg">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="text-muted-foreground">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="includes" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg mb-2">What's Included</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {packageData.details.includes.map((item: string, index: number) => (
                          <li key={index} className="text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="excludes" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg mb-2">Not Included</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {packageData.details.excludes.map((item: string, index: number) => (
                          <li key={index} className="text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
              <CardDescription>Package details and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Price per person</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    {packageData.currency} {packageData.price}
                  </span>
                  {packageData.discount > 0 && (
                    <span className="text-sm line-through text-muted-foreground ml-2">
                      {packageData.currency} {Math.round(packageData.price * (1 + packageData.discount / 100))}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Select date</p>
                <Button variant="outline" className="w-full justify-between">
                  <span>Choose departure date</span>
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Travelers</p>
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      -
                    </Button>
                    <span className="w-8 text-center">2</span>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Children</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      -
                    </Button>
                    <span className="w-8 text-center">0</span>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Base price</span>
                  <span>
                    {packageData.currency} {packageData.price * 2}
                  </span>
                </div>
                {packageData.discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>
                      -{packageData.currency} {Math.round((packageData.price * 2 * packageData.discount) / 100)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span>Taxes & fees</span>
                  <span>
                    {packageData.currency} {Math.round(packageData.price * 0.1)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>
                    {packageData.currency}{" "}
                    {Math.round(packageData.price * 2 * (1 - packageData.discount / 100) + packageData.price * 0.1)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={handleBookmark}>
                  <Heart className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current text-red-500" : ""}`} />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Our travel experts are here to assist you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                Chat with an Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


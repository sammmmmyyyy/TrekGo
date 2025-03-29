"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink, MapPin, Calendar, Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TravelPackages } from "./travel-packages"

// Sample bookmarked destinations data
const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    description: "Famous for its stunning sunsets, white-washed buildings, and blue domes",
    image: "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    savedDate: "2 weeks ago",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    description: "Known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    savedDate: "1 month ago",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    description: "An Incan citadel set high in the Andes Mountains, renowned for its sophisticated dry-stone walls",
    image: "https://plus.unsplash.com/premium_photo-1694475258447-c8536a8073d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFjaHUlMjBwaWNodXxlbnwwfHwwfHx8MA%3D%3D",
    savedDate: "3 months ago",
  },
  {
    id: 4,
    name: "Venice, Italy",
    description: "Famous for its canals, gondolas, and historic architecture",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    savedDate: "2 months ago",
  },
]

export function BookmarkedDestinations() {
  const [bookmarkedPackageIds, setBookmarkedPackageIds] = useState<number[]>([])

  // Load bookmarked packages from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedPackages")
    if (savedBookmarks) {
      setBookmarkedPackageIds(JSON.parse(savedBookmarks))
    }
  }, [])

  const handleBookmarkChange = (packageId: number, isBookmarked: boolean) => {
    const newBookmarks = isBookmarked
      ? [...bookmarkedPackageIds, packageId]
      : bookmarkedPackageIds.filter((id) => id !== packageId)

    setBookmarkedPackageIds(newBookmarks)
    localStorage.setItem("bookmarkedPackages", JSON.stringify(newBookmarks))
  }

  const removeDestinationBookmark = (id: number) => {
    // This would typically update a database or state management store
    // For this demo, we'll just show the UI interaction
    alert(`Destination ${id} removed from bookmarks`)
  }

  return (
    <Tabs defaultValue="destinations">
      <TabsList>
        <TabsTrigger value="destinations">Destinations</TabsTrigger>
        <TabsTrigger value="packages">Travel Packages</TabsTrigger>
      </TabsList>

      <TabsContent value="destinations" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((bookmark) => (
            <Card key={bookmark.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 h-48 md:h-auto">
                  <img
                    src={bookmark.image || "/placeholder.svg"}
                    alt={bookmark.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{bookmark.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeDestinationBookmark(bookmark.id)}
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                      <span className="sr-only">Remove bookmark</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 flex-grow">{bookmark.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs text-muted-foreground">Saved {bookmark.savedDate}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-1">
                          <ExternalLink className="h-4 w-4" />
                          Explore
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{bookmark.name}</DialogTitle>
                          <DialogDescription>{bookmark.description}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <img
                            src={bookmark.image || "/placeholder.svg"}
                            alt={bookmark.name}
                            className="w-full h-64 object-cover rounded-md"
                          />
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{bookmark.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Best time to visit: April to October</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              This is a placeholder for more detailed information about {bookmark.name}. In a real
                              application, this would include travel tips, best attractions, local customs, and other
                              useful information for travelers.
                            </p>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Find Packages</Button>
                              <Button>Plan a Trip</Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="packages" className="mt-6">
        {bookmarkedPackageIds.length > 0 ? (
          <div className="space-y-6">
            <p className="text-muted-foreground">Your bookmarked travel packages:</p>
            <TravelPackages onBookmark={handleBookmarkChange} />
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No bookmarked packages yet</h3>
            <p className="text-muted-foreground mb-6">
              Browse our travel packages and bookmark your favorites to see them here.
            </p>
            <Button asChild>
              <a href="/dashboard/packages">Browse Packages</a>
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}


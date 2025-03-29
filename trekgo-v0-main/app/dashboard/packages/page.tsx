"use client"

import { useState } from "react"
import { TravelPackages } from "@/components/dashboard/travel-packages"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Travel Packages</h1>
      <p className="text-muted-foreground">Explore our curated travel packages and find your next adventure.</p>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search destinations, activities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Packages</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="deals">Special Deals</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <TravelPackages category="all" />
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Destinations</CardTitle>
              <CardDescription>The most popular destinations right now based on traveler interest</CardDescription>
            </CardHeader>
            <CardContent>
              <TravelPackages category="trending" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Special Deals</CardTitle>
              <CardDescription>Limited-time offers and discounted packages</CardDescription>
            </CardHeader>
            <CardContent>
              <TravelPackages category="deals" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
              <CardDescription>Personalized recommendations based on your preferences and past trips</CardDescription>
            </CardHeader>
            <CardContent>
              <TravelPackages category="recommended" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


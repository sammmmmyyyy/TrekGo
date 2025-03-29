"use client"

import { BookmarkedDestinations } from "@/components/dashboard/bookmarked-destinations"

export default function BookmarksPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Bookmarked Destinations</h1>
      <p className="text-muted-foreground">View and manage all your saved destinations in one place.</p>

      <BookmarkedDestinations />
    </div>
  )
}


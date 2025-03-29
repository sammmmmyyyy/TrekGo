"use client"

import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function HistoryPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Travel History</h1>
      <p className="text-muted-foreground">Review your past adventures and travel experiences.</p>

      <RecentActivity />
    </div>
  )
}


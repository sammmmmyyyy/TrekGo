"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight } from "lucide-react"

// Sample trip data
const trips = [
  {
    id: 1,
    destination: "Paris, France",
    startDate: new Date(2025, 3, 15), // April 15, 2025
    endDate: new Date(2025, 3, 22), // April 22, 2025
    status: "confirmed",
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    startDate: new Date(2025, 5, 10), // June 10, 2025
    endDate: new Date(2025, 5, 20), // June 20, 2025
    status: "planning",
  },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTrip, setSelectedTrip] = useState<any>(null)

  // Function to check if a date has a trip
  const hasTripOnDate = (date: Date) => {
    return trips.some((trip) => {
      const tripStart = new Date(trip.startDate)
      const tripEnd = new Date(trip.endDate)
      return date >= tripStart && date <= tripEnd
    })
  }

  // Function to get trips for the selected date
  const getTripsForDate = (date: Date) => {
    return trips.filter((trip) => {
      const tripStart = new Date(trip.startDate)
      const tripEnd = new Date(trip.endDate)
      return date >= tripStart && date <= tripEnd
    })
  }

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    if (newDate) {
      const tripsOnDate = getTripsForDate(newDate)
      setSelectedTrip(tripsOnDate.length > 0 ? tripsOnDate[0] : null)
    } else {
      setSelectedTrip(null)
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trip Calendar</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Travel Schedule</CardTitle>
            <CardDescription>View and manage your upcoming trips</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border"
              modifiers={{
                booked: (date) => hasTripOnDate(date),
              }}
              modifiersClassNames={{
                booked: "bg-primary/20 font-bold text-primary",
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {date
                ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : "Select a date"}
            </CardTitle>
            <CardDescription>{selectedTrip ? "Trip details" : "No trips scheduled for this date"}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTrip ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedTrip.destination}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedTrip.startDate).toLocaleDateString()} -{" "}
                    {new Date(selectedTrip.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <Badge variant={selectedTrip.status === "confirmed" ? "default" : "outline"}>
                    {selectedTrip.status}
                  </Badge>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View Trip Details <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <p className="text-muted-foreground text-center">
                  {date ? "No trips scheduled for this date" : "Select a date to view trip details"}
                </p>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Plan a Trip
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Trips</CardTitle>
            <CardDescription>Your scheduled trips for the next few months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{trip.destination}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={trip.status === "confirmed" ? "default" : "outline"}>{trip.status}</Badge>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


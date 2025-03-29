"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Sample notification data
const notifications = [
  {
    id: 1,
    title: "New Travel Deal",
    description: "30% off on Paris packages for the next 24 hours!",
    time: "2 hours ago",
    read: false,
    type: "promotion",
  },
  {
    id: 2,
    title: "Trip Reminder",
    description: "Your trip to Barcelona is in 3 days. Don't forget to check in!",
    time: "1 day ago",
    read: true,
    type: "reminder",
  },
  {
    id: 3,
    title: "Price Drop Alert",
    description: "Flights to Tokyo have dropped by 15% since you last checked.",
    time: "3 days ago",
    read: false,
    type: "alert",
  },
  {
    id: 4,
    title: "New Feature",
    description: "We've added a new budget tracking feature to help plan your trips!",
    time: "1 week ago",
    read: true,
    type: "system",
  },
]

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const [notificationState, setNotificationState] = useState(notifications)

  const unreadCount = notificationState.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotificationState(notificationState.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotificationState(notificationState.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto text-xs px-2" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="p-0">
            <ScrollArea className="h-[300px]">
              {notificationState.length > 0 ? (
                <div className="divide-y">
                  {notificationState.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 cursor-pointer hover:bg-muted transition-colors ${!notification.read ? "bg-muted/50" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-medium text-sm">{notification.title}</h5>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4">
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread" className="p-0">
            <ScrollArea className="h-[300px]">
              {notificationState.filter((n) => !n.read).length > 0 ? (
                <div className="divide-y">
                  {notificationState
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 cursor-pointer hover:bg-muted transition-colors bg-muted/50"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4">
                  <p className="text-sm text-muted-foreground">No unread notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="important" className="p-0">
            <ScrollArea className="h-[300px]">
              {notificationState.filter((n) => n.type === "alert" || n.type === "reminder").length > 0 ? (
                <div className="divide-y">
                  {notificationState
                    .filter((n) => n.type === "alert" || n.type === "reminder")
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 cursor-pointer hover:bg-muted transition-colors ${!notification.read ? "bg-muted/50" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4">
                  <p className="text-sm text-muted-foreground">No important notifications</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="p-2 border-t">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}


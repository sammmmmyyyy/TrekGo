"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, Mic, PauseCircle } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your TrekGo assistant. I can help you navigate the platform, find travel packages, manage bookmarks, view your travel history, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Process the user's message and generate a response
    const userInput = input.toLowerCase()
    setTimeout(() => {
      let botResponse = ""

      // Navigation commands
      if (userInput.includes("dashboard") || userInput.includes("home")) {
        botResponse =
          "I'll take you to the dashboard. You can view your upcoming trips, stats, and recent activities there."
        setTimeout(() => router.push("/dashboard"), 1000)
      } else if (userInput.includes("profile") || userInput.includes("account")) {
        botResponse = "Navigating to your profile page where you can update your personal information."
        setTimeout(() => router.push("/dashboard/profile"), 1000)
      } else if (userInput.includes("bookmark") || userInput.includes("saved")) {
        botResponse = "Taking you to your bookmarked destinations. You can view and manage all your saved places here."
        setTimeout(() => router.push("/dashboard/bookmarks"), 1000)
      } else if (userInput.includes("history") || userInput.includes("past trip")) {
        botResponse = "I'll show you your travel history. You can see all your past adventures here."
        setTimeout(() => router.push("/dashboard/history"), 1000)
      } else if (userInput.includes("package") || userInput.includes("deal")) {
        botResponse = "Let me show you our current travel packages and deals."
        setTimeout(() => router.push("/dashboard/packages"), 1000)
      } else if (userInput.includes("calendar") || userInput.includes("schedule")) {
        botResponse = "Opening your trip calendar. You can view and manage your upcoming travel plans here."
        setTimeout(() => router.push("/dashboard/calendar"), 1000)
      } else if (userInput.includes("setting")) {
        botResponse = "Taking you to settings where you can customize your TrekGo experience."
        setTimeout(() => router.push("/dashboard/settings"), 1000)
      }

      // Help with features
      else if (userInput.includes("how to book") || userInput.includes("booking")) {
        botResponse =
          "To book a trip, browse our travel packages, select the one you like, and click on the 'Details' button. From there, you can customize your trip and complete the booking process."
      } else if (userInput.includes("how to save") || userInput.includes("add bookmark")) {
        botResponse =
          "To bookmark a destination, click the heart icon on any travel package or destination card. You can view all your bookmarks in the Bookmarks section."
      } else if (userInput.includes("dark mode") || userInput.includes("light mode") || userInput.includes("theme")) {
        botResponse =
          "You can toggle between dark and light mode by clicking the sun/moon icon in the sidebar. This will change the appearance of the entire platform."
      } else if (userInput.includes("notification")) {
        botResponse =
          "You can view your notifications by clicking the bell icon in the top right corner of the dashboard. This shows alerts about deals, trip reminders, and system updates."
      } else if (userInput.includes("sign out") || userInput.includes("logout")) {
        botResponse =
          "To sign out, click on your profile picture in the sidebar and select the logout icon. This will securely end your session."
      } else if (userInput.includes("accessibility") || userInput.includes("help me navigate")) {
        botResponse =
          "TrekGo is designed to be accessible for all users. The sidebar contains links to all main sections. You can collapse it using the toggle button. I'm also here to help you navigate - just tell me where you want to go!"
      }

      // General responses
      else if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
        botResponse = "Hello there! How can I help you with TrekGo today?"
      } else if (userInput.includes("thank")) {
        botResponse = "You're welcome! Is there anything else I can help you with?"
      } else {
        botResponse =
          "I'm not sure I understand. Would you like help with navigating the platform, finding travel packages, managing bookmarks, or viewing your travel history?"
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true)
      // Check if browser supports speech recognition
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = false

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognition.onerror = () => {
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognition.start()
      } else {
        // Browser doesn't support speech recognition
        setInput("Sorry, voice input is not supported in your browser.")
        setIsListening(false)
      }
    } else {
      setIsListening(false)
    }
  }

  const suggestedQueries = [
    "How do I book a trip?",
    "Show me my bookmarks",
    "Take me to travel packages",
    "How to use dark mode?",
    "View my travel history",
  ]

  return (
    <div className="container py-6">
      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader>
          <CardTitle>Travel Assistant</CardTitle>
          <CardDescription>I can help you navigate TrekGo, find information, and access features</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-16rem)] px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    } items-start gap-2`}
                  >
                    <Avatar className="h-8 w-8">
                      {message.sender === "bot" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback>U</AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-75"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex-col space-y-4 border-t p-4">
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(query)
                }}
              >
                {query}
              </Button>
            ))}
          </div>
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={toggleVoiceInput}
              className={isListening ? "bg-red-100 dark:bg-red-900" : ""}
            >
              {isListening ? <PauseCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span className="sr-only">Voice input</span>
            </Button>
            <Button size="icon" onClick={handleSend} disabled={input.trim() === ""}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


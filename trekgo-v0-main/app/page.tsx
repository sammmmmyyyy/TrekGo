import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Map, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            <span>TrekGo</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Plan Your Perfect Journey with <span className="text-primary">TrekGo</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From discovering destinations to booking accommodations, TrekGo simplifies every aspect of your travel
              planning experience.<br></br>
              Samriddhi Ganguly 23BDS1035,Debeshi Sen 23BDS1055,Aryan Mahawar 23BDS1095
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/5">
              <img
                src="https://images.unsplash.com/photo-1610551909432-6ce544bdc2b5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="TrekGo Dashboard Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container py-16 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground">Destinations Worldwide</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">100,000+</h3>
              <p className="text-muted-foreground">Happy Travelers</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-16 border-t">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TrekGo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-3">
                <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            <span>TrekGo</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TrekGo. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Personalized Recommendations",
    description: "Get tailored travel suggestions based on your preferences, budget, and travel style.",
    icon: Map,
  },
  {
    title: "Integrated Booking",
    description: "Book hotels, activities, and transportation all in one place with our seamless platform.",
    icon: Globe,
  },
  {
    title: "Smart Itineraries",
    description: "Create and manage detailed travel itineraries with our intuitive planning tools.",
    icon: Users,
  },
  {
    title: "Budget Tracking",
    description: "Keep track of your travel expenses and stay within your budget with our financial tools.",
    icon: Map,
  },
  {
    title: "Travel Insights",
    description: "Access valuable information about destinations, including local customs, weather, and safety tips.",
    icon: Globe,
  },
  {
    title: "24/7 Support",
    description: "Get assistance whenever you need it with our dedicated customer support team.",
    icon: Users,
  },
]


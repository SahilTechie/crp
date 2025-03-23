"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import CategorySlider from "@/components/CategorySlider"
import HowItWorks from "@/components/HowItWorks"
import ComplaintForm from "@/components/ComplaintForm"
import TrackingSection from "@/components/TrackingSection"
import PublicDashboard from "@/components/PublicDashboard"
import HelpCenter from "@/components/HelpCenter"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import AdminLogin from "@/components/AdminLogin"
import { ThemeProvider } from "@/components/ThemeProvider"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [darkMode, setDarkMode] = useState(false)

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <HeroSection />
            <CategorySlider />
            <HowItWorks />
            <Testimonials />
          </>
        )
      case "complaint":
        return <ComplaintForm />
      case "track":
        return <TrackingSection />
      case "dashboard":
        return <PublicDashboard />
      case "help":
        return <HelpCenter />
      case "admin":
        return <AdminLogin />
      default:
        return <HeroSection />
    }
  }

  return (
    <ThemeProvider>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navbar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <main className="pt-16">{renderSection()}</main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}


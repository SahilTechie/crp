"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CategorySlider() {
  const categories = [
    { id: "education", name: "Education", icon: "📚" },
    { id: "municipality", name: "Municipality", icon: "🏙️" },
    { id: "safety", name: "Safety", icon: "🚔" },
    { id: "governance", name: "Governance", icon: "🗳️" },
    { id: "infrastructure", name: "Infrastructure", icon: "🚧" },
    { id: "water", name: "Water Supply", icon: "🚰" },
    { id: "electricity", name: "Electricity", icon: "💡" },
    { id: "healthcare", name: "Healthcare", icon: "🏥" },
    { id: "telecom", name: "Telecom", icon: "📞" },
    { id: "waste", name: "Waste Management", icon: "🧹" },
    { id: "housing", name: "Housing", icon: "🏡" },
    { id: "environment", name: "Environment", icon: "🌳" },
    { id: "rights", name: "Human Rights", icon: "⚖️" },
    { id: "cyber", name: "Cybercrime", icon: "💬" },
    { id: "consumer", name: "Consumer Issues", icon: "📦" },
    { id: "corruption", name: "Corruption", icon: "💰" },
    { id: "gender", name: "Gender Violence", icon: "👩‍🎓" },
    { id: "child", name: "Child Safety", icon: "🧒" },
    { id: "senior", name: "Senior Citizen", icon: "👴" },
    { id: "animal", name: "Animal Welfare", icon: "🐾" },
  ]

  const [startIndex, setStartIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollTimerRef = useRef(null)
  const itemsToShow = typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 5

  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollTimerRef.current = setInterval(() => {
        setStartIndex((prevIndex) => (prevIndex + 1) % (categories.length - itemsToShow + 1))
      }, 1500) // Reduced interval duration from 3000ms to 1500ms
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [isAutoScrolling, categories.length, itemsToShow])

  const handlePrev = () => {
    setIsAutoScrolling(false)
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNext = () => {
    setIsAutoScrolling(false)
    setStartIndex((prevIndex) => Math.min(categories.length - itemsToShow, prevIndex + 1))
  }

  return (
    <section className="py-8 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Complaint Categories</h2>

        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md ${
              startIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>

          <div className="overflow-hidden mx-10">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * (100 / itemsToShow)}%)` }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-none w-1/2 md:w-1/5 px-2"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center justify-center"
                    onMouseEnter={() => setIsAutoScrolling(false)}
                    onMouseLeave={() => setIsAutoScrolling(true)}
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex >= categories.length - itemsToShow}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md ${
              startIndex >= categories.length - itemsToShow
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
            aria-label="Next categories"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  )
}


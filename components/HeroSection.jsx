"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"

export default function HeroSection() {
  const [currentSlogan, setCurrentSlogan] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const slogans = [
    "Your Complaints, Our Action.",
    "Speak Up, We Listen. AI Acts.",
    "Transforming Complaints into Solutions.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              AI-Powered Grievance Management
            </h1>
            <div className="h-16">
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 transition-opacity duration-500">
                {slogans[currentSlogan]}
              </p>
            </div>
            <button
              onClick={() => {
                // Find the complaint button in the navbar and click it
                const complaintButton = document.querySelector('button[data-section="complaint"]')
                if (complaintButton) {
                  complaintButton.click()
                }
              }}
              className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              File Complaint
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              {showVideo ? (
                <div className="aspect-w-16 aspect-h-9 bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Explainer Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div
                  className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowVideo(true)}
                >
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Watch how to file a complaint, AI processing, and real-time tracking
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


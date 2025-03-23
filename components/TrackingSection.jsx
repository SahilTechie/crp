"use client"

import { useState, useEffect } from "react"
import { Search, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function TrackingSection() {
  const [trackingId, setTrackingId] = useState("")
  const [complaint, setComplaint] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  // Check if there are any complaints in localStorage on component mount
  useEffect(() => {
    const savedComplaints = JSON.parse(localStorage.getItem("complaints") || "[]")
    if (savedComplaints.length > 0) {
      // Pre-fill with the most recent complaint ID
      setTrackingId(savedComplaints[savedComplaints.length - 1].id)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      const savedComplaints = JSON.parse(localStorage.getItem("complaints") || "[]")
      const found = savedComplaints.find((c) => c.id === trackingId)

      if (found) {
        setComplaint(found)
      } else {
        setError("No complaint found with this ID. Please check and try again.")
        setComplaint(null)
      }

      setIsSearching(false)
    }, 1000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500"
      case "In Progress":
        return "text-blue-500"
      case "Resolved":
        return "text-green-500"
      case "Rejected":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "In Progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "Resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Rejected":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Track Your Complaint</h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <label htmlFor="trackingId" className="sr-only">
                  Complaint ID
                </label>
                <input
                  type="text"
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your complaint ID"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || !trackingId}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSearching ? (
                  "Searching..."
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Track
                  </>
                )}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-8 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {complaint && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Complaint #{complaint.id}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Filed on {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(complaint.status)}
                    <span className={`ml-2 font-medium ${getStatusColor(complaint.status)}`}>{complaint.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h4>
                    <p className="text-gray-900 dark:text-gray-100">{complaint.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Organization</h4>
                    <p className="text-gray-900 dark:text-gray-100">{complaint.organization}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                    <p className="text-gray-900 dark:text-gray-100">{complaint.description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Expected Resolution</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <p className="text-gray-900 dark:text-gray-100">{formatDate(complaint.expectedResolution)}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Status Timeline</h4>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-500">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Complaint Received</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(complaint.createdAt)}</p>
                      </div>
                    </div>

                    {complaint.updates &&
                      complaint.updates.map((update, index) => (
                        <div className="flex" key={index}>
                          <div className="flex flex-col items-center mr-4">
                            <div className="rounded-full h-8 w-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-500">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{update.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(update.date)}</p>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{update.message}</p>
                          </div>
                        </div>
                      ))}

                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400">
                          <Clock className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-400 dark:text-gray-500">Expected Resolution</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(complaint.expectedResolution)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


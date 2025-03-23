"use client"

import { useState, useEffect } from "react"
import { LogOut, Filter, RefreshCw, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export default function AdminDashboard({ adminEmail }) {
  const [complaints, setComplaints] = useState([])
  const [filteredComplaints, setFilteredComplaints] = useState([])
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    // Load complaints from localStorage
    const savedComplaints = JSON.parse(localStorage.getItem("complaints") || "[]")
    setComplaints(savedComplaints)
    setFilteredComplaints(savedComplaints)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (filter === "all") {
      setFilteredComplaints(complaints)
    } else {
      setFilteredComplaints(complaints.filter((complaint) => complaint.status === filter))
    }
  }, [filter, complaints])

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn")
    sessionStorage.removeItem("adminEmail")
    window.location.reload()
  }

  const handleStatusChange = (complaintId, newStatus) => {
    const updatedComplaints = complaints.map((complaint) => {
      if (complaint.id === complaintId) {
        return {
          ...complaint,
          status: newStatus,
          updates: [
            ...(complaint.updates || []),
            {
              title: `Status changed to ${newStatus}`,
              date: new Date().toISOString(),
              message: `The status was updated by admin (${adminEmail}).`,
            },
          ],
        }
      }
      return complaint
    })

    setComplaints(updatedComplaints)
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints))

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      setSelectedComplaint(updatedComplaints.find((c) => c.id === complaintId))
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "In Progress":
        return <RefreshCw className="h-5 w-5 text-blue-500" />
      case "Resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <section className="py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-600 dark:text-gray-400">
              Logged in as <span className="font-medium">{adminEmail}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Complaints</h3>
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                      <div className="py-1">
                        <button
                          onClick={() => { setFilter("all"); setIsFilterOpen(false); }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            filter === "all"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          All Complaints
                        </button>
                        <button
                          onClick={() => { setFilter("Pending"); setIsFilterOpen(false); }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            filter === "Pending"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => { setFilter("In Progress"); setIsFilterOpen(false); }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            filter === "In Progress"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => { setFilter("Resolved"); setIsFilterOpen(false); }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            filter === "Resolved"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          Resolved
                        </button>
                        <button
                          onClick={() => { setFilter("Rejected"); setIsFilterOpen(false); }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            filter === "Rejected"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          Rejected
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="p-4 text-center">
                  <p className="text-gray-600 dark:text-gray-400">Loading complaints...</p>
                </div>
              ) : filteredComplaints.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-gray-600 dark:text-gray-400">No complaints found.</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                  {filteredComplaints.map((complaint) => (
                    <button
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                        selectedComplaint && selectedComplaint.id === complaint.id ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">{complaint.category}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {complaint.id}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(complaint.createdAt)}</p>
                        </div>
                        <div className="flex items-center">{getStatusIcon(complaint.status)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedComplaint ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Complaint Details</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {selectedComplaint.id}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(selectedComplaint.status)}
                      <span
                        className={`ml-2 font-medium ${
                          selectedComplaint.status === "Pending"
                            ? "text-yellow-500"
                            : selectedComplaint.status === "In Progress"
                              ? "text-blue-500"
                              : selectedComplaint.status === "Resolved"
                                ? "text-green-500"
                                : selectedComplaint.status === "Rejected"
                                  ? "text-red-500"
                                  : "text-gray-500"
                        }`}
                      >
                        {selectedComplaint.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h4>
                      <p className="text-gray-900 dark:text-white">{selectedComplaint.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Organization</h4>
                      <p className="text-gray-900 dark:text-white">{selectedComplaint.organization}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Submitted On</h4>
                      <p className="text-gray-900 dark:text-white">{formatDate(selectedComplaint.createdAt)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Expected Resolution</h4>
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(selectedComplaint.expectedResolution)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {selectedComplaint.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedComplaint.id, "Pending")}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedComplaint.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-900 dark:hover:text-yellow-200"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedComplaint.id, "In Progress")}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedComplaint.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200"
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedComplaint.id, "Resolved")}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedComplaint.status === "Resolved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900 dark:hover:text-green-200"
                        }`}
                      >
                        Resolved
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedComplaint.id, "Rejected")}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          selectedComplaint.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200"
                        }`}
                      >
                        Rejected
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Activity Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-500">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Complaint Received</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(selectedComplaint.createdAt)}
                          </p>
                        </div>
                      </div>

                      {selectedComplaint.updates &&
                        selectedComplaint.updates.map((update, index) => (
                          <div className="flex" key={index}>
                            <div className="flex flex-col items-center mr-4">
                              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-500">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              {index < selectedComplaint.updates.length - 1 && (
                                <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{update.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(update.date)}</p>
                              <p className="mt-1 text-gray-700 dark:text-gray-300">{update.message}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Complaint Selected</h3>
                  <p className="text-gray-500 dark:text-gray-400">Select a complaint from the list to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


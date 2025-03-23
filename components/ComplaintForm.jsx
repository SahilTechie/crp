"use client"

import { useState } from "react"
import { Upload, X, Check, AlertTriangle, Loader } from "lucide-react"

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    category: "",
    organization: "",
    description: "",
    attachments: [],
    url: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [complaintId, setComplaintId] = useState("")
  const [aiValidation, setAiValidation] = useState(null)
  const [validationStep, setValidationStep] = useState(null)

  const categories = [
    {
      id: "education",
      name: "📚 Education",
      organizations: ["School Board", "University Grants Commission", "Education Department"],
    },
    {
      id: "municipality",
      name: "🏙️ Municipal Services",
      organizations: ["City Council", "Municipal Corporation", "Town Planning"],
    },
    {
      id: "infrastructure",
      name: "🚧 Public Infrastructure",
      organizations: ["Public Works", "Highway Authority", "Urban Development"],
    },
    {
      id: "water",
      name: "🚰 Water Supply & Sanitation",
      organizations: ["Water Board", "Municipal Water Department", "Rural Water Supply"],
    },
    {
      id: "electricity",
      name: "💡 Electricity & Power Supply",
      organizations: ["Electricity Board", "Power Distribution Company", "Energy Department"],
    },
    {
      id: "police",
      name: "🚔 Police & Law Enforcement",
      organizations: ["Police Department", "Traffic Police", "Cyber Cell"],
    },
    {
      id: "traffic",
      name: "🚗 Traffic & Transport Issues",
      organizations: ["Traffic Department", "Public Transport Authority", "Road Safety"],
    },
    {
      id: "healthcare",
      name: "🏥 Healthcare Services",
      organizations: ["Public Hospital", "Health Department", "Medical Council"],
    },
    {
      id: "telecom",
      name: "📞 Telecom & Internet Issues",
      organizations: ["Telecom Regulatory Authority", "Internet Service Providers", "Mobile Network Operators"],
    },
    {
      id: "waste",
      name: "🧹 Garbage & Waste Management",
      organizations: ["Sanitation Department", "Waste Management Authority", "Recycling Centers"],
    },
    {
      id: "government",
      name: "🗳️ Government Schemes & Subsidies",
      organizations: ["Social Welfare Department", "Rural Development", "Urban Development"],
    },
    {
      id: "housing",
      name: "🏡 Housing & Property Issues",
      organizations: ["Housing Authority", "Real Estate Regulatory", "Urban Housing Department"],
    },
    {
      id: "environment",
      name: "🌳 Environmental Concerns",
      organizations: ["Environmental Protection Agency", "Pollution Control Board", "Forest Department"],
    },
    {
      id: "rights",
      name: "⚖️ Human Rights Violations",
      organizations: ["Human Rights Commission", "Legal Aid Services", "Civil Rights Organizations"],
    },
    {
      id: "cyber",
      name: "💬 Cybercrime & Online Harassment",
      organizations: ["Cyber Cell", "Digital Crime Unit", "IT Security Department"],
    },
    {
      id: "consumer",
      name: "📦 Consumer Grievances",
      organizations: ["Consumer Forum", "Consumer Protection Agency", "Trade Commission"],
    },
    {
      id: "corruption",
      name: "💰 Corruption & Fraud",
      organizations: ["Anti-Corruption Bureau", "Vigilance Department", "Ombudsman Office"],
    },
    {
      id: "gender",
      name: "👩‍🎓 Gender-Based Violence & Harassment",
      organizations: ["Women's Commission", "Gender Equality Cell", "Protection Officers"],
    },
    {
      id: "child",
      name: "🧒 Child Safety & Protection",
      organizations: ["Child Welfare Committee", "Child Protection Services", "Juvenile Justice Board"],
    },
    {
      id: "senior",
      name: "👴 Senior Citizen Issues",
      organizations: ["Elder Care Services", "Senior Citizen Welfare", "Retirement Homes Regulation"],
    },
    {
      id: "animal",
      name: "🐾 Animal Cruelty & Abuse",
      organizations: ["Animal Welfare Board", "SPCA", "Wildlife Protection Authority"],
    },
    {
      id: "stray",
      name: "🐶 Stray Animal Management",
      organizations: ["Municipal Animal Control", "Animal Welfare NGOs", "Veterinary Services"],
    },
    {
      id: "cattle",
      name: "🐮 Cattle Issues",
      organizations: ["Cattle Protection", "Dairy Department", "Animal Husbandry"],
    },
    {
      id: "wildlife",
      name: "🦅 Wildlife Protection & Illegal Poaching",
      organizations: ["Wildlife Department", "Forest Rangers", "Conservation NGOs"],
    },
    {
      id: "veterinary",
      name: "🏥 Veterinary Services & Animal Welfare",
      organizations: ["Veterinary Department", "Animal Hospitals", "Pet Care Services"],
    },
    {
      id: "trafficking",
      name: "🚫 Illegal Animal Trafficking",
      organizations: ["Wildlife Crime Control Bureau", "Forest Department", "Border Security"],
    },
    {
      id: "waste-animals",
      name: "♻️ Waste Disposal Impacting Animals",
      organizations: ["Environmental Protection", "Waste Management", "Wildlife Conservation"],
    },
    {
      id: "other",
      name: "📝 Other General Complaints",
      organizations: ["General Administration", "Public Grievance Cell", "Citizen Services"],
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }))
  }

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setAiValidation("processing")
    setValidationStep("text")

    // Simulate text validation
    setTimeout(() => {
      setValidationStep("media")

      // Simulate media validation
      setTimeout(() => {
        setValidationStep("doc")

        // Simulate document validation
        setTimeout(() => {
          setAiValidation("validated")

          // After validation, simulate submission
          setTimeout(() => {
            // Generate a random complaint ID
            const randomId = Math.random().toString(36).substring(2, 10).toUpperCase()
            setComplaintId(randomId)

            // Store in localStorage for tracking
            const complaints = JSON.parse(localStorage.getItem("complaints") || "[]")
            complaints.push({
              id: randomId,
              category: formData.category,
              organization: formData.organization,
              description: formData.description,
              status: "Pending",
              createdAt: new Date().toISOString(),
              expectedResolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              updates: [],
            })
            localStorage.setItem("complaints", JSON.stringify(complaints))

            setIsSubmitting(false)
            setIsSubmitted(true)
          }, 1500)
        }, 1000)
      }, 1500)
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      category: "",
      organization: "",
      description: "",
      attachments: [],
      url: "",
    })
    setIsSubmitted(false)
    setComplaintId("")
    setAiValidation(null)
    setValidationStep(null)
  }

  const selectedCategory = categories.find((c) => c.id === formData.category)

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
              {isSubmitted ? "Complaint Submitted Successfully!" : "File a Complaint"}
            </h2>

            {isSubmitted ? (
              <div className="text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                  Your complaint has been submitted successfully. Please save your complaint ID for tracking.
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-6">
                  <p className="text-xl font-mono font-bold text-center text-black dark:text-white">{complaintId}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                >
                  File Another Complaint
                </button>
              </div>
            ) : (
              <>
                {aiValidation === "processing" && (
                  <div className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4 text-center">
                      Complaint under AI scanning... Please wait while we validate your submission.
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className={`mr-3 ${validationStep === "text" ? "animate-spin" : ""}`}>
                          {validationStep === "text" ? (
                            <Loader className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                          ) : validationStep === "media" || validationStep === "doc" || aiValidation === "validated" ? (
                            <Check className="h-5 w-5 text-green-500 dark:text-green-300" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              validationStep === "text"
                                ? "text-blue-700 dark:text-blue-300"
                                : validationStep === "media" || validationStep === "doc" || aiValidation === "validated"
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            Validating text content
                          </p>
                          {validationStep === "text" && (
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              Analyzing for spam, offensive content, and duplicates...
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className={`mr-3 ${validationStep === "media" ? "animate-spin" : ""}`}>
                          {validationStep === "media" ? (
                            <Loader className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                          ) : validationStep === "doc" || aiValidation === "validated" ? (
                            <Check className="h-5 w-5 text-green-500 dark:text-green-300" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              validationStep === "media"
                                ? "text-blue-700 dark:text-blue-300"
                                : validationStep === "doc" || aiValidation === "validated"
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            Validating media content
                          </p>
                          {validationStep === "media" && (
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              Checking images/videos for inappropriate content...
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className={`mr-3 ${validationStep === "doc" ? "animate-spin" : ""}`}>
                          {validationStep === "doc" ? (
                            <Loader className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                          ) : aiValidation === "validated" ? (
                            <Check className="h-5 w-5 text-green-500 dark:text-green-300" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              validationStep === "doc"
                                ? "text-blue-700 dark:text-blue-300"
                                : aiValidation === "validated"
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            Verifying documents
                          </p>
                          {validationStep === "doc" && (
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              Verifying proof against complaint context...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {aiValidation === "validated" && (
                      <div className="mt-6 text-center">
                        <p className="text-green-700 dark:text-green-300 font-medium">
                          ✅ Your complaint has been successfully validated and is being forwarded to the concerned
                          authority.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Complaint Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCategory && (
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Organization *
                      </label>
                      <select
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">Select an organization</option>
                        {selectedCategory.organizations.map((org) => (
                          <option key={org} value={org}>
                            {org}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Complaint Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Please provide details about your complaint..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Attach Proof (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-yellow-600 dark:text-yellow-500 hover:text-yellow-500 dark:hover:text-yellow-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              onChange={handleFileChange}
                              accept="image/*, video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Images (JPEG/PNG), Videos (MP4/WebM), Documents (PDF/DOCX) up to 10MB
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <label
                        htmlFor="url-input"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Or provide a URL
                      </label>
                      <input
                        type="url"
                        id="url-input"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="https://example.com/evidence"
                      />
                    </div>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attached Files:</h4>
                      <ul className="space-y-2">
                        {formData.attachments.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md"
                          >
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Content Validation</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Our AI system will scan your complaint and attachments to ensure they are relevant and
                          appropriate. Any inappropriate content will be blurred and flagged for admin review.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      I confirm that the information provided is accurate and true to the best of my knowledge.
                    </label>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Submit Complaint"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


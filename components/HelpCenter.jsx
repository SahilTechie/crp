"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      id: 1,
      question: "How is my privacy protected when filing a complaint?",
      answer:
        "Your personal information is encrypted and only accessible to authorized personnel. We follow strict data protection protocols and never share your information with third parties without your consent. You can also choose to file complaints anonymously if you prefer.",
    },
    {
      id: 2,
      question: "What happens after I submit a complaint?",
      answer:
        "After submission, your complaint is analyzed by our AI system to determine the appropriate department. You'll receive a unique tracking ID to monitor progress. The relevant authority will review your complaint and take appropriate action. You'll receive updates at each stage of the process.",
    },
    {
      id: 3,
      question: "How long does it take to resolve a complaint?",
      answer:
        "Resolution times vary depending on the complexity and type of complaint. Simple issues may be resolved within 3-5 business days, while more complex matters might take 2-4 weeks. You can always check the current status and estimated resolution time using your tracking ID.",
    },
    {
      id: 4,
      question: "Can I submit evidence or documents with my complaint?",
      answer:
        "Yes, you can upload images, videos, documents, or provide links as evidence when filing your complaint. Supported formats include JPEG, PNG, MP4, PDF, and DOCX. Each file should be under 10MB in size.",
    },
    {
      id: 5,
      question: "What if I'm not satisfied with the resolution?",
      answer:
        'If you\'re not satisfied with the resolution, you can request an appeal through the tracking system. Click on "Appeal Decision" in your complaint details page, provide your reasons, and submit. A senior official will review your case and respond within 7 business days.',
    },
    {
      id: 6,
      question: "Is there a limit to how many complaints I can file?",
      answer:
        "There's no strict limit, but we monitor for patterns of misuse. Our AI system helps identify duplicate or frivolous complaints. We encourage you to file legitimate complaints whenever necessary.",
    },
    {
      id: 7,
      question: "How does the AI determine which department handles my complaint?",
      answer:
        "Our AI analyzes the content, category, and keywords in your complaint to route it to the most appropriate department. It's trained on thousands of previous cases to ensure accurate assignment. If misrouted, administrators can manually reassign complaints to the correct department.",
    },
    {
      id: 8,
      question: "Can I update my complaint after submission?",
      answer:
        'Yes, you can add additional information or evidence to your complaint after submission. Use your tracking ID to access your complaint, then click "Add Information" to provide updates. However, you cannot change the original category or core details once submitted.',
    },
  ]

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center text-black dark:text-white">Help Center</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Find answers to frequently asked questions about our complaint system
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 dark:text-gray-100"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No FAQs found matching your search. Try different keywords.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Still need help?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you couldn't find the answer you were looking for, please contact our support team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Email Support</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Send us an email and we'll respond within 24 hours.
                </p>
                <a
                  href="mailto:support@grievanceai.com"
                  className="text-yellow-600 dark:text-yellow-400 hover:underline"
                >
                  support@grievanceai.com
                </a>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Phone Support</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Available Monday to Friday, 9am to 5pm.</p>
                <a href="tel:+1234567890" className="text-yellow-600 dark:text-yellow-400 hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


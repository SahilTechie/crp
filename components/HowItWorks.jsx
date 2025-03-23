import { FileText, Brain, UserCheck, Search } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-10 w-10 text-yellow-500" />,
      title: "File Complaint",
      description: "Easy submission with guided instructions. Submit your grievance with supporting evidence.",
    },
    {
      icon: <Brain className="h-10 w-10 text-yellow-500" />,
      title: "AI Validation",
      description: "Our AI checks and filters complaints, ensuring they are meaningful and appropriate.",
    },
    {
      icon: <UserCheck className="h-10 w-10 text-yellow-500" />,
      title: "Auto-Assign Admin",
      description: "Relevant authority is notified automatically based on the complaint category.",
    },
    {
      icon: <Search className="h-10 w-10 text-yellow-500" />,
      title: "Track & Resolve",
      description: "Get real-time updates on your complaint status until resolution.",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">How It Works</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Our AI-powered platform simplifies the complaint process from submission to resolution
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


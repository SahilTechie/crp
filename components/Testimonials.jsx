import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      quote:
        "The complaint submission process was so easy, and I was surprised by the quick resolution. I feel heard and valued.",
      author: "Aarti P.",
    },
    {
      rating: 5,
      quote:
        "CivicAI ensured my safety concerns reached the right authorities. Their AI validation system is truly impressive!",
      author: "Rohan K.",
    },
    {
      rating: 5,
      quote:
        "I submitted a complaint about waste management in my locality. The platform kept me updated, and my issue was resolved.",
      author: "Sneha M.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center text-black dark:text-white">
          Transforming Complaints into Solutions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Real stories from our users who found their voice through our platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-gray-900 dark:text-gray-100 font-medium">– {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


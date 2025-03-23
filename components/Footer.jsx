import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 pt-12 pb-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">CivicAI</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              An AI-powered grievance management system designed to ensure every complaint gets the attention it
              deserves.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
                >
                  File Complaint
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
                >
                  Track Complaint
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <a
                  href="mailto:support@civicai.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
                >
                  support@civicai.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
                >
                  +91-XXXXXXXXXX
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">CivicAI HQ, Hyderabad</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">© 2025 CivicAI. All rights reserved.</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500 text-sm"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


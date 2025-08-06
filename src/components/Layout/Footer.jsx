import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, FileText } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">Campus Resolve Portal</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students and staff with a transparent, efficient grievance redressal system. 
              Your voice matters, and we're here to listen and resolve.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@campusresolve.edu</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">123 University Ave, College City, ST 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <div className="space-y-2">
              {[
                'FAQ',
                'Privacy Policy',
                'Terms of Service',
                'About Us',
                'Help Center',
                'Academic Calendar'
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Stay Connected</h3>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 mb-6">
              {[
                { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
                { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400' },
                { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
                { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' }
              ].map(({ icon: Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  className={`p-2 bg-gray-800 rounded-full text-gray-300 ${color} transition-all duration-200 hover:bg-gray-700 hover:scale-110 transform`}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div>
              <p className="text-sm text-gray-300 mb-3">Subscribe for updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md text-sm font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 Campus Resolve Portal. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🔒 Secure & Confidential</span>
              <span>📞 24/7 Support</span>
              <span>✓ ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 
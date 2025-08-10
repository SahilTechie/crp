import React from 'react';
import { Shield, Users, Clock, Award, CheckCircle, ArrowLeft } from 'lucide-react';

export const AboutPage = ({ onBack }) => {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'JWT authentication, bcrypt password hashing, and SSL/TLS encryption ensure your data is always protected.',
      details: ['256-bit SSL encryption', 'JWT token-based auth', 'Bcrypt password hashing', 'Rate limiting protection']
    },
    {
      icon: Users,
      title: 'Role-Based Access Control',
      description: 'Sophisticated permission system with separate interfaces for students, staff, and administrators.',
      details: ['Student/Staff portals', 'Admin dashboard', 'Secure role validation', 'Unauthorized access prevention']
    },
    {
      icon: Clock,
      title: 'Real-Time Tracking',
      description: 'Monitor complaint status with instant notifications and comprehensive progress tracking.',
      details: ['Live status updates', 'Email notifications', 'Progress timeline', 'Resolution tracking']
    },
    {
      icon: Award,
      title: 'AI-Powered Intelligence',
      description: 'Advanced spam detection and automatic prioritization using machine learning algorithms.',
      details: ['Spam filtering', 'Auto-prioritization', 'Category tagging', 'Sentiment analysis']
    }
  ];

  const stats = [
    { label: 'Security Compliance', value: '100%', description: 'ISO 27001 certified security standards' },
    { label: 'Uptime Guarantee', value: '99.9%', description: 'Reliable service availability' },
    { label: 'Data Encryption', value: '256-bit', description: 'Military-grade encryption' },
    { label: 'Response Time', value: '<2s', description: 'Lightning-fast performance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Campus Resolve Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive, secure, and intelligent grievance redressal system designed 
              specifically for educational institutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To create a transparent, efficient, and secure platform that empowers students and staff 
              to voice their concerns while providing administrators with the tools they need to resolve 
              issues quickly and effectively. We believe every voice matters and every concern deserves 
              proper attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 rounded-lg p-6 mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-900">{stat.label}</div>
                </div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built with Security & Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every feature is designed with security, usability, and efficiency in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white bg-opacity-10 rounded-full p-4 w-fit mx-auto mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Security is Our Priority
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We implement industry-leading security practices to ensure your data is always protected. 
            From encrypted communications to secure authentication, every aspect of our system is 
            designed with security in mind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Data Encryption</h3>
              <p className="text-blue-100 text-sm">
                All data is encrypted both in transit and at rest using AES-256 encryption standards.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Secure Authentication</h3>
              <p className="text-blue-100 text-sm">
                JWT-based authentication with bcrypt password hashing and rate limiting protection.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Privacy Protection</h3>
              <p className="text-blue-100 text-sm">
                Anonymous complaint options and strict data access controls protect user privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technologies to deliver a fast, reliable, and scalable solution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'JWT',
              'Socket.io', 'Python', 'Machine Learning', 'AWS', 'Docker', 'SSL/TLS'
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-2 hover:bg-blue-50 transition-colors duration-200">
                  <div className="text-sm font-medium text-gray-900">{tech}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of educational institutions that trust Campus Resolve Portal 
            for their grievance management needs.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}; 
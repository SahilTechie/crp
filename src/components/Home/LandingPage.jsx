import React from 'react';
import { Shield, Clock, Bell, BarChart3, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';

export const LandingPage = ({ onGetStarted, onLearnMore }) => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your complaints are handled with utmost confidentiality and security.',
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your complaint status in real-time with instant notifications.',
      color: 'bg-green-500'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get notified via email and in-app when your complaint status changes.',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics help administrators resolve issues efficiently.',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { label: 'Complaints Resolved', value: '2,450+', icon: CheckCircle },
    { label: 'Active Users', value: '1,200+', icon: Users },
    { label: 'Average Resolution Time', value: '3.2 days', icon: Clock },
    { label: 'Satisfaction Rate', value: '94%', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Campus Resolve
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                Portal
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your voice matters. Submit, track, and resolve grievances with our intelligent, 
              transparent, and efficient complaint management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={onLearnMore}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-200 rounded-full opacity-50 animate-pulse delay-2000"></div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Campus Resolve Portal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for the modern campus community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`${feature.color} p-3 rounded-lg w-fit mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Our Community
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Numbers that speak for our commitment to excellence and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white bg-opacity-10 p-4 rounded-full w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and efficient complaint resolution process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Complaint',
                description: 'Fill out the form with your grievance details. Choose to submit anonymously if preferred.',
                color: 'bg-blue-500'
              },
              {
                step: '02',
                title: 'Track Progress',
                description: 'Monitor your complaint status in real-time through your personalized dashboard.',
                color: 'bg-green-500'
              },
              {
                step: '03',
                title: 'Resolution',
                description: 'Receive updates and final resolution with detailed explanation and next steps.',
                color: 'bg-purple-500'
              }
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 h-full">
                  <div className={`${process.color} text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-6`}>
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{process.description}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students and staff who trust Campus Resolve Portal 
            for fair and transparent grievance resolution.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
}; 
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Shield, Sparkles, Quote } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [localError, setLocalError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const { login, register, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (attemptCount >= 5) {
      setIsBlocked(true);
      setLocalError('Too many failed attempts. Please refresh the page and try again.');
      return;
    }

    try {
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error('Name is required');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      setAttemptCount(0);
    } catch (err) {
      setAttemptCount(prev => prev + 1);
      setLocalError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  const displayError = error || localError;

  const inspirationalQuotes = [
    "Your voice matters. Every concern deserves to be heard.",
    "Together, we build a better campus community.",
    "Transparency and trust - the foundation of progress.",
    "Every complaint is a step towards improvement.",
    "Empowering students, one resolution at a time."
  ];

  const [currentQuote] = useState(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-green-200 rounded-full opacity-25 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-pink-200 rounded-full opacity-15 animate-pulse delay-1500"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 animate-float">
          <Shield className="h-8 w-8 text-blue-300 opacity-40" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float delay-1000">
          <Sparkles className="h-6 w-6 text-purple-300 opacity-40" />
        </div>
        <div className="absolute top-1/3 right-12 animate-float delay-2000">
          <User className="h-7 w-7 text-green-300 opacity-40" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header with Animation */}
        <div className="text-center animate-fade-in">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <User className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isSignUp ? 'Join Our Community' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isSignUp 
              ? 'Create your account to start making a difference'
              : 'Sign in to continue your journey with us'
            }
          </p>
          
          {/* Inspirational Quote */}
          <div className="flex items-center justify-center space-x-2 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <Quote className="h-5 w-5 text-blue-600 animate-pulse" />
            <p className="text-sm text-blue-800 font-medium italic">"{currentQuote}"</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm bg-opacity-95 animate-slide-up">
          {/* Security Notice */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-fade-in delay-500">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h4 className="text-sm font-semibold text-green-800">🔒 Bank-Level Security</h4>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-green-700">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>JWT Auth</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Rate Limited</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="animate-slide-down">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                    placeholder="Enter your full name"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div className="animate-fade-in delay-200">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="animate-fade-in delay-400">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {displayError && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 animate-shake">
                <AlertCircle className="h-5 w-5" />
                <div className="text-sm">
                  <span>{displayError}</span>
                  {attemptCount > 0 && !isBlocked && (
                    <div className="text-xs text-red-500 mt-1">
                      Attempts remaining: {5 - attemptCount}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isBlocked}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl animate-fade-in delay-600"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing {isSignUp ? 'Up' : 'In'}...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>{isBlocked ? 'Blocked - Refresh Page' : `Sign ${isSignUp ? 'Up' : 'In'}`}</span>
                  {!isBlocked && <Sparkles className="h-4 w-4" />}
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center animate-fade-in delay-800">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
            >
              {isSignUp 
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 animate-fade-in delay-1000">
          <p className="flex items-center justify-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Secured with 256-bit SSL encryption • By continuing, you agree to our Terms of Service and Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}; 
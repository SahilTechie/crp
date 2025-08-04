import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { LandingPage } from './components/Home/LandingPage';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { ComplaintForm } from './components/Complaints/ComplaintForm';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-2">Loading Campus Resolve Portal...</p>
            <div className="flex items-center justify-center space-x-1 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure connection established</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onGetStarted={() => setCurrentPage(user.role === 'admin' ? 'admin-dashboard' : 'dashboard')}
            onLearnMore={() => setCurrentPage('about')}
          />
        );
      case 'about':
        return <AboutPage onBack={() => setCurrentPage('home')} />;
      case 'dashboard':
        return <UserDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'complaints':
        return <AdminDashboard />;
      case 'submit':
        return (
          <div className="max-w-4xl mx-auto">
            <ComplaintForm onSubmit={() => setCurrentPage('dashboard')} />
          </div>
        );
      default:
        return (
          <LandingPage 
            onGetStarted={() => setCurrentPage(user.role === 'admin' ? 'admin-dashboard' : 'dashboard')}
            onLearnMore={() => setCurrentPage('about')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {currentPage !== 'about' && (
        <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      )}
      
      <main className="flex-1">
        {currentPage === 'home' || currentPage === 'about' ? (
          renderPage()
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderPage()}
          </div>
        )}
      </main>
      
      {currentPage !== 'about' && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Clock, CheckCircle, AlertCircle, XCircle, Bell, Shield, TrendingUp } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import { ComplaintCard } from './ComplaintCard';
import { AnalyticsCard } from './AnalyticsCard';

export const UserDashboard: React.FC = () => {
  const { complaints, isLoading } = useComplaints();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter complaints for current user
  const userComplaints = complaints.filter(complaint => 
    complaint.submittedBy === user?.email || 
    (complaint.isAnonymous && complaint.submittedBy === 'anonymous')
  );

  const filteredComplaints = userComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      underReview: userComplaints.filter(c => c.status === 'under-review').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length,
      rejected: userComplaints.filter(c => c.status === 'rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your complaints and stay updated on their progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <Shield className="w-3 h-3" />
            <span>Secure Connection</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <Bell className="w-3 h-3" />
            <span>Real-time Updates</span>
          </div>
        </div>
      </div>

      {/* Welcome Message for New Users */}
      {userComplaints.length === 0 && !isLoading && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8">
          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Welcome to Campus Resolve Portal</h2>
            <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
              You haven't submitted any complaints yet. Our secure platform is ready to help you voice your concerns 
              and track their resolution in real-time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-900">Secure & Confidential</div>
                <div className="text-blue-700">Your data is encrypted and protected</div>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-900">Real-time Tracking</div>
                <div className="text-blue-700">Monitor progress instantly</div>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-4">
                <Bell className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-900">Instant Notifications</div>
                <div className="text-blue-700">Get updates via email and app</div>
              </div>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Plus className="h-5 w-5 inline mr-2" />
              Submit Your First Complaint
            </button>
          </div>
        </div>
      )}

      {/* Statistics Cards - Only show if user has complaints */}
      {userComplaints.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Total Complaints"
            value={statusCounts.total}
            icon={<FileText className="h-6 w-6" />}
            color="blue"
          />
          <AnalyticsCard
            title="In Progress"
            value={statusCounts.pending + statusCounts.underReview}
            icon={<Clock className="h-6 w-6" />}
            color="yellow"
          />
          <AnalyticsCard
            title="Resolved"
            value={statusCounts.resolved}
            icon={<CheckCircle className="h-6 w-6" />}
            color="green"
          />
          <AnalyticsCard
            title="Resolution Rate"
            value={statusCounts.total > 0 ? `${Math.round((statusCounts.resolved / statusCounts.total) * 100)}%` : '0%'}
            icon={<TrendingUp className="h-6 w-6" />}
            color="purple"
          />
        </div>
      )}

      {/* Search and Filter - Only show if user has complaints */}
      {userComplaints.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under-review">Under Review</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity - Only show if user has complaints */}
      {userComplaints.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {userComplaints
              .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
              .slice(0, 3)
              .map(complaint => (
                <div key={complaint.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    complaint.status === 'resolved' ? 'bg-green-100' :
                    complaint.status === 'under-review' ? 'bg-blue-100' :
                    complaint.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {complaint.status === 'resolved' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                     complaint.status === 'under-review' ? <AlertCircle className="h-4 w-4 text-blue-600" /> :
                     complaint.status === 'rejected' ? <XCircle className="h-4 w-4 text-red-600" /> :
                     <Clock className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                    <div className="text-xs text-gray-500">
                      {complaint.status === 'resolved' ? 'Resolved' :
                       complaint.status === 'under-review' ? 'Under Review' :
                       complaint.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                      {' • '}
                      {new Date(complaint.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Complaints List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your complaints...</p>
              <div className="flex items-center justify-center space-x-1 text-xs text-green-600 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure connection established</span>
              </div>
            </div>
          </div>
        ) : userComplaints.length > 0 ? (
          filteredComplaints.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredComplaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12">
              <div className="text-center">
                <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No complaints match your search</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filter settings to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )
        ) : null}
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">Your Data is Secure</p>
            <p>
              All your complaints are encrypted and stored securely. Only authorized personnel can access 
              your information, and anonymous complaints remain completely confidential. We use industry-standard 
              security measures including JWT authentication, bcrypt password hashing, and SSL/TLS encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
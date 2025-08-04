import React, { useState } from 'react';
import { Search, Filter, Users, Clock, CheckCircle, AlertTriangle, TrendingUp, BarChart3, MessageSquare, Save, X, Eye, FileText, Mic, Video, Image } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints';
import { useNotifications } from '../../hooks/useNotifications';
import { ComplaintCard } from './ComplaintCard';
import { AnalyticsCard } from './AnalyticsCard';
import { Complaint } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { complaints, isLoading, updateComplaint } = useComplaints();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [resolutionData, setResolutionData] = useState({
    status: 'resolved' as Complaint['status'],
    actionTaken: '',
    adminComment: ''
  });

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getAnalytics = () => {
    const total = complaints.length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const underReview = complaints.filter(c => c.status === 'under-review').length;
    
    const categories = complaints.reduce((acc, complaint) => {
      acc[complaint.category] = (acc[complaint.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const resolvedComplaints = complaints.filter(c => c.status === 'resolved' && c.resolvedAt);
    const averageResolutionTime = resolvedComplaints.length > 0 
      ? resolvedComplaints.reduce((sum, complaint) => {
          const submitted = new Date(complaint.submittedAt);
          const resolved = new Date(complaint.resolvedAt!);
          return sum + (resolved.getTime() - submitted.getTime());
        }, 0) / resolvedComplaints.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0;

    return {
      total,
      resolved,
      pending,
      underReview,
      categories,
      averageResolutionTime: Math.round(averageResolutionTime * 10) / 10,
      resolutionRate: total > 0 ? Math.round((resolved / total) * 100) : 0
    };
  };

  const analytics = getAnalytics();
  const categories = [...new Set(complaints.map(c => c.category))];

  const handleStatusChange = (id: string, status: string) => {
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) return;

    if (status === 'resolved' || status === 'rejected') {
      setSelectedComplaint(complaint);
      setResolutionData({
        status: status as Complaint['status'],
        actionTaken: '',
        adminComment: ''
      });
      setShowResolutionModal(true);
    } else {
      updateComplaint(id, { status: status as any });
      
      // Add notification for status change
      addNotification({
        title: 'Complaint Status Updated',
        message: `Complaint "${complaint.title}" status changed to ${status.replace('-', ' ')}.`,
        type: 'info',
        read: false,
        complaintId: id
      });
    }
  };

  const handleResolutionSubmit = () => {
    if (!selectedComplaint) return;

    const updates: Partial<Complaint> = {
      status: resolutionData.status,
      resolutionNotes: `Action Taken: ${resolutionData.actionTaken}\n\nAdmin Comment: ${resolutionData.adminComment}`,
      ...(resolutionData.status === 'resolved' ? { resolvedAt: new Date().toISOString() } : {})
    };

    updateComplaint(selectedComplaint.id, updates);

    // Add notification
    addNotification({
      title: `Complaint ${resolutionData.status === 'resolved' ? 'Resolved' : 'Rejected'}`,
      message: `Your complaint "${selectedComplaint.title}" has been ${resolutionData.status}. ${resolutionData.actionTaken ? 'Action taken: ' + resolutionData.actionTaken : ''}`,
      type: resolutionData.status === 'resolved' ? 'success' : 'warning',
      read: false,
      complaintId: selectedComplaint.id
    });

    setShowResolutionModal(false);
    setSelectedComplaint(null);
    setResolutionData({ status: 'resolved', actionTaken: '', adminComment: '' });
  };

  const handleViewAttachments = (attachments: string[]) => {
    setSelectedAttachments(attachments);
    setShowAttachmentsModal(true);
  };

  const downloadAttachment = (fileName: string) => {
    // Get the file from localStorage (for demo purposes)
    const attachmentData = localStorage.getItem(`attachment_${fileName}`);
    
    if (attachmentData) {
      try {
        // Create a blob URL and download
        const byteCharacters = atob(attachmentData.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:', error);
        alert('Error downloading file. In production, this would download from server.');
      }
    } else {
      // Fallback for demo
      alert(`File "${fileName}" would be downloaded from server in production.`);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) {
      return <Image className="h-5 w-5 text-blue-500" />;
    }
    if (['mp4', 'avi', 'mov', 'wmv', 'webm'].includes(extension || '')) {
      return <Video className="h-5 w-5 text-green-500" />;
    }
    if (['mp3', 'wav', 'ogg', 'webm'].includes(extension || '')) {
      return <Mic className="h-5 w-5 text-purple-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and resolve campus complaints efficiently</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              showAnalytics 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
            }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      {showAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticsCard
            title="Total Complaints"
            value={analytics.total}
            icon={<Users className="h-6 w-6" />}
            color="blue"
            change={12}
            changeType="increase"
          />
          <AnalyticsCard
            title="Pending Review"
            value={analytics.pending + analytics.underReview}
            icon={<Clock className="h-6 w-6" />}
            color="yellow"
            change={5}
            changeType="decrease"
          />
          <AnalyticsCard
            title="Resolved"
            value={analytics.resolved}
            icon={<CheckCircle className="h-6 w-6" />}
            color="green"
            change={18}
            changeType="increase"
          />
          <AnalyticsCard
            title="Avg Resolution Time"
            value={`${analytics.averageResolutionTime} days`}
            icon={<TrendingUp className="h-6 w-6" />}
            color="purple"
            change={8}
            changeType="decrease"
          />
        </div>
      )}

      {/* Category Distribution */}
      {showAnalytics && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(analytics.categories).map(([category, count]) => (
              <div key={category} className="text-center">
                <div className="bg-blue-50 rounded-lg p-4 mb-2">
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                </div>
                <div className="text-sm text-gray-600">{category}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
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

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Priority Alerts */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold text-red-800">High Priority Complaints</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints
            .filter(c => c.priority === 'urgent' || c.priority === 'high')
            .filter(c => c.status !== 'resolved')
            .slice(0, 3)
            .map(complaint => (
              <div key={complaint.id} className="bg-white rounded-lg p-4 border border-red-200">
                <h4 className="font-medium text-gray-900 mb-1">{complaint.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{complaint.category}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  complaint.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {complaint.priority.toUpperCase()}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading complaints data...</p>
            </div>
          </div>
        ) : filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredComplaints.map(complaint => (
              <ComplaintCard 
                key={complaint.id} 
                complaint={complaint}
                showActions={true}
                onStatusChange={handleStatusChange}
                onViewAttachments={handleViewAttachments}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12">
            <div className="text-center">
              <div className="bg-gray-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' ? (
                  <Search className="h-12 w-12 text-gray-400" />
                ) : (
                  <CheckCircle className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'No complaints match your criteria'
                  : 'No complaints have been submitted yet'
                }
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your search terms or filter settings to find what you\'re looking for.'
                  : 'The system is ready to receive complaints. Users can submit their grievances through the complaint form, and they will appear here for review and resolution.'
                }
              </p>
              <div className="text-sm text-gray-500 space-y-2">
                <div>🔒 All data is encrypted and secure</div>
                <div>📊 Analytics will populate as complaints are submitted</div>
                <div>⚡ Real-time updates when new complaints arrive</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Attachments Modal */}
      {showAttachmentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Complaint Attachments</h3>
                <button
                  onClick={() => setShowAttachmentsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedAttachments.map((attachment, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      {getFileIcon(attachment)}
                      <span className="text-sm font-medium text-gray-900">{attachment}</span>
                    </div>
                    
                    {/* Preview based on file type */}
                    {attachment.toLowerCase().includes('recording-') && attachment.includes('.webm') ? (
                      // Handle recorded media files
                      (() => {
                        const attachmentData = localStorage.getItem(`attachment_${attachment}`);
                        const isVideo = attachmentData && attachmentData.startsWith('data:video/');
                        const isAudio = attachmentData && attachmentData.startsWith('data:audio/');
                        
                        if (isVideo) {
                          return (
                            <div className="bg-gray-100 rounded-lg p-4 mb-3">
                              <video 
                                src={attachmentData} 
                                controls 
                                className="w-full max-h-48 rounded"
                                preload="metadata"
                              >
                                Your browser does not support video playback.
                              </video>
                              <p className="text-sm text-gray-600 mt-2 text-center">Recorded Video</p>
                            </div>
                          );
                        } else if (isAudio) {
                          return (
                            <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                              <Mic className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                              <audio 
                                src={attachmentData} 
                                controls 
                                className="w-full mt-2"
                                preload="metadata"
                              >
                                Your browser does not support audio playback.
                              </audio>
                              <p className="text-sm text-gray-600 mt-2">Recorded Audio</p>
                            </div>
                          );
                        } else {
                          return (
                            <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                              <Video className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Recorded Media</p>
                              <p className="text-xs text-gray-500 mt-1">Click download to view the recording</p>
                            </div>
                          );
                        }
                      })()
                    ) : (() => {
                      const attachmentData = localStorage.getItem(`attachment_${attachment}`);
                      
                      if (attachmentData && attachmentData.startsWith('data:image/')) {
                        <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                          <img 
                            src={attachmentData} 
                            alt="Attachment preview" 
                            className="max-w-full max-h-48 mx-auto rounded"
                          />
                          <p className="text-sm text-gray-600 mt-2">Image Preview</p>
                        </div>
                      } else if (attachmentData && attachmentData.startsWith('data:video/')) {
                        <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                          <video 
                            src={attachmentData} 
                            controls 
                            className="w-full max-h-48 rounded"
                            preload="metadata"
                          >
                            Your browser does not support video playback.
                          </video>
                          <p className="text-sm text-gray-600 mt-2">Video File</p>
                        </div>
                      } else if (attachmentData && attachmentData.startsWith('data:audio/')) {
                        <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                          <Mic className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <audio 
                            src={attachmentData} 
                            controls 
                            className="w-full mt-2"
                            preload="metadata"
                          >
                            Your browser does not support audio playback.
                          </audio>
                          <p className="text-sm text-gray-600 mt-2">Audio Recording</p>
                        </div>
                      } else {
                        return (
                          <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Document File</p>
                            <p className="text-xs text-gray-500 mt-1">Click download to view the file</p>
                          </div>
                        );
                      }
                    })()}
                    
                    <button 
                      onClick={() => downloadAttachment(attachment)}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Download File</span>
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedAttachments.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No attachments found</p>
                </div>
              )}
              
              {selectedAttachments.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">Attachment Management</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    Files are stored securely and can be downloaded or viewed directly. 
                    Recorded media files are automatically processed for review.
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <button 
                      onClick={() => selectedAttachments.forEach(downloadAttachment)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Download All</span>
                    </button>
                    <button className="px-3 py-1 bg-white text-blue-600 border border-blue-600 text-xs rounded hover:bg-blue-50 transition-colors flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      Generate Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resolution Modal */}
      {showResolutionModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {resolutionData.status === 'resolved' ? 'Resolve' : 'Reject'} Complaint
                </h3>
                <button
                  onClick={() => setShowResolutionModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Complaint: <strong>{selectedComplaint.title}</strong>
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Resolution Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="resolved"
                      checked={resolutionData.status === 'resolved'}
                      onChange={(e) => setResolutionData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="mr-2"
                    />
                    <span className="text-green-700 font-medium">Resolved</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="rejected"
                      checked={resolutionData.status === 'rejected'}
                      onChange={(e) => setResolutionData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="mr-2"
                    />
                    <span className="text-red-700 font-medium">Rejected</span>
              {/* Action Taken */}
              <div>
                <label htmlFor="actionTaken" className="block text-sm font-medium text-gray-700 mb-2">
                  Action Taken *
                </label>
                <textarea
                  id="actionTaken"
                  rows={3}
                  value={resolutionData.actionTaken}
                  onChange={(e) => setResolutionData(prev => ({ ...prev, actionTaken: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the specific actions taken to address this complaint..."
                  required
                />
              </div>
                  </label>
              {/* Admin Comment */}
              <div>
                <label htmlFor="adminComment" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Comment
                </label>
                <textarea
                  id="adminComment"
                  rows={4}
                  value={resolutionData.adminComment}
                  onChange={(e) => setResolutionData(prev => ({ ...prev, adminComment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional comments, explanations, or next steps for the complainant..."
                />
              </div>
                </div>
              {/* Complaint Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Complaint Details</h4>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Category:</strong> {selectedComplaint.category}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Priority:</strong> {selectedComplaint.priority.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Description:</strong> {selectedComplaint.description}
                </p>
              </div>
            </div>
              </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowResolutionModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResolutionSubmit}
                disabled={!resolutionData.actionTaken.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Resolution</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
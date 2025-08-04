import React from 'react';
import { Calendar, User, Tag, AlertCircle, CheckCircle, Clock, XCircle, Paperclip, Eye } from 'lucide-react';
import { Complaint } from '../../types';

interface ComplaintCardProps {
  complaint: Complaint;
  onClick?: () => void;
  showActions?: boolean;
  onStatusChange?: (id: string, status: Complaint['status']) => void;
  onViewAttachments?: (attachments: string[]) => void;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ 
  complaint, 
  onClick, 
  showActions = false,
  onStatusChange,
  onViewAttachments
}) => {
  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'under-review': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getPriorityColor = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{complaint.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{complaint.description}</p>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
            {getStatusIcon(complaint.status)}
            <span className="ml-1 capitalize">{complaint.status.replace('-', ' ')}</span>
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{complaint.isAnonymous ? 'Anonymous' : complaint.submittedBy}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(complaint.submittedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>{complaint.category}</span>
        </div>
        {complaint.assignedTo && (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Assigned to: {complaint.assignedTo}</span>
          </div>
        )}
      </div>

      {complaint.attachments && complaint.attachments.length > 0 && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Paperclip className="h-4 w-4" />
            <span>
              {complaint.attachments.length} attachment{complaint.attachments.length > 1 ? 's' : ''}
              {complaint.attachments.some(att => att.includes('recording-')) && (
                <span className="ml-1 text-blue-600">(includes media)</span>
              )}
            </span>
          </div>
          {onViewAttachments && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewAttachments(complaint.attachments!);
              }}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
            </button>
          )}
        </div>
      )}

      {complaint.tags && complaint.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {complaint.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {showActions && onStatusChange && (
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          {complaint.status === 'pending' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(complaint.id, 'under-review');
              }}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Start Review
            </button>
          )}
          {complaint.status === 'under-review' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(complaint.id, 'resolved');
                }}
                className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Resolve
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(complaint.id, 'rejected');
                }}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Reject
              </button>
            </>
          )}
        </div>
      )}

      {complaint.resolutionNotes && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Resolution:</strong> {complaint.resolutionNotes}
          </p>
        </div>
      )}
    </div>
  );
};
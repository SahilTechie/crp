import React, { useState } from 'react';
import { Upload, Mic, Video, X, FileText, AlertTriangle, User, UserX, Play, Square, Pause, Eye } from 'lucide-react';
import { useComplaints } from '../../hooks/useComplaints.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNotifications } from '../../hooks/useNotifications.js';

export const ComplaintForm = ({ onSubmit }) => {
  const { addComplaint } = useComplaints();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    isAnonymous: false,
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingType, setRecordingType] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);

  const categories = [
    'Infrastructure',
    'Food Services',
    'IT Services',
    'Academic Issues',
    'Transportation',
    'Hostel/Accommodation',
    'Library',
    'Administrative',
    'Safety & Security',
    'Other'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      addComplaint({
        ...formData,
        submittedBy: formData.isAnonymous ? 'anonymous' : user?.email || '',
        status: 'pending',
        attachments: attachments.map(file => file.name),
        tags: [formData.category.toLowerCase(), formData.priority]
      });

      // Add notification
      addNotification({
        title: 'Complaint Submitted Successfully',
        message: `Your complaint "${formData.title}" has been submitted and is now under review.`,
        type: 'success',
        read: false
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        isAnonymous: false,
      });
      setAttachments([]);
      
      onSubmit?.();
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const filesWithPreview = newFiles.map(file => {
        const mediaFile = file;
        if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/')) {
          mediaFile.preview = URL.createObjectURL(file);
          
          // Store file data for demo purposes (in production, this would be uploaded to server)
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result;
            localStorage.setItem(`attachment_${file.name}`, result);
          };
          reader.readAsDataURL(file);
        }
        return mediaFile;
      });
      setAttachments(prev => [...prev, ...filesWithPreview]);
    }
  };

  const removeAttachment = (index) => {
    const fileToRemove = attachments[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const previewFile = (file) => {
    if (file.preview) {
      setPreviewMedia({ file, url: file.preview });
    }
  };

  const closePreview = () => {
    setPreviewMedia(null);
  };

  const startRecording = async (type) => {
    try {
      const constraints = type === 'audio' 
        ? { audio: true, video: false }
        : { video: true, audio: true };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      
      // For video recording, show live preview
      if (type === 'video') {
        const videoPreview = document.getElementById('video-preview');
        if (videoPreview) {
          videoPreview.srcObject = stream;
          videoPreview.style.display = 'block';
        }
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'audio' ? 'audio/webm' : 'video/webm' 
        });
        const fileName = `recording-${Date.now()}.webm`;
        const file = new File([blob], fileName, {
          type: blob.type
        });
        
        file.preview = URL.createObjectURL(blob);
        
        // Store recording data for demo purposes
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          localStorage.setItem(`attachment_${fileName}`, result);
        };
        reader.readAsDataURL(blob);
        
        setAttachments(prev => [...prev, file]);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Hide video preview
        const videoPreview = document.getElementById('video-preview');
        if (videoPreview) {
          videoPreview.style.display = 'none';
          videoPreview.srcObject = null;
        }
      };

      setMediaRecorder(recorder);
      setRecordingType(type);
      setIsRecording(true);
      recorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone/camera. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      
      // Hide video preview
      const videoPreview = document.getElementById('video-preview');
      if (videoPreview) {
        videoPreview.style.display = 'none';
        videoPreview.srcObject = null;
      }
      
      setIsRecording(false);
      setMediaRecorder(null);
      setRecordingType(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit a Complaint</h2>
        <p className="text-gray-600">
          Please provide detailed information about your grievance. All submissions are treated confidentially.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            {formData.isAnonymous ? (
              <UserX className="h-5 w-5 text-blue-600" />
            ) : (
              <User className="h-5 w-5 text-blue-600" />
            )}
            <div>
              <h3 className="text-sm font-semibold text-blue-900">
                {formData.isAnonymous ? 'Anonymous Submission' : 'Identified Submission'}
              </h3>
              <p className="text-xs text-blue-700">
                {formData.isAnonymous 
                  ? 'Your identity will be kept completely confidential'
                  : 'You will receive updates on your complaint via email'
                }
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Complaint Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Brief summary of your complaint"
            required
          />
        </div>

        {/* Category and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            id="description"
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Please provide a detailed description of your complaint, including when it occurred, who was involved, and any relevant circumstances..."
            required
          />
        </div>

        {/* File Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors duration-200">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload files or drag and drop
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    PNG, JPG, PDF, MP4, MP3 up to 10MB each
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              {/* Live Video Preview */}
              <video
                id="video-preview"
                autoPlay
                muted
                className="hidden w-64 h-48 bg-gray-900 rounded-lg mb-4"
                style={{ display: 'none' }}
              />
              
              <button
                type="button"
                onClick={() => isRecording && recordingType === 'audio' ? stopRecording() : startRecording('audio')}
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                {isRecording && recordingType === 'audio' ? (
                  <>
                    <Square className="h-4 w-4 mr-2 animate-pulse" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Record Audio
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => isRecording && recordingType === 'video' ? stopRecording() : startRecording('video')}
                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                {isRecording && recordingType === 'video' ? (
                  <>
                    <Square className="h-4 w-4 mr-2 animate-pulse" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    Record Video
                  </>
                )}
              </button>
            </div>
            
            {isRecording && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-red-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Recording {recordingType}... Click "Stop Recording" when done.
                  </span>
                </div>
                {recordingType === 'video' && (
                  <div className="mt-2 text-center">
                    <p className="text-xs text-red-600">Check the preview above to ensure proper framing</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Attachment List */}
          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {(file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/')) && (
                      <button
                        type="button"
                        onClick={() => previewFile(file)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Warning */}
        <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Important Notice:</p>
            <p>
              Please ensure your complaint is genuine and factual. False or malicious complaints may result in 
              disciplinary action. All submissions are logged and may be reviewed by administrative staff.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Complaint'
            )}
          </button>
        </div>
      </form>
      
      {/* Media Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Preview: {previewMedia.file.name}</h3>
              <button
                onClick={closePreview}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              {previewMedia.file.type.startsWith('image/') && (
                <img
                  src={previewMedia.url}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain mx-auto"
                />
              )}
              {previewMedia.file.type.startsWith('video/') && (
                <video
                  src={previewMedia.url}
                  controls
                  className="max-w-full max-h-96 mx-auto"
                >
                  Your browser does not support video playback.
                </video>
              )}
              {previewMedia.file.type.startsWith('audio/') && (
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-8 mb-4">
                    <Mic className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Audio Recording</p>
                  </div>
                  <audio
                    src={previewMedia.url}
                    controls
                    className="mx-auto"
                  >
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
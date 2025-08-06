/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'student' | 'admin'} role
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Complaint
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {'low' | 'medium' | 'high' | 'urgent'} priority
 * @property {'pending' | 'under-review' | 'resolved' | 'rejected'} status
 * @property {boolean} isAnonymous
 * @property {string} submittedBy
 * @property {string} submittedAt
 * @property {string} [assignedTo]
 * @property {string} [resolvedAt]
 * @property {string} [resolutionNotes]
 * @property {string[]} [attachments]
 * @property {string[]} [tags]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} title
 * @property {string} message
 * @property {'info' | 'success' | 'warning' | 'error'} type
 * @property {string} timestamp
 * @property {boolean} read
 * @property {string} [complaintId]
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {number} totalComplaints
 * @property {number} resolvedComplaints
 * @property {number} pendingComplaints
 * @property {number} averageResolutionTime
 * @property {Object.<string, number>} categoryDistribution
 * @property {Array.<{month: string, complaints: number, resolved: number}>} monthlyTrends
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {function(string, string): Promise<void>} login
 * @property {function(string, string, string, string): Promise<void>} register
 * @property {function(): void} logout
 * @property {function(Object): Promise<void>} updateProfile
 * @property {boolean} isLoading
 * @property {string|null} error
 */

// Export empty objects as placeholders for type checking in development
export const User = {};
export const Complaint = {};
export const Notification = {};
export const AnalyticsData = {};
export const AuthContextType = {}; 
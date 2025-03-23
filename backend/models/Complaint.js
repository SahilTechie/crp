const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"],
    default: "Pending",
  },
  attachments: [
    {
      filename: String,
      path: String,
      mimetype: String,
    },
  ],
  externalUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expectedResolution: {
    type: Date,
    default: () => {
      // Set default expected resolution to 7 days from now
      const date = new Date()
      date.setDate(date.getDate() + 7)
      return date
    },
  },
  updates: [
    {
      title: String,
      message: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  assignedAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

// Generate a unique complaint ID
complaintSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next()
  }

  // Generate a random alphanumeric ID
  const randomId = Math.random().toString(36).substring(2, 10).toUpperCase()
  this.id = randomId
  next()
})

module.exports = mongoose.model("Complaint", complaintSchema)


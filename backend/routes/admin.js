const express = require("express")
const router = express.Router()
const Complaint = require("../models/Complaint")
const User = require("../models/User")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")

// Get all complaints (admin view)
router.get("/complaints", auth, adminAuth, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })

    res.json(complaints)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update complaint status
router.patch("/complaints/:id/status", auth, adminAuth, async (req, res) => {
  try {
    const { status, message } = req.body

    if (!["Pending", "In Progress", "Resolved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" })
    }

    complaint.status = status

    // Add update to history
    complaint.updates.push({
      title: `Status changed to ${status}`,
      message: message || `The status was updated by admin.`,
    })

    await complaint.save()

    res.json({ message: "Complaint status updated", complaint })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Assign complaint to admin
router.patch("/complaints/:id/assign", auth, adminAuth, async (req, res) => {
  try {
    const { adminId } = req.body

    const admin = await User.findById(adminId)
    if (!admin || admin.role !== "admin") {
      return res.status(400).json({ message: "Invalid admin ID" })
    }

    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" })
    }

    complaint.assignedAdmin = adminId

    // Add update to history
    complaint.updates.push({
      title: "Complaint assigned",
      message: `Complaint assigned to ${admin.name}`,
    })

    await complaint.save()

    res.json({ message: "Complaint assigned successfully", complaint })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get dashboard statistics for admin
router.get("/dashboard", auth, adminAuth, async (req, res) => {
  try {
    const total = await Complaint.countDocuments()
    const pending = await Complaint.countDocuments({ status: "Pending" })
    const inProgress = await Complaint.countDocuments({ status: "In Progress" })
    const resolved = await Complaint.countDocuments({ status: "Resolved" })
    const rejected = await Complaint.countDocuments({ status: "Rejected" })

    // Get complaints by category
    const categoryData = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Get recent complaints
    const recentComplaints = await Complaint.find().sort({ createdAt: -1 }).limit(5)

    res.json({
      stats: {
        total,
        pending,
        inProgress,
        resolved,
        rejected,
      },
      categoryData: categoryData.map((item) => ({
        name: item._id,
        value: item.count,
      })),
      recentComplaints,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router


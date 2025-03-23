const express = require("express")
const router = express.Router()
const Complaint = require("../models/Complaint")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { validateComplaint } = require("../utils/aiValidation")
const auth = require("../middleware/auth")

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/"
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/webm",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, MP4, WebM, PDF, and DOCX files are allowed."))
    }
  },
})

// Get all complaints (public dashboard - limited info)
router.get("/public", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .select("category organization status createdAt expectedResolution")
      .sort({ createdAt: -1 })

    res.json(complaints)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get complaint by ID (for tracking)
router.get("/track/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ id: req.params.id })

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" })
    }

    res.json(complaint)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Submit a new complaint
router.post("/", upload.array("attachments", 5), async (req, res) => {
  try {
    const { category, organization, description, externalUrl } = req.body

    // AI validation
    const validationResult = await validateComplaint(description, req.files)

    if (!validationResult.isValid) {
      // Delete uploaded files if validation fails
      if (req.files) {
        req.files.forEach((file) => {
          fs.unlinkSync(file.path)
        })
      }

      return res.status(400).json({
        message: "Complaint validation failed",
        reason: validationResult.reason,
      })
    }

    // Process attachments
    const attachments = req.files
      ? req.files.map((file) => ({
          filename: file.originalname,
          path: file.path,
          mimetype: file.mimetype,
        }))
      : []

    // Create new complaint
    const complaint = new Complaint({
      category,
      organization,
      description,
      externalUrl,
      attachments,
    })

    await complaint.save()

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaintId: complaint.id,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get complaints statistics
router.get("/stats", async (req, res) => {
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

    res.json({
      total,
      pending,
      inProgress,
      resolved,
      rejected,
      categoryData: categoryData.map((item) => ({
        name: item._id,
        value: item.count,
      })),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router


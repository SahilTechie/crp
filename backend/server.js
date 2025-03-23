const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const complaintRoutes = require("./routes/complaints")
const userRoutes = require("./routes/users")
const adminRoutes = require("./routes/admin")
require('dotenv').config();


// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // Use MONGO_URI as defined in .env
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/complaints", complaintRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("Grievance Management System API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


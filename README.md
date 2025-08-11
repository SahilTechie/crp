# 🏫 Campus Resolve Portal (CRP)  
**Your Voice. Your Right.**

CRP is a secure, anonymous grievance redressal portal built for college campuses. Developed during the 24-hour **CODEMANIA Hackathon** at **BITS Pilani Hyderabad**, it empowers students, faculty, and staff to raise concerns, track resolutions, and foster accountability.

---

<p align="center">
  <img src="./crp.png" alt="CRP Logo" width="200"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/stack-MERN-green" alt="Stack Badge"/>
  <img src="https://img.shields.io/badge/status-%20Deployed-orange" alt="Status Badge"/>
  <img src="https://img.shields.io/github/issues/CodeWithUtkarsha/Campus-Resolve-Portal-CRP" alt="GitHub Issues"/>
  <img src="https://img.shields.io/github/last-commit/CodeWithUtkarsha/Campus-Resolve-Portal-CRP" alt="Last Commit"/>
</p>

## 🌐 Live Demo

👉 [Campus Resolve Portal - View Live](https://campus-resolve-portal-oi1sx625p-newp.vercel.app)

---

## 🚀 Features

- **Anonymous Grievance Submission**  
  Submit complaints without revealing your identity.

- **Multi-format Input**  
  Raise concerns via text, voice, or video uploads.

- **Complaint Status Tracking**  
  Real-time updates: acknowledged, reviewed, resolved.

- **Privacy Protection**  
  No user tracking except what is voluntarily provided.

- **Admin Dashboard**  
  Campus officials can manage, review, and resolve grievances efficiently.

- **Smart Alerts**  
  Automatic notifications at every status update.

---

## 🛠️ Tech Stack

Built with the **MERN** stack:

- **MongoDB** – Flexible NoSQL database for complaints and user data  
- **Express.js** – Node.js web framework powering the backend  
- **React.js** – Fast, modern frontend user interface  
- **Node.js** – Robust backend server logic

### Frontend

- **React 18** + **TypeScript**
- **Vite** (fast dev server & build)
- **Tailwind CSS** (utility-first styling)
- **Lucide React** (icon library)
- **React Context** (state management)

### Backend

- **Express.js** (Node.js framework)
- **MongoDB** + **Mongoose**
- **JWT** (authentication)
- **bcryptjs** (password hashing)
- **Express-validator** (input validation)
- **CORS** & **Helmet** (security best practices)

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeWithUtkarsha/Campus-Resolve-Portal-CRP.git
   cd Campus-Resolve-Portal-CRP
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure MongoDB**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)
   - Update `backend/config.env` with your MongoDB URI

5. **Start development servers**

   **Option 1: Use scripts (Windows)**
   ```bash
   start-dev.bat
   # or
   .\start-dev.ps1
   ```

   **Option 2: Manual start**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```


### Default Admin Credentials

- **Email:** smallelw@gitam.in
- **Password:** Smdmnd@009

---

## 🚀 Future Scope

CRP is adaptable for:

- Corporate feedback and complaint systems  
- Government department grievance portals  
- Local communities and NGOs

---

## ✨ Acknowledgements

- [TechXcelerate](https://techxcelerate.in) – Hackathon Organizers  
- [BITS Pilani Hyderabad – E-Cell](https://www.bits-pilani.ac.in/hyderabad/)  
- [BharatVersity](https://www.bharatversity.com)

---

## 📬 Contact

For questions, suggestions, or collaboration:

📧 utkarsha.v.salve@gmail.com  
🔗 [LinkedIn – Utkarsha Salve](http://www.linkedin.com/in/utkarsha-salve-253b95259/)

---

<p align="center">
  <b>Made with ❤️ at CODEMANIA, BITS Pilani Hyderabad</b>
</p>

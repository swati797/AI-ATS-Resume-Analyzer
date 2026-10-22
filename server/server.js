const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/students', require('./routes/studentRoutes'))
app.use('/api/companies', require('./routes/companyRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/applications', require('./routes/applicationRoutes'))
app.use('/api/interviews', require('./routes/interviewRoutes'))
app.use('/api/placements', require('./routes/placementRoutes'))
app.use('/api/notifications', require('./routes/notificationRoutes'))
app.use('/api/stats', require('./routes/statsRoutes'))
app.use('/api/resume', require('./routes/resumeRoutes'))
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

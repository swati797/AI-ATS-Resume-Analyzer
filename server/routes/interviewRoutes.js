const express = require('express')
const router = express.Router()
const controller = require('../controllers/interviewController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, authorize('admin','recruiter'), controller.scheduleInterview)
router.get('/', protect, controller.getInterviews)
router.put('/:id', protect, authorize('admin','recruiter'), controller.updateInterview)

module.exports = router

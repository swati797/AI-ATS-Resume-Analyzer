const express = require('express')
const router = express.Router()
const controller = require('../controllers/studentController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, authorize('admin','recruiter'), controller.createStudent)
router.get('/', protect, authorize('admin'), controller.getStudents)
router.get('/:id', protect, controller.getStudent)
router.put('/:id', protect, controller.updateStudent)
router.delete('/:id', protect, authorize('admin'), controller.deleteStudent)

// student-specific endpoints
router.get('/me/profile', protect, controller.getMe)
router.put('/me/profile', protect, controller.updateMe)

module.exports = router

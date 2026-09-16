const express = require('express')
const router = express.Router()
const controller = require('../controllers/jobController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, authorize('admin','recruiter'), controller.createJob)
router.get('/', protect, controller.getJobs)
router.get('/:id', protect, controller.getJob)
router.put('/:id', protect, authorize('admin','recruiter'), controller.updateJob)
router.delete('/:id', protect, authorize('admin','recruiter'), controller.deleteJob)

module.exports = router

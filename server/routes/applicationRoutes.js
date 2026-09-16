const express = require('express')
const router = express.Router()
const controller = require('../controllers/applicationController')
const { protect, authorize } = require('../middleware/auth')

router.post('/apply', protect, controller.apply)
router.get('/', protect, controller.getApplications)
router.put('/:id', protect, authorize('admin','recruiter'), controller.updateApplication)

module.exports = router

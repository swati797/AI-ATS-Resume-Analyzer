const express = require('express')
const router = express.Router()
const controller = require('../controllers/placementController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, authorize('admin'), controller.addPlacement)
router.get('/', protect, controller.getPlacements)

module.exports = router

const express = require('express')
const router = express.Router()
const controller = require('../controllers/notificationController')
const { protect } = require('../middleware/auth')

router.post('/', protect, controller.createNotification)
router.get('/', protect, controller.getNotifications)
router.put('/:id/read', protect, controller.markRead)

module.exports = router

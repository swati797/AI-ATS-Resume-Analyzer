const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const controller = require('../controllers/statsController')

router.get('/overview', protect, authorize('admin'), controller.overview)

module.exports = router

const express = require('express')
const router = express.Router()
const controller = require('../controllers/companyController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, authorize('admin','recruiter'), controller.createCompany)
router.get('/', protect, controller.getCompanies)
router.get('/:id', protect, controller.getCompany)
router.put('/:id', protect, authorize('admin','recruiter'), controller.updateCompany)
router.delete('/:id', protect, authorize('admin'), controller.deleteCompany)

module.exports = router

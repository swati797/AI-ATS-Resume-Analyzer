const mongoose = require('mongoose')

const placementSchema = new mongoose.Schema({
  studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
  companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  jobId: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
  package: {type: String},
  placementDate: {type: Date, default: Date.now},
  status: {type: String, default: 'Confirmed'}
}, {timestamps:true})

module.exports = mongoose.model('Placement', placementSchema)

const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  jobTitle: {type: String, required: true},
  description: {type: String},
  requiredSkills: {type: [String], default: []},
  minimumCGPA: {type: Number, default: 0},
  maximumBacklogs: {type: Number, default: 0},
  salary: {type: String},
  location: {type: String},
  jobType: {type: String},
  applicationDeadline: {type: Date},
  status: {type: String, default: 'open'}
}, {timestamps:true})

module.exports = mongoose.model('Job', jobSchema)

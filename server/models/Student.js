const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  enrollmentNumber: {type: String},
  course: {type: String},
  branch: {type: String},
  year: {type: String},
  cgpa: {type: Number},
  backlogs: {type: Number, default: 0},
  phone: {type: String},
  skills: {type: [String], default: []},
  certifications: {type: [String], default: []},
  projects: {type: [String], default: []},
  resume: {type: String}
}, {timestamps:true})

module.exports = mongoose.model('Student', studentSchema)

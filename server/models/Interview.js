const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
  studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
  companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
  jobId: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'},
  interviewDate: {type: Date},
  interviewTime: {type: String},
  mode: {type: String, enum:['Online','Offline','Hybrid'], default: 'Online'},
  location: {type: String},
  meetingLink: {type: String},
  status: {type: String, default: 'Scheduled'}
}, {timestamps:true})

module.exports = mongoose.model('Interview', interviewSchema)

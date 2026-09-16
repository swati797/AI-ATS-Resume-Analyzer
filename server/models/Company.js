const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  companyName: {type: String, required: true},
  email: {type: String},
  contactPerson: {type: String},
  phone: {type: String},
  website: {type: String},
  industry: {type: String},
  location: {type: String},
  approvalStatus: {type: Boolean, default: false}
}, {timestamps:true})

module.exports = mongoose.model('Company', companySchema)

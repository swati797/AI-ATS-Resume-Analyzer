const Application = require('../models/Application')

exports.apply = async (req,res,next)=>{
  try{
    const { jobId } = req.body
    if(!jobId) return res.status(400).json({message:'Missing jobId'})

    // determine studentId: prefer body, else from authenticated user
    let studentId = req.body.studentId
    if(!studentId){
      if(!req.user) return res.status(401).json({message:'Not authenticated'})
      // find student profile by userId
      const Student = require('../models/Student')
      const student = await Student.findOne({userId: req.user._id})
      if(!student) return res.status(400).json({message:'Student profile not found'})
      studentId = student._id
    }

    const existing = await Application.findOne({studentId, jobId})
    if(existing) return res.status(400).json({message:'Already applied'})

    const a = await Application.create({studentId, jobId})

    // notify student
    const Notification = require('../models/Notification')
    await Notification.create({userId: req.user ? req.user._id : null, title: 'Application submitted', message: `Your application for job ${jobId} has been submitted.`})

    res.json(a)
  }catch(err){next(err)}
}

exports.getApplications = async (req,res,next)=>{
  try{
    const q = req.query || {}
    const list = await Application.find(q).populate('studentId jobId')
    res.json(list)
  }catch(err){next(err)}
}

exports.updateApplication = async (req,res,next)=>{
  try{
    const prev = await Application.findById(req.params.id)
    const a = await Application.findByIdAndUpdate(req.params.id, req.body, {new:true})

    // if status changed, create notification for the student
    if(prev && a && prev.status !== a.status){
      const Notification = require('../models/Notification')
      // find student userId
      const Student = require('../models/Student')
      const student = await Student.findById(a.studentId)
      if(student){
        await Notification.create({userId: student.userId, title: 'Application status updated', message: `Your application status changed to ${a.status} for job ${a.jobId}.`})
      }
    }
    res.json(a)
  }catch(err){next(err)}
}

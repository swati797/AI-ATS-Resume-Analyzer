const Interview = require('../models/Interview')

exports.scheduleInterview = async (req,res,next)=>{
  try{
    const it = await Interview.create(req.body)

    // create notification for student
    const Notification = require('../models/Notification')
    const Student = require('../models/Student')
    if(it.studentId){
      const student = await Student.findById(it.studentId)
      if(student){
        await Notification.create({userId: student.userId, title: 'Interview scheduled', message: `Interview scheduled on ${it.interviewDate} for job ${it.jobId}`})
      }
    }

    res.json(it)
  }catch(err){next(err)}
}

exports.getInterviews = async (req,res,next)=>{
  try{
    const q = req.query || {}
    const list = await Interview.find(q).populate('studentId companyId jobId')
    res.json(list)
  }catch(err){next(err)}
}

exports.updateInterview = async (req,res,next)=>{
  try{
    const it = await Interview.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(it)
  }catch(err){next(err)}
}

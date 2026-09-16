const Placement = require('../models/Placement')

exports.addPlacement = async (req,res,next)=>{
  try{
    const p = await Placement.create(req.body)

    // notify student
    const Student = require('../models/Student')
    const Notification = require('../models/Notification')
    if(p.studentId){
      const student = await Student.findById(p.studentId)
      if(student){
        await Notification.create({userId: student.userId, title: 'You have been placed', message: `Congratulations! You have been placed at company ${p.companyId} for job ${p.jobId}.`})
      }
    }
    res.json(p)
  }catch(err){next(err)}
}

exports.getPlacements = async (req,res,next)=>{
  try{
    const q = req.query || {}
    const list = await Placement.find(q).populate('studentId companyId jobId')
    res.json(list)
  }catch(err){next(err)}
}

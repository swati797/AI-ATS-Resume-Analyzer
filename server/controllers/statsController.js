const Student = require('../models/Student')
const Placement = require('../models/Placement')

exports.overview = async (req,res,next)=>{
  try{
    const totalStudents = await Student.countDocuments()
    const totalPlacements = await Placement.countDocuments()
    const placementPercent = totalStudents ? Math.round((totalPlacements/totalStudents)*100) : 0
    res.json({ totalStudents, totalPlacements, placementPercent })
  }catch(err){next(err)}
}

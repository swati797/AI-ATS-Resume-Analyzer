const Student = require('../models/Student')

exports.createStudent = async (req,res,next)=>{
  try{
    const s = await Student.create(req.body)
    res.json(s)
  }catch(err){next(err)}
}

exports.getStudents = async (req,res,next)=>{
  try{
    const list = await Student.find().populate('userId','name email')
    res.json(list)
  }catch(err){next(err)}
}

exports.getMe = async (req,res,next)=>{
  try{
    if(!req.user) return res.status(401).json({message:'Not authenticated'})
    const s = await Student.findOne({userId: req.user._id}).populate('userId','name email')
    if(!s) return res.status(404).json({message:'Student profile not found'})
    res.json(s)
  }catch(err){next(err)}
}

exports.updateMe = async (req,res,next)=>{
  try{
    if(!req.user) return res.status(401).json({message:'Not authenticated'})
    const s = await Student.findOneAndUpdate({userId: req.user._id}, req.body, {new:true})
    res.json(s)
  }catch(err){next(err)}
}

exports.getStudent = async (req,res,next)=>{
  try{
    const s = await Student.findById(req.params.id).populate('userId','name email')
    if(!s) return res.status(404).json({message:'Not found'})
    res.json(s)
  }catch(err){next(err)}
}

exports.updateStudent = async (req,res,next)=>{
  try{
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(s)
  }catch(err){next(err)}
}

exports.deleteStudent = async (req,res,next)=>{
  try{
    await Student.findByIdAndDelete(req.params.id)
    res.json({message:'Deleted'})
  }catch(err){next(err)}
}

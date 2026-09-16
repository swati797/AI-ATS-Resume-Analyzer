const Job = require('../models/Job')

exports.createJob = async (req,res,next)=>{
  try{
    const j = await Job.create(req.body)
    res.json(j)
  }catch(err){next(err)}
}

exports.getJobs = async (req,res,next)=>{
  try{
    const q = req.query || {}
    const list = await Job.find(q).populate('companyId','companyName')
    res.json(list)
  }catch(err){next(err)}
}

exports.getJob = async (req,res,next)=>{
  try{
    const j = await Job.findById(req.params.id).populate('companyId','companyName')
    if(!j) return res.status(404).json({message:'Not found'})
    res.json(j)
  }catch(err){next(err)}
}

exports.updateJob = async (req,res,next)=>{
  try{
    const j = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(j)
  }catch(err){next(err)}
}

exports.deleteJob = async (req,res,next)=>{
  try{
    await Job.findByIdAndDelete(req.params.id)
    res.json({message:'Deleted'})
  }catch(err){next(err)}
}

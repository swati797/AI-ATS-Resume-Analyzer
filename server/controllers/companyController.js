const Company = require('../models/Company')

exports.createCompany = async (req,res,next)=>{
  try{
    const c = await Company.create(req.body)
    res.json(c)
  }catch(err){next(err)}
}

exports.getCompanies = async (req,res,next)=>{
  try{
    const list = await Company.find()
    res.json(list)
  }catch(err){next(err)}
}

exports.getCompany = async (req,res,next)=>{
  try{
    const c = await Company.findById(req.params.id)
    if(!c) return res.status(404).json({message:'Not found'})
    res.json(c)
  }catch(err){next(err)}
}

exports.updateCompany = async (req,res,next)=>{
  try{
    const c = await Company.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(c)
  }catch(err){next(err)}
}

exports.deleteCompany = async (req,res,next)=>{
  try{
    await Company.findByIdAndDelete(req.params.id)
    res.json({message:'Deleted'})
  }catch(err){next(err)}
}

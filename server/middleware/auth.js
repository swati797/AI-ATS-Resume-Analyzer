const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req,res,next)=>{
  let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null
  if(!token) return res.status(401).json({message:'Not authorized'})
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = await User.findById(decoded.id).select('-password')
    next()
  }catch(err){
    return res.status(401).json({message:'Token invalid'})
  }
}

exports.authorize = (...roles)=>{
  return (req,res,next)=>{
    if(!req.user) return res.status(401).json({message:'Not authorized'})
    if(!roles.includes(req.user.role)) return res.status(403).json({message:'Forbidden'})
    next()
  }
}

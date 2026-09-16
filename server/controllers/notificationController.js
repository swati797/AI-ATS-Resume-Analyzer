const Notification = require('../models/Notification')

exports.createNotification = async (req,res,next)=>{
  try{
    const n = await Notification.create(req.body)
    res.json(n)
  }catch(err){next(err)}
}

exports.getNotifications = async (req,res,next)=>{
  try{
    const q = req.query || {}
    const list = await Notification.find(q).sort('-createdAt')
    res.json(list)
  }catch(err){next(err)}
}

exports.markRead = async (req,res,next)=>{
  try{
    const n = await Notification.findByIdAndUpdate(req.params.id, {isRead:true}, {new:true})
    res.json(n)
  }catch(err){next(err)}
}

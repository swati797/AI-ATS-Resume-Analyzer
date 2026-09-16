const User = require('../models/User')
const Student = require('../models/Student')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
  try{
    const { name, email, password, confirmPassword, role, enrollmentNumber, course, branch, year, cgpa, phone } = req.body
    if(!name || !email || !password || !confirmPassword) return res.status(400).json({message:'Missing fields'})
    if(password !== confirmPassword) return res.status(400).json({message:'Passwords do not match'})
    const existing = await User.findOne({email})
    if(existing) return res.status(400).json({message:'Email already registered'})

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const user = await User.create({name, email, password: hashed, role: role || 'student'})

    // If student, create student profile with provided fields
    let student = null
    if(user.role === 'student'){
      student = await Student.create({
        userId: user._id,
        enrollmentNumber: enrollmentNumber || '',
        course: course || '',
        branch: branch || '',
        year: year || '',
        cgpa: cgpa || 0,
        phone: phone || ''
      })
    }

    const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'})
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}, student, token})
  }catch(err){next(err)}
}

exports.login = async (req, res, next) => {
  try{
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(401).json({message:'Invalid credentials'})
    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.status(401).json({message:'Invalid credentials'})
    const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'})
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}, token})
  }catch(err){next(err)}
}

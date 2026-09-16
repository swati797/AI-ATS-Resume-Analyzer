import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentRegistration(){
  const [form,setForm] = useState({name:'',email:'',password:'',confirmPassword:'',enrollmentNumber:'',course:'',branch:'',year:'',cgpa:'',phone:''})
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')
  const navigate = useNavigate()

  const handle = e => setForm({...form,[e.target.name]: e.target.value})

  const submit = async (e)=>{
    e.preventDefault(); setError(''); setSuccess('')
    // basic validation
    if(!form.name || !form.email || !form.password || !form.confirmPassword) return setError('Please fill required fields')
    if(form.password !== form.confirmPassword) return setError('Passwords do not match')
    try{
      const res = await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,role:'student'})})
      const data = await res.json()
      if(!res.ok) return setError(data.message || 'Registration failed')
      setSuccess('Registered successfully. Redirecting to dashboard...')
      setTimeout(()=>{
        navigate('/login')
      },1000)
    }catch(err){setError('Server error')}
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <h3>Student Registration</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Full Name</label><input name="name" value={form.name} onChange={handle} className="form-control" required/></div>
          <div className="mb-3"><label className="form-label">Email</label><input name="email" value={form.email} onChange={handle} className="form-control" type="email" required/></div>
          <div className="mb-3"><label className="form-label">Password</label><input name="password" value={form.password} onChange={handle} className="form-control" type="password" required/></div>
          <div className="mb-3"><label className="form-label">Confirm Password</label><input name="confirmPassword" value={form.confirmPassword} onChange={handle} className="form-control" type="password" required/></div>
          <div className="mb-3"><label className="form-label">Enrollment Number</label><input name="enrollmentNumber" value={form.enrollmentNumber} onChange={handle} className="form-control"/></div>
          <div className="mb-3"><label className="form-label">Course</label><input name="course" value={form.course} onChange={handle} className="form-control"/></div>
          <div className="mb-3"><label className="form-label">Branch</label><input name="branch" value={form.branch} onChange={handle} className="form-control"/></div>
          <div className="mb-3"><label className="form-label">Year</label><input name="year" value={form.year} onChange={handle} className="form-control"/></div>
          <div className="mb-3"><label className="form-label">CGPA</label><input name="cgpa" value={form.cgpa} onChange={handle} className="form-control"/></div>
          <div className="mb-3"><label className="form-label">Phone</label><input name="phone" value={form.phone} onChange={handle} className="form-control"/></div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  )
}

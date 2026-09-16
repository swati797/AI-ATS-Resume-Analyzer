import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function RecruiterLogin(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const { login } = useContext(AuthContext)

  const submit = async (e)=>{
    e.preventDefault(); setError('')
    try{
      const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
      const data = await res.json()
      if(!res.ok) return setError(data.message || 'Login failed')
      if(data.user.role !== 'recruiter') return setError('Not a recruiter account')
      login(data.user, data.token)
    }catch(err){setError('Server error')}
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Recruiter Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <div className="mb-3"><label className="form-label">Company Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="form-control"/></div>
          <div className="mb-3"><label className="form-label">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control"/></div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}

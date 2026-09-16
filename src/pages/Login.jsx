import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault(); setError('')
    if(!email || !password){ setError('Please provide email and password'); return }
    try{
      const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
      const data = await res.json()
      if(!res.ok) return setError(data.message || 'Login failed')
      login(data.user, data.token)
    }catch(err){ setError('Server error') }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">Login</button>
            <button type="button" className="btn btn-link" onClick={()=>navigate('/register')}>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Register(){
  return (
    <div>
      <h3>Register</h3>
      <p className="text-muted">Choose registration type:</p>
      <Link to="/student-register" className="btn btn-outline-primary me-2">Student Registration</Link>
      <Link to="/recruiter/login" className="btn btn-outline-secondary">Recruiter / Company</Link>
    </div>
  )
}

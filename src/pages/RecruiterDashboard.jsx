import React, { useContext } from 'react'
import StatCard from '../components/StatCard'
import AuthContext from '../context/AuthContext'

export default function RecruiterDashboard(){
  const { user } = useContext(AuthContext)
  const stats = [
    {title:'Active Jobs', value:8},
    {title:'Total Applicants', value:210},
    {title:'Shortlisted', value:25},
    {title:'Selected', value:12}
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Recruiter Dashboard</h3>
        {user && <div className="text-muted">Welcome, <strong>{user.name}</strong></div>}
      </div>
      <div className="row g-3 mt-3">
        {stats.map(s=> (<div className="col-md-3" key={s.title}><StatCard title={s.title} value={s.value} /></div>))}
      </div>

      <div className="row mt-4">
        <div className="col-md-8"><div className="card p-3 shadow-sm"><h6>Manage Jobs</h6><p className="text-muted">Create and manage job posts (demo UI).</p></div></div>
      </div>
    </div>
  )
}

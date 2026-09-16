import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminJobs(){
  const { authFetch } = useContext(AuthContext)
  const [jobs, setJobs] = useState([])

  const load = async ()=>{
    const res = await authFetch('/api/jobs')
    const data = await res.json()
    if(res.ok) setJobs(data)
  }
  useEffect(()=>{ load() },[])

  const remove = async (id)=>{
    if(!confirm('Delete job?')) return
    await authFetch('/api/jobs/'+id,{method:'DELETE'})
    load()
  }

  const toggle = async (job)=>{
    await authFetch('/api/jobs/'+job._id,{method:'PUT', body: JSON.stringify({status: job.status === 'open' ? 'closed' : 'open'})})
    load()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Jobs</h4>
        <button className="btn btn-primary">Create Job</button>
      </div>
      <div className="list-group">
        {jobs.map(j=> (
          <div key={j._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{j.jobTitle}</strong>
              <div className="text-muted small">{j.companyId?.companyName} — {j.location}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>toggle(j)}>{j.status === 'open' ? 'Deactivate' : 'Activate'}</button>
              <button className="btn btn-sm btn-danger" onClick={()=>remove(j._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

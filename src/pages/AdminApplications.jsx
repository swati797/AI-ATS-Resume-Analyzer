import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminApplications(){
  const { authFetch } = useContext(AuthContext)
  const [applications, setApplications] = useState([])

  const load = async ()=>{
    const res = await authFetch('/api/applications')
    const data = await res.json()
    if(res.ok) setApplications(data)
  }
  useEffect(()=>{ load() },[])

  const updateStatus = async (id, status)=>{
    await authFetch('/api/applications/'+id,{method:'PUT', body: JSON.stringify({status})})
    load()
  }

  return (
    <div>
      <h4>Applications</h4>
      <div className="list-group mt-3">
        {applications.map(a=> (
          <div key={a._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{a.jobId?.jobTitle}</strong>
              <div className="text-muted">Student: {a.studentId?.enrollmentNumber} — {a.studentId?.userId?.name}</div>
              <div className="text-muted">Applied: {new Date(a.applicationDate).toLocaleString()}</div>
            </div>
            <div>
              <select className="form-select form-select-sm d-inline-block me-2" style={{width:160}} value={a.status} onChange={e=>updateStatus(a._id, e.target.value)}>
                <option>Applied</option>
                <option>Under Review</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
                <option>Selected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

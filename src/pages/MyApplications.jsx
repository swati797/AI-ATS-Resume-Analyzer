import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function MyApplications(){
  const { authFetch } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [studentId, setStudentId] = useState(null)

  useEffect(()=>{
    const load = async ()=>{
      const resS = await authFetch('/api/students/me/profile')
      const sdata = await resS.json()
      if(!resS.ok) return
      setStudentId(sdata._id)
      const res = await authFetch('/api/applications?studentId=' + sdata._id)
      const data = await res.json()
      if(res.ok) setApplications(data)
    }
    load()
  },[])

  const badge = status => {
    const map = { 'Applied':'secondary','Under Review':'warning','Shortlisted':'info','Rejected':'danger','Selected':'success' }
    return <span className={`badge bg-${map[status]||'secondary'}`}>{status}</span>
  }

  return (
    <div>
      <h4>My Applications</h4>
      {applications.length===0 && <div className="text-muted">No applications yet</div>}
      <div className="list-group mt-3">
        {applications.map(a=> (
          <div key={a._id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{a.jobId?.jobTitle}</strong>
                <div className="text-muted">Company: {a.jobId?.companyId?.companyName}</div>
                <div className="text-muted">Applied: {new Date(a.applicationDate).toLocaleDateString()}</div>
              </div>
              <div>{badge(a.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

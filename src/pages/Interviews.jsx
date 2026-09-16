import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function Interviews(){
  const { authFetch } = useContext(AuthContext)
  const [interviews, setInterviews] = useState([])

  useEffect(()=>{
    const load = async ()=>{
      const resS = await authFetch('/api/students/me/profile')
      const sdata = await resS.json()
      if(!resS.ok) return
      const res = await authFetch('/api/interviews?studentId=' + sdata._id)
      const data = await res.json()
      if(res.ok) setInterviews(data)
    }
    load()
  },[])

  return (
    <div>
      <h4>Interview Schedule</h4>
      {interviews.length===0 && <div className="text-muted">No interviews scheduled</div>}
      <div className="list-group mt-3">
        {interviews.map(it=> (
          <div key={it._id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{it.jobId?.jobTitle}</strong>
                <div className="text-muted">Company: {it.companyId?.companyName}</div>
                <div className="text-muted">Date: {it.interviewDate ? new Date(it.interviewDate).toLocaleDateString() : 'TBD' } at {it.interviewTime}</div>
                <div className="text-muted">Mode: {it.mode} — {it.location || it.meetingLink}</div>
              </div>
              <div><span className="badge bg-secondary">{it.status}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

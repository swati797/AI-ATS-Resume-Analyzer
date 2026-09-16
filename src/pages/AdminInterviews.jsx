import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminInterviews(){
  const { authFetch } = useContext(AuthContext)
  const [interviews, setInterviews] = useState([])

  const load = async ()=>{
    const res = await authFetch('/api/interviews')
    const data = await res.json()
    if(res.ok) setInterviews(data)
  }
  useEffect(()=>{ load() },[])

  const remove = async (id)=>{
    if(!confirm('Cancel interview?')) return
    await authFetch('/api/interviews/'+id,{method:'PUT', body: JSON.stringify({status:'Cancelled'})})
    load()
  }

  return (
    <div>
      <h4>Interviews</h4>
      <div className="list-group mt-3">
        {interviews.map(it=> (
          <div key={it._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{it.jobId?.jobTitle}</strong>
              <div className="text-muted">Student: {it.studentId?.userId?.name}</div>
              <div className="text-muted">Date: {it.interviewDate} {it.interviewTime}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-danger" onClick={()=>remove(it._id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

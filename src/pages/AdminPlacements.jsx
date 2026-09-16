import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminPlacements(){
  const { authFetch } = useContext(AuthContext)
  const [placements, setPlacements] = useState([])

  const load = async ()=>{
    const res = await authFetch('/api/placements')
    const data = await res.json()
    if(res.ok) setPlacements(data)
  }
  useEffect(()=>{ load() },[])

  const remove = async (id)=>{
    if(!confirm('Delete placement?')) return
    await authFetch('/api/placements/'+id,{method:'DELETE'})
    load()
  }

  return (
    <div>
      <h4>Placements</h4>
      <div className="list-group mt-3">
        {placements.map(p=> (
          <div key={p._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.companyId?.companyName}</strong>
              <div className="text-muted">Student: {p.studentId?.userId?.name} — {p.jobId?.jobTitle}</div>
              <div className="text-muted">Package: {p.package}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-danger" onClick={()=>remove(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function PlacementResult(){
  const { authFetch } = useContext(AuthContext)
  const [placements, setPlacements] = useState([])

  useEffect(()=>{
    const load = async ()=>{
      const resS = await authFetch('/api/students/me/profile')
      const sdata = await resS.json()
      if(!resS.ok) return
      const res = await authFetch('/api/placements?studentId=' + sdata._id)
      const data = await res.json()
      if(res.ok) setPlacements(data)
    }
    load()
  },[])

  return (
    <div>
      <h4>Placement Result</h4>
      {placements.length===0 && <div className="text-muted">No placement records</div>}
      <div className="list-group mt-3">
        {placements.map(p=> (
          <div key={p._id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <strong>{p.jobId?.jobTitle}</strong>
                <div className="text-muted">Company: {p.companyId?.companyName}</div>
                <div className="text-muted">Package: {p.package}</div>
              </div>
              <div><span className={`badge bg-${p.status==='Confirmed'?'success':'secondary'}`}>{p.status}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

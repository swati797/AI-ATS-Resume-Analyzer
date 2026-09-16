import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminCompanies(){
  const { authFetch } = useContext(AuthContext)
  const [companies, setCompanies] = useState([])

  const load = async ()=>{
    const res = await authFetch('/api/companies')
    const data = await res.json()
    if(res.ok) setCompanies(data)
  }
  useEffect(()=>{ load() },[])

  const remove = async (id)=>{
    if(!confirm('Delete company?')) return
    await authFetch('/api/companies/'+id,{method:'DELETE'})
    load()
  }

  const setApproval = async (id, val)=>{
    await authFetch('/api/companies/'+id,{method:'PUT', body: JSON.stringify({approvalStatus: val})})
    load()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Companies</h4>
        <button className="btn btn-primary">Add Company</button>
      </div>
      <div className="list-group">
        {companies.map(c=> (
          <div key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{c.companyName}</strong>
              <div className="text-muted small">{c.industry} — {c.location}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-success me-2" onClick={()=>setApproval(c._id, true)}>Approve</button>
              <button className="btn btn-sm btn-outline-warning me-2" onClick={()=>setApproval(c._id, false)}>Reject</button>
              <button className="btn btn-sm btn-danger" onClick={()=>remove(c._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

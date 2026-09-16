import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminReports(){
  const { authFetch } = useContext(AuthContext)
  const [stats, setStats] = useState({})

  const load = async ()=>{
    const res = await authFetch('/api/stats/overview')
    if(!res.ok) return
    const data = await res.json()
    setStats(data)
  }

  useEffect(()=>{ load() },[])

  return (
    <div>
      <h4>Reports</h4>
      <div className="row mt-3">
        <div className="col-md-4"><div className="card p-3">Total Students: <strong>{stats.totalStudents}</strong></div></div>
        <div className="col-md-4"><div className="card p-3">Total Placements: <strong>{stats.totalPlacements}</strong></div></div>
        <div className="col-md-4"><div className="card p-3">Placement %: <strong>{stats.placementPercent}</strong></div></div>
      </div>
    </div>
  )
}
